# Development Cycle

While data and instructions are stored in binary format, we do not write programs in binary. It is too difficult for humans. Fortunately, we use a programming language. 

There is a development cycle that we follow when we write a program. The cycle is as follows:

1. Write the program in an Integrated Development Environment (IDE), e.g. Visual Studio Code. Check the [Setup Visual Studio Code](../appendix/setup-vscode.md) page for instructions on how to set up Visual Studio Code.
2. Compile the program using a compiler like GCC. This converts the program from a human-readable format to a machine-readable format. Not surprisingly, the compiler is a program also written in a programming language (usually C). This can be invoked from the command line or from the IDE. 
3. Run the program. This executes the sequence of instructions in the program. This can be invoked from the command line or from the IDE. 
   * Check the [Setup Visual Studio Code](../appendix/setup-vscode.md) page for instructions on how to compile and run a program.
4. Debug the program. This is the process of finding and fixing errors in the program. Some programs help in debugging, e.g. GDB. These allow programmers to view the execution state of their program step-by-step. This aids in finding errors. 

It is vital to prepare the young generation of programmers for debugging. Most of your time (some people say 80% -- 90%) will be spent on debugging. It is important to mentally prepare yourself that your code will fail in your first trials. Debugging gets easier with experience. Check [../appendix/setup-vscode.md](../appendix/setup-vscode.md) and last section of each chapter starting Chapter 5 for detailed tips on finding and fixing errors.

The following figure summarizes the development cycle.

```{figure} ./images/dev-cycle.png
:alt: The development cycle
:class: with-shadow
:width: 800px
:align: center

The development cycle of a program
```

## Do not start by typing code!

Many beginners do the mistake of developing code as they type it. This is a bad habit. Ideally, programmers should first identify the problem, think of a solution, plan the structure of the program, and then write code. More details on this process will be discussed in the future. 

## Do not stop when your code works!

Several people (and probably you) will stop at the stage where your code works. As long as your code passes all the test cases, you are done. However, this is not the case in modern programming, where our lives depends on programs. You need to make two main things: 

1. Test your code extensively: In this course, you will be graded on the correctness of the functionality of your code. You must develop your own test scenarios to ensure your code is functional under all circumstances. 

2. Make sure that your code is readable, maintainable, and reusable: You will need to ensure that if someone else needs to use your code, they can do so *easily*. Throughout this course, you will learn briefly how to *clean code*. This is a building block of **software engineering**. Nowadays, employers need programmers who can *clean code*. Since this is a course for beginners, you won't be penalized massively if you cannot clean code. 
   
```{note}
Clean coding can easily be a course by itself. If you want to be someone hirable by a company, you need to have this skill of producing expandable code. If you want to learn more about clean coding, you can refer to the book on Clean Coding by Robert C. Martin {cite}`clean-code`. 
```

```{bibliography}
:style: unsrt
:filter: docname in docnames
```

{{quiz_embed | replace("%%FILENAME%%", "chapter-1/sec-3") }}