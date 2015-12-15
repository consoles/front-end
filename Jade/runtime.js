function template(locals) {
    var jade_debug = [new jade.DebugItem(1, "runtime.jade")];
    try {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;

        jade_debug.unshift(new jade.DebugItem(0, "runtime.jade"));
        jade_debug.unshift(new jade.DebugItem(1, "runtime.jade"));
        buf.push("<!--");
        jade_debug.unshift(new jade.DebugItem(1, jade_debug[0].filename));
        jade_debug.unshift(new jade.DebugItem(3, jade_debug[0].filename));
        buf.push("Created by gaopengfei on 2015/12/15.");
        jade_debug.shift();
        buf.push("\n");
        jade_debug.unshift(new jade.DebugItem(3, jade_debug[0].filename));
        buf.push("");
        jade_debug.shift();
        jade_debug.shift();
        buf.push("-->");
        jade_debug.shift();
        jade_debug.unshift(new jade.DebugItem(4, "runtime.jade"));
        buf.push("<div>");
        jade_debug.unshift(new jade.DebugItem(undefined, jade_debug[0].filename));
        jade_debug.unshift(new jade.DebugItem(5, "runtime.jade"));
        buf.push("<h3>");
        jade_debug.unshift(new jade.DebugItem(undefined, jade_debug[0].filename));
        jade_debug.unshift(new jade.DebugItem(5, jade_debug[0].filename));
        buf.push("jade runtime call");
        jade_debug.shift();
        jade_debug.shift();
        buf.push("</h3>");
        jade_debug.shift();
        jade_debug.unshift(new jade.DebugItem(6, "runtime.jade"));
        buf.push("<p>");
        jade_debug.unshift(new jade.DebugItem(undefined, jade_debug[0].filename));
        jade_debug.unshift(new jade.DebugItem(6, jade_debug[0].filename));
        buf.push("this is from jade pre-compile");
        jade_debug.shift();
        jade_debug.shift();
        buf.push("</p>");
        jade_debug.shift();
        jade_debug.unshift(new jade.DebugItem(7, "runtime.jade"));
        buf.push("<p>");
        jade_debug.unshift(new jade.DebugItem(undefined, jade_debug[0].filename));
        jade_debug.unshift(new jade.DebugItem(7, jade_debug[0].filename));
        buf.push("we use the `jade --client runtime.jade` to create a file named `runtime.js`");
        jade_debug.shift();
        jade_debug.shift();
        buf.push("</p>");
        jade_debug.shift();
        jade_debug.shift();
        buf.push("</div>");
        jade_debug.shift();
        jade_debug.shift();
        ;
        return buf.join("");
    } catch (err) {
        jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "//\r\n   Created by gaopengfei on 2015/12/15.\r\n\r\ndiv\r\n    h3 jade runtime call\r\n    p this is from jade pre-compile\r\n    p we use the `jade --client runtime.jade` to create a file named `runtime.js`\r\n");
    }
}