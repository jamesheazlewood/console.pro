/**
* Print to console
* @param {*} wat object to log
* @param {string} type accepts: 'info', 'error', 'warn'. Also '{', '}' (for group start and end)
* @param {number} schemeNum Accepts 0 - 8
*/
module.exports = function pro(wat, type = 'info', schemeNum = 0) {
    //var foregroundRgb = '0, 0, 178';
    //var backgroundRgb = '221, 221, 255';
    //var offset = 177;

    if (typeof schemeNum === 'undefined') {
        schemeNum = 0;
    }

    var colourSchemes = [
        { name: '0 - 0', back: 'transparent', fore: 'black' },
        { name: '1 - R', back: 'rgb(255,209,207)', fore: 'rgb(187,29,0)' },
        { name: '2 - O', back: 'rgb(255,232,207)', fore: 'rgb(187,96,0)' },
        { name: '3 - Y', back: 'rgb(248,247,207)', fore: 'rgb(166,140,0)' },
        { name: '4 - G', back: 'rgb(230,255,208)', fore: 'rgb(64,127,0)' },
        { name: '5 - C', back: 'rgb(207,255,255)', fore: 'rgb(0,122,127)' },
        { name: '6 - B', back: 'rgb(207,221,255)', fore: 'rgb(35,0,229)' },
        { name: '7 - M', back: 'rgb(255,214,255)', fore: 'rgb(225,4,231)' },
    ];

    // var customLineStyleTest = 'color: ' + colourSchemes[schemeNum].fore + ';' +
    //     'padding: 3px 9px 3px ' + (offset + 9) + 'px;' +
    //     'background-color: ' + colourSchemes[schemeNum].back + ';' +
    //     'position: absolute;' +
    //     'width: calc(100% + ' + offset + 'px);' +
    //     'left: -' + offset + 'px;' +
    //     'top: 0;' +gb
    //     'z-index: -1;';

    var customLineStyle = 'color: ' + colourSchemes[schemeNum].fore + ';' + 'padding: 3px 0px;' +
    'background-color: ' + colourSchemes[schemeNum].back + ';';

    if (type == '{') {
        console.groupCollapsed('%c[[[[[[[[ ' + wat + ' ]]]]]]]]', customLineStyle);
        console.trace();
    } else if (wat == '}' || type == '}') {
        console.groupEnd();
    } else if (type == 'object') {
        console.log(wat);
    } else {
        if (typeof wat !== 'undefined') {
            if (wat.hasOwnProperty('context')) {
                if (wat.length) {
                    //var pusher = [];
                    var stringer = 'jQuery: ' + wat.selector;
                    var str = '';
                    if (wat.context.className == '' && wat.selector == '') stringer = 'jQuery (this)';
                    if (wat.selector == '') stringer = 'jQuery class: ' + wat.context.className;

                    // for each jquery selector result
                    for (var i = 0; i < wat.length; i++) {
                        var attrs = '';
                        for (var j = 0; j < wat[i].attributes.length; j++) {
                            attrs += wat[i].attributes[j].nodeName + ': ' + wat[i].attributes[j].value + ' ';
                        }
                        str = wat[i].localName + ' ' + attrs + 'type: ' + wat[i].type;
                        //pusher.push({
                        //    tag: str
                        //});
                        stringer += '\n' + i + ': ' + str;
                    }
                    wat = stringer;
                } else {
                    wat = 'Empty jQuery array for "' + wat.selector + '".';
                    type = 'warn';
                }
            } else if (typeof wat === 'object') {
                type = 'none';
                if (wat.length == 0) {
                    type = 'warn';
                }
            }
        }

        // do output
        //console.log(arguments.callee.caller.arguments.callee.caller.arguments);
        switch (type) {
            case 'info':
            console.info('%c' + wat, customLineStyle);
            break;
            case 'error':
            console.error(wat);
            break;
            case 'warn':
            console.warn(wat);
            break;
            case 'function':
            console.info('%c((( ' + wat.name + ' )))', customLineStyle);
            //console.log(wat);
            console.trace();
            break;
            default:
            console.log(wat);
            break;
        }
    }
}

/**
* Helpers for pro
* @param wat
* @param variationNumber
*/
function prv(wat, variationNumber) {
    pro(wat, 'info', variationNumber);
}
module.exports.prv = prv;

function prw(wat) {
    pro(wat, 'warn');
}
module.exports.prw = prw;

function prer(wat) {
    pro(wat, 'error');
}
module.exports.prer = prer;

function pr(wat) {
    pro(wat, 'info');
}
module.exports.pr = pr;

function prf(wat) {
    pro(wat, 'function', 3);
}
module.exports.prf = prf;