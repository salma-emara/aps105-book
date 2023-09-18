# Selection Sort

Selection sort is a simple sorting algorithm that finds the minimum or maximum element from the unsorted part of the list and swap it with the last element of the unsorted part. It is much less efficient on large lists than more advanced algorithms such as quicksort. 

## Algorithm

For sorting in ascending order, the general idea of selection sort is to iterate through the array, and find the maximum element from the unsorted part of the list, which is initially the entire array, then swap it with the last element of the unsorted array. This makes the last element of the array sorted, and the remaining elements of the array unsorted. The process repeats till the entire array gets sorted. 

For example, if only the last 3 elements of the array are sorted holding the maximum 3 numbers of the array, we will look at the maximum number in the remaining of the array excluding the last 3 elements. This element will be swapped with the last element from the unsorted array, excluding the last 3 elements. This makes the last 4 elements of the array sorted, and holding the maximum 4 numbers of the entire array. 

Given the following example array named `int A[] = {9, 5, 18, 8, 5, 2};`

```{figure} ./images/selection-sort-example.png
:alt: selection-sort-example
:width: 400px
:align: center
```

Selection sort works as follows:

1. Find the maximum element from the unsorted part of the array, which is initially the entire array. Then swap it with the last element.

    ```{figure} ./images/selection-sort-first-iteration.png
    :alt: selection-sort-first-iteration
    :width: 600px
    :align: center
    ```

    After the first iteration, the last element of the array --- as a sub-array --- is sorted, and is holding the maximum element of the array.

2. Find the maximum element from the unsorted part of the array, which is the remaining of the array excluding the last element. Then swap it with the last element of the unsorted array. `top` is holding the index of the last element of the unsorted array.

    ```{figure} ./images/selection-sort-second-iteration.png
    :alt: selection-sort-second-iteration
    :width: 800px
    :align: center
    ```

    After the second iteration, the last two elements of the array --- as a sub-array --- are sorted, holding the maximum two elements of the array.

3. If the largest element is also the last element in the unsorted sub-array, we swap the element with itself. After that, the last three elements of the array --- as a sub-array --- are sorted, holding the maximum three elements of the array.

    ```{figure} ./images/selection-sort-third-iteration.png
    :alt: selection-sort-third-iteration
    :width: 600px
    :align: center
    ```

The process repeats till the entire array gets sorted.

```{figure} ./images/selection-sort-forth-iteration.png
:alt: selection-sort-forth-iteration
:width: 600px
:align: center
```

```{figure} ./images/selection-sort-fifth-iteration.png
:alt: selection-sort-fifth-iteration
:width: 600px
:align: center
```

## Pseudocode

We write pseudocode for selection sort as follows:

1. Set `top` to `n - 1`, where `n` is the length of the array.
2. Iterate elements from index `0` to `top` to find the largest element and place its index in `indexOfLargest`
3. Swap element at index `top` with element at index `indexOfLargest`. This places the largest element at the end of the unsorted sub-array.
4. Decrement `top` by `1`.
5. Repeat steps 2 to 4 till `top` is `0`.

## Implementation

We implement selection sort as follows. In lines $8$ to $12$, we implement the swap function that swaps two `int` values. We implemented the swap function before in {numref}`swap-function`. Download {download}`selection-sort.c <../../code/chapter14/selection-sort/selection-sort.c>` if you want to play with the code.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="9 10 11 12 13" output='After iteration 1: 9 5 2 8 5 18<br>After iteration 2: 5 5 2 8 9 18<br>After iteration 3: 5 5 2 8 9 18<br>After iteration 4: 2 5 5 8 9 18<br>After iteration 5: 2 5 5 8 9 18<br>2 5 5 8 9 18'>
#include &lt;stdio.h&gt;
void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
<br>
void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}
<br>
void selectionSort(int list[], int n) {
  for (int top = n - 1; top > 0; top--) {
    // find largest from 0 to top
    int indexOfLargest = 0;
    for (int i = 1; i <= top; i++) {
      if (list[i] > list[indexOfLargest]) {
        indexOfLargest = i;
      }
    }
    // put largest at top
    swap(&list[indexOfLargest], &list[top]);
    printf("After iteration %d: ", n - top);
    printArray(list, 6);
  }
}
<br>
int main(void) {
  int list[] = {9, 5, 18, 8, 5, 2};
  selectionSort(list, 6);
  printArray(list, 6);
}
</code-runner>
</pre>

{{quiz_embed | replace("%%FILENAME%%", "chapter-14/sec-2") }}