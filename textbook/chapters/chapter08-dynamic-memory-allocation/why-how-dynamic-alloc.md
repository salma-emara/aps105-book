# What is dynamic memory allocation?

Dynamic memory allocation is the allocation of memory space "on the fly" during runtime. The amount of memory to be allocated does not need to be known at compile-time.

For example, as you write a program to get the average grades of a number of students taking a course, you decide to allocate a large-sized array, say `int arr[10000];`. You thought to yourself, "the number of students will not be more than $10,000$." Later, your program was used for APS 105, where we have 441 students, then only the first 441 elements of the $10,000$ element array will be used. In this case, you allocated memory space that was wasted. The real-problem occurs if your program was used for a very large online class with $50,000$ students. Your array will not be able to hold the grades of more than $10,000$.

If you do not know the size of the array when you write a program, you have the following options:

1. **Fixed size array.** Allocate a fixed *very large-sized array*, for example, `int array[10000000]`.
    
    **Problem.** If the size of the array is too large that there is no space in the memory for it, your program will not run, because there was not enough memory reserved for the very large array. 

    To better understand the memory structure, the following figure shows the memory space for your program. It has four main segment. There is a segment that: 
    
    * Stores your code, 

    * Stores the constants and global variables of your program, 
    
    * Stores the dynamically allocated memory, and is called the **heap**, 
    
    * Stores the local variables of a function, and is called the **stack**. The stack is what we have observed throughout this book. It stores the local variables of a function, and if a function calls another function, this is where the local variables of that other function are stored. 
    
    Creating very large arrays will take up a lot of space from the stack, and if the stack was exhausted, you may not be able to create your array or call another function.

    ```{figure} ./images/memory-pieces.png
    :alt: Memory is divided into four main segments.
    :width: 500px
    :align: center

    Main memory reserved for a program is divided into four main segments. There is a place reserved for storing your code, global variables and constants, local variables within functions --- called the **stack**, and dynamically allocated memory --- called the **heap**. 
    ```

    ```{admonition} Fun fact about **Stack overflow**!
    [Stack overflow](https://stackoverflow.com/), which is the name of the popular website for questions and answers on computer programming, was named after a common run-time error called "stack overflow". As the name implies, the error means that the stack memory space is exhausted and there is no more space available in the stack. It usually happens when you keep calling functions within other functions without returning from those functions and exhausting the stack. We will dig deeper into this error when we discuss "recursion".
    ```

2. **Variable size array.** Allocate the array size equal to what the user inputs, which is *variable* every time we run the program.

    We can use the user input as the size of the area. For example,
    ```{code-block} c
    #include <stdio.h>
    int main(void) {
        int size;
        printf("Enter size of array: ");
        scanf("%d", &size);
        int arr[size];
        return 0;
    }
    ```

    **Problem.** However, again the array will be allocated on the stack. This means if the stack does not have enough space, the program will not run as expected. The problem is the same problem with the **fixed size arrays**.

    ```{admonition} Note!
    If the array was created within a function, when the function reaches its end, the array will go out of scope and will no longer exist.
    ```

3. **Dynamically allocate memory for the array.** Allocate the memory dynamically on the **heap**, and check in your program if the memory was dynamically allocated or not.

    This requires using functions from the `stdlib.h`: `malloc` and `free`.

    `malloc` stands for dynamic memory allocation. The prototype of `malloc` is
    ```{code-block} c
    void *malloc(size_t size);
    ```
    malloc takes in as input `size_t size`, which is similar to `int size`, where `size` is the number of byte `malloc` should allocate. `malloc` returns a pointer to the first byte in the array allocated in the heap. We need to *type cast* the return value of `malloc` to the type of the element that it is pointing to. For example to dynamically allocate $5$ elements in an `int` array, do the following:

    ```{code-block} c
    int* myArray = (int*) malloc (5 * sizeof(int));
    ```

    ```{figure} ./images/dynamic-allocation.png
    :alt: Dynamically allocate array.
    :width: 500px
    :align: center

    Dynamically allocate $5$ elements of an `int` array, and `myArray` points to the first element in the array. 
    ```   

    **Good news** is if the `malloc` failed to allocate memory in the heap, it returns `NULL`. Hence, in your code, before using the return value of malloc, check that it did not return `NULL`.

    ```{admonition} Note!
    If the array was dynamically allocated within a function, when the function reaches its end, the array will remain there in the heap. Hence, you need to `free` or deallocate the memory allocated when you are done --- before returning from a function. 
    ```

    To free dynamically allocated memory, you need to use `free` function from `stdlib.h`. The prototype of free is:
    ```{code-block} c
    void free(void *pointer);
    ```

    `free` takes in `void *pointer` which is a pointer having the address of the first element/byte in the dynamically allocated memory that you want to deallocate. After this step, the memory allocated is freed; however, `pointer` will still have the address of the first element in the array. That address could now be used by another program on your computer. To avoid using `pointer` later with the old address it had, it is good practice to set `pointer` to `NULL`.



## How to allocate and deallocate memory dynamically?

In-progress!