# Exercises

Many of these exercises are taken from past exams of APS105 Computer Fundamentals courses at University of Toronto. The solutions are provided in the answer boxes.

Headings in this page classify the exercises into different categories: **[Easy]**, **[Intermediate]**, and **[Challenging]**. I suggest you start by easy exercises and work your way up to the challenging ones.

**Question 3 in Winter 2019 Final Exam[Easy]**

The following array of integers is the result of the first round of partitioning, used in the Quicksort algorithm to sort the array in ascending order. Identify the possible array element or elements that could have been used as the pivot in the first partitioning round. Justify your answer; guessing an answer with no justifications will result in a mark of zero. 

```{code-block} c
{15, 6, 45, 60, 32, 71, 102, 81}
```

````{admonition} Answer
:class: dropdown
The pivot is 71, because all elements on its left are smaller than it `{15, 6, 45, 60, 32}`, and all elements on its right are larger then it `{102, 81}`. 
````

**Question 5 in Winter 2019 Final Exam[Easy]**

We have a number of TAs who have carefully marked a large number of final exams and now must sort them alphabetically.

[PLEASE NOTE that this question is not worth many marks, so answer with a phrase! Do not spend time elaborating.]

(a) Here are some sorting methods you know about. Which ones would work well, and which not well to allow the TAs to most quickly sort the exams? Why or why not would the particular method work well or not?

| Method         | OK? | Reason |
| -------------- | --- | ------ |
| Insertion Sort |     |        |
| Selection Sort |     |        |
| Bubble Sort    |     |        |
| Quicksort      |     |        |

````{admonition} Answer
:class: dropdown
| Method         | OK? | Reason                                                                 |
| -------------- | --- | ---------------------------------------------------------------------- |
| Insertion Sort | No  | All TAs have to work on looking for one element to place it at the end |
| Selection Sort | No  | All TAs have to work on looking for one element to place it at the end |
| Bubble Sort    | No  | All TAs have to work on looking for one element to place it at the end |
| Quicksort      | Yes | Each TA can work on groups of exams                                    |
````



(b) What may be a better sorting method?

````{admonition} Answer
:class: dropdown
Each TA takes a stack of exams and sorts into alphabetic piles which are then sorted.
````

**Question 15 in Winter 2018 Final Exam[Intermediate]**

Write a C function called `sortOddEven()` that rearranges the order of the elements in an integer array such that all odd numbers are to the left of all even numbers. The function has two parameters: a pointer to the integer array and an integer specifying the number of elements in the array. The odd numbers can be in any order, as long as they are all to the left of any even number, and the even numbers can be in any order, as long as they are all to the right of any odd number.

For example, if the elements of the array initially are:
<pre>
1 4 6 5 9 3 8 2
</pre>
then after `sortOddEven()` processes the array, the elements may become:
<pre>
1 3 9 5 6 4 8 2
</pre>
Note: In your solution, you may not declare or use another array

````{admonition} Answer
:class: dropdown
Recall partition function from quick sort. We can use the same idea to partition the array into two parts: odd numbers and even numbers. The following code implements the partition function.

```{code-block} c
void sortOddEven(int input[], int size) {
  int left = 0, right = size - 1;
  while (left < right) {
    while (left < right && input[left] % 2 == 1) {
      left++;
    }
    while (left < right && input[right] % 2 == 0) {
      right--;
    }
    if (left < right) {
      int temp = input[left];
      input[left] = input[right];
      input[right] = temp;
    }
  }
}
```
````

**Question 10 in Fall 2015 Final Exam[Intermediate]**

Consider the following `C struct` and `typedef` declarations:

```{code-block} c
struct studentRecord {
  char *name;
  double GPA;
};
```

```{code-block} c
typedef struct studentRecord Record;
```

Write a complete C function `bubbleSortRecords`, for which the prototype is given below, that uses the bubble sort algorithm to sort an array of `n` elements of type `Record`. The function should sort the elements in ascending order of `GPA`, and in the event of a tie, should break ties in alphabetical order of name, where name is a pointer to a string. You may use a function from the string library, `string.h`, in your answer. **Hint:** use the library function to compare two strings.

```{code-block} c
void bubbleSortRecords(Record records[], int n);
```

