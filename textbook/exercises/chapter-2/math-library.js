let parsedObject; 
  parsedObject = {
  "exercises": [
    {
      "title": "Question 1 in Winter 2020 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "\nWrite a single C statement using no curly brackets that rounds a double-type variable named `value` to its nearest hundredths place, \nand assign the result to a new double-type variable named `approximateValue`. For example, rounding 0.843 to the nearest hundredth \nwould give 0.84. You can use any of the C math library functions. Write your solution in the box below\n",
      "answer": " \ndouble approximateValue = rint(value * 100) / 100; "
    },
    {
      "title": "Modified Version of Question 3 in Fall 2014 Midterm",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write a single C statement that will compute the value of `r` according to the following expression,\nand assign the value to `r`.\n\n$r = \\frac{x^n + 6 \\times x^4}{\\sin(y) + \\cos(z)}$\n\nYou can assume that all the variables in the expression are already declared as double types, and that \nthe math library (described by the header file math.h) is available, and that the value of y and z is in radians.\n",
      "answer": " \nr = (pow(x, n) + 6 * pow(x, 4.0)) / (sin(y) + cos(z)); "
    },
    {
      "title": "Question 5 in Winter 2018 Midterm Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "The variable `numApples` is an `int` type variable representing the number of apples in a barrel. The\nowner of the apples is deciding whether to sell them in packages of $3$ or $5$ apples. Write a single\nC statement that declares and initializes an `int` type variable called `leftover`. `leftover` should be\ninitialized to the minimum of two quantities: 1. the number of apples left over when the barrel of\napples is packaged into groups of $3$; 2. the number of apples left over when the barrel of apples is\npackaged into groups of $5$.\n\n**Hint:** Use a function in the `math` library\n",
      "answer": " \nint leftover = fmin(numApples % 3, numApples % 5); "
    },
    {
      "title": "Question 8 in Winter 2019 Midterm Exam",
      "difficulty": "Easy",
      "type": "programming",
      "table": false,
      "multipart": false,
      "question": "If you have a certain number of US dollars and wish to convert them to Canadian dollars, you could use the \nCanadian dollar to US dollar exchange rate (for example: 1 Canadian dollar = $0.75$ US dollar). Write a complete C \nprogram that prompts its user for the current Canadian dollar to US dollar exchange rate (e.g. $0.75$) and a value in \nUS dollars, and then prints the value in Canadian dollars, rounding to the nearest hundredth. Your program will print \nthe value with $6$ digits after the decimal point. Assume the user provides a valid exchange rate and US dollar amount.\n\nHere is an example run of your program:\n<pre>\nEnter the exchange rate (1 CAD = ? USD): <b>0.75</b>\nEnter the value in US dollars: <b>56</b>\nThe value in Canadian dollars is 74.670000.\n</pre>\n\n",
      "starter-code": "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n\n}\n",
      "answer": "#include <stdio.h>\n#include <math.h>\nint main (void) {\n    double exchangeRate = 0, cad = 0, usd = 0;\n    printf(\"Enter the exchange rate (1 CAD = ? USD): \");\n    scanf(\"%lf\", &exchangeRate);\n    printf(\"Enter the value in US dollars: \");\n    scanf(\"%lf\", &usd);\n    cad = usd / exchangeRate;\n    \n    // rounding to the nearest hundredth\n    double roundedCad = rint(cad * 100) / 100.0;\n    printf(\"The value in Canadian dollars is %.6lf.\\n\", roundedCad); \n    //%.6lf and %.lf prints 6 digits after the decimal point\n    return 0;\n}\n",
      "testcases": [
        {
          "input": [
            "0.75\n56\n"
          ],
          "output": [
            "Enter the exchange rate (1 CAD = ? USD): Enter the value in US dollars: \n The value in Canadian dollars is 74.670000.\n"
          ]
        },
        {
          "input": [
            "0.80\n100\n"
          ],
          "output": [
            "Enter the exchange rate (1 CAD = ? USD): Enter the value in US dollars:\n The value in Canadian dollars is 125.000000.\n"
          ]
        },
        {
          "input": [
            "0.75\n1\n"
          ],
          "output": [
            "Enter the exchange rate (1 CAD = ? USD): Enter the value in US dollars:\n The value in Canadian dollars is 1.330000.\n"
          ]
        }
      ]
    },
    {
      "title": "Question 2 in Fall 2018 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write a single C statement that generates a random even number in the range of [-150, 150] (inclusive), and uses it to declare and initialize an int-type variable `randomChoice`.\n",
      "answer": " \nint randomChoice = (rand() % 151 - 75) * 2; "
    },
    {
      "title": "Question 2 in Winter 2017 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write a single C statement that declares a double variable `randomSelection`, and initializes it\nwith a number that is randomly selected from the following set: 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35,\n0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95.\n",
      "answer": " \ndouble randomSelection = (rand() % 19 + 1) * 0.05;\n"
    },
    {
      "title": "Question 2 in Fall 2022 Final Exam",
      "difficulty": "Easy",
      "type": "explaination",
      "table": false,
      "multipart": false,
      "question": "Write a single C statement that declares a `char` variable called `randomCharacter`, and initializes it to a random value draw from one of the three characters: 'A', 'B', 'C'.\n",
      "answer": " \nchar randomCharacter = 'A' + rand() % 3;\n"
    }
  ]
};