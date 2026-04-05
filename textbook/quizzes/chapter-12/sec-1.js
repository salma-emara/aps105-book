let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Which of the following declare(s) the `struct` correctly?",
      "answer": [
        0,
        1
      ],
      "distractors": [
        "```\ntypedef struct APS105 {\n    int studentNumber;\n    char instructor[20];\n    double averageGrade;\n} APS105;\nAPS105 course;\n```\n",
        "```\nstruct APS105 {\n    int studentNumber;\n    char instructor[20];\n    double averageGrade;\n} course;\n```\n",
        "```\nstruct APS105 {\n    int studentNumber;\n    char instructor[20];\n    double averageGrade;\n};\nAPS105 course;\n```\n",
        "```\nstruct Employee {\n    char name[20];\n    int age;\n    double salary;\n    struct Employee subordinate[20];\n} boss;\n```\n"
      ],
      "explainations": [
        "A is correct. It declares a `struct` named `APS105` and an alias of `struct APS105` called `APS105` at the same name. Then the variable `course` is declared as a variable of type `APS105`.",
        "B is correct. This defines `struct APS105` and declares `course` in the same line.",
        "C is incorrect. The `stuct` keyword is missing when declaring the variable `course`.",
        "D is incorrect. The compiler will not know what `Employee` is when it is used in the declaration of `boss`. It can not decide the memory size of `boss`."
      ]
    },
    {
      "prompt": "Assume that the `struct APS105` has been declared correctly with the following members: `int studentNumber`, `char *instructor`, `double averageGrade` (in this same order). Which of the following statements is/are correct?",
      "answer": [
        1
      ],
      "distractors": [
        "```\nstruct APS105 course;\nAPS105.instructor = \"Dennis Ritchie\";\nAPS105.studentNumber = 60;\nAPS105.averageGrade = 85.0;\n```\n",
        "```\nstruct APS105 course;\ncourse.instructor = \"Dennis Ritchie\";\ncourse.studentNumber = 60;\ncourse.averageGrade = 85.0;\n```\n",
        "```\nstruct APS105 course = {60, 85.0, \"Dennis Ritchie\"};\nprintf(\"%s\\n\", course.instructor);\n```\n",
        "```\nstruct APS105 course = {60, \"Dennis Ritchie\", 85.0};\nprintf(\"%d\\n\", course.averageGrade);\n```\n"
      ],
      "explainations": [
        "A is incorrect. The `APS105` is the name of the `struct`, not the name of the variable.",
        "B is correct. The members of a `struct` can be accessed using the dot operator.",
        "C is incorrect. The members of a `struct` can be initialized in the order they are defined in the `struct` definition. The `instructor` member is at the second position, so the second value in the initializer list should be a string.",
        "D is incorrect. The `averageGrade` member is a `double`, not an `int`."
      ]
    }
  ]
};