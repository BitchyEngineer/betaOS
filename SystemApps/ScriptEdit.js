function ScriptEdit(){
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
    var appsname = 'ScriptEdit';
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
    
    var codetxt = document.createElement('textarea');
    var fdiv = document.createElement('div');
    fdiv.className = 'tab';
    var f1 = document.createElement('input');
    var runbutt = document.createElement('button');
    var resetbutt = document.createElement('button');
    var savebutt = document.createElement('button');
    var runscript = document.createElement('script');
    appbody.scroll = false;
    appbody.style.overflow = 'hidden';
    codetxt.scroll = true;
    codetxt.className = 'codetxt'
    f1.className = 'tablinks';
    runbutt.className = 'tablinks';
    resetbutt.className = 'tablinks';
    runbutt.onclick = function(){
    if(f1.value.includes('.js')){
        runscript.innerHTML = codetxt.value;
        desktopbody.appendChild(runscript);
    } else if(f1.value.includes('.html')){
        betaNet();
        browserview.srcdoc = codetxt.value;
    }
                
    };
    resetbutt.onclick = function(){
        location.reload();
    };
    savebutt.onclick = function(){
        saveAs(f1.value);
    };
    codetxt.style.width = '100%';
    codetxt.style.height = '97.5%';
    codetxt.style.backgroundColor = 'black';
    codetxt.style.color = 'white';
    codetxt.value = ``;
    f1.value = 'Untitled.js';
    runbutt.innerHTML = 'Run';
    resetbutt.innerHTML = 'Reset(Stop)';
    savebutt.innerHTML = 'Save As';
    resetbutt.title = 'Restart betaOS to remove temporary scripts';
    fdiv.appendChild(f1);
    fdiv.appendChild(runbutt);
    fdiv.appendChild(resetbutt);
    fdiv.appendChild(savebutt);
    appbody.appendChild(fdiv);
    appbody.appendChild(codetxt);

    //Save files(txt, js and html)
    function saveAs(filename) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codetxt.value));
        pom.setAttribute('download', filename);
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }
}