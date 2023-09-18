# Linear/Sequential Search

Linear search is a very simple search algorithm. It is called linear search because it searches the list in a linear fashion, checking each element in sequence until the desired element is found or until all the elements have been searched and the desired element was not found.

We discuss the algorithm on arrays, but it applies to any data structure. For example, the algorithm can be used to search a linked list.

The algorithm for linear search is as follows:

1. Start at `index = 0` 
2. Check if `list[index] == ` desired element in variable `item`
3. If found, return `index`
4. Otherwise, increment `index` by 1
5. Repeat steps $2$ -- $4$ until `index` is equal to the length of the list (or the element is found)

The algorithm is implemented in the following code snippet:

**Code**
```{code-block} c
:linenos:
:emphasize-lines: 4, 7 
int sequentialSearch(int list[], int listLength, int item) {
  for (int index = 0; index < listLength; index++) {
    if (item == list[index]) {
      return index;
    }
  }
  return -1;
}
```

If `item` is found, the algorithm returns the index of the element in the list in line $4$. If `item` is not found, the algorithm returns `-1` in line $7$.

In the following example, we look for the element 7 in the array. Download the following code {download}`sequential-search.c <../../code/chapter15/sequential-search/sequential-search.c>` if you want to play with it.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output='Found 7 at index 3.'>
&#35;include &lt;stdio.h&gt;
<br>
int sequentialSearch(int list[], int listLength, int item) {
  for (int index = 0; index < listLength; index++) {
    if (item == list[index]) {
      return index;
    }
  }
  return -1;
}
<br>
int main(void) {
  int list[] = {3, 5, 6, 7, 9};
  printf("Found 7 at index %d.\n", sequentialSearch(list, 5, 7));
  return 0;
}
</code-runner>
</pre>

The minimum number of comparisons to find the desired element is 1, and the maximum number of comparisons is the length of the list. The average number of comparisons is $\frac{n}{2}$, where $n$ is the length of the list.

This would mean if I have 1000 elements in my list, the worst case scenario would be 1000 comparisons. If I have 10000 elements in my list, the worst case scenario would be 10000 comparisons. This is not very efficient. Is there a more efficient way to search for a desired element? Yes, there is. We will discuss this in the next section.

{{quiz_embed | replace("%%FILENAME%%", "chapter-15/sec-1") }}