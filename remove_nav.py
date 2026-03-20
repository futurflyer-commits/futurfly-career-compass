import os
import glob
import re

files = glob.glob('src/pages/*.tsx')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Remove DashboardNav imports
    if 'DashboardNav' in content:
        content = re.sub(r'import\s+\{\s*DashboardNav\s*\}\s+from\s+[\'"](?:@/components/DashboardNav|\.\./components/DashboardNav)[\'"];?\n?', '', content)
        
        # Remove usage
        content = re.sub(r'<DashboardNav\s*/>\n?', '', content)
        content = re.sub(r'\{\s*user\s*&&\s*<DashboardNav\s*/>\s*\}\n?', '', content)
        modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {file}")
