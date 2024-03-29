let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "What does the math library in C can do?",
      "answer": [
        0,
        1,
        2,
        3
      ],
      "distractors": [
        "Determine the length of the hypotenuse in a right triangle",
        "Round a number to the nearest integer",
        "Calculate the logarithm to the base 10 of a large number",
        "Get the absolute value of a number"
      ],
      "explainations": [
        "A is correct. `sqrt()` is a function in the math library that returns the square root of a number.",
        "B is correct. `rint()` is a function in the math library that rounds a number to the nearest integer.",
        "C is correct. `log10()` is a function in the math library that returns the logarithm to the base 10 of a number.",
        "D is correct. `fabs()` is a function in the math library that returns the absolute value of a number."
      ]
    },
    {
      "prompt": "Jade wants to design a program to automatically calculate how many coins at least she needs to pay for a certain amount of money. The coins can be used include nickel (5 cents), dime (10 cents), quarter (25 cents), loonie (1 dollar). Which of the following code snippets in the math library can help her? (Assume the variable `amount` is of double type, and its unit is dollar.)",
      "answer": [
        2
      ],
      "distractors": [
        "```\nint payed_with_loonie = floor(amount);\ndouble payed_with_quarter = floor((amount) * 100 / 25) / 100 * 25;\ndouble payed_with_dime = floor((amount) * 100 / 10) / 100 * 10;\ndouble payed_with_nickel = ceil((amount) * 100 / 5) / 100 * 5;\nint minimum_total_coins = payed_with_loonie + payed_with_quarter / 0.25 + payed_with_dime / 0.1 + payed_with_nickel / 0.05;\n```\n",
        "```\nint payed_with_loonie = floor(amount);\ndouble payed_with_quarter = floor((amount - payed_with_loonie) * 100 / 25);\ndouble payed_with_dime = floor((amount - payed_with_loonie - payed_with_quarter) * 100 / 10);\ndouble payed_with_nickel = ceil((amount - payed_with_loonie - payed_with_quarter - payed_with_dime) * 100 / 5);\nint minimum_total_coins = payed_with_loonie + payed_with_quarter / 0.25 + payed_with_dime / 0.1 + payed_with_nickel / 0.05;\n```\n",
        "```\nint payed_with_loonie = floor(amount);\ndouble payed_with_quarter = floor((amount - payed_with_loonie) * 100 / 25) / 100 * 25;\ndouble payed_with_dime = floor((amount - payed_with_loonie - payed_with_quarter) * 100 / 10) / 100 * 10;\ndouble payed_with_nickel = ceil((amount - payed_with_loonie - payed_with_quarter - payed_with_dime) * 100 / 5) / 100 * 5;\nint minimum_total_coins = payed_with_loonie + payed_with_quarter / 0.25 + payed_with_dime / 0.1 + payed_with_nickel / 0.05;\n```\n",
        "```\nint payed_with_loonie = floor(amount);\ndouble payed_with_dime = floor((amount - payed_with_loonie) * 100 / 10) / 100 * 10;\ndouble payed_with_quarter = floor((amount - payed_with_loonie - payed_with_dime) * 100 / 25) / 100 * 25;\ndouble payed_with_nickel = ceil((amount - payed_with_loonie - payed_with_quarter - payed_with_dime) * 100 / 5) / 100 * 5;\nint minimum_total_coins = payed_with_loonie + payed_with_quarter / 0.25 + payed_with_dime / 0.1 + payed_with_nickel / 0.05;\n```\n"
      ],
      "explainations": [
        "A is incorrect. It does not substract the amount of money that has been payed with loonie from the total amount of money.",
        "B is incorrect. It does not calculate the rounded amount of money correctly.",
        "C is correct. It calculates from the largest coin to the smallest coin, which ensures the number of coins is minimum. It also rounds the amount of money correctly.",
        "D is incorrect. It does not calculate from the largest coin to the smallest coin, which may result in a larger number of coins than the minimum."
      ]
    }
  ]
};