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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 멜로디와 악보 정보에서 #을 포함한 두글자인 멜로디를 한글자로 변환한다.
 *   예로, 소문자로 변환할 수 있다. C# => c, A# => a
 *
 *   그 다음, 각 곡 정보의 재생 시간을 구한다.
 *   재생 시간은 끝시각과 시작시각을 빼서 구할 수 있다.
 *
 *   그리고 각 곡 정보의 재생 시간과 악보 정보를 활용하여
 *   재생 시간에 해당하는 멜로디를 추출한다.
 *   만약, 멜로디가 재생 시간보다 짧으면 멜로디를 이어 붙여서 확장한다.
 *   반대로 멜로디가 재생 시간보다 길면 재생 시간만큼 잘라낸다.
 *
 *   재생 시간에 해당하는 멜로디를 추출했다면,
 *   기억한 멜로디를 포함하는 멜로디를 갖는 악보 정보를 찾는다.
 *   조건에 만족하는 악보 정보가 여러개라면,
 *   재생 시간을 기준으로 내림차순으로 정렬하여 가장 재생 시간이 긴 악보 정보의 음악 제목을 반환한다.
 *
 * - 처음에 테스트 케이스의 80%만 맞은 이유는,
 *   기억한 멜로디를 포함하는 악보 정보를 잘못 찾았기 때문이다.
 *
 *   처음에는, #를 포함한 두글자인 멜로디를 그대로 사용했다.
 *   (이때, 재생 시간에 해당하는 멜로디를 추출할 때에는 배열로 멜로디를 분류하여 찾았다. [A, A#, C])
 *   그래서 기억한 멜로디를 포함하는지 확인하는 과정에서,
 *   일치하는 멜로디 다음에 #을 포함하는지 확인해야 했다.
 *
 *   예로, 기억한 멜로디가 "ABA"이고 악보가 "ABA#"인 경우,
 *   마지막에 A와 A#은 다른 멜로디이기 때문에 해당 악보는 찾는 악보가 아니다.
 *
 *   이를 검사하기 위해 다음과 같은 정규식을 활용했다.
 *   /멜로디[^#]/
 *   즉, 멜로디와 동일하되 맨 끝에 #이 아닌 경우를 찾고자 했으나,
 *   기억한 멜로디가 "ABA"이고 악보가 "ABA"인 경우에 대해 false를 반환한다. (맨 뒤에 문자가 없는 경우)
 */

function solution(m, musicinfos) {
    m = changeSharpMelodies(m);
    musicinfos = musicinfos
        .map(info => {
            const [startTime, endTime, title, partOfMusic] = info.split(',');
            return [
                calculatePlayTime(startTime, endTime),
                title,
                changeSharpMelodies(partOfMusic),
            ];
        })
        .map(([playTime, title, partOfMusic]) => [
            playTime,
            title,
            findMusicOfPlayTime(playTime, partOfMusic),
        ])
        .sort(([playTime], [otherPlayTime]) => otherPlayTime - playTime);

    const musicinfo = musicinfos.find(([, , music]) => music.match(m));
    return musicinfo ? musicinfo[1] : '(None)';
}

function changeSharpMelodies(music) {
    return music
        .replace(/A#/g, 'a')
        .replace(/C#/g, 'c')
        .replace(/D#/g, 'd')
        .replace(/F#/g, 'f')
        .replace(/G#/g, 'g');
}

function calculatePlayTime(startTime, endTime) {
    return convertToMinute(endTime) - convertToMinute(startTime);
}

function convertToMinute(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

function findMusicOfPlayTime(playTime, partOfMusic) {
    let music = partOfMusic;
    while (music.length < playTime) music += partOfMusic;
    return music.slice(0, playTime);
}

/****** TEST CASE *******/

console.log(
    solution('ABCDEFG', [
        '12:00,12:14,HELLO,CDEFGAB',
        '13:00,13:05,WORLD,ABCDEF',
    ]),
);

console.log(
    solution('CC#BCC#BCC#BCC#B', [
        '03:00,03:30,FOO,CC#B',
        '04:00,04:08,BAR,CC#BCC#BCC#B',
    ]),
);

console.log(solution('CC#BCC#BCC#', ['03:00,03:08,FOO,CC#B']));
