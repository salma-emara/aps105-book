# Data types and representation

Different data types are stored differently in the memory, i.e. different variable types use different amounts of memory.

## Integers

`int` are stored using 32 bits, and as we mentioned in {ref}`memory-organization`, each cell in the memory stores a byte. Hence, `int` variables use 4 bytes/cells of memory.

31 of the bits are used to represent the integer itself and 1 bit is representing the sign. The sign bit is 0 for positive numbers or 0, and 1 for negative numbers.

Since the number of bits is determined, there is a maximum range of numbers that can be represented using `int`. As we discussed in {ref}`bits-represent`, we can represent $2^n$ numbers using $n$ bits. Since one bit is reserved for the sign of the number, we have 31 bits left. We can represent $2^{31}$ negative numbers, i.e. from $-2^{31}$ to $-1$. For 0 and positive numbers we have $2^{31}$ representations, i.e. from 0 to $2^{31} - 1$. 

There are other data types to represent integers, such as:

* `short` representation typically uses 16 bits, i.e. 2 bytes of memory.
* `unsigned int` representation typically uses 32 bits, i.e. 4 bytes of memory. The sign bit is not used, so the range of numbers is from 0 to $2^{32} - 1$.
* `long` representation typically uses 64 bits, i.e. 8 bytes of memory.
* `long long` representation typically uses 64 bits, i.e. 8 bytes of memory.

For the purpose of this course, you are expected to only know `int` data type out of all integer data types.

Format specifier for `int` is `%d`.

## Floating point or real numbers

Floating point binary representation is similar to standard notation, e.g. $2.89 \times 10^{14}$ or $2.89e14$ or $2.89E14$. Formally, the number is represented as $m \times 10^e$, where $m$ is the mantissa and $e$ is the exponent. The mantissa is a number between 1 and 10, and the exponent is an integer. The sign of the number is represented by the sign of the mantissa. 

The floating point number in binary form represents the mantissa and the exponent separately. We do not need to know how.

There are two data types to represent floating point numbers: 

* `float` uses 32 bits, i.e. 4 bytes of memory. 
* `double` uses 64 bits, i.e. 8 bytes of memory. Since `double` data types uses double the number of bits to represent the floating point number, it is more precise than `float` data type. Hence, `double` is referred to have "double precision" and `float` as "single precision".

For the purpose of this course, we will be using `double` data type only.

Format specifier for `float` is `%f` and for `double` is `%lf`.

## Characters

To represent a single letter, symbol or digit, we can use the char data type. Example characters include `A`, `B`, ... `Z`, `a`, `b`, ... `z`, `0`, `1`, ... `9`, `@`, `#`, `$` and other symbols.

**Example**

```c {.line-numbers}
char firstInitial = 'S';
printf("My first initial is %c\n", firstInitial);
```

This code snippet would print `S` on the screen. The format specifier for `char` is `%c`.

`char` is stored using 8 bits, i.e. 1 byte of memory. Each character is encoded into a unique number, and the number is stored in one cell of the memory. How does this unique number look like? The number is called American Standard Code for Information Interchange (ASCII) code. ASCII code is a standard encoding scheme for characters. It uses only 7-bits and the 8th bit is set to 0. Since we are using 7 bits, then the ASCII code table has numbers between 0 and 2^7 -1, which is 128 numbers. Part of the ASCII code table is shown below, but you are NOT required to memorize it.

| Character | ASCII code (Decimal) | ASCII code (Binary) |
| :-------: | :------------------: | :-----------------: |
|     A     |          65          |      01000001       |
|     B     |          66          |      01000010       |
|     C     |          67          |      01000011       |
|     ⋮     |          ⋮           |          ⋮          |
|     Z     |          90          |      01011010       |
|     a     |          97          |      01100001       |
|     b     |          98          |      01100010       |
|     c     |          99          |      01100011       |
|     ⋮     |          ⋮           |          ⋮          |
|     z     |         122          |      01111010       |
|     0     |          48          |      00110000       |
|     1     |          49          |      00110001       |
|     2     |          50          |      00110010       |
|     ⋮     |          ⋮           |          ⋮          |
|     9     |          57          |      00111001       |


## Boolean 

Boolean `bool` data type is used to represent a logical value, i.e. either `true` or `false`. In C, `true` is represented by `1` and `false` is represented by `0`. Sounds like we only need one bit for that nice data type in the memory, right? As much as `bool` requires only one bit, but we cannot organize the memory as we like. The memory is organized into cells, and each cell stores a byte. The smallest possible memory space we can use is a cell in the memory. So `bool` data type uses 1 byte of memory.

**Example**

Write a C code that prints a `bool` variable. Code in {download}`isRaining.c <../../code/chapter2/boolVariable/isRaining.c>`.

```c {.line-numbers}
#include <stdbool.h>
#include <stdio.h>

int main(void){
    bool isRaining = true;
    printf("Is it raining? %d\n", isRaining);
    return 0;
}
```

**Output**
```
Is it raining? 1
```

There is no format specifier for `bool` specifically. We use `%d` to print the value (either 0 or 1) of a boolean variable. Hence, the above code prints `Is it raining? 1` NOT `Is it raining? true`.

If you noticed, apart from `#include <stdio.h>` which gives us access to `printf` and `scanf` functions, we included another library for `bool` variables in `#include <stdbool.h>`. Without this library, the complier won't identify the `bool` variable type.

## Declaring Vs. Initializing Variables

In your code, if you need to declare a variable, you do it as follows
```
int sumOf;
```

The compiler will understand that you *declared* a variable with `int` type and identifier `var`. When running your code, the computer will reserve a space for it in the memory. The question is, what is the value of this declared variable? The answer is not `0`.

The variable is **uninitialized**. It is not holding any value. It is just a variable that is declared, but not initialized. To be more specific, if you try printing the value of the declared but uninitialized variable, you print the value that is there in the memory location of the variable. Probably this value was there before the program started running. It is a random value. Some people call it "garbage" value.

For example, when I ran the code below on my computer, the value in `var` variable was `174739296`, because I never initialized `var`. However, when you run the code, you may get a different value. The value will be different for each run too. You can download from {download}`declare-vs-initialize.c <../../code/chapter2/declare-vs-initialize/declare-vs-initialize.c>` to play with the code.

**Code**
```c {.line-numbers}
#include <stdio.h>

int main() {
  int var;
  printf("Value of uninitialized variable \"var\": %d\n", var);
  int var2 = 0;
  printf("Value of initialized variable \"var\": %d\n", var2);
  return 0;
}
```

**Potential output**
```
Value of uninitialized variable "var": 174739296
Value of initialized variable "var": 0
```

```{note}
If you compile the code above, you will get a warning stating: `variable ‘var’ is uninitialized when used here [-Wuninitialized]`. The compiler will also ask you to initialize the var to silence the warning. 
```


This becomes a problem, if you are unaware of it. If you use an uninitialized variable later, your program's behavior will definitely be undefined. Therefore, it is best practice to declare a variable **AND** initialize it, e.g. `int var = 0;`. `int var` declares the `var` variable and `= 0;` initializes the `var` variable to `0`.




