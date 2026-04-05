let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the key requirement for binary search to work correctly?",
      "answer": [
        0
      ],
      "distractors": [
        "The array must be sorted.",
        "The array must not be very large.",
        "The array must have unique elements.",
        "The array can be unsorted."
      ],
      "explainations": [
        "A is correct. Binary search requires the array to be sorted.",
        "B is incorrect. The array can be very large. The advantage of binary search is that it is very efficient for large arrays.",
        "C is incorrect. The array can have duplicate elements.",
        "D is incorrect. The array must be sorted."
      ]
    },
    {
      "prompt": "Jade is trying to implement the binary search function recursively, but she mistakenly wrote the following code:\n\n```\nint binarySearchHelper(int list[], int low, int high, int item) {\n  if (high <= low)  // Jade's mistake is that she added an equal sign here\n    return -1;\n\n  int middle = (low + high) / 2;\n  if (item == list[middle])  // success\n    return middle;\n\n  else if (item < list[middle])  // try bottom half\n    return binarySearchHelper(list, low, middle - 1, item);\n\n  else  // try top half\n    return binarySearchHelper(list, middle + 1, high, item);\n}\n```\n\nIf the array has `1, 3, 5, 7, 9, 10, 12`, which of these elements can be found correctly by Jade's code?\n",
      "answer": [
        2
      ],
      "distractors": [
        "1, 3, 5, 7, 9, 10, 12",
        "1, 5, 9, 12",
        "3, 7, 10",
        "1, 12"
      ],
      "explainations": [
        "A is incorrect. The problem is that the code will not find the element when it has been narrowed down to a single element (low == high). In this case, 1, 5, 9, 12 will not be found. Since 3, 7, 10 are at the middle position when the array is narrowed down, they can be found.",
        "B is incorrect. The problem is that the code will not find the element when it has been narrowed down to a single element (low == high). In this case, 1, 5, 9, 12 will not be found. Since 3, 7, 10 are at the middle position when the array is narrowed down, they can be found.",
        "C is correct. The problem is that the code will not find the element when it has been narrowed down to a single element (low == high). In this case, 1, 5, 9, 12 will not be found. Since 3, 7, 10 are at the middle position when the array is narrowed down, they can be found.",
        "D is incorrect. The problem is that the code will not find the element when it has been narrowed down to a single element (low == high). In this case, 1, 5, 9, 12 will not be found. Since 3, 7, 10 are at the middle position when the array is narrowed down, they can be found."
      ]
    }
  ]
};