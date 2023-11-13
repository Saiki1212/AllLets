const Ifelse = `
public class If-Else-Implementation{
    public static void main(String Args[]) {
        // if (condition) {
        //     // block of code to be executed if the condition is true
        // }

        if (20 > 18) {
            System.out.println("20 is greater than 18");
        }
        // output "20 is greater than 18".

        int x = 20;
        int y = 18;
        if (x > y) {
            System.out.println("x is greater than y");
        }
        // output "x is greater than y".

        int time = 20;
        if (time < 18) {
            System.out.println("Good day.");
        } else {
            System.out.println("Good evening.");
        }

        // Outputs "Good evening."

        int time = 22;
        if (time < 10) {
            System.out.println("Good morning.");
        } else if (time < 18) {
            System.out.println("Good day.");
        } else {
            System.out.println("Good evening.");
        }
        
        // Outputs "Good evening."
    }
}
`

export default Ifelse