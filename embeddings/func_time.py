import time

# Function to measure execution time of a block of code
def time_block(block_name):
    def decorator(func):
        def wrapper(*args, **kwargs):
            start_time = time.time()
            result = func(*args, **kwargs)
            end_time = time.time()
            execution_time = end_time - start_time
            print(f"{block_name} took {execution_time:.4f} seconds")
            return result
        return wrapper
    return decorator

# Example usage
@time_block("Part 1")
def part1():
    # Simulating a time-consuming task
    time.sleep(2)

@time_block("Part 2")
def part2():
    # Simulating another time-consuming task
    time.sleep(3)

if __name__ == "__main__":
    part1()
    part2()