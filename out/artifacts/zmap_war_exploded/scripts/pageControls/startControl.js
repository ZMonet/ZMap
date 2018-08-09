/**
 * Created by yusee on 2018/7/9.
 */


/*自动执行函数*/
(function () {

    /**
     * 颜色改变
     */
    {
        var arr = ['#1791fc','#00f2fe'];
        var t = 2000;
        var n = false;
        var body = document.getElementById('container');
        body.style.transition = 'background-color 4000ms';
    }

    {
        var change = function () {
            n = !n;
            var v = arr.shift();
            body.style.backgroundColor = v;
            arr.push(v);
            if(n) {
                setTimeout(change, t);
            } else {
                setTimeout(change, 2*t);
            }
        };
        change();
    }


})();