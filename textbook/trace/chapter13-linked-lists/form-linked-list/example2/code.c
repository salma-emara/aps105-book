#include <stdio.h>

// regular
struct Account {
    int account_number;
    double balance;
    char *first_name;
    char *last_name;
};

// typedef version
typedef struct {
    int    xxx;
    int    yyy;
} Point;

int main() {
  struct Account my_account;
  my_account.account_number = 42;
  my_account.balance = 3.141592653589735;
  my_account.first_name = "Jinning";
  my_account.last_name = "Liu";
  printf("hello");

  Point my_point;
  my_point.xxx = 12345;
  my_point.yyy = 54321;
  return 0;
}
