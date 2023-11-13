const ArrayCountSort = `
public class CountSort {
    public static void main(String[] args) {
        int[] Arr = {12, 11, 13, 5, 6, 1, 3, 44, 21, 10};
        int n = Arr.length;
        
        // First find the max value in the given Array....
        int max = 0;
        for(int i= 0; i<n; i++) {
            if(Arr[i] > max) 
                max = Arr[i];
        }
        
        int []newArray = new int[max+1];
        // create new array and increase the value of new array when the old array is matched to new array index.
        for(int i=0; i<n; i++) {
            newArray[Arr[i]]++;
        }
        
        int j=0;
        for(int i=0; i<max+1; i++) {
            if(newArray[i] != 0) {
                Arr[j++] = i;
            }
        }

        for (int i = 0; i < n; i++) {
            System.out.print(Arr[i] + ", ");
        }

        // Successfully applied Count sort the given data.....
    }
}
`

export default ArrayCountSort