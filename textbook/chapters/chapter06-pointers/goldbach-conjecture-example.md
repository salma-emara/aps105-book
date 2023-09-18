# Goldbach conjecture

In this section, we will write a longer program that checks for a given number if the Goldbach conjecture is verified or rejected.

## Problem Statement

A conjecture is a proposition/opinion/observation that is not proven yet. For example, the Goldbach conjecture states:

> Every **even integer greater than $2$** can be written as the sum of two prime numbers.

A **prime number** is a number divisible only by two *distinct* numbers: 1 and itself. For example, $2$, $3$, $5$, $7$, $11$, $13$, $17$. Keep in mind that $1$ is not a prime number because it is divisible by $1$ only, not two *distinct* numbers.

Let's write a program that asks for the user to input a number that is *even* and *greater than $2$*, and then checks if this number verifies or rejects the Goldbach conjecture.

## Divide Problem into sub-problems

Let's list the tasks to be done by this program:

1. Take input number from the user
2. Verify if the number is even and greater than $2$
3. Test the Goldbach conjecture
4. Print if the number verifies or rejects the conjecture

Next, we tackle each task and decide if we can put it in a separate function or if it requires multiple functions. This helps us in easily managing a larger piece of software.

### Take input from the user

As we take input from the user, we need to validate that it is even and greater than $2$ before proceeding with testing the Goldbach conjecture.

**Loop type.** As we discussed in {ref}`do-while-validate`, taking input from the user and validating it requires repetition until a valid input is made. Doing so requires that we first take the input from the user then validating it. This is what a do-while loop is best fit for. This is because a do-while loop will run its statements before checking the condition. Similarly, we want to take input from the user before checking it is even and greater than $2$.

**Function prototype.** The following code is a function that takes the address of an `int` variable, *i.e.* `int*`, then the value at that address is changed to the input of the user. This is why we received a pointer `int*` to the function and return `void`.

**Code in-progress**
```{code-block} c
:linenos:  
:emphasize-lines: 6, 8
void getUserInput(int *number) {
  // Get user input from the keyboard
  // and validates it is even and greater than 2

  do {
    printf("Enter a number to test the Goldbach conjecture: ");
    scanf("%d", number);
  } while (*number <= 2 || *number % 2 != 0);
}
```

```{admonition} Important!
In line 6, we are using `scanf` without an `&` because `number` is already an address to the `int` we want to change.  

In line $8$, we are referring to the `int` variable that `number` has it's address. This is why we dereference `number` to get to the `int` it is pointing to. 

```

**Test with main function**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="7" input="-1 3 4" output="Enter a number to test the Goldbach conjecture: <b>-1</b> 
Enter a number to test the Goldbach conjecture: <b>3</b> 
Enter a number to test the Goldbach conjecture: <b>4</b>">
&#35;include &lt;stdio.h&gt;
<br>
void getUserInput(int *);
<br>
int main(void) {
  int num;
  getUserInput(&num);
  return 0;
}
<br>
void getUserInput(int *number) {
  // Get user input from the keyboard
  // and validates it is even and greater than 2
<br>
  do {
    printf("Enter a number to test the Goldbach conjecture: ");
    scanf("%d", number);
  } while (*number <= 2 || *number % 2 != 0);
}
</code-runner>
</pre>

Currently, the prompt message is not telling the user why is their first and second input invalid. To have a clarifying prompt message after the user enters an invalid input, we can have a `bool` variable that indicates if it is the first time the user enters an input. We can use this `bool` variable to better explain to the user what is the expected input. The modified function is shown below. We added lines $17$, $19$ -- $22$. 

**Improved `getUserInput` function**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="17 19 20 21 22" input="-1
3
4" output="Enter a number to test the Goldbach conjecture: <b>-1</b> 
Enter a number to test the Goldbach conjecture: <b>3</b> 
Enter a number to test the Goldbach conjecture: <b>4</b>">
&#35;include &lt;stdbool.h&gt;
&#35;include &lt;stdio.h&gt;
<br>
void getUserInput(int*);
<br>
int main(void) {
  int num;
  getUserInput(&num);
  return 0;
}
<br>
void getUserInput(int *number) {
  // Get user input from the keyboard
  // and validates it is even and greater than 2 
  bool firstEntry = true;
  do {
    if (firstEntry) {
      printf("Enter a number to test the Goldbach conjecture: ");
      firstEntry = false;
    } else {
      printf("Your input was invalid, please enter another even number > 2: ");
    }
    scanf("%d", number);
  } while (*number <= 2 || *number % 2 != 0);
}
</code-runner>
</pre>

### Test the Goldbach conjecture

**Step 1: Toy example.** For example, if the user enters $12$. Logically, we can think that 12 can be written as $12 = 5 + 7$. 

