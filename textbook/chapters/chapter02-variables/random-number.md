# Random numbers

Throughout this chapter, we discussed different operations. Simple operations include `+`, `-`, `/`, `*`, `%`, `=`, `+=`, `-=`, `*=`, `/=`, `%=`, and complicated operations from the math library like `rint`, `fmax`, `fmin`, `ceil`, `floor`. These operations were on different data types like `int` and `double`. In some cases, we need to generate a random number, e.g. if we were to develop a head or tail game, we would need to generate two random numbers, maybe $0$ representing a head and $1$ representing a tail. In this section, we will discuss how to generate a random number in C.

## Generating a random number

We will need the `rand` function from `stdlib.h` library, which is referred to as the standard library. The prototype of the `rand` function is as follows:

```c
int rand();
```

`rand` does not take as input anything. It produces an `int` value that can range from `0` to `RAND_MAX`, where `RAND_MAX` is a constant defined in `stdlib.h` library. It is the maximum +ve value that can be represented by an `int`. The value of `RAND_MAX` is $2^{31} - 1 = 2147483647$.

Let's try running the following code.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" output="Random number 1: 1804289383
Random number 2: 846930886
Random number 3: 1681692777">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;stdlib.h&gt;
<br>
int main(void) {
  printf("Random number 1: %d\n", rand());
  printf("Random number 2: %d\n", rand());
  printf("Random number 3: %d\n", rand());
  return 0;
}
</code-runner>
</pre>

<!-- **Output**

<pre>
Random number 1: 16807
Random number 2: 282475249
Random number 3: 1622650073
</pre>  -->

Wait! I tried running the code again, and I got the same numbers. How is `rand()` then generating a random number? The answer is that `rand()` is generating *pseudo*-random numbers. A *pseudo*-random number is a number that appears to be random, but is actually **not** 🤯. Who decides these *pseudo*-random numbers? It is a pseudo-random number generator. As programmers, we can choose our pseudo-random number generator. We can do so by setting a **seed**. What on earth is a **seed**?

A seed is used to initialize a pseudo-random number generator. This generator is responsible for generating a set of random numbers every time `rand` is called. To choose a seed, we will use a function whose prototype is `void srand(unsigned int);`. It takes the seed with a type `unsigned int` as input and sets the seed of the *pseudo*-random number generator. 

I hear you saying "Salma (your author), I feel lost." Don't worry, I will explain it with an example. Let's say we want to generate the set of random numbers from seed 1 in the following figure, *i.e.*, $16807, 282475249, 1622650073 ...$. In our code, a line of code with `srand(1);` will initialize a pseudo-random number generator with seed 1. Fantastic! Next, the first time `rand()` is called after `srand(1);`, it will return `16807`, which is the first random number in seed 1 in the figure below. The next time `rand()` is called, it will return `282475249`, which is the second random number in seed 1, and so on. The default seed if we did not set the seed using `srand()` is `1`.

```{figure} ./images/setting-a-seed.png
:alt: setting a seed
:class: with-shadow
:width: 800px
:align: center

setting a seed of 1 using `srand(1);`
```

In your code, if you **re**-initialize the seed using `srand(1);`, you will get the same set of random numbers again when you call `rand()`. This means, you will again get `16807` in the next `rand()` call. This is why we only initialize the seed with `srand` once in our code. This is illustrated in the following figure.

```{figure} ./images/rand-after-srand.png
:alt: rand after srand
:class: with-shadow
:width: 250px
:align: center

The subsequent calls to `rand()` after `srand(1);` will return the same set of random numbers.
```

