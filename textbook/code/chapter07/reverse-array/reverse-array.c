#include <stdio.h>
#define SIZE 5

int main(void){
    int arr[SIZE] = {2, 5, 7, 8, 9};
    for (int index = 0; index < SIZE; index++){
        printf("%d, ", arr[index]);
    } 
    printf("\n");
    for(int low = 0, high = SIZE - 1; low < high; low++, high--){
        int temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp; 
    }

    for (int index = 0; index < SIZE; index++){
        printf("%d, ", arr[index]);
    } 
    printf("\n");
    return 0;
}
