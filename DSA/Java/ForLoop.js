const ForLoop = `
public class ForLoop-Implementation{
    public static void main(String args[]) {

        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }

        for (int i = 0; i <= 10; i = i + 2) {
            System.out.println(i);
        }

        // Nested Loops
        // It is also possible to place a loop inside another loop. This is called a nested loop.
        // The "inner loop" will be executed one time for each iteration of the "outer loop":

        // Outer loop
        for (int i = 1; i <= 2; i++) {
            System.out.println("Outer: " + i); // Executes 2 times
            // Inner loop
            for (int j = 1; j <= 3; j++) {
                System.out.println(" Inner: " + j); // Executes 6 times (2 * 3)
            }
        } 
    }
}
`
export default ForLoop