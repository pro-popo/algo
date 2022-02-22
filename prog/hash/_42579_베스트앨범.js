
/**
 * [HASH] 베스트앨범
 * ### 문제
 * 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 앨범을 출시
 * 노래는 고유 번호로 구분
 * [노래 수록 기준]
 * 1. 속한 노래가 많이 재생된 장르를 먼저 수록
 * 2. 장르 내에서 많이 재생된 노래 먼저 수록
 *    -> 재생 횟수가 동일하면, 고유 번호가 낮은 노래 부터 수록
 *  
 * ### 입력
 * - genres : 노래 장르
 * - plays : 재생 횟수
 * => idx는 고유번호
 * 
 * ### 출력
 * - 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 배열로 반환
 * 
 */
function solution(genres, plays) {
    const playByGener = new Map();
    const musicByGener = new Map();

    genres.forEach((genre, idx) => {
        playByGener.set(genre, (playByGener.get(genre) || 0) + plays[idx]);
        musicByGener.set(genre, (musicByGener.get(genre) || []).concat({ idx, play: plays[idx] }));
    });

    return [...playByGener.entries()]
        .sort((a, b) => b[1] - a[1])
        .flatMap(([genre, _]) => {
            const [first, second] = musicByGener.get(genre).sort((a, b) => b.play - a.play);
            return second ? [first.idx, second.idx] : first.idx
        });
}
console.log(solution(['A', 'A', 'B', 'A'], [5, 5, 6, 5]))