let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "chapter-15-Q1",
      "title": "Question 1.7 in Fall 2011",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "Your task is to complete the function below so that it contains a non-recursive implementation of the binary search algorithm. The parameter `values` is an array of `int` type variables. The items in the values array have been sorted into descending (non-ascending) order. Parameter `n` is the number of elements in the `values` array. Parameter `item` is the item being searched for in the values array.\n\nThe function should return -1 if `item` is not found in the array. Otherwise, the function should return the index position within the array at which `item` is found.\n\n**Important:** your function should assume that `values` is a sorted array in descending (non-ascending) order.\n\n**Important:** Your solution must **not** use recursion.\n",
      "starter-code": "#include <stdio.h>\n\nint binSearch(int values[], int n, int item) {\n  int left = 0;\n  int right = n - 1;\n  while (left <= right) {\n    int middle = (left + right) / 2;\n    if (item == values[middle]) return middle;\n\n    // WRITE YOUR CODE HERE:\n\n  }\n}\n",
      "answer": "#include <stdio.h>\n\nint binSearch(int values[], int n, int item) {\n  int left = 0;\n  int right = n - 1;\n  while (left <= right) {\n    int middle = (left + right) / 2;\n    if (item == values[middle]) return middle;\n    // SOLUTION:\n    if (item < values[middle])\n      left = middle + 1;\n    else\n      right = middle - 1;\n  }\n  return -1;\n}\n",
      "main-function": "int main(void) {\n    int n, item;\n    scanf(\"%d\", &n);\n\n    int values[n];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &values[i]);\n    }\n\n    scanf(\"%d\", &item);\n\n    int index = binSearch(values, n, item);\n    printf(\"%d\\n\", index);\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "5\n100 90 75 50 25\n75\n"
          ],
          "output": [
            "2\n"
          ]
        },
        {
          "input": [
            "5\n200 150 120 100 50\n150"
          ],
          "output": [
            "1"
          ]
        },
        {
          "input": [
            "4\n40 30 20 10\n25\n"
          ],
          "output": [
            "-1\n"
          ]
        },
        {
          "input": [
            "5\n100 90 75 50 25\n100\n"
          ],
          "output": [
            "0"
          ]
        },
        {
          "input": [
            "5\n100 90 75 50 25\n25\n"
          ],
          "output": [
            "4"
          ]
        },
        {
          "input": [
            "1\n42\n100\n"
          ],
          "output": [
            "-1"
          ]
        }
      ]
    }
  ]
};