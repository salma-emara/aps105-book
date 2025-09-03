let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 2 in Winter 2022 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "explaination",
      "question": "In a single C statement, define a data structure named `Student` that has three members: the `name` of the student as a string (`char*`), the `id` of the student as an `int`, and the `grades` of the student. The type of the `grades` of the student is a data structure **already** defined as follows:\n\n```{code-block} c\nstruct marks {\n  double labs[10];\n  double exams[2];\n};\n```\n\nIn the same statement, declare one `Student` variable named `test` and an array named `allStudents` of $500$ `Student` elements.\n",
      "answer": "<code>\nstruct Student {\n  \n  char *name;\n\n  int id;\n\n  struct marks grades;\n\n} test, allStudents[500];\n</code>\n"
    },
    {
      "title": "Question 1 in Winter 2020 Final Exam",
      "difficulty": "Easy",
      "table": false,
      "multipart": false,
      "type": "explaination",
      "question": "In a single C statement create a data structure called `AnimalSizes` having two elements, a string `name` and a size `length`. This same statement should create an array of this type called `snakes` with two entries.\n\nInitialize each entry such that the first index has name `\"Anaconda\"` and `length` $3.7$, while the second index has the name `\"Python\"` and `length` $2.4$. You may do this in the same statement or using additional statements.\n\n",
      "answer": "<code>\nstruct AnimalSizes {\n\n  char name[20];\n\n  double length;\n\n} snakes[2] = {{\"Anaconda\", 3.7}, {\"Python\", 2.4}};\n</code>\n"
    },
    {
      "title": "Question 7 in Winter 2020 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "function programming",
      "question": "In various engineering applications, it is required to convert Polar to\nCartesian coordinates. The polar coordinates $(R, \\theta)$ and rectangular coordinates $(x, y)$ are related as follows: \n\n$$x = R \\cos(\\theta) \\mbox{ and } y = R \\sin(\\theta) $$\n\n```{figure} _images/q7-2019-final-image.png\n```\n\nComplete the code below, which defines the data structures and a function that takes polar coordinates of a point and return the rectangular\ncoordinates. The angle is assumed to be in radians. Assuming the values passed to this function is in degrees, you need to convert the radian\nvalue using the constant D2R below. **Assume the value of pi is 3.1415926535**\n",
      "starter-code": "#include <stdio.h>\n#include <math.h>\nconst double D2R = 3.1415926535 / 180.0;\n\n// rectangular coordinate structure\ntypedef struct rectV {\n\n\n\n  \n}\n\n// polar coordinate structure\ntypedef struct polarC {  // angle in radians\n\n\n\n\n}\n\n// polar to rectangular\nRectCoor polToRec(PolarCoor polin) {\n\n\n\n\n  return rv;\n}\n",
      "answer": "#include <stdio.h>\n#include <math.h>\nconst double D2R = M_PI / 180.0;\n\n// rectangular coordinate structure\ntypedef struct rectV {\n  double x;\n  double y;\n} RectCoor;\n\n// polar coordinate structure\ntypedef struct polarC {  // angle in radians\n  double theta;\n  double r;\n} PolarCoor;\n\n// polar to rectangular\nRectCoor polToRec(PolarCoor polin) {\n  RectCoor rv;\n  rv.x = polin.r * cos(polin.theta * D2R);\n  rv.y = polin.r * sin(polin.theta * D2R);\n  return rv;\n}\n",
      "main-function": "int main(void) {\n    PolarCoor p;\n    scanf(\"%lf %lf\", &p.r, &p.theta);\n\n    RectCoor c = polToRec(p);\n    printf(\"%.6f %.6f\\n\", c.x, c.y);\n\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "5 0\n"
          ],
          "output": [
            "5.000000 0.000000\n"
          ]
        },
        {
          "input": [
            "7 45\n"
          ],
          "output": [
            "4.949747 4.949747\n"
          ]
        },
        {
          "input": [
            "0 123\n"
          ],
          "output": [
            "0.000000 0.000000\n"
          ]
        },
        {
          "input": [
            "10 180\n"
          ],
          "output": [
            "-10.000000 0.000000\n"
          ]
        },
        {
          "input": [
            "3.5 33.5\n"
          ],
          "output": [
            "2.918600 1.931779\n"
          ]
        }
      ]
    },
    {
      "title": "Question 3 in Winter 2018 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "explaination",
      "question": "Consider the following data structure definition:\n\n```{code-block} c\ntypedef struct name {\n  char *firstname;\n  char *lastname;\n} Name;\n\ntypedef struct employee {\n  int SIN;\n  int employeeNumber;\n  Name *emplName;\n} Empl;\n\nEmpl employees[1000];\n```\n\nAssume that all 1000 elements in the employees array have been initialized and none of the pointers\nare NULL. Write a single C statement that declares a character variable `c` and assigns it the first\ncharacter of the last name of the second employee in the employees array.\n",
      "answer": "<pre>\nchar c = employees[1].emplName->lastname[0];\n</pre>\n\nemployee is at index 1, so `employees[1]`.\n\nThe name is at `employees[1].emplName`, which is a pointer to `Name` structure.\n\nTo access the last name of the employee, we can use the arrow operator `->` to access the `lastname` field of the `Name` structure, `employees[1].emplName->lastname`.\n\nThe first character of the last name is at `employees[1].emplName->lastname[0]`.\n\n"
    },
    {
      "title": "Question 3 in Deferred Exam of Winter 2022 Final Exam",
      "difficulty": "Intermediate",
      "table": false,
      "multipart": false,
      "type": "explaination",
      "question": "In the following two lines we create two data structures `petal` and `flower`. Write a single C statement that declares a variable named `Flower` of type `struct flower`. In the same statement, initialize the name of the `Flower` to `\"Rose\"`, the `num` of petals to `39` and the `color` of the petals to `\"red\"`.\n\n```{code-block} c\nstruct petal {\n  int num;\n  char color[25];\n};\nstruct flower {\n  char name[25];\n  struct petal Petals;\n};\n```\n",
      "answer": "`struct flower Flower = {\"Rose\", {39, \"red\"}};`\n"
    },
    {
      "title": "Question 5 in Winter 2022 Final Exam",
      "difficulty": "Challenging",
      "table": false,
      "multipart": false,
      "type": "programming",
      "question": "The following C program takes in two names from the user and saves them in the array of data structures `students`. However, the code does not output the expected output. When the user enters two different last names, the output is the last entered name for both the elements in the array. This is the output of an example run:\n\n<pre>\nEnter last name: <b>Adam</b>\nEnter last name: <b>Jones</b>\nJones\nJones\n</pre>\n\nRe-write the `getNames` function **only** to have the following output:\n\n<pre>\nEnter last name: <b>Adam</b>\nEnter last name: <b>Jones</b>\nAdam\nJones\n</pre>\n",
      "starter-code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\ntypedef struct student {\n  char* lastName;\n} Student;\n  \nvoid getNames(char* lastName, Student students[]) {\n  for (int i = 0; i < 2; i++) {\n    printf(\"Enter last name: \");\n    scanf(\"%s\", lastName);\n    students[i].lastName = lastName;\n  }\n}\n  \nint main() {\n  Student students[2];\n  \n  char* lastName = malloc(sizeof(char) * 20);\n  getNames(lastName, students);\n  \n  for (int i = 0; i < 2; i++) {\n    printf(\"%s\\n\", students[i].lastName);\n  }\n  free(lastName);\n  lastName = NULL;\n  return 0;\n} \n",
      "answer": "void getNames(char* lastName, Student students[]) {\n  for (int i = 0; i < 2; i++) {\n    printf(\"Enter last name: \");\n    scanf(\"%s\", lastName);\n    students[i].lastName = (char*) malloc(sizeof(char) * 20); // allocate memory for the string\n    strcpy(students[i].lastName, lastName);\n  }\n}\n\n",
      "testcases": [
        {
          "input": [
            "Smith\nJohnson"
          ],
          "output": [
            "Enter last name: Enter last name:\n Smith\nJohnson\n"
          ]
        },
        {
          "input": [
            "Swift\nAbrams"
          ],
          "output": [
            "Enter last name: Enter last name:\n Swift\nAbrams\n"
          ]
        },
        {
          "input": [
            "Spongebob\nPatrick"
          ],
          "output": [
            "Enter last name: Enter last name:\n Spongebob\nPatrick\n"
          ]
        }
      ]
    }
  ]
};