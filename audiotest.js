if( document.readyState !== 'loading' ) {
    
    initCode();
} else {
    document.addEventListener('DOMContentLoaded', function () {
       
        initCode();
    });
}

var audio;

function initCode()
{
    audio = new Audio('scriabin.mp3');
    audio.muted = false;
    
}

function playAudioTest()
{
    audio.play();
}

function start()
{
    window.location.replace('game.html');
}