const ArrayBubbleSort = `
public class BubbleSort{
    public static void main(String Args[]) {
        int Arr[] = new int[]{11, -11, 23, 45, 22, 4, 3, 21, 99, -20};
        int len = Arr.length;

        for(int i=0; i<len; i++) {
            for(int j=0; j<(len-i-1); j++) {
                if( Arr[j] > Arr[j+1] ) {   //then swap Arr[j] and Arr[j+1]
                    int temp = Arr[j];
                    Arr[j] = Arr[j+1];
                    Arr[j+1] = temp;
                }
            }
        }

        for(int i=0; i<len; i++) {
            System.out.print(Arr[i] + ", ");
        }
        
        // Sorting an Array using Bubble Sort .....
    }
}
`

export default ArrayBubbleSort