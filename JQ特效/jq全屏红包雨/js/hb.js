(function(){

    var NUMBER_OF_LEAVES = 80;

    function init() {
        var container = document.getElementById('petalbox');

        try {
            for(var i=0; i<NUMBER_OF_LEAVES; i++) {
                container.appendChild(createALeaf());
            }
            setTimeout(() => {
                container.innerHTML = "";
            },10000)
        }
        catch(e) {

        } 
    }

    function createALeaf() {
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');

        image.src = 'images/hb/petal' + randomInteger(1,10) + '.png';
        
        // 未开始下落时候的位置;
        leafDiv.style.top = randomInteger(-200,-100) + 'px';
        leafDiv.style.left = randomInteger(0,1920) + 'px';

        // 加上动画的名称
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin':'counterclockwiseSpinAndFlip';
        leafDiv.style.animationName = 'fade, drop' // 盒子加上动画;[下落,消失]
        image.style.animationName = spinAnimationName; // 图片随机左右旋转;

        // 下落,旋转 持续时间
        var fadeAndDropDuration = randomInteger(2,8) + "s";
        var spinDuration = randomInteger(3,4) + "s";

        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        image.style.animationDuration =  spinDuration;

        // 
        var leafDelay = randomInteger(0,2) + "s";
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;


        leafDiv.appendChild(image);

        return leafDiv;

    }

    function randomInteger(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
    init();

})();