import java.util.Scanner;

class Test{
    public static void main(String [] args){
        int mark;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the year: ");
        mark = sc.nextInt();
        if(mark>=90){
            System.out.println("your grade is A");
        }else if(mark>=75){
            System.out.println("Your grade is b");
        }
    }
}