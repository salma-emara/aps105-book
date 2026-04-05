let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Assume that the `APS105` `struct` has been declared correctly with the following members: `int studentNumber`, `char *instructor`, `double averageGrade`. Which of the following access(es) its members by pointer correctly?",
      "answer": [
        1,
        3
      ],
      "distractors": [
        "```\nstruct APS105 course = {0, \"\", 0};\nstruct APS105 *pCourse = &course;\n*pCourse.instructor = \"Dennis Ritchie\";\n*pCourse.studentNumber = 60;\n*pCourse.averageGrade = 85.0;\n```\n",
        "```\nstruct APS105 course = {0, \"\", 0};\nstruct APS105 *pCourse = &course;\n(*pCourse).instructor = \"Dennis Ritchie\";\n(*pCourse).studentNumber = 60;\n(*pCourse).averageGrade = 85.0;\n```\n",
        "```\nstruct APS105 course = {0, \"\", 0};\nstruct APS105 *pCourse = &course;\n*pCourse->instructor = \"Dennis Ritchie\";\n*pCourse->studentNumber = 60;\n*pCourse->averageGrade = 85.0;\n```\n",
        "```\nstruct APS105 course = {0, \"\", 0};\nstruct APS105 *pCourse = &course;\npCourse->instructor = \"Dennis Ritchie\";\npCourse->studentNumber = 60;\npCourse->averageGrade = 85.0;\n```\n"
      ],
      "explainations": [
        "A is incorrect. The `.` operator has higher precedence than the `*` operator. For example, `*pCourse.instructor` is equivalent to `*(pCourse.instructor)`, which is incorrect because `pCourse` is a pointer.",
        "B is correct. Dereferencing the pointer to get to the data structure happens through `(*pCource)` then accessing elements happens through the `.` operator.",
        "C is incorrect. The `->` operator has higher precedence than `*`. `->` would access elements of a struct through a pointer, which `pCourse->instructor` does. Dereferencing the return value with `*` is a mistake.",
        "D is correct. This is another way to access a member of a `struct` through a pointer."
      ]
    },
    {
      "prompt": "Which of the following is/are correct ways to dynamically allocate memory for a `struct`?",
      "answer": [
        0,
        3
      ],
      "distractors": [
        "```\nstruct Employee {\n    char *name;\n    int age;\n    double salary;\n} *pBoss;\n\nint main() {\n    pBoss = (struct Employee *) malloc(sizeof(struct Employee));\n    pBoss->name = \"Boss\";\n    return 0;\n}\n```\n",
        "```\nstruct Employee {\n    char *name;\n    int age;\n    double salary;\n} *pBoss;\n\nint main() {\n    pBoss = (Employee *)malloc(sizeof(Employee *));\n    pBoss->name = \"Boss\";\n    return 0;\n}\n```\n",
        "```\nstruct Employee {\n    char *name;\n    int age;\n    double salary;\n} *pBoss;\n\nint main() {\n    pBoss = (Employee *)malloc(sizeof(Employee));\n    pBoss->name = \"Boss\";\n    return 0;\n}\n```\n",
        "```\nstruct Employee {\n    char *name;\n    int age;\n    double salary;\n} *pBoss;\n\ntypedef struct Employee Employee;\n\nint main() {\n    pBoss = (Employee *)malloc(sizeof(Employee));\n    pBoss->name = \"Boss\";\n    return 0;\n}\n```\n"
      ],
      "explainations": [
        "A is correct. The name of the data structure is `struct Employee`.",
        "B is incorrect. The `Employee` type is not defined. It should be `struct Employee`. Also, the size of the memory to be allocated is the size of `struct Employee` not the size of its pointer.",
        "C is incorrect. The `Employee` type is not defined. It should be `struct Employee`",
        "D is correct. We can use `Employee` as we created an alias for it."
      ]
    }
  ]
};