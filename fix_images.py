import os
import re

def fix_mdx_images(directory):
    # Regex to find <img src={Variable} /> where Variable does NOT already have .src
    # It looks for src={ followed by a variable name, ensuring it doesn't end with .src, followed by }
    pattern = re.compile(r'src=\{([a-zA-Z0-9_]+)\}')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".mdx"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Function to replace only if .src is missing
                def replace_func(match):
                    var_name = match.group(1)
                    # If the variable name implies it's an import (usually CamelCase or starts with lowercase), append .src
                    # We can just blindly append .src because the regex captures the variable name inside {}
                    # But we must check if the original string in the file was already {Var.src}
                    # The regex `src=\{([a-zA-Z0-9_]+)\}` WON'T match `src={Var.src}` because of the dot.
                    # So any match is a candidate for replacement.
                    return f'src={{{var_name}.src}}'
                
                new_content = pattern.sub(replace_func, content)
                
                if new_content != content:
                    print(f"Updating {filepath}")
                    with open(filepath, 'w') as f:
                        f.write(new_content)

# Target directory
target_dir = 'apps/diabetes-edu/pages'
fix_mdx_images(target_dir)
