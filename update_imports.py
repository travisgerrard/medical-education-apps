import os
import re

def update_imports(app_path):
    """Update imports to use @medical-edu/shared-contexts package"""
    
    # Map of old import patterns to new ones
    import_mappings = {
        r"from '\.\./context/AuthContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/TextContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/ReadingContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/NextToReadContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/DarkContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/MenuScrollContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\.\/context/createDataContext'": "from '@medical-edu/shared-contexts'",
        r"from '\.\./context/api'": "from '@medical-edu/shared-contexts'",
    }
    
    # Also handle double quotes
    import_mappings.update({
        r'from "\.\./context/AuthContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/TextContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/ReadingContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/NextToReadContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/DarkContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/MenuScrollContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\.\/context/createDataContext"': 'from "@medical-edu/shared-contexts"',
        r'from "\.\./context/api"': 'from "@medical-edu/shared-contexts"',
    })
    
    # Also update the format: { Context as XContext } to { XContext }
    context_pattern = re.compile(r"import \{ Context as (\w+) \}")
    
    for root, dirs, files in os.walk(app_path):
        for file in files:
            if file.endswith('.js'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                original_content = content
                
                # Apply all import mappings
                for old_pattern, new_pattern in import_mappings.items():
                    content = re.sub(old_pattern, new_pattern, content)
                
                # Update Context as X to just X
                content = context_pattern.sub(r'import { \1 }', content)
                
                if content != original_content:
                    print(f"Updating {filepath}")
                    with open(filepath, 'w') as f:
                        f.write(content)

# Update both apps
update_imports('apps/diabetes-edu/src')
update_imports('apps/bp-impact/src')

print("\nImports updated successfully!")