**Step 2: Think of a solution and decompose into steps!** The user entered $12$ which is a sum of two `int` prime numbers, `x` and `y`, *i.e.* $12 = x + y$. To find `x` and `y`, we can 

1. Get the first prime number in `x`, which is $2$. 
2. Then get `y`, which is $y = 12 - x$. 
3. Check if `y` is prime.
4. If `y`, is not prime, we increment `x` to the next prime number.
5. Then we repeat steps $2$ -- $4$
6. We stop repeating till we find `y` is prime or if the **conjecture is rejected**. When is the conjecture rejected?

For example, in {numref}`conjecture-table`, we show the steps/iterations to verify the Goldbach conjecture for $12$. The conjecture gets rejected when we continue looking for `x` and `y`, but realize they will never be both prime numbers. This happens when `x` prime numbers start to surpass the values of `y`. This is also around when `x` becomes greater than the half of $12$, which is the number we are testing. 

```{figure} ./images/conjecture-table.png
:alt: The steps of verifying or rejecting a conjecture.
:width: 600px
:name: conjecture-table
The steps of **verifying** or **rejecting** a conjecture.
```

**Summary!** We stop iterating and looking for `x` and `y` prime numbers either: (i) when the conjecture is verified (`x` and `y` are prime) or (ii) when `x` becomes greater than `y` and we have never verified the conjecture before!

**Step 3: Write a pseudo-code.** We can write the *pseudo-code* of the above steps. *Pseudo-code* is an informal language used to write code. It is intended to simplify a piece of code by writing it in plain English language mixed with a program language too. For example, we can translate the above steps to the following pseudo-code.

***Pseudo-code***
<pre>
// first prime number
x = 2 
while(not verified and not rejected){ 
    // look for x and y
    // N is user input
    y = N - x 
    if(y is Prime){
        conjecture is verified
    }else if (x > y){
        conjecture is rejected
    }else{
        x is advanced to the next prime number
    }
}
</pre>


**Step 5: Write the code.** There are two tasks in the previous pseudo-code that require a few lines of code to accomplish. These are: (i) if y is prime, and (ii) to get the next prime number after `x`. These two will be completed by different functions. We can define their function prototypes before proceeding with writing the code for testing Goldbach conjecture.

1. *Check if a number is prime.* This can be a function that returns `true` is a number is prime and `false` if the number is not prime. The only input this function requires is the `int` value it will check. This makes the function prototype:
   > `bool isPrime(int);`
2. *Get the next prime number.* There are many ways to advance to the next prime number. All what you need is to pass the address of `x` to that function, and the function will change the value of `x` and return `void`. This makes the function prototype:
   > `void nextPrimeNumber(int*);`

In the following code, we convert the pseudo-code to a function written in C programming language. 

```{code-block} c
:linenos: 
:emphasize-lines: 7, 9, 14, 17
bool testGoldbach(int N) {
  // Tests the Goldbach conjecture and
  // returns true if verified or false if rejected
  int x = 2, y;
  bool rejected = false;
  bool verified = false;
  while (!rejected && !verified) {
    y = N - x;
    if (isPrime(y)) {
      verified = true;
    } else if (y < x) {
      rejected = true;
    } else {
      nextPrimeNumber(&x);
    }
  }
  return verified;
}
```
In line $7$, we check if rejected and verified are both `false`. This is by adding a `!` before `rejected` and `!` before `verified` and ANDing them: `!rejected && !verified`.

In line $9$, we immediately use `isPrime` as we know it returns either `true` if `y` is a prime number or `false` otherwise: `isPrime(y)`.

In line $14$, we use `nextPrimeNumber` by passing the address of x to it, and inside the function we will shortly implement the advancement of `x` to the next prime number: `nextPrimeNumber(&x)`. 

### Get the Next Prime Number

To implement `void nextPrimeNumber(int*);`, we need to first think of how to find the next prime number. 

**Step 1: Toy example.** For example, the next prime number after $3$ is $5$. 

**Step 2: Think of a solution and decompose into steps.** The next number after $3$ is $4$, but it is not prime number. We can continue advancing to $5$ and then checking if it is prime! Given that, the steps to get the next prime number are

1. Add $1$ to that value
2. Check if it is prime
3. Repeat $1$ -- $2$ till value becomes a prime number

**Step 3: Write the code.** The following code implements the steps discussed. Caution! We are receiving the address of a `int`, which is `int*`.

```{code-block} c
:linenos: 
:emphasize-lines: 5, 8
void nextPrimeNumber(int *px) {
  // We will look for the numbers after *pFrist one by one 
  // until we find the next prime number
  int value = *px + 1;
  while (!isPrime(value)) {
    value += 1;
  }
  *px = value;
}
```

