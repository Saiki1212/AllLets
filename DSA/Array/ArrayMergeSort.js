const ArrayMergeSort = 
`
public class MergeSort {

    // Merge two subarrays of arr[].
    // The first subarray is arr[l..m].
    // The second subarray is arr[m+1..r].
    private static void merge(int Arr[], int l, int m, int r) {
        // Determine the sizes of the two subarrays to be merged.
        int n1 = m - l + 1;
        int n2 = r - m;

        // Create temporary arrays for the two subarrays.
        int leftArray[] = new int[n1];
        int rightArray[] = new int[n2];

        // Copy data to temporary arrays leftArray[] and rightArray[].
        for (int i = 0; i < n1; i++) {
            leftArray[i] = Arr[l + i];
        }
        for (int i = 0; i < n2; i++) {
            rightArray[i] = Arr[m + 1 + i];
        }

        // Merge the two subarrays back into the original array arr[].
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                Arr[k] = leftArray[i];
                i++;
            } else {
                Arr[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Copy the remaining elements of leftArray[], if any.
        while (i < n1) {
            Arr[k] = leftArray[i];
            i++;
            k++;
        }

        // Copy the remaining elements of rightArray[], if any.
        while (j < n2) {
            Arr[k] = rightArray[j];
            j++;
            k++;
        }
    }

    // Main function that sorts arr[l..r] using merge().
    private static void mergeSort(int Arr[], int l, int r) {
        if (l < r) {
            // Find the middle point.
            int m = (l + r) / 2;

            // Sort first and second halves.
            mergeSort(Arr, l, m);
            mergeSort(Arr, m + 1, r);

            // Merge the sorted halves.
            merge(Arr, l, m, r);
        }
    }

    public static void main(String args[]) {
        int Arr[] = {12, 11, 13, 5, 6, 7, 15, 23, 30, 1};

        // Perform the merge sort.
        mergeSort(Arr, 0, Arr.length - 1); // calling mergeSort Function...

        System.out.println("Sorted array:");
        for(int i=0; i<Arr.length; i++) {
            System.out.print(Arr[i] + ", ");
        }
        
        // Performing MergeSort Operation on the given Array to sort the Array....
    }
}

`

export default ArrayMergeSort