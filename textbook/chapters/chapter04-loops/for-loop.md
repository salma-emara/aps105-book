# For loops

In the previous sections, we discussed how to repeat instructions using while and do-while loops. In this section, we will discuss the for loop.

Recall the example, where we used while and do-while loops to print numbers between $1$ and $3$. In the following code, we highlight the specific structure of the while loop that allows us to go through fixed number of iterations. The structure highlights three features: initialization, condition, and increment.

```{figure} ./images/structure-while.png
:alt: The main features of while loop for fixed number of iterations.
:class: with-shadow
:width: 200px
:align: center

The main features of while loop for fixed number of iterations: initialization, condition, and increment.
```

The pre-mentioned structure is common, so C has a special loop called the **for loop** that allows us to write the same code in a more compact way. The syntax of the for loop is as follows:

```{code-block} c
for (<initialization>;<condition>;<increment>) {
  <statements>;
}
```
