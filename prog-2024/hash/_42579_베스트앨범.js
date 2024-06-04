/**
 * 장르 별로 가장 많이 재생된 노래 "두 개씩" 모아 베스트 앨범 출시
 * 노래는 고유 번호로 구분
 *
 * [노래 수록 기준]
 * 1. 속한 노래가 많이 재생된 장르
 * 2. 장르 내 많이 재생된 노래
 * 3. 장르 내 재생 횟수가 같은 경우, 고유 번호가 낮은 노래
 *
 * @param {string[]} genres 장르 배열
 * @param {number[]} plays 노래별 재생 횟수 배열
 * @returns 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 반환
 */

function solution(genres, plays) {
    const countPlayByGenre = genres.reduce((map, genre, idx) => {
        const { count = 0, ids = [] } = map.get(genre) || {};

        return map.set(genre, {
            count: count + plays[idx],
            ids: ids.concat(idx).sort((a, b) => plays[b] - plays[a]),
        });
    }, new Map());

    return [...countPlayByGenre.values()]
        .sort((a, b) => b.count - a.count)
        .flatMap(({ ids }) => ids.slice(0, 2));
}

console.log(
    solution(
        ['classic', 'pop', 'classic', 'classic', 'pop'],
        [500, 600, 150, 800, 2500],
    ),
);
