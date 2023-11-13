const ArrayQuickSort = 
`
public class QuickSort {
    public static void quickSort(int[] Arr, int low, int high) {
        if (low < high) {
            // Partition the array into two sub-arrays and get the pivot index
            int pivotIndex = partition(Arr, low, high);
            
            // Recursively sort the sub-arrays
            quickSort(Arr, low, pivotIndex - 1);
            quickSort(Arr, pivotIndex + 1, high);
        }
    }
    
    public static int partition(int[] Arr, int low, int high) {
        int pivot = Arr[high]; // Choose the last element as the pivot
        int i = low - 1; // Index of the smaller element

        for (int j = low; j < high; j++) {
            if (Arr[j] < pivot) {
                // Swap arr[i] and arr[j]
                i++;
                int temp = Arr[i];
                Arr[i] = Arr[j];
                Arr[j] = temp;
            }
        }

        // Swap arr[i+1] and the pivot (arr[high])
        int temp = Arr[i + 1];
        Arr[i + 1] = Arr[high];
        Arr[high] = temp;

        return i + 1; // Return the pivot index
    }
    
    public static void main(String[] args) {
        int[] Arr = {5, 2, 91, 3, 62, 41, 18, 1, 7};
        quickSort(Arr, 0, Arr.length - 1);
        
        for(int i=0; i<Arr.length; i++) {
            System.out.print(Arr[i] + ", ");
        }
        
        // QuickSort implementation.....
    }
    
}
`

export default ArrayQuickSort