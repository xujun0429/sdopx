"use strict";
var Compile_Delim = (function () {
    function Compile_Delim() {
    }
    Compile_Delim.ldelim = function (name, args, compile) {
        return '__raw(' + JSON.stringify(compile.source.left_delimiter_raw) + ');';
    };
    Compile_Delim.rdelim = function (name, args, compile) {
        return '__raw(' + JSON.stringify(compile.source.right_delimiter_raw) + ');';
    };
    Compile_Delim.literal = function (name, args, compile) {
        var _a = args.left, left = _a === void 0 ? "'{@'" : _a, _b = args.right, right = _b === void 0 ? "'@}'" : _b;
        var $_sdopx = compile.sdopx;
        var tplleft = '';
        try {
            tplleft = eval('(' + left + ')');
        }
        catch (e) {
            compile.addError('left delimiter parsing error');
        }
        var tplright = '';
        try {
            tplright = eval('(' + right + ')');
        }
        catch (e) {
            compile.addError('right delimiter parsing error');
        }
        if (!tplleft || typeof (tplleft) !== 'string' || tplleft == '') {
            compile.addError('left delimiter can not be empty');
        }
        if (!tplright || typeof (tplright) !== 'string' || tplright == '') {
            compile.addError('right delimiter can not be empty');
        }
        var reg = new RegExp(compile.source.left_delimiter + '/literal' + compile.source.right_delimiter);
        compile.source.end_literal = reg;
        compile.openTag('literal', [null, compile.source.left_delimiter_raw, compile.source.right_delimiter_raw]);
        compile.source.changDelimiter(tplleft, tplright);
        return '';
    };
    Compile_Delim.literal_close = function (name, compile) {
        var _a = compile.closeTag(['literal']), data = _a[1];
        var left = data[1], rigth = data[2];
        compile.source.changDelimiter(left, rigth);
        return '';
    };
    return Compile_Delim;
}());
module.exports = Compile_Delim;
//# sourceMappingURL=delim.js.map