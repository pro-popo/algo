/**
 * 준규가 사는 나라는 우리가 사용하는 연도와 다른 방식을 사용한다.
 * 수 3개를 이용하여 연도를 나타낸다.
 * 각각의 수는 지구(E), 태양(S), 달(M)을 나타낸다.
 * 이 세 수는 서로 다른 범위를 가진다. (1 ≤ E ≤ 15, 1 ≤ S ≤ 28, 1 ≤ M ≤ 19)
 *
 * 우리의 1년은 준규가 살고있는 나라에서는 1 1 1로 나타낼 수 있다.
 * 1년이 지날 때마다, 세 수는 모두 1씩 증가한다. 만약 범위를 넘어가는 경우 1이 된다.
 *
 * 예로, 15년은 15 15 15로 나타낼 수 있다.
 * 16년은 16 16 16이 아닌, 1 16 16이 된다. (범위를 초과했기 때문)
 *
 * E,S,M이 주어졌을 때 우리가 알고 있는 연도로 몇 년인지 구하는 프로그램을 작성하자.
 *
 * @param {number} E - 지구
 * @param {number} S - 태양
 * @param {number} M - 달
 * 
 * ### 리뷰 
 * - 풀이 방식은 다음과 같다.
 *   현재 연도를 1씩 증가시키면서 아래 과정을 반복한다.
 *   현재 연도를 각각 E,S,M을 뺀 값을 
 *   각각의 최대 범위(15,28,19)로 나눈 값이 전부 0이 될 때까지 반복한다.
 *   
 * - 동일한 로직임에도 불구하고 node.js로 제출했을 때에는 메모리 초과가 발생한다.
 *   다른 풀이를 참고해 봐도 메모리 초과에서 벗어날 수 없어서 결국 Java로 바꿔서 풀었다. 😂
 * 
 */

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int E = sc.nextInt();
        int S = sc.nextInt();
        int M = sc.nextInt();
        int year = 1;

        while ((year - E) % 15 != 0 || (year - S) % 28 != 0 || (year - M) % 19 != 0) year++;

        System.out.println(year);
    }
}
