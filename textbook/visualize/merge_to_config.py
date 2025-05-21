import yaml

input_path= "textbook/visualize/generated_iframes.yml"
output_path = "textbook/_config.yml"

with open(output_path, "r", encoding="utf-8") as f:
    config = yaml.safe_load(f)

with open(input_path, "r", encoding="utf-8") as f:
    iframe_data = yaml.safe_load(f)

# Get the existing myst_substitutions from the config file
original_subs = config.get("parse", {}).get("myst_substitutions", {})
generated_subs = iframe_data.get("myst_substitutions", {})


# Remove all old visualize_embed_ variables to avoid duplicates
cleaned_subs = {
    k: v for k, v in original_subs.items()
    if not k.startswith("visualize_embed_")
}

# Merge the new iframe substitution variables into the cleaned substitution
cleaned_subs.update(generated_subs)

config.setdefault("parse", {})["myst_substitutions"] = cleaned_subs

with open(output_path, "w", encoding="utf-8") as f:
    yaml.dump(config, f, sort_keys=False, allow_unicode=True)
    print("Merge successfully")
    