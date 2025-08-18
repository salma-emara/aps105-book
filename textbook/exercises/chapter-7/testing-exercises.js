let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Part of Question 6 in Winter 2020 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "multipart": false,
      "table": false,
      "question": "The following code segment will cause a runtime error. Identify the potential runtime error and briefly explain how you would fix it.\n",
      "question-code": "char cArray[] = {'H', 'E', 'L', 'L', 'O'};\nprintf(\"The last character is %c.\\n\", cArray[5]); ",
      "answer": " \nProblem: The maximum index for `cArray` is 4 (array out-of-bounds error).\nSolution: Change `[5]` to `[4]`.\n"
    },
    {
      "title": "Question 5 in Winter 2022 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "In the box provided below, write the output generated after the following program is completely executed.\n",
      "question-code": "#include <stdio.h>\n\nint main(void) {\n  int first = 1, second = 2, data[4] = {10, 20, 30, 40};\n  int *third = &second, *fourth = &first, *fifth = data + first + 1;\n  (*third)++;\n  (*fourth)++;\n  data[second] = *fifth + first + *third + *fourth;\n  printf(\"first = %d, second = %d, third = %d, fourth = %d, fifth = %d\\n\",\n         first, second, *third, *fourth, *fifth);\n  for (int i = 0; i < 4; i++) {\n    printf(\"%d, \", data[i]);\n  }\n  printf(\"\\n\");\n  return 0;\n}\n",
      "answer": "first = 2, second = 3, third = 3, fourth = 2, fifth = 30\n10, 20, 30, 37,\n"
    },
    {
      "title": "Question 5 in Winter 2020 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "tracing",
      "question": "What is the output of the following program?\n",
      "question-code": "#include <stdio.h>\n\nint main(void) {\n  int *p, x;\n  int fiveInt[5] = {1, 2, 3, 4, 5};\n  int *q;\n  p = NULL;\n  q = fiveInt;\n  x = 6;\n  p = &x;\n  printf(\"A: %d %d\\n\", x, *p);\n  *(q + 3) = *p;\n  *p = *q + *(q + 3);\n  printf(\"B: %d %d %d\\n\", x, *p, *q);\n  return 0;\n}\n",
      "answer": "A: 6 6\nB: 7 7 1\n"
    },
    {
      "title": "Question 14 in Winter 2017 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "Write a complete C program that prompts the user repeatedly for a sequence of up to 10 integer values. After receiving all 10 values, or if the user enters 0, the program will stop prompting for more values. Your program will complete the following three tasks using the values entered:\nWrite a complete C program that prompts the user repeatedly for a sequence of up to 10 integer values. After receiving all 10 values, or if the user enters 0, the program will stop prompting for more values. You can assume that the user enters at least one value before entering 0. Your program will complete the following three tasks, in the order as given below, using the values the user entered.\n\n• Print the total number of values entered;\n\n• Print all the values in the order that the user entered them;\n\n• Print whether the values are entered in ascending order, i.e., the next value is either greater than or equal to the previous one. For example, `{3, 4, 7, 7}` is a sequence of values in ascending order, but `{3, 4, 7, 6}` is not.\n\n**Hint:** you will need to use an array for this question.\n\nHere are a few example runs of your program.\n\n**Example run 1:**\n<pre>\nEnter a value (0 to stop): 1\nEnter a value (0 to stop): 2\nEnter a value (0 to stop): 3\nEnter a value (0 to stop): 4\nEnter a value (0 to stop): 7\nEnter a value (0 to stop): 7\nEnter a value (0 to stop): 8\nEnter a value (0 to stop): 9\nEnter a value (0 to stop): 10\nEnter a value (0 to stop): 11\nEnter a value (0 to stop): 0\nThere are a total of 10 numbers.\nThe values you entered are: 1 2 3 4 7 7 8 9 10 11\nThe values are in ascending order.\n</pre>\n\n**Example run 2:**\n<pre>\nEnter a value (0 to stop): 3\nEnter a value (0 to stop): 5\nEnter a value (0 to stop): 5\nEnter a value (0 to stop): 7\nEnter a value (0 to stop): 0\nThere are a total of 4 numbers.\nThe values you entered are: 3 5 5 7\nThe values are in ascending order.\n</pre>\n\n**Example run 3:**\n<pre>\nEnter a value (0 to stop): 2\nEnter a value (0 to stop): 1\nEnter a value (0 to stop): 3\nEnter a value (0 to stop): 0\nThere are a total of 3 numbers.\nThe values you entered are: 2 1 3\nThe values are not in ascending order.\n</pre>\n\n**Example run 4:**\n<pre>\nEnter a value (0 to stop): 1\nEnter a value (0 to stop): 0\nThere are a total of 1 numbers.\nThe values you entered are: 1\nThe values are in ascending order.\n</pre>\n",
      "starter-code": "#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n  int count = 0, maxInput = 10;\n  int arr[maxInput];\n  int num;\n  do {\n    printf(\"Enter a value (0 to stop): \");\n    scanf(\"%d\", &num);\n    if (num != 0) {\n      arr[count] = num;\n      count++;\n    }\n  } while (count < 10 && num != 0);\n  printf(\"There are a total of %d numbers.\\n\", count);\n  printf(\"The values you entered are:\");\n  for (int index = 0; index < count; index++) {\n    printf(\" %d\", arr[index]);\n  }\n  printf(\"\\n\");\n  bool ascending = true;\n  for (int index = 0; index < count - 1 && ascending; index++) {\n    if (arr[index] > arr[index + 1]) {\n      ascending = false;\n    }\n  }\n  printf(\"The values are \");\n  if (!ascending) {\n    printf(\"not \");\n  }\n  printf(\"in ascending order.\\n\");\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "1\n2\n3\n4\n7\n7\n8\n9\n10\n11"
          ],
          "output": [
            "Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): \n There are a total of 10 numbers. \nThe values you entered are: \n 1 2 3 4 7 7 8 9 10 11\nThe values are in ascending order."
          ]
        },
        {
          "input": [
            "3 \n5 \n5\n7\n0\n"
          ],
          "output": [
            "Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): \n There are a total of 4 numbers. \nThe values you entered are: \n 3 5 5 7 \nThe values are in ascending order.\n"
          ]
        },
        {
          "input": [
            "2\n1\n3\n0\n"
          ],
          "output": [
            "Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): Enter a value (0 to stop): \n There are a total of 3 numbers. \nThe values you entered are: \n 2 1 3\nThe values are not in ascending order.\n"
          ]
        },
        {
          "input": [
            "1\n0\n"
          ],
          "output": [
            "Enter a value (0 to stop): Enter a value (0 to stop): \n There are a total of 1 numbers. \nThe values you entered are: \n 1\nThe values are in ascending order.\n"
          ]
        }
      ]
    },
    {
      "title": "Question 9 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The dot product, an operation with which every first-year engineer is familiar, consists of the element-by-element multiplication of two vectors, and the cumulative sum of these resulting products. If vector $a = [a_1, a_2, a_3]$, and $b = [b_1, b_2, b_3]$, then the dot product $a · b = a_1 \\times b_1 + a_2 \\times b_2 + a_3 \\times b_3$.\n\nSmartphones, which can be found at this very moment in many first-year engineer’s pocket, do perform a similar operation when the treble or the bass are adjusted when the said engineer is enjoying a song. This operation is called *filtering*.\n\nSuppose now that you have two vectors, one representing a song, and the other representing a filter. Write a complete C program that will calculate and print the dot product between these two vectors as a single value. Your program should simply print:\n\n<pre>\nResult = <b>calculated dot product value here</b>\n</pre>\n\nYour program must use a function, called `dotProduct`, which takes in pointers to the two vectors and their length, and returns the result. Before your program calls `dotProduct`, the two vectors should be initialized using the following elements:\n\n<pre>\nmusic: 0 0.707 1 0.707 0 -0.707 -1 -0.707 0 // it's a sinusoid\nfilter: 1 0 -1 0 2 0 -1 0 1 // it's a sinc\n</pre>\n\nNext time you listen to a song, consider that it is very possible that two 50 element long arrays are being used by a function very similar to the one you will write below, and that function is being called at least once every 48 thousandths of a second, so that you can enjoy that Taylor Swift song. Okay, make it Justin Bieber, then.\n",
      "starter-code": "#include <stdio.h>\n\ndouble dotProduct (double *music, double *filter, int length) {\n\n  // Write your function here\n\n}\n\n",
      "answer": "#include <stdio.h>\n\n// The function prototype can also be declared as:\n// double dotProduct(double music[], double filter[], int length) \ndouble dotProduct(double *music, double *filter, int length) {\n  double sum = 0.0;\n  int i;\n  for (i = 0; i < length; i++) {\n    sum = sum + (music[i] * filter[i]);  // or *(music + i) * *(filter + i)\n  }\n  return sum;\n}\n",
      "main-function": "int main(void) {\n  double music[9] = {0, 0.707, 1, 0.707, 0, -0.707, -1, -0.707, 0};\n  double filter[9] = {1, 0, -1, 0, 2, 0, -1, 0, 1};\n  int length;\n  scanf(\"%d\", &length);\n  printf(\"Result = %lf\\n\", dotProduct(music, filter, length));\n}\n",
      "testcases": [
        {
          "input": [
            "9"
          ],
          "output": [
            "Result = 0.000000\n"
          ]
        },
        {
          "input": [
            "3"
          ],
          "output": [
            "Result = -1.000000\n"
          ]
        },
        {
          "input": [
            "0"
          ],
          "output": [
            "Result = 0.000000\n"
          ]
        },
        {
          "input": [
            "5"
          ],
          "output": [
            "Result = -1.000000\n"
          ]
        }
      ]
    },
    {
      "title": "Question 11 in Winter 2018 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "Recall that the function `rand()` returns a random integer each time it is called. \n\nWrite a complete C program to help assess the quality of `rand()`, by following the three steps provided below.\n\nFirst, declare an array with the identifier `random` that contains $1,000$ int-type integers, and then fill this array with random numbers between $0$ and $255$ (inclusive).\n\nSecond, declare another array with the identifier `h` that contains $256$ integers, and use that array to create a histogram so that at the end of the program, for each `i` between $0$ and $255$ (inclusive), `h[i]` will have a value `x` if exactly `x` elements of array `random` have the value `i`.\n\nFinally, print out the values of all elements of `h`.\n\nFor the sake of convenience, you do not need to seed the random number generator.\n\n(The quality of `rand()` can then be assessed by someone who uses your program as follows: if the printed-out numbers are all within a small range, then the quality of rand() is pretty good; on the other hand, if the printed-out numbers span a large range, then the quality of rand() is rather poor.)\n",
      "starter-code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n  int random[1000];\n  for (int i = 0; i < 1000; i++) {\n    random[i] = rand() % 256;\n  }\n  int h[256] = {0};\n  for (int i = 0; i < 1000; i++) {\n    h[random[i]]++;\n  }\n  for (int i = 0; i < 256; i++) {\n    printf(\"%d\", h[i]);\n  }\n  printf(\"\\n\");\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            ""
          ],
          "output": [
            "3783462445442942352426734374413645654511255305332586332221673351031342275645767443147344317663612846525626425321752514422413825354422344144332323111444376474143332543349156722731734743135382423253334434640826366494236535425023565621473595433463424363583645\n"
          ]
        }
      ]
    },
    {
      "title": "Question 10 in Winter 2020 Midterm Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Complete the definition of a C function `secondLargest` whose prototype is shown below. The function returns the index of the \nsecond largest integer in the list array, which contains `count` elements.\n\nFor example, if the list passed to the array is `{3, 9, 7, 5, 9, 8, 2, 4, 9}`, the function returns `5`, as `list[5]` \ncontains the second largest integer `8`. If there are multiple occurrences of the second largest integer, the function \nreturns the first occurrence. For example, if the list is `{3, 8, 3, 5, 9, 8, 2, 3, 8}`, the function returns `1`. \nIf there does not exist a second largest integer (i.e., all integers in the array are of the same value), \nthe function returns `-1`. For the sake of simplicity, you may assume that all integers in the array are positive, \nand there exists at least one element in the array (i.e., `count > 0`).\n\n",
      "starter-code": "\n#include <stdio.h>\n\nint secondLargest(int list[], int count) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nint secondLargest(int list[], int count) {\n  int largest = list[0], secondLargest = -1;\n  int largestIndex = 0, secondLargestIndex = -1;\n  for (int i = 1; i < count; i++) {\n    if (list[i] > largest) {\n      secondLargest = largest;\n      secondLargestIndex = largestIndex;\n      largest = list[i];\n      largestIndex = i;\n    } else if (list[i] < largest && list[i] > secondLargest) {\n      secondLargest = list[i];\n      secondLargestIndex = i;\n    }\n  }\n  return secondLargestIndex;\n}\n",
      "main-function": "int main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int arr[n];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n    int result = secondLargest(arr, n);\n    printf(\"%d\\n\", result);\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "9\n3 9 7 5 9 8 2 4 9\n"
          ],
          "output": [
            "5\n"
          ]
        },
        {
          "input": [
            "9\n3 8 3 5 9 8 2 3 8\n"
          ],
          "output": [
            "1"
          ]
        },
        {
          "input": [
            "4\n4 4 4 4\n"
          ],
          "output": [
            "-1"
          ]
        },
        {
          "input": [
            "5\n9 8 7 6 5\n"
          ],
          "output": [
            "1"
          ]
        }
      ]
    },
    {
      "title": "Question 12 in Winter 2020 Midterm Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "In a Pascal’s Triangle, the first row, row #0, has a single element 1. Each succeeding row elements are the sum of the two elements just above (if there is only one number just above, then that number is duplicated). So the first 5 rows (numbering from zero) are:\n\n<pre>\n    1\n   1 1\n  1 2 1\n 1 3 3 1\n1 4 6 4 1\n</pre>\n\nLooking at the last row, row #4, we have sums: $0 + 1$, $1 + 3$, $3 + 3$, $3 + 1$, $1 + 0$ (getting the values from the row above) to give us $1$, $4$, $6$, $4$, $1$. If we push this all left we get:\n\n<pre>\n1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n</pre>\n\nWrite a function `calculatePascalRowSeven`, with the prototype given below, that calculates row#7 (the eighth row) of Pascal’s triangle, iterating from row #0. Do an in-place calculation, so that the result ends up in `pascalRow[]`. Do not use any other array. The given `main()` function prints the result.\n\n```{code-block} c\nvoid calculatePascalRowSeven(int pArray[]);  // function prototype\n\nint main(void) {\n  // row #n has n + 1 elements\n  int pascalRow[7 + 1] = {1, 0, 0, 0, 0, 0, 0, 0};\n\n  calculatePascalRowSeven(pascalRow);\n\n  printf(\"Row 7 is:\n\");\n  for (int i = 0; i <= 7; i++) {\n    printf(\"%d \", pascalRow[i]);\n  }\n  printf(\"\n\");\n}\n```\n",
      "starter-code": "\n#include <stdio.h>\n\nvoid calculatePascalRowSeven(int pArray[]) {\n\n}\n",
      "answer": "#include <stdio.h>\n\nvoid calculatePascalRowSeven(int pArray[]) {\n  for (int row = 1; row < 8; row++) {\n    int oneToLeft = 0;\n    for (int element = 0; element < 8; element++) {\n      int saveElement = pArray[element];\n      pArray[element] = oneToLeft + pArray[element];\n      oneToLeft = saveElement;\n    }\n  }\n}\n",
      "main-function": "\nint main(void) {\n  int pascalRow[7 + 1] = {1, 0, 0, 0, 0, 0, 0, 0};\n\n  calculatePascalRowSeven(pascalRow);\n\n  for (int i = 0; i <= 7; i++) {\n    printf(\"%d \", pascalRow[i]);\n  }\n  printf(\"\\n\");\n\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "\n"
          ],
          "output": [
            "1 7 21 35 35 21 7 1\n"
          ]
        }
      ]
    },
    {
      "title": "Question 13 in Winter 2018 Midterm Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "The constant `E` is defined as a double constant of $2.718281828459045$.\n\n```{code-block} c\nconst double E = 2.718281828459045;\n```\n\nA first positive integer is called a **mirror** of a second one if they both contain two digits, and when the two digits in the first integer are flipped, the first integer becomes the second one. For example, 81 is a mirror of 18 (and vice versa).\n\nImplement a function called `firstMirrorInE` that returns the first two-digit number found in consecutive digits of `E` whose mirror have appeared earlier in the sequence of digits. You should only consider the first 16 digits of `E — 2.718281828459045`. The function returns $0$ if such a mirror pair\ndoes not exist in the first 16 consecutive digits of E.\n\n**Hint:** The `firstMirrorInE` function should return $28$, since its mirror, $82$, has appeared earlier in the sequence of digits. Your function must not simply return $28$ without doing any work. It is also incorrect to return $81$, because even though its mirror, $18$, appeared previously, $81$ is not the first\nin the sequence that can be found.\n\nFeel free to declare and implement additional functions when needed.\n",
      "starter-code": "#include <stdio.h>\n#include <stdbool.h>\n#include <math.h>\n\nint firstMirrorInE(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n#include <stdbool.h>\n#include <math.h>\n\nbool mirror(int i, int j) {\n  int firstDigit = i / 10;\n  int secondDigit = i % 10;\n  return j == secondDigit * 10 + firstDigit;\n}\nint firstMirrorInE(void) {\n  const double E = 2.718281828459045;\n  const int NumberOfDigits = 15;\n  int count = 0;\n  int twoDigitNumbers[17] = {0};\n  for (int i = 0; i >= -NumberOfDigits; i--) {\n    int p1 = (int)(E / pow(10, i)) % 10;\n    int p2 = (int)(E / pow(10, i - 1)) % 10;\n    int p = p1 * 10 + p2;\n    for (int j = 0; j < count; j++) {\n      if (mirror(twoDigitNumbers[j], p)) return p;\n    }\n    twoDigitNumbers[count] = p;\n    count++;\n  }\n  return 0;\n}\n",
      "main-function": "int main(void) {\n  int result = firstMirrorInE();\n  printf(\"%d\\n\", result);\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "\n"
          ],
          "output": [
            "28\n"
          ]
        }
      ]
    },
    {
      "title": "Question 11 in Winter 2020 Midterm Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "The *Sieve of Eratosthenes* is an ancient algorithm for finding prime numbers. To use this algorithm to find all prime numbers less than a given integer, say 100, we start by making a list of consecutive integers less than $100$. We first take $p$ = 2, the smallest prime number, and print it. We then eliminate all multiples of $p$ less than $100$ in the list, (2$p$, 3$p$, 4$p$, . . .), from the list, since they are multiples of $p$ and are therefore not prime numbers. After eliminating the multiples of $p$, we find the first number after $p$ that has not yet been eliminated, as it must be the next prime number. We assign this new prime number to $p$, print it, and eliminate its multiples from the list, and so on.\n\nWe repeat this procedure until $p^2$ is greater than or equal to $100$. The numbers that remain in the list are prime numbers, and we finish by printing them out.\n\nWrite a complete C program that uses the *Sieve of Eratosthenes* algorithm to print all prime numbers less than 100. Your implementation must not use the `%` (modulo) operator. The output of your program should be:\n<pre>\n2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97\n</pre>\n\n**Hint:** Use an array of size $100$ to keep track of whether an integer has been eliminated or not.\n",
      "starter-code": "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n  int sieve[100] = {0}, i, p = 2;\n  while (p < sqrt(100)) {\n    printf(\"%d \", p);\n    i = 2;\n    while (i * p < 100) {\n      sieve[i * p] = 1;\n      i++;\n    }\n    p++;\n    while (sieve[p] == 1) {\n      p++;\n    }\n  }\n  for (; p < 100; p++)\n    if (sieve[p] == 0) printf(\"%d \", p);\n  printf(\"\\n\");\n}\n",
      "testcases": [
        {
          "input": [
            "\n"
          ],
          "output": [
            "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97\n"
          ]
        }
      ]
    }
  ]
};