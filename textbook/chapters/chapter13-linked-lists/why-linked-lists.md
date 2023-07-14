# Why linked lists?

Let's say we want to store a list of numbers that can decrease or increase. We decide to store the list in an array as follows:

```{code-block} c
int array[4] = {1, 4, 7};
```

```{figure} ./images/array.png
:alt: An array with 3 elements, and one place left for a new element
:width: 400px
:align: center
```

To add a new number to the array between two numbers, we can move all numbers on the left by one place and place our new number as follows:
```{figure} ./images/array-add.png
:alt: Inserting an element in an array 
:width: 400px
:align: center
```

To delete a number from the array, we can move all numbers on the right by one place to the left to overwrite the number to be deleted as follows:
```{figure} ./images/array-delete.png
:alt: Deleting an element from an array
:width: 400px
:align: center
```

To insert more numbers that the array size can handle, we have to create a new array, move all numbers to the new array, and then add the new numbers to the array as follows:
```{figure} ./images/array-extend.png
:alt: Extending an array
:width: 600px
:align: center
```

However, these operations are all **inefficient**. The operations require us to move all elements or some to the right or left by one place or to a new array. Arrays are not flexible when it comes to changing the array, because the array elements are stored contiguously -- next to each other -- in the memory. For example, in the case of adding an element in the array, it would have been easier if we can just add the element in the middle without moving the elements to the right.

In the figure below, we broke down the elements of the array into pieces to form a **list** of numbers. Each piece is stored any where in the memory (not contiguously as in arrays). We can add a new element in the middle of two elements by just adding the new element in the middle of the two pieces. This is much easier than moving all elements to the right by one place. 

```{figure} ./images/add-elements-easily.png
:alt: Inserting an element in the middle of two elements
:width: 400px
:align: center
```

In order to maintain the order of the elements, we need to have links between them to determine the first, last (and everything in between) elements . For example, links between all pieces of our array can look as shown in the figure below.

```{figure} ./images/link-elements.png
:alt: Links between elements
:width: 400px
:align: center
```

We can now add a new element in the middle of two elements by changing the links to include the new element as shown in the figure below. This is much easier than moving all elements to the right by one place.

```{figure} ./images/add-node-list.png
:alt: Inserting an element in the middle of two elements
:width: 400px
:align: center

Deleting an element from the list can be easily done by changing the links as shown in the figure below. This is much easier than moving all elements to the left by one place.

```{figure} ./images/delete-node-list.png
:alt: Deleting an element from a list
:width: 400px
:align: center
```

Extending the list can also be easy by adding a new list to the end of the current list as shown in the figure below. This is much easier than moving all elements to a new array.

```{figure} ./images/extend-list.png
:alt: Extending a list
:width: 600px
:align: center
```

This list of numbers that we linked is called a **linked list**. It is more flexible to add new elements, delete elements, and extend the list than arrays. We will discuss how to implement a linked list in C in the next section.

{{quiz_embed | replace("%%FILENAME%%", "chapter-13/sec-1") }}

