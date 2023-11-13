const ArrayInsertionSort = `
public class InsertionSort {
    public static void main(String[] args) {
        int[] Arr = {12, 11, 13, 5, 6};
        int n = Arr.length;
        
        for (int i = 1; i < n; i++) {
            int currElement = Arr[i];
            int j = i - 1;
            
            // Shift elements of the sorted subarray that are greater than the current element
            while (j >= 0 && Arr[j] > currElement) {
                Arr[j + 1] = Arr[j];
                j--;
            }
            Arr[j + 1] = currElement;
        }

        for (int i = 0; i < n; i++) {
            System.out.print(Arr[i] + ", ");
        }

        // Sorting an Array of elements with the help of Insertion Sort....
    }
}
`

export default ArrayInsertionSort