let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the output of the following code?\n```\n#include <stdio.h>\n\nint addOne(int);\n\nint main(void) {\n  int n = 1;\n  printf(\"%d %d\", n, addOne(n));\n  return 0;\n}\n\nint addOne(int n) {\n  n += 1;\n  return n;\n}\n```\n",
      "answer": [
        1
      ],
      "distractors": [
        "2 2",
        "1 2",
        "2 1",
        "1 1"
      ],
      "explainations": [
        "A is incorrect. The variable `n` in `addOne` is a local variable and is not the same as the variable `n` in `main`. Thus the value of `n` in `main` is not changed.",
        "B is correct. The variable `n` in `addOne` is a local variable and is not the same as the variable `n` in `main`. Thus the value of `n` in `main` is not changed. Also, the return value of `addOne(n)` is 2.",
        "C is incorrect. The variable `n` in `addOne` is a local variable and is not the same as the variable `n` in `main`. Thus the value of `n` in `main` is not changed. Also, the return value of `addOne(n)` is 2.",
        "D is incorrect. The function `addOne` returns the value of `n` plus 1, which is 2. Thus, the return value of ``addOne(n)` in `main` 2."
      ]
    }
  ]
};