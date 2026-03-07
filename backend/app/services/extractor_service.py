import os
import json
from openai import AsyncOpenAI
from app.models.schemas import OAIExtractionResult
from app.prompts.openai_prompts import EXTRACTION_SYSTEM_PROMPT

class ExtractorService:
    def __init__(self):
        # Initializes the OpenAI client automatically looking for OPENAI_API_KEY in env
        if not os.environ.get("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY must be set in the environment")
        self.client = AsyncOpenAI()

    async def extract_skills_from_text(self, resume_text: str) -> OAIExtractionResult:
        """
        Sends the candidate resume text to OpenAI to structured parse out exactly:
        - current title
        - total experience years
        - list of raw technologies/skills and their evidence snippets
        """
        response = await self.client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": EXTRACTION_SYSTEM_PROMPT},
                {"role": "user", "content": f"Please extract candidate intelligence from the following resume text:\n\n{resume_text}"}
            ],
            response_format=OAIExtractionResult,
        )

        parsed_response = response.choices[0].message.parsed
        return parsed_response
