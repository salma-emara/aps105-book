# Quick Sort 

The last sorting algorithm we discuss is quicksort. It is an efficient sorting algorithm that works on the principle of divide-and-conquer. The algorithm divides the array into two sub-arrays, and then recursively sorts (conquers) the sub-arrays. It is "quick" for large arrays compared to other sorting algorithms.

## Algorithm

The general idea of quicksort is based on the observation that if for an element in an array, all the elements to the left of it are smaller than it, and all the elements to the right of it are larger than it, then the element is in its correct position. We call this element the "pivot". This is even if the elements on the right or left are not sorted. For example, in the following figure, 10 is a pivot.

```{figure} ./images/pivot-example.png
:alt: pivot-example
:width: 400px
:align: center
```

The basic idea of quicksort is to pick a number and call it a pivot. This requires rearranging the array such that all elements on the left of the pivot are smaller than it, and all elements on the right of the pivot are larger than it. This is called the partitioning process. 

The elements to the left of the pivot is considered a "left sub-array", and the elements on the right are "right sub-array". The partitioning process is then done recursively for the left and right sub-arrays. This happens until the sub-arrays are of size 1, which means they are sorted.

Given the following example array named `int A[] = {9, 5, 18, 8, 5, 2};`, 

```{figure} ./images/quicksort-array-example.png
:alt: quick-sort-array-example
:width: 400px
:align: center
```

the algorithm works as follows:

1. Pick a pivot element from the array that we will place in its correct position. We can pick the first element. Then, we can start from index `left = 1` and `right = 8`. We will increment `left++` until we find an element that is smaller than the pivot on `A[left]`, and decrement `right--` until we find an element at `A[right]` that is larger than the pivot. In the following example, `left` stops at `1` and `right` stops at `8`.

    ```{figure} ./images/pick-pivot.png
    :alt: pick-pivot
    :width: 600px
    :align: center
    ```

2. We then swap `A[left]` and `A[right]`. This brings the smaller element to the left and the larger element to the right. 

    ```{figure} ./images/first-swap-partition.png
    :alt: first-swap-partition
    :width: 600px
    :align: center
    ```

3. We increment `left` till `A[left] > pivot` and decrement `right` till `A[right] < pivot`. In the following example, `left` stops at `3` and `right` stops at `7`, and we swap `A[left]` and `A[right]`.

    ```{figure} ./images/second-swap-partition.png
    :alt: second-swap-partition
    :width: 600px
    :align: center
    ```

4. We repeat this process and notice elements smaller than the pivot are populating the left and greater than pivot populating the right. `left` stops at `4` and `right` stops at `6`, and we swap `A[left]` and `A[right]`.

    ```{figure} ./images/third-swap-partition.png
    :alt: third-swap-partition
    :width: 600px
    :align: center
    ```

5. We continue this process until `left` surpasses `right`. Notice this happens when `left` is at the element that is greater than the pivot, and `right` should stop at the element that is smaller than the pivot. In the following example, `left` stops at `6` and `right` stops at `5`.

    ```{figure} ./images/left-surpass-right-partition.png
    :alt: fourth-swap-partition
    :width: 600px
    :align: center
    ```

6. When we get `left > right`, we swap `A[right]` with `pivot`. This places the pivot in its correct position. 
    
    ```{figure} ./images/final-swap-partition.png
    :alt: final-swap-partition
    :width: 600px
    :align: center
    ```

7. We then recursively call quicksort, where we continue partitioning, on the left and right sub-arrays. 

    ```{figure} ./images/quicksort-recursive.png
    :alt: quicksort-recursive
    :width: 600px
    :align: center
    ```

For example, if we do the partitioning on the right sub-array, 

- we start with `pivot` as element at index `6`, `left = 7` and `right = 8`.

    ```{figure} ./images/quicksort-right-subarray.png
    :alt: quicksort-right-subarray
    :width: 600px
    :align: center
    ```
- we increment `left` till either `A[left] > pivot` or `left > right`. If `left > right`, we shouldn't decrement `right` till `A[right] < pivot`. In the following example, `left` stops at `9` and `right` remains at `8`.

    ```{figure} ./images/quicksort-right-subarray-left.png
    :alt: quicksort-right-subarray-left
    :width: 600px
    :align: center
    ```

