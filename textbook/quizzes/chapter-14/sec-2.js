let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the main idea behind the selection sort algorithm?",
      "answer": [
        1
      ],
      "distractors": [
        "It iterates through the array and inserts each element into its correct position.",
        "It finds the maximum element from the unsorted part of the array and swaps it with the last element of the unsorted part.",
        "It repeatedly divides the array into smaller subarrays and merges them in a sorted order.",
        "It compares adjacent elements and swaps them if they are in the wrong order."
      ],
      "explainations": [
        "A is incorrect. The main idea behind the selection sort algorithm is to find the maximum (or minimum, depending on the sorting order) element from the unsorted part of the array and swap it with the last element of the unsorted part. This process gradually builds a sorted subarray at the end of the array. By iteratively selecting the maximum element and moving it to its correct position, the algorithm sorts the entire array.",
        "B is correct. The main idea behind the selection sort algorithm is to find the maximum (or minimum, depending on the sorting order) element from the unsorted part of the array and swap it with the last element of the unsorted part. This process gradually builds a sorted subarray at the end of the array. By iteratively selecting the maximum element and moving it to its correct position, the algorithm sorts the entire array.",
        "C is incorrect. The main idea behind the selection sort algorithm is to find the maximum (or minimum, depending on the sorting order) element from the unsorted part of the array and swap it with the last element of the unsorted part. This process gradually builds a sorted subarray at the end of the array. By iteratively selecting the maximum element and moving it to its correct position, the algorithm sorts the entire array.",
        "D is incorrect. The main idea behind the selection sort algorithm is to find the maximum (or minimum, depending on the sorting order) element from the unsorted part of the array and swap it with the last element of the unsorted part. This process gradually builds a sorted subarray at the end of the array. By iteratively selecting the maximum element and moving it to its correct position, the algorithm sorts the entire array."
      ]
    },
    {
      "prompt": "Jade is trying to implement selection sort in another way. What will the array look like after the third iteration of the outer loop? (Assume the input array is `9, 5, 18, 8, 5, 2`.)\n\n```\nvoid selectionSort(int list[], int n) {\n    for (int round = 0; round < n / 2; round++) {\n        int index1 = round;\n        int index2 = n - round - 1;\n        for (int i = round; i < n - round; i++) {\n            if (list[i] > list[index1]) {\n                index1 = i;\n            }\n            if (list[i] < list[index2]) {\n                index2 = i;\n            }\n        }\n        swap(&list[index1], &list[n - round - 1]);\n        if (index2 == n - round - 1) {\n            swap(&list[index1], &list[round]);\n        } else {\n            swap(&list[index2], &list[round]);\n        }\n\n        // print array here\n    }\n  \n}\n```\n",
      "answer": [
        3
      ],
      "distractors": [
        "9 5 2 8 5 18",
        "5 5 2 8 9 18",
        "2 5 9 8 5 18",
        "2 5 5 8 9 18"
      ],
      "explainations": [
        "A is incorrect. The implementation essentially finds the maximum and minimum elements from the unsorted part of the array and swaps them with the last and first elements of the unsorted part, respectively. After the third iteration of the outer loop, the array will look like `2 5 5 8 9 18`.",
        "B is incorrect. The implementation essentially finds the maximum and minimum elements from the unsorted part of the array and swaps them with the last and first elements of the unsorted part, respectively. After the third iteration of the outer loop, the array will look like `2 5 5 8 9 18`.",
        "C is incorrect. The implementation essentially finds the maximum and minimum elements from the unsorted part of the array and swaps them with the last and first elements of the unsorted part, respectively. After the third iteration of the outer loop, the array will look like `2 5 5 8 9 18`.",
        "D is correct. The implementation essentially finds the maximum and minimum elements from the unsorted part of the array and swaps them with the last and first elements of the unsorted part, respectively. After the third iteration of the outer loop, the array will look like `2 5 5 8 9 18`."
      ]
    }
  ]
};