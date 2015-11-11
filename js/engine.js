var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        winsE = document.getElementById('wins'),
        bestE = document.getElementById('best'),
        wins = 0, best = 0;


    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);


    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;


        update(dt);
        render();


        lastTime = now;


        win.requestAnimationFrame(main);
    };


    function init() {
        reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        updateEntities(dt);
        if(checkCollisions()){
            wins = 0;
            stats();
            reset();
        }
    }


    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        if(player.update()){
            wins++;
            stats();
            setTimeout(function(){
                reset();
            }, 1000);
        }
    }


    function checkCollisions(dt) {
        var collision = false;
        allEnemies.forEach(function(enemy) {
            if(enemy.row == player.row){
                if(enemy.x + 83 > player.x && enemy.x < player.x + 83){
                    collision = true;
                }
            }
        });
        return collision;
    }

    function stats() {
        if(wins > best){
            best = wins;
            bestE.innerHTML = best;
        }
        winsE.innerHTML = wins;
    }

    function render() {

        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;


        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {
        player.reset();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
