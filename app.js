    //need random times for pipe generated & mario pop up time
    //nouns: popUp, start, hit,

    const pipes = document.querySelectorAll('.pipe');
    const scoreBoard = document.querySelector('.score');
    const marios = document.querySelectorAll('.mario');

    let lastpipe;
    let timeUp = false;
    let score = 0;

    //get random time
    function randTime(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //get random pipe div
    function randpipe(pipes) {
        const idx = Math.floor(Math.random() * pipes.length);
        const pipe = pipes[idx];
        if (pipe === lastpipe) {
            console.log('samesies');
            return randpipe(pipes);
        }
        lastpipe = pipe;
        return pipe;
    }

    function popUp() {
        const pipe = randpipe(pipes);
        let time = randTime(200, 1000);
        pipe.classList.add('up');
        setTimeout(function() {
            pipe.classList.remove('up');
            if (!timeUp) {  
                popUp();
            }
        }, time);
    }

    function hit(e) {
        if (e.isTrusted) {
            console.log('YOU HIT EM!!!!!');
            score++;
            scoreBoard.textContent = score;
        }
        return;
    }

    function start() {
      timeUp = false;
      score = 0;
      scoreBoard.textContent = 0;
      popUp();
      setTimeout(function(){
        timeUp = true;
        pipes.classList.remove('up');
      }, 10000);
    }

    marios.forEach(function(mario, index) {
        mario.addEventListener('click', hit);
    });