The following code illustrates the subsequent calls to `rand()` after `srand(1);`. Download {download}`seed.c <../../code/chapter2/seed/seed.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Random number 1: 16807
Random number 2: 282475249
Random number 3: 1622650073
Random number 4: 16807
Random number 5: 16807
Random number 6: 282475249
Random number 7: 16807
Random number 8: 282475249
Random number 9: 1622650073">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;stdlib.h&gt;
<br>
int main(void) {
  srand(1);
  printf("Random number 1: %d\n", rand());
  printf("Random number 2: %d\n", rand());
  printf("Random number 3: %d\n", rand());
  srand(1);
  printf("Random number 4: %d\n", rand());
  srand(1);
  printf("Random number 5: %d\n", rand());
  printf("Random number 6: %d\n", rand());
  srand(1);
  printf("Random number 7: %d\n", rand());
  printf("Random number 8: %d\n", rand());
  printf("Random number 9: %d\n", rand());
  return 0;
}
</code-runner>
</pre>

<!-- **Output**
<pre>
Random number 1: 16807
Random number 2: 282475249
Random number 3: 1622650073
Random number 4: 16807
Random number 5: 16807
Random number 6: 282475249
Random number 7: 16807
Random number 8: 282475249
Random number 9: 1622650073
</pre> -->

## Are we generating random numbers?

So far we found a way to generate pseudo-random numbers, and how to generate the same set of random number every run. If you have `srand(1)` with a *fixed* seed or no `srand(x)` at all, your program will generate the same set of pseudo-random numbers. Can we get closer to *really* random numbers? Yes, we can. 

If we use the current time as a seed, every time we run our program, our seed will be different. Hence, the set of random numbers change with every run! Voilà. We can use the `time` function from `time.h` library to get the current time. The prototype of the `time` function is as follows:

```{code-block} c
time_t time(time_t *tloc);
// You are not required to know what is time_t or tloc in this course!
```

When the `time` is called like this `time(NULL)`, it returns the Unix time, which is the current time in terms of the number of seconds since January 1, 1970.

```{admonition} Fun fact 😎
The data type `time_t` is a signed 32-bit `int` type representing the number of seconds since January 1, 1970. Hence, the maximum number of seconds that can be represented is $2^{31} -1 = 2147483647$. This will be 03:14:07 UTC January 19, 2038. After that, the Unix time will overflow and be a negative number representing 20:45:52 on Friday, 13 December 1901 🤯😵‍💫. This is called the **Unix time overflow** or Year 2038 problem. No one knows what will happen after that. Vulnerable systems include some databases, which includes bank accounts. You may have guessed the solution. Solution is as simple as switching to a 64-bit `time_t` data type.
```

The following code will now generate different random numbers every time you run it. Download {download}`time-seed.c <../../code/chapter2/time-seed/time-seed.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Random number 1: 1783039037
Random number 2: 1550284621">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;stdlib.h&gt;
&#35;include &lt;time.h&gt;
<br>
int main(void) {
  srand(time(NULL));
  printf("Random number 1: %d\n", rand());
  printf("Random number 2: %d\n", rand());
  return 0;
}
</code-runner>
</pre>

<!-- **Potential Output**
<pre>
Random number 1: 1783039037
Random number 2: 1550284621
</pre> -->

**Question:** If we do `srand(rand());` instead of `srand(time(NULL));`, would this make the seed random? The answer is **NO**. The first call to `rand()` in `srand()` would return the same random number everytime we run the program. The default seed has a default of `1`. This makes `srand(rand());` always pick a fixed seed.

## Random numbers within a range

Random numbers generated by `rand()` range from `0` to `RAND_MAX`. What if I want to generate numbers between `0` and `1` representing heads and tails? Recall the handy modulo operator `%`. If we do `rand() % 2`, it will always generate a number between `0` and `1`.

```{admonition} Remember!
The result of any modulo operation is between `0` and `2nd operand - 1`. For example, `% 5` returns numbers between `0` and `4`.

0 % 5 = 0

1 % 5 = 1

2 % 5 = 2

3 % 5 = 3

4 % 5 = 4

5 % 5 = 0 **(repeats)**

6 % 5 = 1 
```

To generate a number between `0` and `5`, we need to do `rand() % 6;`. While to shift this range from `0` -- `5` to `1` to `6`, we can add `1` to the range and make it `(rand() % 6) + 1;`. In general to generate a number between `[MIN, MAX]` (inclusive), we need to `rand() % (MAX - MIN + 1) + MIN`.

For example, let's develop a code for rolling a dice 🎲! We expect that every time we run the program we **do not** get the same dice number. Download {download}`roll-dice.c <../../code/chapter2/roll-dice/roll-dice.c>` to get the following code.

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" output="Dice roll is 3">
&#35;include &lt;stdio.h&gt;
&#35;include &lt;stdlib.h&gt;
&#35;include &lt;time.h&gt;
<br>
int main(void) {
  srand(time(NULL));
<br>
  printf("Dice roll is %d\n", rand() % 6 + 1);
<br>
  return 0;
}
</code-runner>
</pre>

<!-- **Potential output**
<pre>
Dice roll is 3
</pre> -->

{{quiz_embed | replace("%%FILENAME%%", "chapter-2/sec-5") }}