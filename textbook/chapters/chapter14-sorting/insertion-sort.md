# Insertion Sort

The first sorting algorithm we discuss is insertion sort. Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort. However, it is an excellent algorithm for learning about sorting and is often used to sort small lists or arrays.

## Algorithm

The general idea of insertion sort is to iterate through the array, and insert each element into its correct position with respect to the elements that have already been sorted. For example, if the only the first 3 elements of the array are sorted, the forth element will be inserted into its correct position with respect to the first 4 elements. This happens by by shifting all elements that are greater than the forth element to the right, and inserting `A[top]` in place of the left most element greater than forth element. This places the forth element in its correct position with respect to the first four elements.

Given the following example array named `int A[] = {9, 2, 6, 5, 1, 7};`

```{figure} ./images/array-example.png
:alt: array-example
:width: 400px
:align: center
```

Insertion sort works as follows:
1. Insert the second element into it's correct position, with respect to the first two elements.

    ```{figure} ./images/first-two-elements-insert.png
    :alt: first-two-elements-insert
    :width: 600px
    :align: center
    ```

    After the first iteration, the first two elements --- as a sub-array --- are sorted.

2. Insert the third element into it's correct position, with respect to the first three elements.

    ```{figure} ./images/first-three-elements-insert.png
    :alt: first-three-elements-insert
    :width: 600px
    :align: center
    ```

    After the second iteration, the first three elements --- as a sub-array --- are sorted.

3. Insert the fourth element into it's correct position, with respect to the first four elements. This happens by **shifting all elements that are greater than `A[top]` to the right**, and insert `A[top]` in its correct position with respect to the first 4 elements.

    ```{figure} ./images/first-four-elements-insert.png
    :alt: first-four-elements-insert
    :width: 600px
    :align: center
    ```

    After the third iteration, the first four elements --- as a sub-array --- are sorted.

4. Insert the fifth element into it's correct position, with respect to the first five elements by shifting all elements that are greater than `A[top]` to the right, and inserting `A[top]` in place of the left most element greater than `A[top]`. This places `A[top]` in its correct position with respect to the first 5 elements.

    ```{figure} ./images/first-five-elements-insert.png
    :alt: first-five-elements-insert
    :width: 600px
    :align: center
    ```

    After the fourth iteration, the first five elements --- as a sub-array --- are sorted.

5. Do the same as step 4, but with the sixth element.

    ```{figure} ./images/first-six-elements-insert.png
    :alt: first-six-elements-insert
    :width: 600px
    :align: center
    ```

    After the fifth iteration, the first six elements --- as a sub-array --- are sorted.


To implement insertion sort, we need to keep track of the index of the element that is currently being inserted into its correct position. This index is called `top`. We also need to keep track of the index of the element that is currently being compared to `A[top]`. This index is called `ind`. We also need to keep track of the value of `A[top]` so that we can insert it into its correct position. This value is called `item`.

## Pseudocode

We write pseudocode for insertion sort as follows:

1. Set `top` to `1`, 
2. Set `item` to `A[top]`, and `ind` to `top`.
3. If `item` is smaller than `A[ind - 1]`, then set `A[ind]` to `A[ind - 1]` and decrement `ind`. 
4. Repeat 3 until `ind` is `0` or when `item` is no longer smaller than `A[ind - 1]`. This shifts all elements that are greater than `item` to the right.
5. Now, chose the correct position for `item` by setting `A[ind]` to `item`.
6. In the next iteration, set `top` to `top + 1`, set `item` to `A[top]`, and `ind` to `top`.
7. Repeat 3-6 until `top` is equal to `listLength`.

## Implementation

The following code snippet shows the insertion sort function.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output='After iteration 1: 2 9 6 5 1 7<br>After iteration 2: 2 6 9 5 1 7<br>After iteration 3: 2 5 6 9 1 7<br>After iteration 4: 1 2 5 6 9 7<br>After iteration 5: 1 2 5 6 7 9<br>1 2 5 6 7 9'>
#include &lt;stdio.h&gt;
void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
<br>
void insertionSort(int A[], int listLength) {
  int top;
<br>
  for (top = 1; top < listLength; top++) {
    int item = A[top];
    int ind = top;
<br>
    while (ind > 0 && item < A[ind - 1]) {
      // shift all elements > item to the right
      A[ind] = A[ind - 1];  
      ind--;
    }
<br>
    A[ind] = item;
    printf("After iteration %d: ", top);
    printArray(A, listLength);
  }
}
<br>
int main(void) {
  int list[] = {9, 2, 6, 5, 1, 7};
<br>
  insertionSort(list, 6);
  printArray(list, 6);
<br>
  return 0;
}
</code-runner>
</pre>

{{quiz_embed | replace("%%FILENAME%%", "chapter-14/sec-1") }}