# Dynamic Memory Allocation

In the previous chapter, we discuss how the memory space of arrays were fixed, known at compile-time and does not change throughout the program, *i.e.* the array cannot be extended or shrunk. 

In this chapter, we will dynamically allocate (and deallocate/free) memory for arrays. This can be helpful when we do not know the size of the array at the time of compilation, or when we want the size of the array to change midway as the program runs. For example, a user may require an array of size $10$ at some point, then later as the program runs, the user may request extra $5$ elements. Dynamic memory allocation helps in dynamically changing the size of the array we are using.  

