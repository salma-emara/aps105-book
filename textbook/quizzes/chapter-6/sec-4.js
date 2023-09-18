let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code print(s) `105`?",
      "answer": [
        3
      ],
      "distractors": [
        "```\n#include <stdio.h>\n\nint main() {\n    int *px = NULL;\n    {\n        int x = 0;\n        px = &x;\n        for (int i = 0; i < 21; i++) {\n            *px += 5;\n        }\n    }\n    printf(\"%d\", *px);\n    \n    return 0;\n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid func(int*);\n\nint main() {\n    int i = 0;\n    int x = 0;\n    for (; i < 10; i++) {\n        x += 5;\n    }\n    func(&x);\n    printf(\"%d\", x);\n    \n    return 0;\n}\n\nvoid func(int *x) {\n    for (; i < 21; i++) {\n        *x += 5;\n    } \n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid func(int);\n\nint x = 0;\n\nint main() {\n    int x = 0;\n    for (int i = 0;i < 10; i++) {\n        x += 5;\n    }\n    func(x);\n    printf(\"%d\", x);\n    \n    return 0;\n}\n\nvoid func(int x) {\n    for (int i = 0;i < 11; i++) {\n        x += 5;\n    } \n}\n```\n",
        "```\n#include <stdio.h>\n\nvoid func(int);\n\nint x = 0;\n\nint main() {\n    int x, y;\n    {\n        int x = 0;\n        for (int i = 0; i < 21; i++) {\n            x += 5;\n        }\n        y = x;\n    }\n    x = y;\n    printf(\"%d\", x);\n    \n    return 0;\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The variable `x` is defined in the scope of the block, so it is not accessible outside of the block. Even if the pointer `px` is pointing to the address of `x`, the space of `x` is dellocated, so accessing the value of `x` will lead to undefined behavior.",
        "B is incorrect. The variable `i` is not defined in the scope of `func`, so the code will not compile.",
        "C is incorrect. Although the variable `x` is defined in the global scope, in `func` the variable `x`'s scope is overriden by the parameter `x`. Therefore, the global variable `x` is not modified. The output is `50`.",
        "D is correct. After the loop, the inner `x` is assigned to `y`, whose scope is the same as the outer `x`. Therefore, the inner `x` value is assigned to the outer `x`. The output is `105`."
      ]
    }
  ]
};