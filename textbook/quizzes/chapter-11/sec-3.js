let parsedObject; 
  parsedObject = {
  "questions": [
    {
      "prompt": "The following code tries to count the number of vowels in a string. \n```\n#include <stdio.h>\n#include <string.h>\n\nint countVowels(char *);\n\nint main(void) {\n  printf(\"Number of vowels: %d\", countVowels(\"Hello world!\"));\n  return 0;\n}\n\nint countVowels(char *s) {\n  if (*s == '\\0') {\n    return 0;\n  } else if (*s == 'a' || *s == 'e' || *s == 'i' || *s == 'o' || *s == 'u') {\n    return -----------;\n  } else {\n    return -----------;\n  }\n}\n```\nHow would you complete line 15 and 17?\n",
      "answer": [
        2
      ],
      "distractors": [
        "Line 15, `countVowels(s)`;\nLine 17, `countVowels(s)`;\n",
        "Line 15, `countVowels(s + 1)`;\nLine 17, `countVowels(s + 1)`;\n",
        "Line 15, `1 + countVowels(s + 1)`;\nLine 17, `countVowels(s + 1)`;\n",
        "Line 15, `countVowels(s + 1)`;\nLine 17, `countVowels(s)`;\n"
      ],
      "explainations": [
        "A is incorrect. \nAs the next time, we call the function, we look at the string `s`, not a smaller version of it.\n",
        "B is incorrect. \nCalling `countVowels` on `s + 1` does reduce the size of the problem, however, if we encounter a vowel at `s[0]`, we need to add 1 to the return value.\n",
        "C is correct. \nWe add one to the return value when a vowel is observed, and add nothing other wise.\n",
        "D is incorrect. \nWe need to call `countVowels` on a smaller string by advancing the pointer `s` by one place. \n"
      ]
    }
  ]
};