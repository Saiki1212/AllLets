const ArraySelectionSort = `
public class SelectionSort {
    public static void main(String[] args) {
        int[] Arr = {12, 11, 13, 5, 6, 1, 3, 44, 21, 10};
        int n = Arr.length;
        
        for(int i=0; i<n; i++) {
            int minIdx = i;
            for(int j=i+1; j<n; j++) {
                if(Arr[j] < Arr[minIdx]) {
                    minIdx = j;
                }
            }
            // swap the minimum index value with the 1st element.....
            int temp = Arr[minIdx];
            Arr[minIdx] = Arr[i];
            Arr[i] = temp;
        }

        for (int i = 0; i < n; i++) {
            System.out.print(Arr[i] + ", ");
        }

        // Sorting the given Array elements with Selection Sort......
    }
}
`

export default ArraySelectionSort