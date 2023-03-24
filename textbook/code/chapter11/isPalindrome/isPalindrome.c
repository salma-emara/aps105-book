#include <stdbool.h>
#include <stdio.h>
#include <string.h>

bool isPalindromeHelper(char *s, int low, int high) {
  if (low >= high)
    return true;
  else if (s[low] != s[high])
    return false;
  else
    return isPalindromeHelper(s, low + 1, high - 1);
}

bool isPalindrome(char *s) { return isPalindromeHelper(s, 0, strlen(s) - 1); }

int main(void) {
  printf("isPalindrome(\"racecar\") = %d\n", isPalindrome("racecar"));
  printf("isPalindrome(\"e\") = %d\n", isPalindrome("e"));
  printf("isPalindrome(\"\") = %d\n", isPalindrome(""));
  printf("isPalindrome(\"race\") = %d\n", isPalindrome("race"));
  return 0;
}
