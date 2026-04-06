registerExercises("../trace/exercises/chapter9-1/testing-exercises", {
  "exercises": [
    {
      "question-id": "chapter9-visualizer-q1",
      "title": "Pointer Arithmetic in 2D Arrays",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "visualizer",
      "question": "Consider the following code snippet for dynamically allocating a 2D array:\n\n```{code-block} c\nint Rows = 3;\nint Cols = 4;\nint** arr = (int**)malloc(sizeof(int*) * Rows);\n\nfor (int row = 0; row < Rows; row++) {\n  *(arr + row) = (int*)malloc(sizeof(int) * Cols);\n}\n```\n\nAfter executing the highlighted line when `row = 2`, what does `*(arr + row)` point to?\n\n```{code-block} c\n*(arr + row) = (int*)malloc(sizeof(int) * Cols);\n```\n\nA. An invaild address\n\nB. A newly allocated array of integers\n\nC. A newly allocated array of integer pointers \n\nD. The entire 2D array\n",
      "answer": "B\n"
    }
  ]
});