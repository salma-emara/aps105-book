# The Basic Structure of Computers

A program is a sequence of instructions to be executed or performed by a computer. To be able to give some context on where does your C program fit in your computer, we will first discuss the basic structure of a computer. 

A computer system has software and hardware. The software consists of the applications running on your computer, such as your browser, computer games, Microsoft Office, and your C program which you will develop in this course. Another very important piece of software is the operating system, which provides an interface between the hardware and the applications running on your computer. The hardware consists of the physical components of your computer, such as the central processing unit (CPU), (main) memory, the hard drive, and the input and output devices. The two most important pieces of hardware that we will access using C is the keyboard (input device) and the monitor (output device). 

```{figure} ./images/basic-computer-structure.png
:alt: The basic structure of a computer 
:class: with-shadow
:width: 400px
:align: center

The basic structure of a computer
```

**The main memory** stores data and the program we want to execute. The data and instructions are all stored in binary representation.

**The central processing unit (CPU)** also referred to as the brain of the computer. It is responsible for executing the instructions in a program. An example of an instruction is adding two numbers. The CPU is made up of mainly two components: the arithmetic logic unit (ALU) and the control unit. The ALU is responsible for performing arithmetic and logical operations, such as addition, subtraction, multiplication, division, and comparisons. The control unit is responsible for controlling the execution of instructions. 

To execute instructions, the CPU fetches the instructions from the main memory, decodes them, and executes them. The instructions may require reading and writing data to the main memory. Also, the instructions may require access to input and output devices. 

**Input and output (I/O) devices** are used to communicate with the outside world. The most common input devices are the keyboard and the mouse. These take input from the user. The most common output devices are the monitor and the printer. These can display the output of the program.



{{quiz_embed | replace("%%FILENAME%%", "chapter-1/sec-1") }}