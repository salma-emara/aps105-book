# What are strings?

In C programming language, there is no data type that stores a word/sentence. Instead, we use **strings** to store a word or sentence. We did see strings before when we used to print sentences and words using `printf`. For example, in the `printf` statement below, `"Hello world!\n"` is a string.

```{code-block} c
printf("Hello world!\n");
```

Notice that a string is enclosed between double-quotes: `"<string>"`.


To store, a **string** in a variable, we use an array of characters that is *"null-terminated"*. This means that the string is not any array of characters. It is the array of characters that has the last element as a null character. A null character is `\0`. It has an ASCII code of $0$. This means that `\0` is encoded using ASCII code to $0$ to be stored in the main memory as $0$. You may refer to [Chapter 2: Section 2.2.3](characters-ascii) to refresh your memory on ASCII code. 

There are three ways we can set up a string in a null-terminated array of characters.

## Declare and Initialize

In-progress!