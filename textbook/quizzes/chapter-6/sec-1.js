let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following code can output `True` when `n` is a multiple of 6?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\n#include <stdbool.h>\n#include <stdio.h>\n\nbool isMultipleOf6(int);\nvoid divideBy2(int);\nvoid divideBy3(int);\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    if (isMultipleOf6(n)) {\n        printf(\"True\");\n    } else {\n        printf(\"False\");\n    }\n\n    return 0;\n}\n\nbool isMultipleOf6(int n) {\n    int originN = n;\n    divideBy2(n);\n    divideBy3(n);\n    return n == originN;\n}\n\nvoid divideBy2(int n) {\n    n = n / 2;\n}\n\nvoid divideBy3(int n) {\n    n = n / 3;\n}\n```\n",
        "```\n#include <stdbool.h>\n#include <stdio.h>\n\nbool isMultipleOf6(int);\nint divideBy2(int);\nint divideBy3(int);\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    if (isMultipleOf6(n)) {\n        printf(\"True\");\n    } else {\n        printf(\"False\");\n    }\n\n    return 0;\n}\n\nbool isMultipleOf6(int n) {\n    int div2 = divideBy2(n);\n    int div3 = divideBy3(div2);\n    return div3 * 6 == n;\n}\n\nint divideBy2(int n) {\n    n = n / 2;\n    return n;\n}\n\nint divideBy3(int n) {\n    n = n / 3;\n    return n;\n}\n```\n",
        "```\n#include <stdbool.h>\n#include <stdio.h>\n\nbool isMultipleOf6(int);\nint divideBy2(int);\nint divideBy3(int);\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    if (isMultipleOf6(n)) {\n        printf(\"True\");\n    } else {\n        printf(\"False\");\n    }\n\n    return 0;\n}\n\nbool isMultipleOf6(int n) {\n    int div2 = divideBy2(n);\n    int div3 = divideBy3(n);\n    return div3 * 6 == n;\n}\n\nint divideBy2(int n) {\n    return n / 2;\n}\n\nint divideBy3(int n) {\n    return n / 3;\n}\n```\n",
        "```\n#include <stdbool.h>\n#include <stdio.h>\n\nbool isMultipleOf6(int);\nint divideBy2(int);\nint divideBy3(int);\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    if (isMultipleOf6(n)) {\n        printf(\"True\");\n    } else {\n        printf(\"False\");\n    }\n\n    return 0;\n}\n\nbool isMultipleOf6(int n) {\n    int originN = n;\n    n = divideBy2(n);\n    n = divideBy3(n);\n    return n * 6 == originN;\n}\n\nint divideBy2(int n) {\n    n = n / 2;\n    return n;\n}\n\nint divideBy3(int n) {\n    n = n / 3;\n    return n;\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The function `divideBy2` and `divideBy3` do not change the value of `n` as the functions are called by value.",
        "B is correct. The function `divideBy2` and `divideBy3` return the divided value to `isMultipleOf6`.",
        "C is incorrect. The function `divideBy3` is not passed `div3`. Thus the `div3` does not store `n / 6`, but only `n / 3`.",
        "D is correct. It is the same as B."
      ]
    }
  ]
};