function Timer(){
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
    var appsname = 'Timer';
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
    minimize.type = 'image';
    minimize.title = 'Minimize';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";
    appbody.className = 'appbody';
    headtextdiv.append(appheadtext);
    apphead.append(headtextdiv);
    apphead.append(headbuttdiv);
    headbuttdiv.append(minimize);
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
    minimize.onclick = function () {minimizer(appsname + "(" + appnumber + ")")};
    
    var timeleft = document.createElement('h1');
    var timeset = document.createElement('input');
    var setbutton = document.createElement('button');
    var stopbutton = document.createElement('button');
    var resetbutton = document.createElement('button');
    var timesuptext = document.createElement('h1');
    var timing;
    var alarm = new Audio('sounds/analog-watch-alarm_daniel-simion.mp3');
    app.style.width = '300px';
    app.style.height = '400px';
    app.style.resize = 'none';
    timesuptext.innerHTML = "TIMES UP!!!";
    timeset.placeholder = "Time(in seconds)";
    timeset.type = "number";
    timeset.className = 'betainput';
    setbutton.innerHTML = "Set & Start Timer";
    setbutton.className = 'tbutton';
    setbutton.onclick = function () {
        timing = timeset.value;
        let timerint = setInterval(function(){
            timeleft.innerHTML = "Time: " + timing--;
            if(timing < 0){
                clearInterval(timerint);
                app.style.backgroundColor = "red";
                appbody.appendChild(timesuptext);
                alarm.play();
                pushNotification("Timer","Time's up!!!", alarm.stop());
            }
        }, 1000);
    };
    resetbutton.innerHTML = "Reset";
    resetbutton.className = 'tbutton';
    resetbutton.onclick = function(){
        timeleft.innerHTML = "";
        clearInterval(timerint);
        alarm.stop();
        app.style.backgroundColor = "rgba(0, 0, 0, .25)";
        app.removeChild(timesuptext);
        app.removeChild(resetbutton);
        app.removeChild(stopbutton);
    };
    stopbutton.innerHTML = "Stop";
    stopbutton.className = 'tbutton';
    stopbutton.onclick = function(){
        clearInterval(timerint);
        alarm.stop();
        app.style.backgroundColor = "rgba(0, 0, 0, .25)";
    };
    appbody.appendChild(stopbutton);
    appbody.appendChild(resetbutton);
    appbody.appendChild(timeleft);
    appbody.appendChild(timeset);
    appbody.appendChild(setbutton);
}