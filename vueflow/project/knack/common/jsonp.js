
function jsonp (opt) {
    var url = opt.url;
    var data = opt.data;
    var callback = opt.callback || 'callback';

    var oBody = document.getElementsByTagName('body')[0];
    var oScript = document.createElement('script');

    var callbackName = 'cb' + (~~(Math.random()*0xffffff)).toString(16);
    window[callbackName] = function (result) {
        opt.success(result);
    }
    data[callback] = callbackName;

    oScript.setAttribute('src', url + '?' + format(data));
    oBody.append(oScript);
}

function format(data) {
    var str = '';
    for (var p in data) {
        str += encodeURIComponent(p) + '=' + encodeURIComponent(data[p]) + '&';
    }
    return str;
}

export default jsonp;

