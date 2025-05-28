import os

TEMPLATE = '''document.querySelectorAll('iframe[data-code-file="{filename}"]').forEach((iframe) => {{
    fetch("../../visualize_examples/{c_path}")
        .then(res => res.text())
        .then(code => {{
            iframe.src = "https://pythontutor.com/iframe-embed.html#code=" + 
                          encodeURIComponent(code) + 
                          "&cumulative=false&py=c&curInstr=0";
        }});
}});
'''

base_dir = "textbook/visualize_examples"


for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".c"):
            c_path = os.path.relpath(os.path.join(root, file), base_dir)
            js_code = TEMPLATE.format(filename=c_path, c_path=c_path)
            js_filename = file.replace(".c", ".js")
            js_path = os.path.join(root, js_filename)
            with open(js_path, "w") as f:
                f.write(js_code)
            print(f"Generated: {js_path}")