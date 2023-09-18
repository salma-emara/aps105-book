# What are data structures?

In this section, we discuss what are data structures.

A data structure is a way to store data of different types using same variable name. For example, we can store a combination of variables of different data types in a data structure. 

Let's model a neuron in the brain. A neuron has a set of input signals, output signals, and the name of the area it exists. We can use a data structure to store all this information.

## Define a data structure

### Method 1: Define the data structure and declare the variable separately.

To model a neuron, we can define the data structure using the keyword `struct` as follows.

```{figure} ./images/define-data-structure.png
:alt: Define a data structure
:width: 600px
:align: center
```

Note that this only defines a data structure, but does not create any variables. No memory is being allocated for that data structure yet, because we did not yet declare any variables of the data type of the data structure `struct Neuron`.

To declare a variable of `struct Neuron` type, we can do the following. The variable `neuron` is of type `struct Neuron` and is declared in line $8$.

```{code-block} c
:linenos:
:emphasize-lines: 8
struct Neuron {
  int neuronNum;
  double input1, input2;
  char areaName[20];
};

int main(void) {
  struct Neuron neuron;
  return 0;
}
```

### Method 2: Define the data structure and declare a variable in the same statement.

In the same statement, we can declare a data structure and define a variable. For example, in the following figure we define `struct Neuron` and declare a variable `neuron` of type `struct Neuron`.

```{figure} ./images/define-declare-data-structure.png
:alt: Define and declare a data structure
:width: 500px
:align: center
```

How does `neuron` look like in memory? Let's look at the following figure.

```{figure} ./images/neuron-in-memory.png
:alt: Neuron in memory
:width: 500px
:align: center
```

The variable `neuron` is of type `struct Neuron` that contains four members: `neuronNum` of type `int`, `input1` of type `double`, `input2` of type `double`, and `areaName` of type `char[]`.

## Access members of a data structure

To access members/fields of a data structure, we can use the dot operator.  For example, in the following code we access the members of the data structure `struct Neuron` using the dot operator.

**Code**
{{code_runner_header}}
<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="11 12" output='neuron.neuronNum=3'>
#include &lt;stdio.h&gt;
<br>
struct Neuron {
  int neuronNum;
  double input1, input2;
  char areaName[20];
};
<br>
int main(void) {
  struct Neuron neuron;
  neuron.neuronNum = 3;
  printf("neuron.neuronNum = %d\n", neuron.neuronNum);
  return 0;
}
</code-runner>
</pre>

## Initialize a data structure

When we declare a data structure variable, we can initialize all its members in the same statement. This is by using the curly brackets as with arrays `{}`. The order of the members in the curly brackets should be the same as the order of the members in the data structure definition. For example, in the following code we initialize the data structure variable `globalNeuron` and ``neuron` in the same statement as we declare them.

<pre class="code-runner-wrapper">
<code-runner language="c" highlight-lines="7 10" output='globalNeuron.neuronNum = 1<br>globalNeuron.input1 = 9.10<br>globalNeuron.input2 = 8.30<br>globalNeuron.areaName = Frontal Lobe<br><br>neuron.neuronNum = 3<br>neuron.input1 = 90.00<br>neuron.input2 = 23.00<br>neuron.areaName = Frontal Cortex'>
#include &lt;stdio.h&gt;
<br>
struct Neuron {
  int neuronNum;
  double input1, input2;
  char areaName[20];
} globalNeuron = {1, 9.1, 8.3, "Frontal Lobe"};
<br>
int main(void) {
  struct Neuron neuron = {3, 90, 23, "Frontal Cortex"};
  printf("globalNeuron.neuronNum = %d\n", globalNeuron.neuronNum);
  printf("globalNeuron.input1 = %.2lf\n", globalNeuron.input1);
  printf("globalNeuron.input2 = %.2lf\n", globalNeuron.input2);
  printf("globalNeuron.areaName = %s\n\n", globalNeuron.areaName);
<br>
  printf("neuron.neuronNum = %d\n", neuron.neuronNum);
  printf("neuron.input1 = %.2lf\n", neuron.input1);
  printf("neuron.input2 = %.2lf\n", neuron.input2);
  printf("neuron.areaName = %s\n\n", neuron.areaName);
  return 0;
}
</code-runner>
</pre>

## Creating an alias for a data structure

We can create an alias (another name) for a data structure or any other data type using the keyword `typedef`. In other words, it helps us to create a new name for an existing data type.

`typedef` takes in two arguments: the existing data type and the new name of the data type. The syntax would be as follows:

```{code-block} c
typedef <existing_data_type> <new_data_type_name>;
```

For example, to change the name of the data type `char` to `byte`, we can do the following:

```{code-block} c
typedef char byte;
```

Now, we can use `byte` instead of `char` in our code. In the following code in lines $6$ and $7$, we use `byte` instead of `char` in our code.

<pre class="code-runner-wrapper">
<code-runner language="c" output='oneLetter: S<br>sentence: Snefru' highlight-lines="3 6 7">
#include &lt;stdio.h&gt;
<br>
typedef char byte;
<br>
int main(void) {
  byte oneLetter = 'S';          // also means char oneLetter = 'S';
  byte sentence[20] = "Snefru";  // also means char sentence[20] = "Snefru";
<br>
  printf("oneLetter: %c\n", oneLetter);
  printf("sentence: %s\n", sentence);
  return 0;
}
</code-runner>
</pre>

`typedef` is beneficial to redefine the name of the data structure we had, which was `struct Neuron` to just `Neuron`. For example, in the following code we create an alias/another name `Neuron` for the data structure `struct Neuron`.

<pre class="code-runner-wrapper">
<code-runner language="c" output='neuron.input1 = 7.90' highlight-line="9 12">
#include &lt;stdio.h&gt;
<br>
struct Neuron {
  int neuronNum;
  double input1, input2;
  char areaName[20];
};
<br>
typedef struct Neuron Neuron;
<br>
int main(void) {
  Neuron neuron;
  neuron.input1 = 7.9;
  printf("neuron.input1 = %.2lf\n", neuron.input1);
  return 0;
}
</code-runner>
</pre>

We can define a data structure and create an alias for it in the same statement. For example, in the following code we define the data structure `struct Neuron` and create an alias `Neuron` for it in the same statement.

<pre class="code-runner-wrapper">
<code-runner language="c" output='neuron.input1 = 7.90' highlight-lines="3 4 5 6 7">
#include &lt;stdio.h&gt;
<br>
typedef struct Neuron {
  int neuronNum;
  double input1, input2;
  char areaName[20];
} Neuron;
<br>
int main(void) {
  Neuron neuron;
  neuron.input1 = 7.9;
  printf("neuron.input1 = %.2lf\n", neuron.input1);
  return 0;
}
</code-runner>
</pre>

The following figure summarizes the two methods of defining and redefining a data structure. Please note that this does not declare any variable of this data type. Instead, it defines the data structure and creates an alias for it. It is only when we declare a variable of this data type that the data structure is actually created, *e.g.* `Neuron neuron` creates a variable of `Neuron` data type.

```{figure} ./images/define-redefine-data-struct.png
:alt: Define and redefine data structure
:width: 700px
:align: center
```


{{quiz_embed | replace("%%FILENAME%%", "chapter-12/sec-1") }}