# How do we pass an array to a function?

To pass an array to a function, all what you need to do is pass the pointer to the first element of the array. For example, in the following code skeleton, we show how do we pass an array to a function.

**Code Skeleton**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="2 6 9">
&#35;include &lt;stdio.h&gt;
double f(int []);
<br>
int main(void){
  int x[3] = {1, 7, 3};
  double result = f(x);
  return 0;
}
double f(int list[]){
  //statements;
}
</code-runner>
</pre>

In line $2$, the input data type is `int []`. This means that when the function is called, the input will be a pointer to the first element in the array, which is also the array identifier.

In line $6$, we pass to the function `f` a pointer to the first element of the array, which is also the array identifier: `f(x)`.

In line $9$, the function header will receive the pointer of the first element in the array in `list`. Since `x` in the `main` function is the pointer to the first element in the array and is the array identifier, `list` is also pointing to the first element in the array and is the array identifier in function `f`.

## Size of array in a function is unknown!

Within the function, we can access elements as we see appropriate. However, the only problem is that within the function `f`, the size of the array `list` is unknown! If we need to loop over all the elements in the array to calculate the sum of the elements, for example, we will not know when to stop incrementing the index. Hence, **we need to pass the size of the array along with the pointer to the first element in the array.** 

**Exercise.** Let's write a program that finds the sum of the elements in an array. The program should call a function to calculate the sum of the elements in an array.

This is similar to finding the average of the elements in an array. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="3 12 15" output="Sum of elements in the array: 11.">
&#35;include &lt;stdio.h&gt;
<br>
int sumData(int[], const int);
<br>
int main(void) {
  int x[3] = {1, 7, 3};
  int result = sumData(x, 3);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}
<br>
int sumData(int list[], const int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + list[index];
  }
  return sum;
}
</code-runner>
</pre>

In line $3$, we define the inputs to the function as `int[]`, which is the type of the pointer to the first element in an array and `int`, which is the type of the size of the array.

In line $13$, we receive `x` in `list`, and `size` in `main` as `size` in `sumData`.

In line $16$, we access the elements of `list` array as we would do with arrays normally. **Important:** `list` is pointing towards what `x` is pointing to. Both are pointing to the first element in the array.

## Can I use the pointer syntax too?

Since **array identifiers** are also **pointers**, is it possible to index elements in the array using pointers instead of `[]`? Yes, it is possible, and we show below how.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="3 12 15" output="Sum of elements in the array: 11.">
&#35;include &lt;stdio.h&gt;
<br>
int sumData(int*, int);
<br>
int main(void) {
  int x[3] = {1, 7, 3};
  int result = sumData(x, 3);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}
<br>
int sumData(int* list, int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    sum = sum + *(list + index);
  }
  return sum;
}
</code-runner>
</pre>

In line $3$, we accept `int*` instead of `int[]`, because they are equivalent.

In line $13$, we accept `x` into `int* list`, because they are equivalent. `x` is a pointer and `list` is also a pointer.

In line $16$, we can access elements in the array by adding `i` to the pointer `list` and dereferencing: `*(list + i)`. This is because `*(list + i)` is equivalent to `list[i]`.

````{admonition} Important!
:class: important
The syntax of pointers -- `*` and `&` -- and syntax of arrays -- `[]` are interchangeable. This means that we can use any syntax at any time in our program as long as the statements are correct! For example,

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper"> <code-runner language="c" highlight-lines="4 14 18" output="Sum of elements in the array: 11.">
&#35;include &lt;stdio.h&gt;
<br>
// Input is int*
int sumData(int*, int); 
<br>
int main(void) {
  int x[3] = {1, 7, 3};
  int result = sumData(x, 3);
  printf("Sum of elements in the array: %d.\n", result);
  return 0;
}
<br>
// Input is int[]
int sumData(int list[], const int size) {
  int sum = 0;
  for (int index = 0; index < size; index++) {
    // Index list using pointers
    sum = sum + *(list + index);
  }
  return sum;
}
</code-runner>
</pre>

In line $4$, we define the input as a pointer: `int*`. However, we set the input in the header of the function as `int[]` in line $15$, since `int*` and `int[]` are equivalent. Similarly, in line $19$, we index in the array list as `*(list + index)`, since it is equivalent to `list[i]`.
````

## Are we passing the array by value or by pointers?

When we pass arrays to functions, we are technically passing a pointer to the first element in the array. To better visualize passing an array to a function, watch the following video.

{{ video_embed | replace("%%VID%%", "Luv5BpoVHiE")}}

This means that any changes in the array in the function will be reflected in the `main` or caller function. For example, let's write a function that swaps the elements at `i` and index `j` in an array. We will write a function named `swap` that takes in the array as `int list[]`, and the two indices of the elements we want to swap: `int i` and `int j`.

We also implement a function that prints the elements of the array. It takes in the array as `int list[]` and the size of the array as `const int size`.

In the following code, we print the array `x` before and after calling the function `swap` to swap the element at index `i = 0` with element at index `j = 4`. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Before swapping: 3 5 8 1 7 
After swapping: 7 5 8 1 3">
&#35;include &lt;stdio.h&gt;
<br>
void swap(int[], int, int);
void printArray(int[], const int);
<br>
int main(void) {
  int x[5] = {3, 5, 8, 1, 7};
  printf("Before swapping: ");
  printArray(x, 5);
  swap(x, 0, 4);
  printf("After swapping: ");
  printArray(x, 5);
  return 0;
}
<br>
void swap(int list[], int i, int j) {
  int temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}
<br>
void printArray(int list[], const int size) {
  for (int index = 0; index < size; index++) {
    printf("%d ", list[index]);
  }
  printf("\n");
}
</code-runner>
</pre>

As observed, since we are passing to `swap` the pointer to the first element in the array, any change to the array in the function is also reflected in the caller function.

{{quiz_embed | replace("%%FILENAME%%", "chapter-7/sec-3") }}