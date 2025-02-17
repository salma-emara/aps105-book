let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following statements accurately describe(s) the advantages of using a linked list over an array for storing a list of numbers?",
      "answer": [
        1
      ],
      "distractors": [
        "Linked lists offer a more compact and contiguous memory allocation compared to arrays.",
        "Linked lists allow for efficient insertion, deletion, and extension operations without the need to shift elements.",
        "Arrays provide greater flexibility in changing the size of the list compared to linked lists.",
        "Linked lists offer faster access to elements compared to arrays."
      ],
      "explainations": [
        "A is incorrect. Linked lists do not offer a compact and contiguous memory allocation like arrays. In linked lists, each element (node) is allocated separately and connected through pointers, which results in non-contiguous memory storage.",
        "B is correct. Linked lists provide efficient operations for inserting, deleting, and extending elements as they only require adjusting the links between nodes, without the need to shift other elements. This makes these operations more efficient compared to arrays.",
        "C is incorrect. Arrays have a fixed size once they are allocated, and changing the size requires creating a new array and copying elements (or dynamically allocate memory). Linked lists, on the other hand, provide flexibility in dynamically adding or removing elements without requiring pre-allocation or fixed sizes.",
        "D is incorrect. Arrays provide faster access to elements because they allow direct indexing using an index value. Linked lists require traversing the list from the beginning to reach a specific element, resulting in slower access."
      ]
    }
  ]
};