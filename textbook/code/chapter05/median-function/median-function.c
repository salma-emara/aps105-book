#include <stdio.h>

int median(int, int, int);

int main() {
  int a, b, c;
  printf("Please enter three integers to find the median: ");
  scanf("%d %d %d", &a, &b, &c);
  printf("The median is %d\n", median(a, b, c));
  return 0;
}

int median(int p, int q, int r) {
  if ((p >= q && p <= r) || (p >= r && p <= q))
    return p;
  else if ((q >= p && q <= r) || (q >= r && q <= p))
    return q;
  else
    return r;
}
