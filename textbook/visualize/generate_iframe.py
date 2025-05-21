import urllib.parse
import sys
import os
from estimate_heights import get_estimated_height

# Enter the example files and put the URL codes in generated_iframes.yml
example_path="textbook/visualize/examples"
output_path="textbook/visualize/generated_iframes.yml"

# Templet for iframe
templet="""  visualize_embed_{chapter}_{name}: |
    <div style="text-align: center; margin: 2em 0;">
      <iframe 
        src="https://pythontutor.com/iframe-embed.html#code={code}&cumulative=false&py=c&curInstr=0" 
        width="100%" 
        height="{height}px" 
        frameborder="0" 
        style="border: 1px solid lightgrey; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      </iframe>
    </div> 
"""

result=[]

# Get all the files in exmples folder
for root, dirs, files in os.walk(example_path):
    # Go through every file
    for file in files:
      if file.endswith(".c"):
          # Get the path of the file and split it into name and .c, then take filename
          name=os.path.splitext(file)[0]
          # Get the path of specific c file by concatenating root and filename
          path=os.path.join(root,file)
          # os.path.basename can get the last name of root which is chapter
          chapter = os.path.basename(root)

          with open(path, 'r', encoding='utf-8') as f:
              code=f.read()

          height=get_estimated_height(code)

          # Using urllib.parse to convert code into URL
          URL= urllib.parse.quote(code)
        
          result.append(templet.format(chapter=chapter,name=name,code=URL,height=height))

          print("Finish "+ chapter+ " " + name)

with open(output_path,"w",encoding='utf-8') as f:
    f.write("myst_substitutions:\n")
    for block in result:
        f.write(block + "\n")


