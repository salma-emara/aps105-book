import sys
import requests
from bs4 import BeautifulSoup, NavigableString, Comment
import html as htmllib
import json
import re
from pathlib import Path

USAGE = """Usage:
  python viztrace_folder.py <book_root_dir>
Examples:
  python viztrace_folder.py textbook
  python viztrace_folder.py mybook
"""

def extract_code_exact(tag):
    pieces = []
    for child in tag.contents:
        if isinstance(child, NavigableString) and not isinstance(child, Comment):
            pieces.append(str(child))
    raw = "".join(pieces)
    raw = htmllib.unescape(raw)
    raw = re.sub(r"\r\n?|\u2028|\u2029", "\n", raw)

    lines = raw.split("\n")
    while lines and lines[0].strip() == "":
        lines.pop(0)
    while lines and lines[-1].strip() == "":
        lines.pop()

    if lines:
        min_indent = None
        for ln in lines:
            if ln.strip():
                leading = len(ln) - len(ln.lstrip(" "))
                min_indent = leading if min_indent is None else min(min_indent, leading)
        if min_indent and min_indent > 0:
            lines = [ln[min_indent:] if ln.strip() else "" for ln in lines]

    return "\n".join(lines) + "\n"


def handle_file(md_or_html_path: Path, out_root: Path, book_root: Path):
    if md_or_html_path.suffix.lower() not in {".md", ".html"}:
        return

    text = md_or_html_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(text, "html.parser")
    visualizers = soup.find_all("c-visualizer")
    if not visualizers:
        return

    print(f"\n🧩 {md_or_html_path} | Found {len(visualizers)} <c-visualizer>")

    errors, seen, examples = [], set(), []
    for i, viz in enumerate(visualizers, start=1):
        raw = (viz.get("example") or "").strip()
        if not re.fullmatch(r"\d+", raw):
            errors.append(f"[Visualizer #{i}] Invalid 'example': '{raw}' (positive integer required)")
            examples.append(None)
            continue
        val = int(raw)
        if val <= 0:
            errors.append(f"[Visualizer #{i}] 'example' must be > 0")
            examples.append(None)
            continue
        if val in seen:
            errors.append(f"[Visualizer #{i}] Duplicate 'example': {val}")
            examples.append(None)
            continue
        seen.add(val)
        examples.append(val)

    if errors:
        print("❌ Validation failed:")
        [print(" -", e) for e in errors]
        return

    page_stem = md_or_html_path.stem  
    rel_folder = md_or_html_path.parent.relative_to(book_root)  
    base_dir = out_root / rel_folder / page_stem
    base_dir.mkdir(parents=True, exist_ok=True)

    for idx, (viz, ex) in enumerate(zip(visualizers, examples), start=1):
        code = extract_code_exact(viz)
        out_dir = base_dir / f"example{ex}"
        out_dir.mkdir(parents=True, exist_ok=True)

        code_path = out_dir / "code.c"
        trace_path = out_dir / "trace.json"
        code_path.write_text(code, encoding="utf-8")

        print(f"   [{idx}] -> {trace_path}")

        url = "https://pythontutor.com/web_exec_c.py"
        params = {
            "user_script": code,
            "raw_input_json": "",
            "options_json": json.dumps({
                "cumulative_mode": False,
                "heap_primitives": False,
                "show_only_outputs": False,
                "origin": "opt-frontend.js",
                "cpp_version": "c_gcc9.3.0",
                "fe_disableHeapNesting": True,
                "fe_textualMemoryLabels": False
            }),
            "lang": "c",
            "stdin": "",
            "backend_options_json": "{}",
            "frontend_options_json": "{}",
            "starting_instruction": 0,
            "instruction_limit": 10000,
            "origin": "c"
        }

        try:
            resp = requests.post(url, data=params, timeout=30)
            resp.raise_for_status()
            result = resp.json()
            trace_path.write_text(json.dumps(result, indent=2), encoding="utf-8")
            print(f"   ✅ OK")
        except Exception as e:
            print(f"   ❌ Failed: {e}")


def walk_and_generate(book_root: Path):
    out_root = book_root.parent / "trace"
    out_root.mkdir(parents=True, exist_ok=True)
    for p in book_root.rglob("*"):
        if p.suffix.lower() in {".md", ".html"}:
            handle_file(p, out_root, book_root)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(USAGE)
        sys.exit(1)
    book_root = Path(sys.argv[1]).resolve()
    if not book_root.exists():
        print(f"Book root not found: {book_root}")
        sys.exit(1)

    print(f"Book root: {book_root}")
    print(f"Output root (sibling): {book_root.parent / 'trace'}")
    walk_and_generate(book_root)
    print("\nDone.")