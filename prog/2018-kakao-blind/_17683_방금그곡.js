/**
 * 방금그곡은 음악의 정보를 제공하는 서비스이다.
 * 라디오 방송에서는 한 음악을 반보개서 재생할 때도 있어서
 * 기억하고 있는 멜로디가 음악 끝부분과 처음 부분이 이어서 재생된 멜로디일 수 있다.
 * 반대로, 한 음악을 중간에 끊을 경우 원본 음악에는 기억한 멜로디가 들어있다 해도 동일한 곡이 아닐 수 있다.
 *
 * 따라서, 기억한 멜로디를 재생 시간과 제공된 악보를 보면서 비교하고자 한다.
 *
 * 다음과 같은 가정을 통해 찾으려는 음악의 제목을 구하자.
 * - 방금그곡 서비스는 음악 제목, 재생이 시작되고 끝난 시각, 악보를 제공한다.
 * - 악보에 사용되는 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개이다.
 * - 각 음은 1분에 1개씩 재생된다.
 * - 음악이 00:00를 넘겨서까지 재생되는 일은 없다.
 * - 조건이 일치하는 음악이 여러 개일 때에는, 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다.
 *   재생된 시간도 동일한 경우, 먼저 입력된 음악 제목을 반환한다.
 * - 조건이 일치하는 음악이 없을 때에는 "(None)"을 반환한다.
 *
 * @param {\} m 기억한 멜로디 (1~1439)
 * @param {*} musicinfos 방송된 곡의 정보를 담고 있는 배열 (~100)
 *                       "음악이 시작한 시각, 끝난 시각, 음악 제목, 악보 정보"
 * @returns 조건과 일치하는 음악 제목을 출력한다.
 */

function solution(m, musicinfos) {
    const musicinfo = musicinfos
        .map(info => {
            const [startTime, endTime, title, partOfMusic] = info.split(',');
            const playTime = calculatePlayTime(startTime, endTime);

            let music = '';
            while (music.length < playTime) music += partOfMusic;
            return [title, music];
        })
        .sort(([, music], [, otherMusic]) => otherMusic.length - music.length)
        .find(([, music]) => music.match(new RegExp(`${m}[^#]+`)));

    return musicinfo ? musicinfo[0] : '(None)';
}

function calculatePlayTime(startTime, endTime) {
    return convertToMinute(endTime) - convertToMinute(startTime);
}

function convertToMinute(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

/****** TEST CASE *******/

console.log(
    solution('ABCDEFG', [
        '12:00,12:14,HELLO,CDEFGAB',
        '13:00,13:05,WORLD,ABCDEF',
    ]),
);
