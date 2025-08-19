let parsedObject; 
  parsedObject = {
  "exercises": [
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