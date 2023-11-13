const WhileLoop = `
public class WhileLoop-Implementation{
    public static void main(String args[]) {

        // while (condition) {
        //      code block to be executed
        // }

        int i = 0;
        while (i < 5) {
            System.out.println(i);
            i++;
        }

        // The Do/While Loop....
        int i = 0;
        do {
            System.out.println(i);
            i++;
        }while (i < 5);
    }
}
`
export default WhileLoop