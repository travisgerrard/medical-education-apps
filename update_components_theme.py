import os
import re

# Update DisclaimerPage to accept theme prop
disclaimer_file = 'packages/shared-ui/DisclaimerPage.js'
with open(disclaimer_file, 'r') as f:
    content = f.read()

# Update function signature to accept theme
content = content.replace(
    'export default function DisclaimerPage()',
    'export default function DisclaimerPage({ theme })'
)

# Replace hardcoded disclaimer text with theme.text.disclaimerText
old_text = '''        The VM Diabetes Application provides useful information but is not a
        substitute for professional medical advice, diagnosis, or treatment. If
        you think you may have a medical emergency, immediately call your doctor
        or dial 911. Before acting on any of the information in the VM Diabetes
        Application, consult with your doctor or nurse to make sure that it is
        right for you.'''

new_text = '''        {theme.text.disclaimerText}'''

content = content.replace(old_text, new_text)

with open(disclaimer_file, 'w') as f:
    f.write(content)
print(f"Updated {disclaimer_file}")

# Update Card.js to accept theme prop
card_file = 'packages/shared-ui/Card/Card.js'
with open(card_file, 'r') as f:
    content = f.read()

# Remove icon imports
content = re.sub(r"import \{ IoArrowForward, IoCheckmarkCircleOutline \} from 'react-icons/io5';", '', content)

# Update function signature
content = content.replace(
    'export default function Card({ Content }) {',
    'export default function Card({ Content, theme }) {'
)

# Replace IoCheckmarkCircleOutline with theme.icons.checkmark
content = re.sub(
    r'<IoCheckmarkCircleOutline color="rgb\(0, 128, 0\)" />',
    '<theme.icons.checkmark color="rgb(0, 128, 0)" />',
    content
)

# Replace IoArrowForward with theme.icons.arrow
content = re.sub(
    r'<IoArrowForward color="gray" />',
    '<theme.icons.arrow color="gray" />',
    content
)

with open(card_file, 'w') as f:
    f.write(content)
print(f"Updated {card_file}")

# Update NextSectionButton.js
next_button_file = 'packages/shared-ui/NextSectionButton.js'
with open(next_button_file, 'r') as f:
    content = f.read()

# Remove icon import
content = re.sub(r"import \{ IoCaretForward \} from 'react-icons/io5';", '', content)

# Update function signature - find export default and add theme prop
content = re.sub(
    r'export default function NextSectionButton\(\{ route \}\)',
    'export default function NextSectionButton({ route, theme })',
    content
)

# Replace color references
content = content.replace('rgb(1, 121, 213)', 'props => props.theme.colors.link')
content = content.replace('color: rgb(1, 121, 213);', 'color: ${props => props.theme.colors.link};')

# Replace icon
content = re.sub(
    r'<IoCaretForward color="rgb\(1, 121, 213\)" fontSize="32px" />',
    '<theme.icons.nextSection color={theme.colors.link} fontSize="32px" />',
    content
)

with open(next_button_file, 'w') as f:
    f.write(content)
print(f"Updated {next_button_file}")

# Update MainReadingView.js
main_reading_file = 'packages/shared-ui/MainReadingView.js'
with open(main_reading_file, 'r') as f:
    content = f.read()

# Update function signature
content = re.sub(
    r'export default function MainReadingView\(\{ children \}\)',
    'export default function MainReadingView({ children, theme })',
    content
)

# Replace hardcoded green color
content = content.replace('background-color: rgb(0, 162, 97);', 'background-color: ${props => props.theme.colors.primary};')

with open(main_reading_file, 'w') as f:
    f.write(content)
print(f"Updated {main_reading_file}")

print("\nAll components updated successfully!")
