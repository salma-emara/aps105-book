# Bubble sort

Bubble Sort is a simple sorting algorithm that works by repeatedly stepping through the list, comparing each pair of adjacent elements and swapping them if they are in the wrong order. The process is repeated until the entire list is sorted. The algorithm gets its name because the smaller elements "bubble" to the top of the list, while the larger elements "sink" to the bottom.

## Algorithm

Bubble sort works as follows:

1. In the first iteration, compare the first element with the second element. If the first element is greater than the second element, swap them. Otherwise, do nothing. Then, compare the second element with the third element. If the second element is greater than the third element, swap them. Otherwise, do nothing. The process repeats till the last element of the array. After the first iteration, the last element of the array is sorted, and is holding the maximum element of the array. We "bubbled" the last element to the end of the array.

    ```{figure} ./images/first-iter-bubble-sort.png
    :alt: first iteration bubble sort
    :width: 600px
    :align: center
    ```

2. In the second iteration, compare the first element with the second element. If the first element is greater than the second element, swap them. Otherwise, do nothing. Then, compare the second element with the third element. If the second element is greater than the third element, swap them. Otherwise, do nothing. The process repeats till the **second** last element of the array. After the second iteration, the last two elements of the array are sorted, holding the maximum two elements of the array.

    ```{figure} ./images/second-iter-bubble-sort.png
    :alt: second iteration bubble sort
    :width: 600px
    :align: center
    ```

3. In the third iteration, compare the first element with the second element. If the first element is greater than the second element, swap them. Otherwise, do nothing. The process repeats till the **third** last element of the array. After the third iteration, the last three elements of the array are sorted, holding the maximum three elements of the array. In our example, this is the last iteration because the array has only four elements. Hence, the maximum number of iterations is the size of the array minus one.

    ```{figure} ./images/third-iter-bubble-sort.png
    :alt: third iteration bubble sort
    :width: 600px
    :align: center
    ```

**Save iterations.** To save iterations, we can stop the algorithm if the array is already sorted at any point in time. We can do this by keeping track of whether a swap has occurred in the current iteration. If no swap has occurred, we can stop the algorithm.

## Pseudocode

We write pseudocode for bubble sort as follows:

1. Set `top` to `n - 1`, where `n` is the size of the array.
2. Set index `ind` to `0`.
3. Set `sorted` to `false`.
4. Compare the element at index `ind` with the element at index `ind + 1`. If the element at index `ind` is greater than the element at index `ind + 1`, swap them. If we swap, this means the array wasn't sorted and their were two elements out of order, so we set `sorted` to `false`. Otherwise, do nothing.
5. Increment `ind` by `1`.
6. Repeat steps $4$ and $5$ until `ind` is equal to `top`.
7. If `sorted` is `true`, stop the algorithm. Otherwise, set `top` to `top - 1` and go to step $2$.

## Implementation

We implement bubbble sort as follows. In lines $1$ to $5$, we implement the swap function that swaps two `int` values. We implemented the swap function before in {numref}`swap-function`. Download {download}`bubble-sort.c <../../code/chapter14/bubble-sort/bubble-sort.c>` if you want to play with the code.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight="1 2 3 4 5" output='After iteration 1: 2 3 1 5<br>After iteration 2: 2 1 3 5 <br>After iteration 3: 1 2 3 5<br>1 2 3 5'>
#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;
void swap(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}
<br>
void printArray(int list[], int n) {
  for (int i = 0; i < n; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
<br>
void bubbleSort(int list[], int n) {
  bool sorted = false;
<br>
  for (int top = n - 1; top > 0 && !sorted; top--) {
    sorted = true;
    for (int i = 0; i < top; i++) {
      if (list[i] > list[i + 1]) {
        swap(&list[i], &list[i + 1]);
        sorted = false;
      }
    }
    printf("After iteration %d: ", n - top);
    printArray(list, n);
  }
}
<br>
int main(void) {
  int list[4] = {2, 5, 3, 1};
<br>
  bubbleSort(list, 4);
  printArray(list, 4);
  return 0;
}
</code-runner>
</pre>

{{quiz_embed | replace("%%FILENAME%%", "chapter-14/sec-3") }}