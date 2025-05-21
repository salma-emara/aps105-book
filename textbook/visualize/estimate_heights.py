
def get_estimated_height(code):
    line_count = code.count('\n') + 1
    base_height = 300   
    per_line_height = 15
    max_height = 700     

    height = base_height + per_line_height * line_count
    return min(height, max_height)