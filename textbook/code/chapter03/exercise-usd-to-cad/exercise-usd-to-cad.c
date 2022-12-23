#include <math.h>
#include <stdio.h>

int main(void) {
  double exchangeRate = 0, cad = 0, usd = 0;
  printf("Enter the exchange rate (1 CAD = ? USD): ");
  scanf("%lf", &exchangeRate);
  printf("Enter the value in US dollars: ");
  scanf("%lf", &usd);
  cad = usd / exchangeRate;

  // rounding to the nearest hundredth
  double roundedCad = rint(cad * 100) / 100.0;
  printf("The value in Canadian dollars is %.6lf.\n",
         roundedCad);  // also %.lf prints 6 digits after the decimal point
  return 0;
}