In line $5$, we check if `value` is prime or not using `isPrime` function, which we know it will return `true` if value is prime and `false` otherwise. `!isPrime(value)` is `true` as long as `value` is not prime. Once `value` is prime, `!isPrime(value)` becomes `false`, and we exit the loop.

In line $8$, we are not returning any values because `nextPrimeNumber` does not return any number. Instead, we change the value at address `px` to the prime number we found next.

**Step 4: Test your code in isolation.** You should be testing your code when called only by the `main` function to see if it works. 

### Find If a Number Is Prime or Not

To implement `bool isPrime(int);`, we need to first think of how to know if a number is prime. 

**Step 1: Toy example.** For example, $12$ is not a prime number.  

**Step 2: Think of a solution and decompose into steps.** We know that a prime number `num` is divisible only by $1$ and `num`. This means that between $2$ and the `num - 1` there are no divisibles of `num`. We can do the following steps to see if `num` is prime:

1. Denominator `denom` is set to $2$
2. Find if `num` / $2$ gives no **remainder**, *i.e.* `num % denom == 0`
3. If `num % denom == 0`, then `num` is not prime, because it is divisible by `denom`.
4. Otherwise, add $1$ to `denom` 
5. Repeat $2$ -- $4$, until either you found out `num` is not prime, or when `num % denom == 0` has been checked on all `denom` values from $2$ to `num - 1` and was never `true`. This is when `num` is `true`.

**Step 4: Write pseudo-code.** 

***Pseudo-code***
<pre>
// We can start with good intentions that a number is prime

if (number is less than 2){
    number is not prime
}else{
    denom = 2
    while(denom < num -1 and number is still prime)
        if (num % denom == 0){
            number is not prime
        }else{
            denom = denom + 1
        }
    }
}
</pre>

**Step 3: Write the code.** To implement the `bool isPrime(int);`, we will convert the pseudo-code into code.

**Code**
```{code-block} c
:linenos:
bool isPrime(int num) {
  // check if num is prime, by checking the remainder of num / all numbers from
  // 2 to num - 1
  bool prime = true;
  if (num < 2) {
    prime = false;
  } else {
    for (int denom = 2; denom <= num - 1 && prime; denom++) {
      if (num % denom == 0) {
        prime = false;
      }
    }
  }
  return prime;
}
```

**Step 4: Test your function in isolation.** Think of numbers to test your function. Numbers less than, greater than or equal to 2.

1. Does the function work with numbers *less than 2*? Yes. Line $6$ will set `prime` to `false`. 
2. Does the function work with *2*? In line $8$, `denom` starts from $2$, and then `denom` is checked with `num - 1`. The condition `denom <= num - 1` is false if `num` is set to $2$. Hence, the function will return the preset value of `prime`, which is `true`.
3. Does the function work with numbers *above 2*? In lines $8$ -- 10, the function will set `prime` to `false` if `num` is divisible by another number between $2$ and `num - 1`. It will exist the loop because this condition `denom <= num - 1 && prime` becomes `false`. The function will not change `prime` value if the loop tries over all `denom` values from $2$ to `num - 1` and does not find `num` to be divisible. Hence, `prime` will **continue** to be `true`.

### Print If the Conjecture Is Verified

We need a function that prints if the Goldbach conjecture is verified or rejected! This function can simply call `testGoldbach`. If `testGoldbach` returns `true`, the function prints the number verifies the conjecture, and prints the number rejects the conjecture otherwise.

These simple steps can be written as follows:

**Code**
```{code-block} c
void printConjResult(int number){
    //Call a function to verify the conjecture and prints the result
    bool verified = testGoldbach(number);
    if(verified){
        printf("Goldbach conjecture is verified.\n");
    }
    else{
        printf("Goldbach conjecture not verified.\n");
    }
}
```

## Integrate all pieces/functions

In the previous sections, we have divided the steps into two **main** ones: getting input through `getUserInput` and printing if the conjecture is verified through `printConjResult`.

This eases the task of writing the `main` function. The `main` function should only call `getUserInput` and `printConjResult`. This is shown in the following code.

**Code**
```{code-block} c
int main(void){
    int number;
    getUserInput(&number);
    printConjResult(number);
    return 0;
}
```

**Output[^1]**
<pre>
Enter a number to test the Goldbach conjecture: <b>9</b>
Your input was invalid, please enter another number > 2: <b>8</b>
Goldbach conjecture is verified.
</pre>

Please refer to {download}`goldbach-conjecture.c <../../code/chapter06/gold-conjecture/gold-conjecture.c>` if you want to view the entire program and test it yourself.

[^1]: Inputs to programs are in **bold**.

{{quiz_embed | replace("%%FILENAME%%", "chapter-6/sec-5") }}