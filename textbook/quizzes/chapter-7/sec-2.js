let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "Jade is trying different ways to calculate first 10 numbers of a sequence of powers of 2, i.e. 1, 2, 4, 8, 16, .... Which of the following is/are correct?",
      "answer": [
        2
      ],
      "distractors": [
        "```\nint seq[10];\nseq[0] = 1;\nfor (int i = 0; i < 10; i++) {\n    seq[i] = *(&seq[i] - 1) * 2;\n}\n\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d \", seq[i]);\n}\n```\n",
        "```\nint seq[10];\nseq[0] = 1;\nfor (int i = 1; i < 10; i++) {\n    *(seq + i) = *(&(seq[i] - 1)) * 2;\n}\n\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d \", seq[i]);\n}\n```\n",
        "```\nint seq[10];\n*seq = 1;\nfor (int i = 1; i < 10; i++) {\n    *(seq + i) = *(seq + i - 1) * 2;\n}\n\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d \", seq[i]);\n}\n```\n",
        "```\nint seq[10];\nseq[0] = 1;\nfor (int i = 1; i < 10; i++) {\n    (*seq + i) = (*seq + i - 1) * 2;\n}\n\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d \", seq[i]);\n}\n```\n"
      ],
      "explainations": [
        "A is incorrect. The for loop should start from 1, not 0. Otherwise, the index of the array in the first iteration will be -1, which is outside the bounds of the array.",
        "B is incorrect. The address of previous element should be `(&seq[i]) - 1`, not `&(seq[i] - 1)`.",
        "C is correct. In each iteration, the value of the current element is `*(seq + i)`, which is equivalent to `seq[i]` and the value of the previous element is `*(seq + i - 1)`, which is equivalent to `seq[i - 1]`.",
        "D is incorrect. The access of previous element should be `*(seq + i - 1)`, not `(*seq + i - 1)`. Remember `seq` is the address of the first element in the array."
      ]
    }
  ]
};