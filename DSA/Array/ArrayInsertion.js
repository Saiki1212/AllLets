const ArrayInsertion = `
import java.util.Scanner;
public class Insertion{
    public static void main(String Args[]) {
        Scanner sc = new Scanner(System.in);
        int n = 5; // size of array
        int [] Arr = new int[n+1]; // making extra 1 space for my new key. 
        for(int i=0; i<n; i++) {
            Arr[i] = sc.nextInt(); // taking input of all the elements in Array.
        }
        int key  = 25; // insert 25
        int index = 4; // insert 25 at index 4.
        for(int i=n; i>index; i--) {
            Arr[i] = Arr[i-1];
        }
        Arr[index] = key;
        for(int i=0; i<Arr.length; i++) {
            System.out.println(Arr[i]);
        }

        // code for Inserting an element in between an array.....
    }
}`

export default ArrayInsertion