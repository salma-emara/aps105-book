#include <stdio.h>
#include <stdlib.h>

typedef struct Neuron {
  int neuronNum;
  double input;
} Neuron;

int main(void) {
  Neuron *pNeuron;

  pNeuron = (Neuron *)malloc(sizeof(Neuron));

  pNeuron->input = 23.96;

  printf("pNeuron->input = %.2lf\n", pNeuron->input);

  free(pNeuron);

  return 0;
}
