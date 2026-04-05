let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the main idea behind the bubble sort algorithm?",
      "answer": [
        1
      ],
      "distractors": [
        "It divides the array into subarrays and merges them in a sorted order.",
        "It compares each pair of adjacent elements and swaps them if they are in the wrong order.",
        "It finds the maximum or minimum element and moves it to the end of the unsorted part.",
        "It selects a pivot element and partitions the array into two parts for recursive sorting."
      ],
      "explainations": [
        "A is incorrect. The main idea behind the bubble sort algorithm is to compare each pair of adjacent elements in the array and swap them if they are in the wrong order. By repeatedly performing these comparisons and swaps, the smaller elements gradually *bubble* to the top of the list, while the larger elements *sink* to the bottom. This process is repeated until the entire list is sorted.",
        "B is correct. The main idea behind the bubble sort algorithm is to compare each pair of adjacent elements in the array and swap them if they are in the wrong order. By repeatedly performing these comparisons and swaps, the smaller elements gradually *bubble* to the top of the list, while the larger elements *sink* to the bottom. This process is repeated until the entire list is sorted.",
        "C is incorrect. The main idea behind the bubble sort algorithm is to compare each pair of adjacent elements in the array and swap them if they are in the wrong order. By repeatedly performing these comparisons and swaps, the smaller elements gradually *bubble* to the top of the list, while the larger elements *sink* to the bottom. This process is repeated until the entire list is sorted.",
        "D is incorrect. The main idea behind the bubble sort algorithm is to compare each pair of adjacent elements in the array and swap them if they are in the wrong order. By repeatedly performing these comparisons and swaps, the smaller elements gradually *bubble* to the top of the list, while the larger elements *sink* to the bottom. This process is repeated until the entire list is sorted."
      ]
    },
    {
      "prompt": "Jade is trying to apply the bubble sort algorithm on 2D arrays. She has written the following code:\n```\nvoid bubbleSort(int n, int list[][n]) {\n    bool sorted = false;\n    \n    for (int j = 0; j < n; j++) {\n        for (int top = n - 1; top > 0 && !sorted; top--) {\n            sorted = true;\n            for (int i = 0; i < top; i++) {\n                if (list[j][i] > list[j][i + 1]) {\n                    swap(&list[j][i], &list[j][i + 1]);\n                    sorted = false;\n                }\n            }\n        }   \n    }\n\n    sorted = false;\n    for (int j = 0; j < n; j++) {\n       for (int top = n - 1; top > 0 && !sorted; top--) {\n            sorted = true;\n            for (int i = 0; i < top; i++) {\n                if (list[i][j] > list[i + 1][j]) {\n                    swap(&list[i][j], &list[i + 1][j]);\n                    sorted = false;\n                }\n            }\n        } \n    }\n    // print array here\n}\n```\nAssume the input array is `{{10, 6, 3, 2}, {9, 15, 1, 12}, {5, 4, 8, 7}, {11, 13, 14, 16}}`, what is the output array after applying this bubble sort algorithm?\n",
      "answer": [
        2
      ],
      "distractors": [
        "```\n2 3 6 10 \n1 9 12 15 \n5 4 8 7 \n11 13 14 16\n```\n",
        "```\n10 6 3 2 \n9 15 1 12 \n5 4 8 7 \n11 13 14 16 \n```\n",
        "```\n1 3 6 10 \n2 9 12 15 \n5 4 8 7 \n11 13 14 16\n```\n",
        "```\n11 15 3 2 \n10 13 1 12 \n9 6 8 7 \n5 4 14 16\n```\n"
      ],
      "explainations": [
        "A is incorrect. The implementation essentially performs two bubble sort algorithms on the array. The first one sorts the rows of the array, while the second one sorts the columns of the array.",
        "B is incorrect. The implementation essentially performs two bubble sort algorithms on the array. The first one sorts the rows of the array, while the second one sorts the columns of the array.",
        "C is correct. The implementation essentially performs two bubble sort algorithms on the array. The first one sorts the rows of the array, while the second one sorts the columns of the array.",
        "D is incorrect. The implementation essentially performs two bubble sort algorithms on the array. The first one sorts the rows of the array, while the second one sorts the columns of the array."
      ]
    }
  ]
};