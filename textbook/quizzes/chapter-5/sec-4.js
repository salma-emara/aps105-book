let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Jade has written the following program to calculate how much to pay for notebooks. For example, if you input `1 2.00 0.05`, it is supposed to get `1.90`. How many errors are there in the code?\n```\n#include <stdio.h>\n\ndouble howMuchToPay(int, int, double);\n\nint main(void) {\n    int number;\n    double unitPrice, discount;\n    printf(\"Please enter the number of notebooks you want to buy,\n     the price per notebook and the student discount: \");\n   scanf(\"%d %lf %lf\", &number, &unitPrice, &discount);\n   printf(\"The total price is %d\\n\", howMuchToPay(number, unitPrice));\n   return 0;\n}\n\ndouble howMuchToPay(int number, double unitPrice, double discount) {\n    if (discount <= 0) {\n        discount = 1.0;  // when discount is 0 or negative,\n         it is set to 1.0 (no discount)\n    }\n    double price = number * unitPrice * (1 - discount);\n    return price;\n}\n```\n",
      "answer": [
        2
      ],
      "distractors": [
        "1",
        "2",
        "3",
        "4"
      ],
      "explainations": [
        "A is incorrect. There are 3 errors in the code.\nError 1:\nThe 3rd line, in the declaration of the function `howMuchToPay`, the second parameter should be `double` instead of `int` according to the sample input. It needs to match the type of the 2nd argument in the implementation of the function.\n\nError 2:\nThe 10th line, the return type of the function `howMuchToPay` is `double`, but the `printf` statement in the `main` function is using `%d` to print the return value of the function. It should be `%.2lf` instead.\n\nError 3:\nThe 10th line, the function `howMuchToPay` is called with 2 arguments, but the function declaration and implementation both require 3 arguments. The 3rd argument is missing. Even though the 3rd argument could be 0, it is still required.\n",
        "B is incorrect. There are 3 errors in the code.\nError 1:\nThe 3rd line, in the declaration of the function `howMuchToPay`, the second parameter should be `double` instead of `int` according to the sample input. It needs to match the type of the 2nd argument in the implementation of the function.\n\nError 2:\nThe 10th line, the return type of the function `howMuchToPay` is `double`, but the printf statement in the main function is using `%d` to print the return value of the function. It should be `%.2lf` instead.\n\nError 3:\nThe 10th line, the function `howMuchToPay` is called with 2 arguments, but the function declaration and implementation both require 3 arguments. The 3rd argument is missing. Even though the 3rd argument could be 0, it is still required.\n",
        "C is correct. There are 3 errors in the code.\nError 1:\nThe 3rd line, in the declaration of the function `howMuchToPay`, the second parameter should be `double` instead of `int` according to the sample input. It needs to match the type of the 2nd argument in the implementation of the function.\n\nError 2:\nThe 10th line, the return type of the function `howMuchToPay` is `double`, but the printf statement in the main function is using `%d` to print the return value of the function. It should be `%.2lf` instead.\n\nError 3:\nThe 10th line, the function `howMuchToPay` is called with 2 arguments, but the function declaration and implementation both require 3 arguments. The 3rd argument is missing. Even though the 3rd argument could be 0, it is still required.\n",
        "D is incorrect. There are 3 errors in the code.\nError 1:\nThe 3rd line, in the declaration of the function `howMuchToPay`, the second parameter should be `double` instead of `int` according to the sample input. It needs to match the type of the 2nd argument in the implementation of the function.\n\nError 2:\nThe 10th line, the return type of the function `howMuchToPay` is `double`, but the printf statement in the main function is using `%d` to print the return value of the function. It should be `%.2lf` instead.\n\nError 3:\nThe 10th line, the function `howMuchToPay` is called with 2 arguments, but the function declaration and implementation both require 3 arguments. The 3rd argument is missing. Even though the 3rd argument could be 0, it is still required.\n"
      ]
    }
  ]
};