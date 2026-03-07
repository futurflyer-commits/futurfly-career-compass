from typing import List, Dict, Any, Tuple
from collections import defaultdict
import re

class NormalizationService:
    def __init__(self, normalization_dictionary: List[Dict[str, Any]]):
        """
        The dictionary is expected to be the flat result of select * from vw_skill_normalization_dictionary.
        Expected keys: 'normalized_lookup', 'skill_id', 'skill_name'
        We build a quick programmatic lookup in-memory for fast O(1) checking.
        """
        self.synonym_map = {}
        self.canonical_map = {}
        
        for row in normalization_dictionary:
            syn = row.get("normalized_lookup", "").strip().lower()
            c_name = row.get("skill_name", "")
            s_id = row.get("skill_id", "")
            
            if syn and s_id:
                self.synonym_map[syn] = {"id": s_id, "name": c_name}
                
                # Also index the canonical name directly just in case it's not explicitly listed as a synonym
                c_clean = c_name.strip().lower()
                if c_clean and c_clean not in self.synonym_map:
                    self.synonym_map[c_clean] = {"id": s_id, "name": c_name}
                    
            if s_id and c_name:
                self.canonical_map[s_id] = c_name
                
    def normalize_skills(self, raw_skills_list: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
        """
        Takes a list of raw skill objects (from OAIRawSkill dicts) and returns:
        1. matched_skills: Array of objects with grouped evidence and the matched canonical id/name.
        2. unmatched_skills: Array of raw skills that failed to match.
        """
        raw_unmatched = []
        matched_groups = defaultdict(list)
        
        for skill_item in raw_skills_list:
            raw_text = skill_item.get("skill_name", "").strip().lower()
            # Basic sanitization (remove weird punctuation hanging off the ends)
            clean_text = re.sub(r'^[^\w]+|[^\w]+$', '', raw_text)
            
            match_data = self.synonym_map.get(clean_text)
            if not match_data:
                # Try exact word matching if standard failing (e.g. AWS vs Amazon Web Services)
                # For a production setup, we might use RapidFuzz or embeddings here, but dictionary lookup is specified.
                raw_unmatched.append({
                    "raw_skill": skill_item.get("skill_name", ""),
                    "evidence": skill_item.get("evidence_snippet", "")
                })
            else:
                canon_id = match_data["id"]
                canon_name = match_data["name"]
                
                # Group by canonical ID so we don't return 4 separate 'Python' rows if they wrote 'Py', 'Python3', 'Pandas', etc 
                # (Assuming the DB mapped 'Pandas' to a parent Python skill, or treated them separate. Either way, grouped by ID).
                matched_groups[canon_id].append({
                    "name": canon_name,
                    "evidence": skill_item.get("evidence_snippet", ""),
                    "years": skill_item.get("experience_years", 0.0)
                })
                
        # Flatten grouped matches
        final_matched = []
        for s_id, occurrences in matched_groups.items():
            primary_name = occurrences[0]["name"]
            
            # Evidence becomes a list of strings
            all_evidence = [o["evidence"] for o in occurrences if o["evidence"]]
            
            # Years takes the maximum mentioned
            max_years = max([o["years"] for o in occurrences]) if occurrences else 0.0
            
            final_matched.append({
                "skill_id": s_id,
                "skill_name": primary_name,
                "evidence_list": all_evidence,
                "estimated_years": max_years
            })
            
        return final_matched, raw_unmatched
