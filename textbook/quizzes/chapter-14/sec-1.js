let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Insertion sort needs two loops. What is the purpose of the inner loop in the insertion sort algorithm? (Assume the array is to be sorted in ascending order.)",
      "answer": [
        3
      ],
      "distractors": [
        "To compare each element with the previous element and swap if necessary.",
        "To iterate through the array and insert each element into its correct position.",
        "To track the index of the element currently being inserted into its correct position.",
        "To shift all elements greater than the current item to the right."
      ],
      "explainations": [
        "A is incorrect. The inner loop is to shift all elements greater than the current item to the right.",
        "B is incorrect. The inner loop is to shift all elements greater than the current item to the right.",
        "C is incorrect. The inner loop is to shift all elements greater than the current item to the right.",
        "D is correct. The inner loop is to shift all elements greater than the current item to the right."
      ]
    },
    {
      "prompt": "Jade is trying to implement insertion sort in another way as shown below. They intend to sort the array from right to left (not left to right). What will the array look like after the fourth iteration of the outer loop? (Assume the input array is `9, 2, 6, 5, 1, 7`.)\n\n```\nvoid insertionSort(int A[], int listLength) {\n    int top;\n\n    for (top = listLength - 1; top >= 0; top--) {\n        int item = A[top];\n        int ind = top;\n\n        while (ind < listLength - 1 && item > A[ind + 1]) {\n            A[ind] = A[ind + 1];  \n            ind++;\n        }\n\n        A[ind] = item;\n        // print array here\n    }\n}\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "9 2 6 5 1 7",
        "9 2 6 1 5 7",
        "9 2 1 5 6 7",
        "1 2 5 6 7 9"
      ],
      "explainations": [
        "A is incorrect. The code essentially does the same thing as insertion sort, but it starts from the end of the array and works backwards. After the forth iteration, the last 4 elements should be sorted with respect to one another. The correct answer is 9 2 1 5 6 7.",
        "B is incorrect. The code essentially does the same thing as insertion sort, but it starts from the end of the array and works backwards. After the forth iteration, the last 4 elements should be sorted with respect to one another. The correct answer is 9 2 1 5 6 7.",
        "C is correct. The code essentially does the same thing as insertion sort, but it starts from the end of the array and works backwards. After the forth iteration, the last 4 elements should be sorted with respect to one another. The correct answer is 9 2 1 5 6 7.",
        "D is incorrect. The code essentially does the same thing as insertion sort, but it starts from the end of the array and works backwards. After the forth iteration, the last 4 elements should be sorted with respect to one another. The correct answer is 9 2 1 5 6 7."
      ]
    }
  ]
};