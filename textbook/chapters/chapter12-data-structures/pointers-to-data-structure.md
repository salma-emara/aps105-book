# Pointers to Data Structures

## Access members of data structures through pointers

We can have pointers to declared variables of data structures. For example, in the following code, we define a data structure `struct Neuron`, and create an alias for it named `Neuron`. 

Then, we declare a variable `neuron` of type `Neuron`, and a pointer `pNeuron` of type `Neuron *`. The address of `neuron` is assigned to `pNeuron`. The following figure shows the code, the memory layout, and the output.

**Code**
```{figure} ./images/pointers-to-struct.png
:alt: Pointers to data structures
:width: 600px
:align: center
:name: pointers-to-struct

Pointers to data structures.
```
**Output**
<pre>
neuron.input = 7.94
(*pNeuron).input = 7.94
</pre>

````{admonition} Arrow operator vs. dereference operator and dot operator
:class: important
There are two ways to access the members of a data structure through a pointer. The first way is shown in {numref}`pointers-to-struct`, where we dereference `pNeuron` which is a pointer to `neuron`, then use the dot operator as usual to access the members in `neuron`.

```{code-block} c
(*pNeuron).input = 7.94;
```

The second way is where we use the arrow operator `->` to access the members of `neuron` through `pNeuron`. This is equivalent to `(*pNeuron).input`.

```{code-block} c
pNeuron->input = 7.94; // equivalent to (*pNeuron).input = 7.94;
```
````

## Dynamic memory allocation of data structures

We can also dynamically allocate memory for data structures. For example, we can allocate memory for a data structure `Neuron` using the `malloc` function. The following figure shows the code, the memory layout, and the output. Download the code {download}`dynamic-mem-data-struct.c <../../code/chapter12/dynamic-mem-data-struct/dynamic-mem-data-struct.c>` if you want to play with it.

**Code**
```{figure} ./images/dynamic-data-struct.png
:alt: Dynamic memory allocation of data structures
:width: 600px
:align: center
:name: dynamic-data-struct

Dynamic memory allocation of data structures.
```
**Output**
<pre>
pNeuron->input = 23.96
</pre>

In the above example, the memory allocation happens on the heap through this expression `(Neuron *)malloc(sizeof(Neuron))`. `malloc` function returns the address of that allocated space on the heap. `pNeuron` then holds the address of that allocated space. We can then access the members of the data structure through `pNeuron`.

Using `pNeuron -> input` is equivalent to `(*pNeuron).input`. This accessed `input` member of the dynamically allocated data structure on the heap. In the above example, we set `pNeuron -> input` to `23.96`.

When we are done with the dynamically allocated data structure, we can free the memory using the `free` function as we show in the above example.

The benefits/usage of data structures in solving problems will all be discussed in the next chapter on linked lists, and again in the last chapter on binary search trees.

{{quiz_embed | replace("%%FILENAME%%", "chapter-12/sec-2") }}