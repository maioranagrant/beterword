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

    alert("IMPORTANT: Once you click \"Start Game\", you cannot enter this week's game of Beterword again. You must finish the game without leaving or reloading the webpage to have your score recorded.");
    
}

function playAudioTest()
{
    audio.play();
}

function start()
{
    window.location.replace('game.html');
}