#include <stdio.h>
int main(void) {
  int p = 0, q = 0, r = 0;
  printf("Enter three integers: ");
  scanf("%d %d %d", &p, &q, &r);

  if ((p >= q && p <= r) || (p >= r && p <= q)) {
    printf("%d\n", p);
  } else if ((q >= p && q <= r) || (q >= r && q <= p)) {
    printf("%d\n", q);
  } else {
    printf("%d\n", r);
  }
}
