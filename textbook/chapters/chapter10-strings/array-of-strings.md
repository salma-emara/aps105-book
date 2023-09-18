# Array of Strings

In previous sections of this chapter, we show strings as a special array of characters that is null-terminated. If we were to have an array of strings, it can be created in two ways: a 2D array of characters each row is terminated by a `'\0'`, where each row is a string, or a 1D array of `char*`, where each element is pointing towards a 1D array that is a string. The first

## 2D array of characters

We can declare a 2D array, where each row has a string holding a month name. For example, in the following code, in line 4, we declare a 2D array named `months`, with $10$ columns. Recall, we must define the column size, and the row size is not necessary to define if we are initializing, as it will be known from the number of elements. Each row stores a month name. For rows that are not completely filled if the string size is smaller than 10, similar to `str` in `char str[10] = "Hi";`, the remaining elements are filled with null-characters. This $12$ by $10$ array is shown in {numref}`2D-arr-char`. The elements of the 2D array are all stored in the 

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="4 5 6 9 10"
output="january, february, march, april, may, june, july, august, september, october, november, december,">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char months[][10] = {"January",   "February", "March",    "April",
                       "May",       "June",     "July",     "August",
                       "September", "October",  "November", "December"};
  <br>
  for (int month_ind = 0; month_ind < 12; month_ind++) {
    months[month_ind][0] = months[month_ind][0] - 'A' + 'a';
    printf("%s, ", months[month_ind]);
  }
  <br>
  return 0;
}
</code-runner>
</pre>

In {numref}`2D-arr-char`, the elements of the 2D array are all stored in the stack of the main memory. This means we can change any of the characters in the 2D array. For example, in line $9$, we can change the first character of each month to the lower case. We can do so by subtracting the ASCII code of the first upper case letter in the alphabet `'A'` then adding the ASCII code of the first lower case letter in the alphabet `'a'`. This shifts the ASCII to lower case letters.

In line $10$, we can print each string/row using `%s`.

```{figure} ./images/2D-arr-char.png
:alt: 2D array of characters where each row is a string -- null-terminated array of characters 
:width: 600px
:align: center
:name: 2D-arr-char

2D array of characters where each row is a string --- null-terminated array of characters.
```

```{note}
Since `months` is a 2D array of characters, you cannot change an entire row in one line, e.g. `months[0] = "january";`. This is because `months[0]` is an array identifier, not a pointer variable. Refer to notes in {ref}`Section 10.1.1.3 <summary-can-cannot>` for an explanation of what can and cannot be done, while dealing with strings.
```

## 1D array of `char*`

The other way to declare an array of strings, we can declare an array of `char*` as we do in line $4$ of the following code. To initialize element to point to a string, we can do it as in lines $6$ -- $17$. 

**Code**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="2 4 5 6 7 8 9 10 11 12 13 14 15"
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char* months[12];
  <br>
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  <br>
  return 0;
}
</code-runner>
</pre>

We can declare and initialize the array of character pointers as in line $4$ -- $6$ of the following code. 

**Code (Declare and Initialize)**
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="4 5 6">
&#35;include &lt;stdio.h&gt;
<br>
int main(void) {
  char* months[12] = {"January",   "February", "March",    "April",
                      "May",       "June",     "July",     "August",
                      "September", "October",  "November", "December"};
  <br>
  for (int month_ind = 0; month_ind < 12; month_ind++) {
    // CANNOT do
    // months[month_ind][0] = months[month_ind][0] + 'A' + 'a';
    // as each string is in the constants segment of the main memory
    printf("%s, ", months[month_ind]);
  }
  <br>
  return 0;
}
</code-runner>
</pre>


Here, `months` is a 1D array of character pointers and each pointer is pointing to a constant string in the constants segment of the main memory. This is illustrated in the following figure.

```{figure} ./images/1D-arr-char-p.png
:alt: 1D array of character pointers, where each pointer is pointing to a constant string
:width: 600px
:align: center
:name: 1D-arr-char-p

1D array of character pointers, where each pointer is pointing to a constant string.
```

```{note}
Since `months` is a 1D array of character pointers and each pointer is pointing to a constant string in the constants segment of the main memory, you cannot change an individual element of the string, e.g. `months[0][0] = "j";`. This is because `months[0][0]` is constant and cannot be changed. Instead, you can change what the pointer points to, e.g. `months[0] = "january";`. Refer to notes in {ref}`Section 10.1.1.3 <summary-can-cannot>` for an explanation of what can and cannot be done, while dealing with strings.
```


{{quiz_embed | replace("%%FILENAME%%", "chapter-10/sec-4") }}