let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "question-id": "chapter-8-Q1",
      "title": "Question 4 in Winter 2018 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write a single C statement that declares a variable called `intPtrArray`, initialized to point to an array of 10 integers that is dynamically allocated.\n",
      "answer": "`int *intPtrArray = (int *)malloc(10 * sizeof(int));`\n"
    },
    {
      "question-id": "chapter-8-Q2",
      "title": "Question 2 in Fall 2015 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write one or more C statements that use `malloc` to dynamically allocate an array of $1000$ elements of type `double`. The allocated array should be called `list`.\n",
      "answer": "`double *list = (double *)malloc(1000 * sizeof(double));`\n"
    }
  ]
};