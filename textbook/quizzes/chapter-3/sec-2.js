let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "A rectangle can be represented by the coordinations of the top-right corner and bottom-left corner (e.g., `(4, 2)` and `(2, 1)` are the top-right and bottom-left coordinations of a rectangle respectively). Which of the following conditions is/are true only when one of the rectangles is overlapping with the other? (Rectangle 1: top-right: `(top_right_x1, top_right_y1)`, bottom-left: `(bottom_left_x1, bottom_left_y1)`; Rectangle 2: top-right: `(top_right_x2, top_right_y2)`, bottom-left: `(bottom_left_x2, bottom_left_y2)`)",
      "answer": [
        0
      ],
      "distractors": [
        "```\n(top_right_x1 > bottom_left_x2 && bottom_left_x1 < top_right_x2 && top_right_y1 > bottom_left_y2 && bottom_left_y1 < top_right_y2)\n```\n",
        "```\n((top_right_x1 > bottom_left_x2 && bottom_left_x1 < top_right_x2) || (top_right_y1 > bottom_left_y2 && bottom_left_y1 < top_right_y2))\n```\n",
        "```\n((top_right_x1 > bottom_left_x2 || bottom_left_x1 < top_right_x2) && (top_right_y1 > bottom_left_y2 || bottom_left_y1 < top_right_y2))\n```\n",
        "```\n((top_right_x1 > bottom_left_x2 || top_right_y1 > bottom_left_y2) && (bottom_left_x1 < top_right_x2 || bottom_left_y1 < top_right_y2))\n```\n"
      ],
      "explainations": [
        "A is correct. It has two restrictions on x-axis and y-axis respectively, which means the two rectangles are overlapping only when they are overlapping on both x-axis and y-axis.",
        "B is incorrect. Since it use `||` instead of `&&`, it means the two rectangles are overlapping when they are overlapping on either x-axis or y-axis, which is not true.",
        "C is incorrect. Two `||` let the condition even weaker than B. E.g., rectangle 1 with top-right: `(4, 2)`, bottom-left: `(2, 1)` and rectangle 2 with top-right: `(7, 4)`, bottom-left: `(5, 3)` are not overlapping, but they satisfy the condition of C.",
        "D is incorrect. It is the similar as C."
      ]
    },
    {
      "prompt": "What is the value of `x` after the following code is executed?\n```\nint x = 104;\nif ((!x > 105) || (x = 105)) {\n    x++;\n}\n```\n",
      "answer": [
        1
      ],
      "distractors": [
        "105",
        "106",
        "0",
        "1"
      ],
      "explainations": [
        "A is incorrect. Since `!` has higher precedence than `>`, `!x > 105` is equivalent to `(!x) > 105`, which is equivalent to `0 > 105`, which is `false`. Then, due to the lazy evaluation, the second condition `x = 105` will be executed and it is true. Therefore, `x` will be 105 after the evaluation. Since the condition is true, `x++` will be executed and `x` will be 106.",
        "B is correct. Since `!` has higher precedence than `>`, `!x > 105` is equivalent to `(!x) > 105`, which is equivalent to `0 > 105`, which is `false`. Then, due to the lazy evaluation, the second condition `x = 105` will be executed and it is true. Therefore, `x` will be 105 after the evaluation. Since the condition is true, `x++` will be executed and `x` will be 106.",
        "C is incorrect. Since `!` has higher precedence than `>`, `!x > 105` is equivalent to `(!x) > 105`, which is equivalent to `0 > 105`, which is `false`. Then, due to the lazy evaluation, the second condition `x = 105` will be executed and it is true. Therefore, `x` will be 105 after the evaluation. Since the condition is true, `x++` will be executed and `x` will be 106.",
        "D is incorrect. Since `!` has higher precedence than `>`, `!x > 105` is equivalent to `(!x) > 105`, which is equivalent to `0 > 105`, which is `false`. Then, due to the lazy evaluation, the second condition `x = 105` will be executed and it is true. Therefore, `x` will be 105 after the evaluation. Since the condition is true, `x++` will be executed and `x` will be 106."
      ]
    },
    {
      "prompt": "Which of the following is the same as the following condition? (Assume `x` is an integer)\n```\n!((x % 2 == 0) || (x % 3 == 0))\n```\n",
      "answer": [
        2,
        3
      ],
      "distractors": [
        "```\n(x % 2 == 0) && (x % 3 == 0)\n```\n",
        "```\n!(x % 2 == 0) || !(x % 3 == 0)\n```\n",
        "```\n!(x % 2 == 0) && !(x % 3 == 0)\n```\n",
        "```\n(x % 2 != 0) && (x % 3 != 0)\n```\n"
      ],
      "explainations": [
        "A is incorrect. It does follow the De Morgan's law.",
        "B is incorrect. It does follow the De Morgan's law.",
        "C is correct. It is the intermidiate step of applying the De Morgan's law.",
        "D is correct. It is the final simplified condition after applying the De Morgan's law."
      ]
    }
  ]
};