````{admonition} Answer
:class: dropdown
```{code-block} c
void bubbleSortRecords(Record records[], int n) {
  int i, top;
  top = n - 1;
  while (top > 0) {
    for (i = 0; i < top; i++) {
      if ((records[i].GPA > records[i + 1].GPA) ||
          ((records[i].GPA == records[i + 1].GPA) &&
           (strcmp(records[i].name, records[i + 1].name) > 0))) {
        Record temp = records[i];
        records[i] = records[i + 1];
        records[i + 1] = temp;
      }
    }
    top--;
  }
}
```
````

**Question 13 in Winter 2017 Final Exam[Intermediate]**

Quicksort is considered one of the fastest sorting algorithms in practice. However, it turns out that insertion sort is faster than quicksort for smaller arrays; e.g., for arrays with 10 or fewer elements. Because of this, many implementations use a combination of both algorithms: they use quicksort when the size of the array segment to be sorted is larger than 10, but switch over to insertion sort
when the size of the array segment to be sorted is less than or equal to 10.

Your job is to implement quicksort for an array of `double`s that automatically switches over to insertion sort for the small array segments with less than or equal to 10 elements. To make your job easier, you can assume the following function is available:
```{code-block} c
int selectPivotAndPartition(double list[], int from, int to);
```
This function processes the segment of array `list` from index `from` to index `to`. It selects a pivot in a smart way, and then partitions all elements in the `[from, to]` segment so that all elements less than or equal to pivot are located to the left of the pivot element and all elements greater than or equal to pivot are located to the right of the pivot element. The function then returns the index of the array where the pivot is located. Hence, after you call
```{code-block} c
int pIndex = selectPivotAndPartition(list, from, to);
```
you are guaranteed that

`list[i] <= list[pIndex]` when `from` ≤ `i` ≤ `pIndex`

and

`list[i] >= list[pIndex]` when `pIndex` ≤ `i` ≤ `to`

````{admonition} Answer
:class: dropdown
```{code-block} c
void quickSort(double a[], int from, int to) {
  if (to <= from) return;  // base case
  if (to - from < 10) {    // do insertion sort
    for (int i = from + 1; i <= to; i++) {
      // everything between from and i is sorted
      double temp = a[i];
      int j = i - 1;
      while ((temp < a[j]) && (j >= from)) {
        a[j + 1] = a[j];  // shift element to the right
        j = j - 1;
      }
      a[j + 1] = temp;
    }
  } else {  // do quicksort
    int pIndex = selectPivotAndPartition(a, from, to);
    quickSort(a, from, pIndex - 1);
    quickSort(a, pIndex + 1, to);
  }
}
```
````


**Question 11 in Winter 2019 Final Exam[Challenging]**

In general, the bubble sort algorithm can be explained in two steps.

1. For each pair of adjacent elements: if they are out-of-order, then swap.
2. Repeat the first step until no swaps are done.


Write a function, `bubbleSortLinkedList`, that sorts a linked list using the bubble sort algorithm. The function has one parameter: a pointer to a `LinkedList` (assume that this pointer is not `NULL`). The function will modify the linked list in-place so that the values are in ascending order (i.e., `1` comes before `2`). The definitions for a `LinkedList` and `Node` are shown below.

You must abide by the following constraints. Failure to meet a constraint will result in a grade of zero for this question.
1. Your function must not modify the `next` pointer of any node.
2. You cannot create any other data structures (e.g., an array, another linked list, etc.).
3. Your function cannot call any other functions.
4. Your function must not cause a segmentation fault.

```{code-block} c
typedef struct node {
  int data;
  struct node *next;
} Node;
typedef struct linkedList {
  Node *head;
} LinkedList;
```

````{admonition} Answer
:class: dropdown
```{code-block} c
void bubbleSortLinkedList(LinkedList *list) {
  int numSwaps;
  do {
    numSwaps = 0;
    Node *first = list->head;
    while (first != NULL) {
      Node *second = first->next;
      if (second != NULL && first->data > second->data) {
        int temp = first->data;
        first->data = second->data;
        second->data = temp;
        numSwaps++;
      }
      first = second;
    }
  } while (numSwaps > 0);
}
```
````