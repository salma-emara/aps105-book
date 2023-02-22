# What are arrays, and how are they stored?

When you declare an array using the C programming language, all the elements in the array are stored contiguously in the main memory.

For example, in the following figure, an array of $3$ elements is stored in the main memory. We can see the addresses of each element is separated by $4$, while we claim that variables are stored contiguously (one after the other). This is because a `int` variable is stored using $4$ bytes. Hence, if `x[0]` is stored at address $72$, it will take address $73$, $74$ and $75$ to store the contents of `x[0]`. Then, `x[1]` will start at address $76$.


```{figure} ./images/array-in-memory.png
:alt: Array in memory.
:width: 500px
:align: center

Array elements are stored contiguously in a the main memory. Since the array is byte addressable, if the address of the first element is $72$, the address of the second element is $4$ bytes after that at $76$. Why $4$ bytes? This is because a `int` variable is stored in $4$ bytes, and if variables will be contiguous, their addresses will be separated by $4$ bytes. 
```

In the figure above, we also say that `x` is not just the identifier of the array, instead it is also a pointer to the first element in the array. This means that `x` is equivalent to `&x[0]`. Hence, if we dereference `x`, we get the first element of the array `*x` $\rightarrow$ `*(&x[0])` $\rightarrow$ `x[0]`.

We can refer to the second element in the array, if we add $1$ to the address of the first element `x`, *i.e.* `x+1` is equivalent to `x[1]`.

The following figure summarizes how can `x` be used as a pointer to different elements in the array.


```{figure} ./images/identifier-pointer.png
:alt: How can we use x to point to elements in the array and access them?
:width: 600px
:align: center

`x` is the identifier of the array, but it can also be used as a pointer to the first element in the array.
```

Given that `x` is a pointer to the first element in the array, we can pass this pointer to a function, and be able to access elements in the array!

## How do we pass an array to a function?

To pass an array to a function, all what you need to do is pass the pointer to the first element of the array. For example, in the following code skeleton, we show how do we pass an array to a function. 

**Code Skeleton**
```{code-block} c
:linenos:
:emphasize-lines: 2, 6, 9
#include <stdio.h>
double f(int []);

int main(void){
    int x[3] = {1, 7, 3};
    double result = f(x);
    return 0;
}
double f(int list[]){
    //statements;
}
```

In line $2$, the input data type is `int []`. This means that when the function is called, the input will be a pointer to the first element in the array, which is also the array identifier.

In line $6$, we pass to the function `f` a pointer to the first element of the array, which is also the array identifier: `f(x)`.

In line $9$, the function header will receive the pointer of the first element in the array in `list`. Since `x` in the `main` function is the pointer to the first element in the array and is the array identifier, `list` is also pointing to the first element in the array and is the array identifier in function `f`.

## Size of array in a function is unknown!

Within the function, we can access elements as we see appropriate. However, the only problem is that within the function `f`, the size of the array `list` is unknown! If we need to loop over all the elements in the array to calculate the sum of the elements, for example, we will not know when to stop incrementing the index. Hence, **we need to pass the size of the array along with the pointer to the first element in the array.** 

**Exercise.** Let's write a program that finds the sum of the elements in an array. The program should call a function to calculate the sum of the elements in an array.

This is similar to finding the average of the elements in an array. 

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 13, 16
#include <stdio.h>

int sumData(int[], const int);

int main(void) {
  const int size = 3;
  int x[size] = {1, 7, 3};
  int result = sumData(x, size);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}

int sumData(int list[], const int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + list[index];
  }
  return sum;
}
```

**Output**
<pre>
Sum of elements in the array: 11.
</pre>

In line $3$, we define the inputs to the function as `int[]`, which is the type of the pointer to the first element in an array and `int`, which is the type of the size of the array.

In line $13$, we receive `x` in `list`, and `size` in `main` as `size` in `sumData`.

In line $16$, we access the elements of `list` array as we would do with arrays normally. **Important:** `list` is pointing towards what `x` is pointing to. Both are pointing to the first element in the array.

## Can I use the pointer syntax too?

Since **array identifiers** are also **pointers**, is it possible to index elements in the array using pointers instead of `[]`? Yes, it is possible, and we show below how.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 13, 16
#include <stdio.h>

int sumData(int*, int);

int main(void) {
  const int size = 3;
  int x[size] = {1, 7, 3};
  int result = sumData(x, size);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}

int sumData(int* list, int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + *(list + index);
  }
  return sum;
}
```

**Output**
<pre>
Sum of elements in the array: 11.
</pre>

In line $3$, we accept `int*` instead of `int[]`, because they are equivalent.

In line $13$, we accept `x` into `int* list`, because they are equivalent. `x` is a pointer and `list` is also a pointer.

In line $16$, we can access elements in the array by adding `i` to the pointer `list` and dereferencing: `*(list + i)`. This is because `*(list + i)` is equivalent to `list[i]`.

````{admonition} Important!
:class: important
The syntax of pointers -- `*` and `&` -- and syntax of arrays -- `[]` are interchangeable. This means that we can use any syntax at any time in our program as long as the statements are correct! For example,

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 3, 4, 14, 15, 18, 19
#include <stdio.h>

// Input is int*
int sumData(int*, int); 

int main(void) {
  const int size = 3;
  int x[size] = {1, 7, 3};
  int result = sumData(x, size);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}

// Input is int[]
int sumData(int list[], const int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    // Index list using pointers
    sum = sum + *(list + index);
  }
  return sum;
}

```
**Output**
<pre>
Sum of elements in the array: 11.
</pre>
````

In line $4$, we define the input as a pointer: `int*`. However, we set the input in the header of the function as `int[]` in line $15$, since `int*` and `int[]` are equivalent. Similarly, in line $19$, we index in the array list as `*(list + index)`, since it is equivalent to `list[i]`.

## Are we passing the array by value or by pointers?

When we pass arrays to functions, we are technically passing a pointer to the first element in the array. To better visualize passing an array to a function, watch the following video.

{{ video_embed | replace("%%VID%%", "Luv5BpoVHiE")}}

This means that any changes in the array in the function will be reflected in the `main` or caller function. For example, let's write a function that swaps the elements at `i` and index `j` in an array. We will write a function named `swap` that takes in the array as `int list[]`, and the two indices of the elements we want to swap: `int i` and `int j`.

We also implement a function that prints the elements of the array. It takes in the array as `int list[]` and the size of the array as `const int size`.

In the following code, we print the array `x` before and after calling the function `swap` to swap the element at index `i = 0` with element at index `j = 4`. 

**Code**
```{code-block} c
#include <stdio.h>

void swap(int[], int, int);
void printArray(int[], const int);

int main(void) {
  const int size = 5;
  int x[size] = {3, 5, 8, 1, 7};
  printf("Before swapping: ");
  printArray(x, size);
  swap(x, 0, 4);
  printf("After swapping: ");
  printArray(x, size);
  return 0;
}

void swap(int list[], int i, int j) {
  int temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

void printArray(int list[], const int size) {
  for (int index = 0; index < size; index++) {
    printf("%d ", list[index]);
  }
  printf("\n");
}

```

**Output**
<pre>
Before swapping: 3 5 8 1 7 
After swapping: 7 5 8 1 3
</pre>

As observed, since we are passing to `swap` the pointer to the first element in the array, any change to the array in the function is also reflected in the caller function.