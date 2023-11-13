const TraversingCode = 
`public class Traversing{
    public static void main(String Args []) {
        Scanner sc = new Scanner(System.in);
        int []Arr = new int [5];
        for(int i=0; i<5; i++) {
            System.out.println("Enter the number");
            Arr[i] = sc.nextInt();
        }
        for(int i=0; i<5; i++) {
            System.out.println("Array [ "+ i + " ] = " + Arr[i]);
        }

        // Code of Travesing over an Array.....
    }
}`

export default TraversingCode