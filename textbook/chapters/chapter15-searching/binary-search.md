# Binary Search

Searching for an element in a sorted array is quick. Think of having a pile of booklets with names sorted in ascending order. Say you want to find the booklet with the name "Snefru". You can start at the middle of the pile and check if the name is "Snefru". If it is, you are done. If it is not, you can check if the name is before or after "Snefru". If it is before, you can discard the second half of the pile. If it is after, you can discard the first half of the pile. You can repeat this process until you find the booklet with the name "Snefru".

This method that we just discussed is called binary search. It is called binary search because it searches the list in a binary fashion, checking the middle element of the list and then discarding **half** of the list based on the result. 

Given an array of seven elements named `list` as shown in the figure below, we want to look for `item` $9$. 

```{figure} ./images/binary-search-array.png
:alt: Binary Search Array
:width: 400px
:align: center
```

The algorithm for binary search is as follows:

1. Define the limits of the array using variables `low` and `high`. We can do so by initially setting `low = 0` and `high = `length of array` - 1`. Since we want to look at the middle element, we can hold its index in `middle = (low + high)/2`. 

    ```{figure} ./images/look-in-middle.png
    :alt: Look in Middle
    :width: 400px
    :align: center
    ```

2. Since the value at index `middle` is not equal to `item`, which is `9`, we need to continue looking for `item`. We can check if `list[middle] < item`. If it is, we can discard the first half of the list. If it is not, we can discard the second half of the list. In our case, `list[middle]` is 7, which is less than `item`, which is `9`. Therefore, we can discard the first half of the list. We can do this by setting `low = middle + 1`. 

    ```{figure} ./images/look-in-right-subarray.png
    :alt: Look in Right Subarray
    :width: 400px
    :align: center
    ```


3. We can repeat step $1$ and $2$ but on the smaller right sub-array until we find `item`. In our case, `low` is `4` and `high` is `6`. This makes `middle = 5`. Since `list[middle]` is `10`, which is less than `item`, which is `9`, next we can discard the second half of the sub-array (after middle). 

    ```{figure} ./images/look-in-middle-of-right-subarray.png
    :alt: Look in Middle of Right Subarray
    :width: 400px
    :align: center
    ```

4. We can discard the second half of the sub-array by setting `high = middle - 1`. After discarding the second half of the array, we have `low = 4` and `high = 4`. This makes `middle = 4`. 

    ```{figure} ./images/look-in-left-subarray.png
    :alt: Look in Left Subarray
    :width: 400px
    :align: center
    ```

5. Since `list[middle]` is `9`, which is equal to `item`, we have found `item` in the array. 

    ```{figure} ./images/look-in-middle-of-left-subarray.png
    :alt: Look in Middle of Left Subarray
    :width: 400px
    :align: center
    ```

````{admonition} When not found!
:class: tip
If `item` in our example was `8`, we would **NOT** have found it at index `4`. However, the algorithm will continue with setting `high = middle - 1`. This would make `high = 3`, and `low` remains `4`. The algorithm should terminate when `low > high`. This means that the algorithm has searched the entire array and has not found `item`. 
````

## Pseudocode

To highlight the main steps of binary search, we can write the algorithm in pseudocode as follows:

1. Set `low = 0` and `high` to the length of the array - 1.
2. Look at the element at index `middle = (low + high)/2`.
3. If the element at index `middle` is equal to `item`, return `middle`.
4. If the element at index `middle` is less than `item`, the `item` could be in the right sub-array. Set `low = middle + 1` to look at the right sub-array and go to step $2$.
5. Otherwise, set `high = middle - 1` to look at the left sub array and go to step $2$.
6. If `low > high`, return `-1` to indicate that `item` was not found.

## Implementation

To implement binary search, we need to write a function that takes in an array, size of the array and an item to search for. The function should return the index of the item if it is found in the array. If the item is not found, the function should return `-1`. Download the following code {download}`binary-search.c <../../code/chapter15/binary-search/binary-search.c>` if you want to play with it.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="17" output='Found 9 at index 4'>
&#35;include &lt;stdio.h&gt;
<br>
int binarySearch(int list[], int listLength, int item) {
  int low = 0;
  int high = listLength - 1;
  int middle;
<br>
  while (low <= high) {
    middle = (low + high) / 2;
    if (item == list[middle])
      return middle;
    else if (item < list[middle])
      high = middle - 1;
    else
      low = middle + 1;
  }
  return -1;
}
<br>
int main() {
  int list[] = {1, 3, 5, 7, 9, 10, 12};
  printf("Found 9 at index %d\n", binarySearch(list, 7, 9));
  return 0;
}
</code-runner>
</pre>
  
