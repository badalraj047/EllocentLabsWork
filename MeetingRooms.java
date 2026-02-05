import java.util.*;

public class MeetingRooms {
    static int f(int[][] a) {
        if (a == null || a.length == 0) return 0;
        Arrays.sort(a, (x, y) -> Integer.compare(x[0], y[0]));
        PriorityQueue<Integer> q = new PriorityQueue<>();
        for (int[] m : a) {
            int s = m[0], e = m[1];
            if (!q.isEmpty() && q.peek() <= s) q.poll();
            q.offer(e);
        }
        return q.size();
    }

    public static void main(String[] z) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter number of meetings:");
        int n = sc.nextInt();

        int[][] a = new int[n][2];
        System.out.println("Enter start and end time for each meeting:");
        for (int i = 0; i < n; i++) {
            System.out.print("Meeting " + (i + 1) + " start: ");
            a[i][0] = sc.nextInt();
            System.out.println("Meeting " + (i + 1) + " end: ");
            a[i][1] = sc.nextInt();
        }

        int r = f(a);
        System.out.println("Minimum rooms required: " + r);
        sc.close();
    }
}
