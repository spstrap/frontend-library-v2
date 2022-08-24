$(document).ready(function() {

    $(document).keyup(function(e) {
        if (e.keyCode === 27 || e.keyCode === 192) { // esc, `
            fullScreenMode();
        }
   });

});

/*
** 코드 영역만 전체화면 전환
*/
function fullScreenMode() {
    if ($('body').hasClass('fullscreen')) {
        $('body').removeClass('fullscreen');
    } else {
        $('body').addClass('fullscreen');
    }
}

/*
**
*/
import SP_PICKR from '/src/script/library/pickr/pickr.js';
const pickr = new SP_PICKR();

import SP_HIGHLIGHT from '/src/script/library/highlight/highlight.js';
const highlight = new SP_HIGHLIGHT();