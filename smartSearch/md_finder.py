'''This script can return relative paths of all the .md file in a'''

import os

def get_md_files(directory, base_directory):
    md_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                absolute_path = os.path.join(root, file)
                relative_path = os.path.relpath(absolute_path, base_directory)
                md_files.append(relative_path)
    return md_files

if __name__ == "__main__":
    base_directory = ''
    directory = 'textbook/chapters'
    md_file_paths = get_md_files(directory, base_directory)
    for path in md_file_paths:
        print(path)