In line $17$, we have exited from the while loop. This means that we have searched the entire array and have not found `item`. Therefore, we return `-1` to indicate that `item` was not found.

## Recursive Implementation

We can also implement binary search recursively. 

**Thinking recursively**, as we discussed in {numref}`printRow-recursively`, requires us to think about a smaller problem. In the case of binary search, we can think about the smaller problem of searching a **smaller sub-array**. This would be our recursive case. Our **base/terminating case** is when we have searched the entire array and have or have not found `item`.

How would we reduce the size of the array from one function call to the next recursive function call? We did a similar thing when we implemented isPalindrome function recursively in{numref}`isPalindrome-Recursively`. The idea is to communicate with the next recursive function call the **new limits** of the array, *i.e.* the values of `low` and `high`.

Similarly, in our recursive binary search implementation below, we pass the values of `low` and `high` to the next recursive function call. We can do so by passing the values of `low` and `high` as arguments to the recursive function call.

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 1, 2-3, 6-7, 9-10, 12-13
int binarySearchHelper(int list[], int low, int high, int item) {
  if (high < low)  // failure - item not in list
    return -1;

  int middle = (low + high) / 2;
  if (item == list[middle])  // success
    return middle;

  else if (item < list[middle])  // try bottom half
    return binarySearchHelper(list, low, middle - 1, item);

  else  // try top half
    return binarySearchHelper(list, middle + 1, high, item);
}
```

In line $1$, we pass the array `list`, the values of `low` and `high` and the `item` to search for as arguments to the recursive function call. Initially, we can call the function to set `low` to `0` and `high` to the length of the array - 1.

Lines $2$--$3$ handle the base case. If `high` is less than `low`, we have searched the entire array and have not found `item`. Therefore, we return `-1` to indicate that `item` was not found.

Lines $6$--$7$ handle another base case when we found `item` in the array. If `item` is equal to `list[middle]`, we return `middle` to indicate that we have found `item` in the array.

Lines $9$--$10$ handle the recursive case when `item` is less than `list[middle]`. In this case, we can discard the second half of the array by setting `high = middle - 1` to the next recursive call. We can then call the recursive function to search the left sub-array by `binarySearchHelper(list, low, middle - 1, item)`. The `return` before the recursive function call is important. This ensures that the value returned by the recursive function call is returned by the function. You can drop the `return` statement if it was a `void` function, but since it should return an `int`, we need to **return** the value returned by the recursive function call.

Lines $12$--$13$ handle the recursive case when `item` is greater than `list[middle]`. In this case, we can discard the first half of the array by setting `low = middle + 1` to the next recursive call. We can then call the recursive function to search the right sub-array by `binarySearchHelper(list, middle + 1, high, item)`. 

We can see that the values of `low` and `high` are updated in the recursive function call. This is how we reduce the size of the array from one function call to the next recursive function call.

**Reduce number of arguments** I would like to point out that functions with several arguments passed is not ideal, as someone may forget how to call the recursive function. We can improve this! We can implement a function that takes three arguments, an array, the size of the array and an item to search for. The function can then call the recursive function with the values of `low` and `high` set to `0` and the length of the array - 1, respectively. This is what we do in the following implementation. Download the following code {download}`binary-search-recursive.c <../../code/chapter15/binary-search-recursive/binary-search-recursive.c>` if you want to play with it.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="12 13 14" output='Found 9 in index 4'>
&#35;include &lt;stdio.h&gt;
<br>
int binarySearchHelper(int list[], int low, int high, int item);
int binarySearchRecursive(int list[], int listLength, int item);
<br>
int main(){
    int list[] = {1, 3, 5, 7, 9, 10, 12};
    printf("Found 9 in index %d", binarySearchRecursive(list, 7, 9));
    return 0;
}
<br>
int binarySearchRecursive(int list[], int listLength, int item) {
  return binarySearchHelper(list, 0, listLength - 1, item);
}
<br>
int binarySearchHelper(int list[], int low, int high, int item) {
  if (high < low)  // failure - item not in list
    return -1;
<br>
  int middle = (low + high) / 2;
  if (item == list[middle])  // success
    return middle;
  else if (item < list[middle])  // try bottom half
    return binarySearchHelper(list, low, middle - 1, item);
  else  // try top half
    return binarySearchHelper(list, middle + 1, high, item);
}
</code-runner>
</pre>

In lines $12$--$14$, we call the recursive function `binarySearchHelper` with the values of `low` and `high` set to `0` and the length of the array - 1, respectively. As a developer, you can later just sell this function to your users, and they can call it with just three arguments, an array, size of the array and an item to search for. The function will then call the recursive function with the values of `low` and `high` set to `0` and the length of the array - 1, respectively. 

{{quiz_embed | replace("%%FILENAME%%", "chapter-15/sec-2") }}