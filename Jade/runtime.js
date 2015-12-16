function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    ;
    var locals_for_with = (locals || {});
    (function (isRuntime) {
        buf.push("<!-- 在客户端使用jade，jade可以下载到浏览器中可以被单独使用--><!-- 但是仅仅支持比较先进的浏览器。--><!-- 推荐的做法是将jade模板预编译成js脚本，然后使用jade的runtime.js在浏览器中调用Created by gaopengfei on 2015/12/15.\n--><div><h3>jade runtime call " + (jade.escape((jade_interp = isRuntime) == null ? '' : jade_interp)) + "</h3><p>this is from jade pre-compile</p><p>we use the `jade --client --no-debug runtime.jade` to create a file named `runtime.js`</p><p>we can use `runtime.js` in other jade files</p></div>");
    }.call(this, "isRuntime" in locals_for_with ? locals_for_with.isRuntime : typeof isRuntime !== "undefined" ? isRuntime : undefined));
    ;
    return buf.join("");
}