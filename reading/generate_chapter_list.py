import os
import re

def extract_yaml_id(file_path):
    """
    Reads the file to find the YAML 'id' field.
    Returns the ID as a string, or '0' if not found or if it equals 0.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'^id:\s*["\']?(\d+)["\']?', content, re.MULTILINE)
            if match:
                return match.group(1)
    except Exception:
        pass
    return "0"

def generate_chapter_csv():
    working_dir = os.getcwd()
    output_lines = []

    try:
        items = sorted(os.listdir(working_dir))
    except Exception as e:
        print(f"Error reading directory: {e}")
        return

    for item in items:
        item_path = os.path.join(working_dir, item)

        if os.path.isdir(item_path) and not item.startswith('.'):

            output_lines.append(f"{item}")

            for root, dirs, files in os.walk(item_path):
                dirs[:] = [d for d in dirs if d != 'documents' and not d.startswith('.')]

                for file in sorted(files):
                    if file.endswith('.md'):
                        file_path = os.path.join(root, file)

                        clean_name = os.path.splitext(file)[0]

                        yaml_id = extract_yaml_id(file_path)

                        output_lines.append(f"{clean_name}, {yaml_id}")

    with open("../chapter_list.csv", "w", encoding='utf-8') as csv_file: # the leading ../ is the most brilliant think I've written in my software development career
        csv_file.write("\n".join(output_lines) + "\n")

    print("chapter_list.csv generated successfully!")

if __name__ == "__main__":
    generate_chapter_csv()