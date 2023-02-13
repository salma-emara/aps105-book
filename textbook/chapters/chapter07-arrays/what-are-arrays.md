# What are arrays, and how are the stored?

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

In line $2$, the input data type is `int []`. This means that when the function is called, the input will be a pointer to the first element in the array.

In line $6$, we pass to the function `f` a pointer to the first element of the array, *i.e.* `f(x)`.

In line $9$, the function header will receive the pointer of the first element in the array as `list`.

Within the function, we can access elements as we see appropriate. However, the only problem is that within the function `f`, the size of the array `list` is unknown! If we need to loop over all the elements in the array to calculate the sum of the elements, for example, we will not know when to stop incrementing the index. Hence, **we need to pass the size of the array along with the pointer to the first element in the array to a function.** 

**Exercise.** Let's write a program that finds the sum of the elements in an array. The program should call a function to calculate the sum of the elements in an array.

This is similar to finding the average of the elements in an array. 

**Code**
```{code-block} c
#include <stdio.h>

int sumData(int[], int);
// OR int sumData(int*, int);

int main(void) {
  const int size = 3;
  int x[size] = {1, 7, 3};
  int result = sumData(x, size);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}

int sumData(int list[], int size) {
  // OR int sumData(int *list, int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + list[index];
    // OR sum = sum + *(list + index);
  }
  return sum;
}
```

