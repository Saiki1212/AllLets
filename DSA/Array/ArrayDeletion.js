const ArrayDeletion = 
`
import java.util.Scanner;
public class Insertion{
    public static void main(String Args[]) {
        Scanner sc = new Scanner(System.in);
        int [] Arr = new int [] {1, 22, 32, 31, 21, 11, 15, 3, 5};

        int deleteIndex = 5;

        int len = Arr.length;
        
        for(int i=deleteIndex; i<len-1; i++) {
            Arr[i] = Arr[i+1];
        }
        Arr[len-1] = 0; // Fixing last element as 0....

        for(int i=0; i<len-1; i++) {
            System.out.println(Arr[i]);
        }

        // code for Deleting an element in between an array.....
    }
}
`

export default ArrayDeletion