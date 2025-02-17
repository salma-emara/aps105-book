let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the purpose of the partitioning process in quicksort?",
      "answer": [
        0
      ],
      "distractors": [
        "To rearrange the array so that the pivot element is in its correct position.",
        "To divide the array into two sub-arrays of equal length.",
        "To divide the array into two sub-arrays which have already been sorted.",
        "None of the above."
      ],
      "explainations": [
        "A is correct. The partitioning process in quicksort rearranges the array elements such that the pivot element is placed in its correct sorted position. Elements smaller than the pivot are moved to the left, and larger elements are moved to the right.",
        "B is incorrect. The partitioning process does not guarantee that the two sub-arrays will be of equal length.",
        "C is incorrect. The array is not sorted until the partitioning process has been applied to each sub-array.",
        "D is incorrect. A is correct."
      ]
    },
    {
      "prompt": "How many recursive calls are made in the quicksort algorithm in each iteration?",
      "answer": [
        1
      ],
      "distractors": [
        "One recursive call.",
        "Two recursive calls.",
        "Three recursive calls.",
        "It depends on the size of the array."
      ],
      "explainations": [
        "A is incorrect. In the quicksort algorithm, two recursive calls are typically made to sort the left and right sub-arrays after partitioning.",
        "B is correct. In the quicksort algorithm, two recursive calls are typically made to sort the left and right sub-arrays after partitioning.",
        "C is incorrect. In the quicksort algorithm, two recursive calls are typically made to sort the left and right sub-arrays after partitioning.",
        "D is incorrect. In the quicksort algorithm, two recursive calls are typically made to sort the left and right sub-arrays after partitioning."
      ]
    },
    {
      "prompt": "In which situation(s) the `quicksortHelper()` function mentioned earlier will do the most times of partitioning? (Assume the array have 100 elements)",
      "answer": [
        0,
        1,
        2
      ],
      "distractors": [
        "When the array is already sorted in descending order.",
        "When the array is already sorted in ascending order.",
        "When the array contains only identical elements.",
        "When the array contains distinct elements and randomly shuffled."
      ],
      "explainations": [
        "A is correct. When the pivot element is chosen as the smallest or largest element of the array, the partitioning process will not divide the array into two sub-arrays of aprroxiamtely equal length. Instead, one sub-array will be empty, and the other will contain all the elements except the pivot element. This will result in doing as many partitioning as the number of elements in the array.",
        "B is correct. When the pivot element is chosen as the smallest or largest element of the array, the partitioning process will not divide the array into two sub-arrays of aprroxiamtely equal length. Instead, one sub-array will be empty, and the other will contain all the elements except the pivot element. This will result in doing as many partitioning as the number of elements in the array.",
        "C is correct. When the pivot element is chosen as the smallest or largest element of the array, the partitioning process will not divide the array into two sub-arrays of aprroxiamtely equal length. Instead, one sub-array will be empty, and the other will contain all the elements except the pivot element. This will result in doing as many partitioning as the number of elements in the array.",
        "D is incorrect. When the pivot element is chosen as the smallest or largest element of the array, the partitioning process will not divide the array into two sub-arrays of aprroxiamtely equal length. Instead, one sub-array will be empty, and the other will contain all the elements except the pivot element. This will result in doing as many partitioning as the number of elements in the array."
      ]
    }
  ]
};