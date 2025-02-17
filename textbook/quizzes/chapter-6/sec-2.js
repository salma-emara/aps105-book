let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What is the purpose of the reference operator `&` in C when working with pointers?",
      "answer": [
        1,
        2
      ],
      "distractors": [
        "It retrieves the value stored at an address.",
        "It gets the address of a variable.",
        "It cancels out the effect of the dereference operator `*`.",
        "It initializes a variable with a garbage value."
      ],
      "explainations": [
        "A is incorrect. The reference operator (&) is used to obtain the address of a variable, not to retrieve the value stored at that address.",
        "B is correct. The reference operator (&) gets the address of a variable.",
        "C is correct. The reference operator (&) can gets the address of a variable `x` (`&x`) and the dereference operator (*) gets the value at that address (`*(&x)`). Thus together they cancel out each other's effect if used on a variable.",
        "D is incorrect. The reference operator (&) gets the address of a variable."
      ]
    },
    {
      "prompt": "Which of the following print the value and address of the variable `x`?",
      "answer": [
        0,
        1,
        3
      ],
      "distractors": [
        "```\nint x = 105;\nprintf(\"%d %p\", x, &x);\n```\n",
        "```\nint x = 105;\nprintf(\"%d %p\", *(&x), &x);\n```\n",
        "```\nint x = 105;\nprintf(\"%d %p\", &(*x), &x);\n```\n",
        "```\nint x = 105;\nint *px = &x;\nprintf(\"%d %p\", *px, px);\n```\n"
      ],
      "explainations": [
        "A is correct. It literally prints the value and address of the variable `x`.",
        "B is correct. It firstly obtains the address of the variable `x` using the reference operator (&), then dereferences the pointer to obtain the value stored at that address, so `*(&x)` is equivalent to `x`. Then it prints the value and address of the variable `x`.",
        "C is incorrect. It will encounter a compilation error because the dereference operator (*) can only be applied to an address, but `x` does not hold an address.",
        "D is correct. It firstly assigns the address of the variable `x` to the pointer `px`, then dereferences the pointer to obtain the value stored at that address, so `*px` is equivalent to `x`. Then it prints the `px` which is the address of the variable `x`."
      ]
    }
  ]
};