- we then have to swap `A[right]` and `pivot`. This places the pivot in its correct position. 

    ```{figure} ./images/quicksort-right-subarray-swap.png
    :alt: quicksort-right-subarray-swap
    :width: 600px
    :align: center
    ```
- we then recursively call quicksort on the left and right sub-arrays, but there is no right sub-array, so we only call quicksort on the left sub-array.

    ```{figure} ./images/quicksort-right-subarray-recursive.png
    :alt: quicksort-right-subarray-recursive
    :width: 600px
    :align: center
    ```

## Pseudocode

We write divide the pseudocode for quicksort into two function. The first function is the partitioning function, which takes in the array, the `left` index, and the `right` index. 

1. Set `pivotInd` to `left` holding the index of the pivot element.
2. Set `left` to `left + 1` to start from the next element.
3. Increment `left` till `A[left] > pivot` or `left > right`.
4. Decrement `right` till `A[right] < pivot` or `left > right`.
5. If `left < right`, swap `A[left]` and `A[right]`.
6. Otherwise, swap `A[right]` and `A[pivotInd]`.
7. Repeat steps 3-6 until `left > right`.

The second function is the quicksort function, which takes in the sub-array, with the low and high index, holding the left most index of the sub-array and the rightmost index of the sub-array, respectively.

1. If `low < high`, call the partitioning function on the sub-array from index `low` to `high`, and there `left` will be set to `low` and `right` will be set to `high`.
2. Partitioning function returns the index of the pivot element, which we will call `pivotInd`.
3. Call quicksort on the left sub-array from `low` to `pivotInd - 1`.
4. Call quicksort on the right sub-array from `pivotInd + 1` to `high`.

## Implementation

The following code snippet shows the implementation of partition and quicksort sort functions. Download {download}`quicksort.c <../../code/chapter14/quicksort/quicksort.c>` if you want to play with the code.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output='left = 1, right = 8<br>3 4 8 9 6 10 20 13 14<br>left = 1, right = 4<br>3 4 8 9 6 10 20 13 14<br>left = 2, right = 4<br>3 4 8 9 6 10 20 13 14<br>left = 3, right = 4<br>3 4 6 8 9 10 20 13 14<br>left = 7, right = 8<br>3 4 6 8 9 10 14 13 20<br>left = 7, right = 7<br>3 4 6 8 9 10 13 14 20<br>3 4 6 8 9 10 13 14 20'>
&#35;include &lt;stdbool.h&gt;
&#35;include &lt;stdio.h&gt;
<br>
void swap(int list[], int left, int right) {
  int t = list[right];
  list[right] = list[left];
  list[left] = t;
}
<br>
void printArray(int list[], int listLength) {
  for (int i = 0; i < listLength; i++) {
    printf("%d ", list[i]);
  }
  printf("\n");
}
<br>
int partition(int list[], int low, int high) {
  int pivot = low, left = low + 1, right = high;
  printf("left = %d, right = %d\n", left, right);
  while (true) {
    while (left <= right && list[left] <= list[pivot]) {
      left++;
    }
<br>
    while (left <= right && list[right] > list[pivot]) {
      right--;
    }
<br>
    if (left < right) {
      swap(list, left, right);
    } else {
      swap(list, pivot, right);
      return right;
    }
  }
}
<br>
void quicksortHelper(int list[], int low, int high) {
  if (low < high) {
    int pivot = partition(list, low, high);
<br>
    printArray(list, 9);
<br>
    quicksortHelper(list, low, pivot - 1);
    quicksortHelper(list, pivot + 1, high);
  }
}
<br>
void quicksort(int list[], int length) {     
    quicksortHelper(list, 0, length - 1); 
}
<br>
int main(void) {
  int list[9] = {10, 14, 8, 13, 20, 3, 6, 9, 4};
<br>
  quicksort(list, 9);
  printArray(list, 9);
  return 0;
}
</code-runner>
</pre>








{{quiz_embed | replace("%%FILENAME%%", "chapter-14/sec-4") }}