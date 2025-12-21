function Console(){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createElement('ui');
    var appbody = document.createElement('div');
    var close = document.createElement('button');
    var fullscreen = document.createElement('button');
    var minimize = document.createElement('button');
    var isfull = false;
    var headbuttdiv = document.createElement('div');
    var headtextdiv = document.createElement('div');
    var appnumber = Math.random();
    var appsname = 'Console';
    app.scroll = false;
    appbody.scroll = true;
    tasks++;
    app.onerror = function(){errorsound.play();};
    headtextdiv.style.textAlign = 'left';
    headtextdiv.style.width = '50%';
    headtextdiv.style.cssFloat = 'left';
    headbuttdiv.style.textAlign = 'right';
    headbuttdiv.style.width = '50%';
    headbuttdiv.style.cssFloat = 'right';
    appnumber++;
    app.className = 'app';
    apphead.className = 'appheader';
    appheadtext.className = 'appheadtxt';
    appheadtext.innerText = appsname;
    close.type = 'image';
    close.id = "close"
    close.title = 'Close';
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";
    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";
    minimize.type = 'image';
    minimize.title = 'Small';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";
    appbody.className = 'appbody';
    headtextdiv.append(appheadtext);
    apphead.append(headtextdiv);
    apphead.append(headbuttdiv);
    headbuttdiv.append(minimize);
    headbuttdiv.append(fullscreen);
    headbuttdiv.append(close);
    app.appendChild(apphead);
    app.appendChild(appbody);
    if(savedtheme){
        app.style.backgroundColor = localStorage.getItem('theme');
    } else{
        app.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
    desktopbody.appendChild(app);
    app.id = appsname + "(" + appnumber + ")";
    apphead.id = app.id + "header";
    dragWindow(document.getElementById(app.id));
    app.onload = bringToFront(app.id);
    app.onclick = function () {bringToFront(app.id)};
    close.onclick = function () { desktopbody.removeChild(app); tasks--;};
    fullscreen.onclick = function () {
        if (isfull == false){
            app.style.width = '100%';
            app.style.height = 'calc(100% - 80px)'; 
            app.style.top = '0px'; 
            app.style.left = '0%';
            if(savedtheme){
                app.style.backgroundColor = localStorage.getItem('theme');
            }
            isfull = true;
        } else if (isfull == true){
            app.style.width = '50%'; 
            app.style.height = '50%';
            app.style.top = '25%'; 
            app.style.left = '25%';
            isfull = false;
            if(savedtheme){
                app.style.backgroundColor = localStorage.getItem('theme');
            }
        }
    };
    minimize.onclick = function () {minimizer(appsname + "(" + appnumber + ")")};

    // === TERMINAL CONTENT ===
    var terminal = document.createElement('div');
    terminal.style.width = '100%';
    terminal.style.height = '100%';
    terminal.style.backgroundColor = 'inherit';
    terminal.style.color = '#0f0';
    terminal.style.fontFamily = 'Courier New, monospace';
    terminal.style.textAlign = 'left';
    terminal.style.fontSize = '16px';
    terminal.style.padding = '15px';
    terminal.style.boxSizing = 'border-box';
    terminal.style.overflowY = 'auto';
    terminal.style.whiteSpace = 'pre-wrap';
    terminal.style.wordBreak = 'break-all';

    var output = document.createElement('div');

    var promptLine = document.createElement('div');
    var promptText = document.createElement('span');
    promptText.innerText = '$ ';
    promptText.style.color = '#0f0';

    var input = document.createElement('input');
    input.type = 'text';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.color = '#0f0';
    input.style.fontFamily = 'Courier New, monospace';
    input.style.fontSize = '16px';
    input.autocorrect = false;
    input.autocomplete = false;
    input.autocapitalize = false;
    input.style.width = 'calc(100% - 20px)';

    promptLine.appendChild(promptText);
    promptLine.appendChild(input);

    terminal.appendChild(output);
    terminal.appendChild(promptLine);

    // Welcome message
    var welcome = document.createElement('div');
    welcome.innerText = 'betaOS Terminal v1.0\nType JavaScript code and press Enter to evaluate.\nUse console.log(), console.warn(), console.error() to see output.\n';
    output.appendChild(welcome);

    // Override console to show in terminal
    var oldLog = console.log;
    var oldWarn = console.warn;
    var oldError = console.error;

    console.log = function(...args) {
        var line = document.createElement('div');
        line.innerText = args.join(' ');
        line.style.color = '#fff';
        output.appendChild(line);
        oldLog.apply(console, args);
        scrollToBottom();
    };

    console.warn = function(...args) {
        var line = document.createElement('div');
        line.innerText = '[WARN] ' + args.join(' ');
        line.style.color = '#ff0';
        output.appendChild(line);
        oldWarn.apply(console, args);
        scrollToBottom();
    };

    console.error = function(...args) {
        var line = document.createElement('div');
        line.innerText = '[ERROR] ' + args.join(' ');
        line.style.color = '#f00';
        output.appendChild(line);
        oldError.apply(console, args);
        scrollToBottom();
    };

    // Scroll to bottom function
    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Evaluate command
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            var command = input.value.trim();

            if (command !== '') {
                var cmdLine = document.createElement('div');
                cmdLine.innerText = '$ ' + command;
                output.appendChild(cmdLine);

                var resultLine = document.createElement('div');
                try {
                    var result = eval(command);
                    if (result !== undefined) {
                        resultLine.innerText = result;
                        resultLine.style.color = '#fff';
                        output.appendChild(resultLine);
                    }
                } catch (err) {
                    resultLine.innerText = err.toString();
                    resultLine.style.color = '#f00';
                    output.appendChild(resultLine);
                }
            }

            input.value = '';

            scrollToBottom();
            input.focus();
        }
    };

    appbody.appendChild(terminal);
    scrollToBottom();
    input.focus();
}