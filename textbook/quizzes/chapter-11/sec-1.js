let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following statements is correct about recursive functions?",
      "answer": [
        2,
        3
      ],
      "distractors": [
        "We may or may not need a base case in a recursive function.",
        "A recursive function calls itself only once.",
        "The recursive call needs to be on a smaller problem of the original one.",
        "The terminating condition helps stop the function from calling itself again."
      ],
      "explainations": [
        "A is incorrect. Every recursive function should have a base case to stop calling itself indefinitely.",
        "B is incorrect. Recursive functions can call themselves any number of times depending on the input.",
        "C is correct. The recursive call should be on a smaller problem to help get closer to the terminating condition.",
        "D is correct. When the terminating condition is met, we stop calling the function again."
      ]
    }
  ]
};