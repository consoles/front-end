/**
 * Created by gaopengfei on 2015/9/17.
 *
 * 处理背景音乐
 */

$(function () {

    $music = $('#bg_music').get(0);    // audio对象(注意是DOM对象而不是jQuery对象)
    $pause_play_music_btn = $('#pause_play_music_btn');

    /**
     * 暂停/播放音乐
     */
    $pause_play_music_btn.click(function () {

        if ($music.paused) {
            $music.play();
        } else {
            $music.pause();
        }

        update_status_bar();
    });

    /**
     * 重新播放
     */
    $('#replay_music_btn').click(function () {

        $music.load();
        $music.play();
        update_status_bar();
    });


    /**
     * 根据歌曲的状态显示不同的状态
     */
    function update_status_bar() {

        if ($music.paused) {
            $pause_play_music_btn.html('<p>播放</p><p>PLAY</p>');
        } else {
            $pause_play_music_btn.html('<p>暂停</p><p>PAUSE</p>');
        }
    }

});