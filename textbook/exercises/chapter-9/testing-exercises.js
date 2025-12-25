let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "chapter-9-Q1",
      "title": "Question 10 in Winter 2017 Final Exam",
      "difficulty": "Intermediate",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "\nYou are to write a function that sets a rectangular portion of a 2-dimensional array to a specific value. The function takes the following as input parameters: an integer 1000 $\\times$ 1000 2-dimensional array called `A`, four integer parameters named `rowStart`, `rowEnd`, `colStart`, and `colEnd` and an integer parameter `value`.\n\nThe purpose of the function is to set the value of the array elements in `A` beginning with `A[rowStart][colStart]` and ending with `A[rowEnd][colEnd]` to be the value `value`. The\npicture below illustrates that the shaded portion of the array should have its elements changed to value, for the specific example given:\n\n```{figure} _images/winter17-q10-image.png\n```\n\nHowever, this function is to he used by students in a first year C programming course, and those students are well-known for writing code that has errors. For example, they often attempt to access elements of an array outside of its defined bounds, among other problems. Therefore, your function should check that the inputs to the function are correct before performing the above operation. You must determine, through the reading of this question, what would make the inputs `rowStart`, `rowEnd`, `colStart`, `colEnd` and `value` correct. (You can assume that the array `A` is passed in correctly.)\n\nThe function should return a boolean result that is set to `true` if the inputs are valid, and `false` if they are not. In the case that the inputs are not valid, the setting of the values of the array should not be attempted.\n\n**IMPORTANT:** Your solution, in addition to the code for the function described above, should also show how you would call this function from the main function, and **make use of its return value**. That is, you should show the call to the function (with appropriately declared variables, and gathering input from the user for `rowStart`, `rowEnd`, `colStart`, `colEnd` and `value`) and make appropriate use of the returned boolean value.\n",
      "starter-code": "#include <stdbool.h>\n#include <stdio.h>\n\nbool initSectionInArray(// Your Code Here) {\n                  \n  // Your Code Here\n\n}\n\nint main(void) {\n\n  // Your Code Here\n\n}\n",
      "answer": "#include <stdbool.h>\n#include <stdio.h>\nbool checkBound(int start, int end) {\n  // not every check here is strictly necessary\n  if (start > end) return false;\n  if (start < 0 || start > 999) return false;\n  if (end < 0 || end > 999) return false;\n  return true;\n}\nbool initSectionInArray(int A[1000][1000], int rowStart, int rowEnd,\n                        int colStart, int colEnd, int value) {\n  if (!checkBound(rowStart, rowEnd)) return false;\n  if (!checkBound(colStart, colEnd)) return false;\n  for (int i = rowStart; i <= rowEnd; i++)\n    for (int j = colStart; j <= colEnd; j++) A[i][j] = value;\n  return true;\n}\nint main(void) {\n  int x1, x2, y1, y2, v, a[1000][1000];\n  printf(\"Enter x1, x2, y1, y2, v\\n\");\n  scanf(\"%d%d%d%d%d\", &x1, &x2, &y1, &y2, &v);\n  if (initSectionInArray(a, x1, x2, y1, y2, v))\n    printf(\"Success!\\n\");\n  else {\n    printf(\"Failure - something wrong with input indices\\n\");\n    return (1);\n  }\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "0 1 0 1 7\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nSuccess!\n"
          ]
        },
        {
          "input": [
            "999 999 999 999 42\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nSuccess!\n"
          ]
        },
        {
          "input": [
            "5 2 0 3 9\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nFailure - something wrong with input indices\n"
          ]
        },
        {
          "input": [
            "0 2 9 3 1\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nFailure - something wrong with input indices\n"
          ]
        },
        {
          "input": [
            "-1 5 0 3 8\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nFailure - something wrong with input indices\n"
          ]
        },
        {
          "input": [
            "0 5 0 1000 8\n"
          ],
          "output": [
            "Enter x1, x2, y1, y2, v\nFailure - something wrong with input indices\n"
          ]
        }
      ]
    },
    {
      "question-id": "chapter-9-Q2",
      "title": "Question 9 in Winter 2022 Final Exam",
      "difficulty": "Intermediate",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "Write a C function called `borderSum` that adds all the border elements of the top-left 2D $n \\times n$ square matrix **inside** a 2D square array. For example, for the array below, if `n` is `3`, we should add `{1, 2, 3, 7, 11, 10, 9, 5}` and return `48`. If `n` is `0`, the function should return `0`. If `n` is `1`, the function should return the top-left element, which is `1` for the array below.\n\n<pre>\n 1    2     3     4 \n 5    6     7     8 \n 9   10    11    12 \n13   14    15    16 \n</pre>\n\nThe header of the `borderSum` function is provided below, where `26` is the number of rows and columns in the 2D array `mat`, and `n` is the size of the square matrix to which we need to get the sum of its border. You can safely assume `n` $\\leq$ `26`.\n\n",
      "starter-code": "\n#include <stdio.h>\n\nint borderSumAlt(int mat[][26], int n) {\n\n  // Your Code Here\n\n}\n",
      "answer": "\n// Solution 1\nint borderSum(int mat[][26], int n) {\n  int sum = 0;\n  if (n == 0)\n    return 0;\n  else if (n == 1)\n    return mat[0][0];\n  else {\n    for (int i = 0; i < n; i++)\n      sum += mat[i][0] + mat[0][i] + mat[n - 1][i] + mat[i][n - 1];\n  }\n  return sum - mat[0][0] - mat[n - 1][n - 1] - mat[0][n - 1] - mat[n - 1][0];\n}\n\n// Solution 2\nint borderSum(int mat[][26], int n) {\n  int sum = 0, row, col;\n  if (n == 0) {\n    return 0;\n  } else if (n == 1) {\n    sum = mat[0][0];\n  } else if (n == 2) { //unnecessary else-if, but fine if it is there\n    sum = mat[0][0] + mat[0][1] + mat[1][0] + mat[1][1];\n  } else {\n    for (col = 0; col < n; col++) {\n      sum += mat[0][col] + mat[n - 1][col];\n    }\n    for (row = 1; row < n - 1; row++) {\n      sum += mat[row][0] + mat[row][n - 1];\n    }\n  }\n  return sum;\n}\n",
      "main-function": "int main(void) {\n    int n;\n    int mat[26][26];\n\n    if (scanf(\"%d\", &n) != 1) return 0;\n\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            scanf(\"%d\", &mat[i][j]);\n        }\n    }\n\n    printf(\"%d\\n\", borderSum(mat, n));\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "2\n1 2\n3 4\n"
          ],
          "output": [
            "10\n"
          ]
        },
        {
          "input": [
            "3\n1 2 3\n4 5 6\n7 8 9"
          ],
          "output": [
            "40\n"
          ]
        },
        {
          "input": [
            "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n"
          ],
          "output": [
            "102\n"
          ]
        },
        {
          "input": [
            "3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9\n"
          ],
          "output": [
            "-40\n"
          ]
        },
        {
          "input": [
            "3\n1 -2 3\n-4 5 -6\n7 -8 9\n"
          ],
          "output": [
            "0\n"
          ]
        },
        {
          "input": [
            "0\n"
          ],
          "output": [
            "0\n"
          ]
        },
        {
          "input": [
            "1\n5\n"
          ],
          "output": [
            "5\n"
          ]
        }
      ]
    },
    {
      "question-id": "chapter-9-Q3",
      "title": "Question 4 in Winter 2020 Final Exam",
      "difficulty": "Intermediate",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "For artificial intelligence (AI) that uses recently developed “neural network” techniques, layers of “neurons” pass their values, weighted by multipliers, into the next layers. Finding those weights is, of course, the more difficult and computationally intensive part, but once you have them, the use is relatively simple array multiplication.\n\nHere we will work with two layers to do the last stages and to compute values for the output. For example, the output could be the likelihood that the inputs are from the picture of one of four animals: dog, cat, pig, beaver. This net will “recognize” which of these it is by choosing the output of highest value. Here is a diagram that represents what we are doing:\n\n```{figure} _images/winter20-q4-image.png\n```\n\nYou will generate the function to perform the operation shown starting with the code below that includes the `w1` and `w2` weight arrays and that takes an input array. The input is one-dimensional, size 6. `w1` and `w2` are two-dimensional: `w1` is $6$ by $7$. `w2` is $7$ by $4$. The output is\none-dimensional and of size $4$.\n\n**Note:** To multiply a `N`$\\times$`1` array `A`, by an `M`$\\times$`N` array `B`, to get an `M`$\\times$`1` array `C`:\n\n<pre>\nC[0] = A[0] * B[0,0] + A[1] * B[0,1] + A[2] * B[0,2] + ... + A[N-1] * B[0,N-1]\nC[1] = A[0] * B[1,0] + A[1] * B[1,1] + A[2] * B[1,2] + ... + A[N-1] * B[1,N-1]\n...\nC[M-1] = A[0] * B[M-1, 0] + A[1] * B[M-1, 1] + A[2] * B[M-1, 2]+ ... + A[N-1] * B[M-1, N-1]\n</pre>\n\nHere is an example use of the function. \n\n```{code-block} c\ndouble inData[] = {10, 11, 14, 51, 22, 24};\ndouble outData[4];\nperformAI(inData, outData);\n```\n",
      "starter-code": "\n#include <stdio.h>\n// this function uses a one-dimensional input array of size 6, and\n// puts values into the one-dimensional output array of size 4\nvoid performAI(double *inArray, double *outArray) {\n  // these are the weighting arrays as in the diagram\n  double w1[6][7] = {{0.795279571, 0.565454091, 0.569392801, 0.649519912,\n                      0.311228459, 0.869033219, 0.963890145},\n                     {0.261182548, 0.967901447, 0.015463096, 0.101966965,\n                      0.454071297, 0.396147575, 0.853833996},\n                     {0.976180547, 0.762522649, 0.223067359, 0.120228416,\n                      0.710471648, 0.220771538, 0.052876278},\n                     {0.173285965, 0.795507616, 0.258332188, 0.813302777,\n                      0.528470338, 0.885245811, 0.190564347},\n                     {0.14018923, 0.324797853, 0.012649753, 0.928397252,\n                      0.048519668, 0.321836138, 0.360198988},\n                     {0.063248883, 0.72395506, 0.606492812, 0.435057638,\n                      0.462896967, 0.12061378, 0.28806367}};\n  double w2[7][4] = {{0.036340161, 0.702081192, 0.406643568, 0.383400727},\n                     {0.786459022, 0.627286192, 0.190417846, 0.259622675},\n                     {0.996272492, 0.115783107, 0.922042574, 0.805576672},\n                     {0.254649714, 0.818737484, 0.23760355, 0.884876231},\n                     {0.587934606, 0.566762923, 0.254228386, 0.735145224},\n                     {0.709219708, 0.815306359, 0.395073347, 0.191438772},\n                     {0.743663242, 0.969784133, 0.055612809, 0.992284824}};\n  \n  // TODO: your code here\n\n};\n\n",
      "answer": "\nvoid performAI(double *inArray, double *outArray) {\n  // these are the weighting arrays as in the diagram\n  double w1[6][7] = {{0.795279571, 0.565454091, 0.569392801, 0.649519912,\n                      0.311228459, 0.869033219, 0.963890145},\n                     {0.261182548, 0.967901447, 0.015463096, 0.101966965,\n                      0.454071297, 0.396147575, 0.853833996},\n                     {0.976180547, 0.762522649, 0.223067359, 0.120228416,\n                      0.710471648, 0.220771538, 0.052876278},\n                     {0.173285965, 0.795507616, 0.258332188, 0.813302777,\n                      0.528470338, 0.885245811, 0.190564347},\n                     {0.14018923, 0.324797853, 0.012649753, 0.928397252,\n                      0.048519668, 0.321836138, 0.360198988},\n                     {0.063248883, 0.72395506, 0.606492812, 0.435057638,\n                      0.462896967, 0.12061378, 0.28806367}};\n  double w2[7][4] = {{0.036340161, 0.702081192, 0.406643568, 0.383400727},\n                     {0.786459022, 0.627286192, 0.190417846, 0.259622675},\n                     {0.996272492, 0.115783107, 0.922042574, 0.805576672},\n                     {0.254649714, 0.818737484, 0.23760355, 0.884876231},\n                     {0.587934606, 0.566762923, 0.254228386, 0.735145224},\n                     {0.709219708, 0.815306359, 0.395073347, 0.191438772},\n                     {0.743663242, 0.969784133, 0.055612809, 0.992284824}};\n  double midarray[7];\n  int i, j;\n\n  for (i = 0; i < 7; i++) {\n    midarray[i] = 0.0;\n    for (j = 0; j < 6; j++) {\n      midarray[i] += inArray[j] * w1[j][i];\n    }\n  }\n  for (i = 0; i < 4; i++) {\n    outArray[i] = 0.0;\n    for (j = 0; j < 7; j++) {\n      outArray[i] += midarray[j] * w2[j][i];\n    }\n  }\n}\n\n",
      "main-function": "int main(void) {\n\n  double inData[] = {10, 11, 14, 51, 22, 24};\n  double outData[4];\n  performAI(inData, outData);\n\n    for (int i = 0; i < 4; i++) {\n      printf(\"%lf \", outData[i]);\n  }\n  printf(\"\\n\");\n\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            ""
          ],
          "output": [
            "248.559943 289.010956 131.623340 240.160414 \n"
          ]
        }
      ]
    },
    {
      "question-id": "chapter-9-Q4",
      "title": "Question 11 in Fall 2015 Final Exam",
      "difficulty": "Challenging",
      "type": "function programming",
      "table": false,
      "multipart": false,
      "question": "Pictures that come from a smartphone camera can be represented as a two-dimensional array of numbers, where each number corresponds to the colour of each pixel in the picture. These cameras suffer from various effects that cause errors in the colour they measure (this variation is often called ‘noise’) which makes the picture have poor quality. One way to reduce that noise is to average each pixel with the eight pixels that surround it.\n\nIn this question, you will write a C-language function that takes in such an image as an array, `A`, of 100 by 100 of double-type numbers. It computes the ‘averaged’ array, `B`, which is a slightly smaller 98 by 98 array in which each element is the computed average of 9 pixels in the input array.\n\nThe figure below illustrates the computation for a smaller example version of `A` (a 6 $\\times$ 6 array) that would produce a 4 $\\times$ 4 array `B`. (The reason that `B` is smaller than `A` by 2 is that, at the edges of `A`, there are not enough “surrounding” pixels to produce a full result for `B`).\n\n```{figure} _images/fall15-q11-final-image.png\n\n```\n\nThe computation can also be described by these examples: the element `B00` of the output array `B` is computed as the arithmetic average of the 9 elements of `A` that are shaded in the upper left corner of array `A` in the above figure. That is, `B00` is the average the nine elements surrounding and including element `A11` (i.e. `A00`, `A01`, `A02`, `A10`, `A11`, `A12`, `A20`, `A21`, `A22`). Similarly, `B01`\nis the average of the 9 elements surrounding and including `A12`. `B02` is the average of the 9 surrounding/including to `A13`. `B10` is the average of the 9 surrounding/including `A21`. As a final example, `B33` is the average of the 9 surrounding/including `A44`, the set of which is illustrated as the shaded section of the lower right hand set of values in the array `A` above.\n\nYou are to write a C function with a prototype as follows:\n\n```{code-block} c\nvoid averageImage(double A[100][100], double B[98][98]);\n```\n\nWhere `A` is the input array, and `B` is the array that the function computes. A specific requirement is that you must use one or more loops to compute the average of the 9 elements of A. That is, you must not explicitly write out the sum of nine separate elements of `A` to compute each element of `B`.\n",
      "starter-code": "#include <stdio.h>\n\nvoid averageImage(double A[100][100], double B[98][98]) {\n\n  // Your Code Here\n\n}\n",
      "answer": "void averageImage(double A[100][100], double B[98][98]) {\n  double sum;\n  for (int i = 0; i < 98; i++) {\n    for (int j = 0; j < 98; j++) {\n      sum = 0.0;\n      for (int k = 0; k < 3; k++) {\n        for (int m = 0; m < 3; m++) sum = sum + A[i + k][j + m];\n      }\n      B[i][j] = sum / 9.0;\n    }\n  }\n}\n",
      "main-function": "int main(void) {\n    double A[100][100] = {0};\n    double B[98][98] = {0};\n\n    // Example: fill a small 5x5 portion for testing\n    int val = 1;\n    for (int i = 0; i < 5; i++)\n        for (int j = 0; j < 5; j++)\n            A[i][j] = val++;\n\n    averageImage(A, B);\n\n    // Print 3x3 portion of B corresponding to the 5x5 A\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%.2lf \", B[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            ""
          ],
          "output": [
            "7.00 8.00 9.00 \n12.00 13.00 14.00 \n17.00 18.00 19.00 \n"
          ]
        }
      ]
    },
    {
      "question-id": "chapter-9-Q5",
      "title": "Question 15 in Fall 2014 Final Exam",
      "difficulty": "Challenging",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "Consider the C program given, in part, below. It declares an integer array of dimensions `SIZE` $\\times$ `SIZE`, where `SIZE` is a defined constant as shown. The first part of the main program calls the `fillArray` function which sets each element of the array to the value $0$, $1$, or $2$. The program then asks the user to provide a value, $n$, which must be an odd integer. (You can assume that the user does enter an odd number, and that `n >= 1` and `n <= SIZE`.) The goal of the program is to find all patterns of crosses of size `n` in the array of all `1` or `2`. For example, in the array shown below the code, there is a cross of size `n = 3` of `1` centered at indices `row = 2`, `column = 4`, a cross of size `n = 3` of `2` centered at indices `row = 5`, `column = 8`, and another one centered at indices `row = 6`, `column = 2`.\n\n```{code-block} c\n#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n\n#define SIZE 10\n\nint main(void) {\n  int array[SIZE][SIZE];\n  int n;\n  fillArray(array);\n  printf(\"Enter Cross Size to search (must be odd): \");\n  scanf(\"%d\", &n);\n  // Your main program code would go here\n  return 0;\n}\n```\n\nExample array:\n\n```{figure} _images/cross-pattern.png\n```\n\nThe output of program is as follows, if the array above was the input, and `n = 3`:\n<pre>\nFound Cross of Size 3 of 1 at (2,4)\nFound Cross of Size 3 of 2 at (5,8)\nFound Cross of Size 3 of 2 at (6,2)\n</pre>\n\nYour answer should consist of the code that goes inside the main program above, and additional functions. Your answer must make use of at least one function. You do not need to rewrite the C code provided to you in the space below.\n",
      "starter-code": "#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n\n#define SIZE 10\n\nvoid fillArray(int array[SIZE][SIZE]) {\n    int preset[SIZE][SIZE] = {\n        {0,0,0,0,0,1,0,0,0,0},\n        {0,0,0,0,1,1,0,0,0,0},\n        {0,0,0,1,1,1,0,0,0,0},\n        {0,0,0,0,1,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,2,0},\n        {0,0,2,0,0,0,0,2,2,2},\n        {0,2,2,2,0,0,0,0,2,0},\n        {0,0,2,0,0,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,0,0}\n    };\n    for(int i = 0; i < SIZE; i++)\n        for(int j = 0; j < SIZE; j++)\n            array[i][j] = preset[i][j];\n}\n\nbool findCross(int array[SIZE][SIZE], int n, int searchNum, int row, int col) {\n\n  // TO-DO: Implement findCross function here\n\n}\n\nint main(void) {\n  int array[SIZE][SIZE];\n  int n;\n  fillArray(array);\n  printf(\"Enter Cross Size to search (must be odd): \");\n  scanf(\"%d\", &n);\n  \n  // TO-DO: main program code here\n  \n  return 0;\n}\n",
      "answer": "#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n\n#define SIZE 10\n\nvoid fillArray(int array[SIZE][SIZE]) {\n    int preset[SIZE][SIZE] = {\n        {0,0,0,0,0,1,0,0,0,0},\n        {0,0,0,0,1,1,0,0,0,0},\n        {0,0,0,1,1,1,0,0,0,0},\n        {0,0,0,0,1,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,2,0},\n        {0,0,2,0,0,0,0,2,2,2},\n        {0,2,2,2,0,0,0,0,2,0},\n        {0,0,2,0,0,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,0,0},\n        {0,0,0,0,0,0,0,0,0,0}\n    };\n    for(int i = 0; i < SIZE; i++)\n        for(int j = 0; j < SIZE; j++)\n            array[i][j] = preset[i][j];\n}\n\nbool findCross(int array[SIZE][SIZE], int n, int searchNum, int row, int col) {\n  /* look across one column */\n  bool found = true;\n  int start, end;\n  start = row - n / 2;\n  end = row + n / 2;\n  // first check if size precludes the result\n  if (start >= 0 && end < SIZE) {\n    // now look and see if the right number in a row\n    for (int k = start; k <= end && found; k++)\n      if (array[k][col] != searchNum) found = false;\n  } else\n    found = false;\n  // look across row\n  start = col - n / 2;\n  end = col + n / 2;\n  // first check if size precludes the result\n  if (start >= 0 && end < SIZE) {\n    // now look and see if the right number in a column\n    for (int k = start; k <= end && found; k++)\n      if (array[row][k] != searchNum) found = false;\n  } else\n    found = false;\n  return found;\n}\n\nint main(void) {\n  int array[SIZE][SIZE];\n  int n;\n  fillArray(array);\n  printf(\"Enter Cross Size to search (must be odd): \");\n  scanf(\"%d\", &n);\n  for (int row = 0; row < SIZE; row++)\n    for (int col = 0; col < SIZE; col++) {\n      if (findCross(array, n, 1, row, col))\n        printf(\"Found Cross of Size %d of %d at (%d,%d)\\n\", n, 1, row, col);\n      if (findCross(array, n, 2, row, col))\n        printf(\"Found Cross of Size %d of %d at (%d,%d)\\n\", n, 2, row, col);\n    }\n  return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "3\n"
          ],
          "output": [
            "Enter Cross Size to search (must be odd):\n Found Cross of Size 3 of 1 at (2,4)\nFound Cross of Size 3 of 2 at (5,8)\nFound Cross of Size 3 of 2 at (6,2)\n"
          ]
        },
        {
          "input": [
            "1\n"
          ],
          "output": [
            "Enter Cross Size to search (must be odd):\n Found Cross of Size 1 of 1 at (0,5)\nFound Cross of Size 1 of 1 at (1,4)\nFound Cross of Size 1 of 1 at (1,5)\nFound Cross of Size 1 of 1 at (2,3)\nFound Cross of Size 1 of 1 at (2,4)\nFound Cross of Size 1 of 1 at (2,5)\nFound Cross of Size 1 of 1 at (3,4)\nFound Cross of Size 1 of 2 at (4,8)\nFound Cross of Size 1 of 2 at (5,2)\nFound Cross of Size 1 of 2 at (5,7)\nFound Cross of Size 1 of 2 at (5,8)\nFound Cross of Size 1 of 2 at (5,9)\nFound Cross of Size 1 of 2 at (6,1)\nFound Cross of Size 1 of 2 at (6,2)\nFound Cross of Size 1 of 2 at (6,3)\nFound Cross of Size 1 of 2 at (6,8)\nFound Cross of Size 1 of 2 at (7,2)\n"
          ]
        },
        {
          "input": [
            "5\n"
          ],
          "output": [
            "Enter Cross Size to search (must be odd):\n"
          ]
        }
      ]
    }
  ]
};