# How do we pass a 2D array to a function?

When we want to pass a 2D array to a function, we follow a similar process as with 1D arrays by passing the pointer to the first element in the array. We need to pass the size of the array too, so that the function can use this information as needed. This includes the number of rows and columns of the 2D array.

For example, let's write down a function that receives a pointer to the first element in the 2D array, the number of rows and columns and does not return any values. It only changes the element at row index `4` and column index `5` to `6`.

**Code with <span style="color: red;">Incorrect Syntax</span>**

```{code-block} c
:emphasize-lines: 2
void func(int arr2D[][], int rows, int cols){
    arr2D[4][5] = 6; 
    // should go dereference the address:
    // arr2D + row (= 4) * number of columns + col (= 5)
    // the number of columns is unknown!!!
}
```

The problem is that to access any element in the 2D array using the pointer to the first element in the array, we need the number of columns. For example, to access `arr2D[4][5]` we need to dereference the address `arr2D` $+\mbox{ }4 \times \mbox{number of columns} + 5$.

The correct syntax requires that you specify the number of columns in the second dimension of `arr2D` as follows:

**Code with <span style="color: DarkKhaki;">Partially Correct Syntax</span>**

```{code-block} c
:emphasize-lines: 1
void func(int arr2D[][cols], int rows, int cols){
    arr2D[4][5] = 6; 
    // should go dereference the address:
    // arr2D + row (= 4) * cols + col (= 5)
}
```

The remaining problem is that `cols` is used in `int arr2D[][cols]` before it is defined in the function header.

**Code with <span style="color: green;">Correct Syntax</span>**

```{code-block} c
:emphasize-lines: 1
void func(int rows, int cols, int arr2D[][cols]){
    arr2D[4][5] = 6; 
    // should go dereference the address:
    // arr2D + row (= 4) * cols + col (= 5)
}
```


## Exercise

Let's write a program that uses a function to sum all elements of a 2D array. 

**Code**

{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c"  highlight-lines="3 7 11 15">
#include &lt;stdio.h&gt;
<br>
int sum2DArr(int rows, int cols, int arr2D[][cols]);
<br>
int main(void) {
  int arr2D[3][4] = {{2, 3, 1, 12}, {3, 8, 7, 10}, {8, 1, 0, 2}};
  sum2DArr(3, 4, arr2D);
  return 0;
}
<br>
int sum2DArr(int rows, int cols, int arr2D[][cols]) {
  int sum = 0;
  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      sum += arr2D[row][col];
    }
  }
  return sum;
}
</code-runner>
</pre>

In line $3$, we write the function prototype such that `int arr2D[][cols]` has the number of columns defined and `cols` is defined before used in `int arr2D[][cols]`.

In line $7$, `sum2DArr(3, 4, arr2D);` $3$ is passed to rows and $4$ is passed to columns in `sum2DArr` function, and `arr2D` as a pointer to the first element in the 2D array is passed to `arr2D` pointer in `sum2DArr` function.

In line $11$, has the function header the same as the function prototype.

In line $15$, we access the elements in the 2D array as we do with any other 2D array.

{{quiz_embed | replace("%%FILENAME%%", "chapter-9/sec-2") }}