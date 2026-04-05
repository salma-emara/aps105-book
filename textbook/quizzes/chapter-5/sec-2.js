let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "The following code has A, B, C, D, E, F, G, H representing hidden parts of the program. Which of the hidden parts can be identical? (Assume that the return type of `func()` is not void.)\n```\n#include <stdio.h>\n\nA func(B);\n\nint main(void) {\n    C var = func(D);\n\n    return 0;\n}\n\nE func(F) {\n    G ret_val = H;\n    return ret_val;\n}\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "B, D, F",
        "B, F",
        "A, C, E, G",
        "F, H"
      ],
      "explainations": [
        "A is incorrect. `B` is the type of the parameter of `func()`, `D` is the argument passed to `func()`, and `F` is the declared parameter in the function definition of `func()`. They cannot be identical.",
        "B is incorrect. `B` is the type of the parameter of `func()` and `F` is the declared parameter in the function definition of `func()`. They cannot be identical.",
        "C is correct. `A`, `C`, `E`, and `G` are all the type of the return value of `func()`. They should be identical.",
        "D is incorrect. `F` is the declared parameter in the function definition of `func()` and `H` is a expression that is assigned to `ret_val`. They cannot be identical. "
      ]
    }
  ]
};