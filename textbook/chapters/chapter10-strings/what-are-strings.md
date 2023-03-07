# What are strings?

In C programming language, there is no data type that stores a word/sentence. Instead, we use **strings** to store a word or sentence. We did see strings before when we used to print sentences and words using `printf`. For example, in the `printf` statement below, `"Hello world!\n"` is a string.

```{code-block} c
printf("Hello world!\n");
```

Notice that words/sentences are enclosed between double-quotes: `"<words/sentences>"`.

## Store a String

To store, a **string** in a variable, we use an array of characters that is *"null-terminated"*. This means that the string is stored in a **special** array of characters that stores the word/s, and the last character is a null character. A null character is `\0`. It has an ASCII code of $0$. This means that `\0` is encoded using ASCII code to be stored in the main memory as $0$. You may refer to [Chapter 2: Section 2.2.3](characters-ascii) to refresh your memory on ASCII code. 

There are three ways we can set up a string in a null-terminated array of characters.

### Method 1: Declare and Initialize

To declare a 1D array of characters, and initialize its elements to `'H'`, `'e'`, `'l'`, `'l'`, `'e'` and finally a `'\0'`, we can do the following.

```{code-block} c
char myString[] = "Hello";
```

The statement will make `myString` array have $6$ elements, where the first $5$ elements store the characters in `"Hello"`, and the last element stores `'\0'` as shown in the figure.

```{figure} ./images/hello-null.png
:alt: Declare and initialize an array
:width: 400px
:align: center
:name: hello-null

Declare and initialize a null-terminated array of characters --- a string.
```

Although it is unnecessary to define the size of the 1D array when we declare **and initialize** it, we can still define the size as in the following statement.

```{code-block} c
char myString[5 + 1] = "Hello";
```

Notice here that we defined a size of $6$ elements although `"Hello"` has $5$ characters. This is because we want to leave an extra element for the null character.

````{note}
We can have the size of the array to be greater than the number of characters $+1$, for example $8$ in the following statement,  

```{code-block} c
char myString[8] = "Hello";
```

This will set the extra two characters to null `'\0'` as shown in the figure below.

```{figure} ./images/hello-8-elements.png
:alt: Declare and initialize an array
:width: 400px
:align: center
:name: hello-8-elements

Extra elements are set to `'\0'` at the time of declaration and initialization of a null-terminated array of characters.
```

````

````{important} 
Like any 1D array, you can change individual elements in a null-terminated array. For example,

```{code-block} c
char myString[] = "Hello";
myString[0] = 'h';
```

```{figure} ./images/lowercase-h.png
:alt: Change upper case `'H'` to lower case `'h'`
:width: 400px
:align: center
:name: lowercase-h

Change upper case `'H'` to lower case `'h'`.
```
````

### Method 2: Declare now and Initialize later

You may declare a 1D array of characters, then change it to a string later in other statements. For example, we can create an array of 4 characters. Then, change this array to store the string `"The"` as shown in the following statements.

```{code-block} c
char myString[4];
myString[0] = 'T';
myString[1] = 'h';
myString[2] = 'e';
myString[3] = '\0';
```

### Method 3: Declare a Pointer Pointing to a Const String

We can declare a pointer of type `(char*)` and initialize it to point to the first character of a **"constant string"** as in the following statement.

```{code-block} c
char* pStr = "Wow";
```

This would create a variable named `pStr` that can hold an address to a character. This same statement creates an array of characters having "Wow" terminated by null in the **constants and global variables** memory segment. We are also setting the address stored in `pStr` to be the address of the first character of the string "Wow".

You can change the address stored in `pStr` to the address of another constant string "Cat" as shown in the following figure.

```{figure} ./images/pointer-to-const-string.png
:alt: Change upper case `'H'` to lower case `'h'`
:width: 600px
:align: center
:name: pointer-to-const-string

Change upper case `'H'` to lower case `'h'`.
```

```{admonition} Cannot Change Individual Elements
You cannot change individual elements in a `const` string.

```

In-progress!
