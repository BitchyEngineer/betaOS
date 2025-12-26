function Tasks(){
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
    var appsname = 'Tasks';
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

    // OLD UI COMPLETELY REMOVED
    // THIS IS NOW THE ONLY UI - DIRECTLY BUILT, NO FUNCTIONS, NO REFRESH BUTTON, NO OLD ELEMENTS

    var header = document.createElement('h1');
    header.innerHTML = 'Open Applications';
    header.style.textAlign = 'center';
    header.style.padding = '20px';
    header.style.fontSize = '24px';
    header.style.borderBottom = '2px solid rgba(255,255,255,0.3)';
    appbody.appendChild(header);

    var apps = document.getElementsByClassName('app');

    for (var i = 0; i < apps.length; i++) {
        var currentApp = apps[i];
        var appId = currentApp.id;

        // Skip the Tasks window itself
        if (appId === app.id) continue;

        var taskButton = document.createElement('button');
        taskButton.innerHTML = appId;
        taskButton.style.display = 'block';
        taskButton.style.width = '85%';
        taskButton.style.margin = '15px auto';
        taskButton.style.padding = '18px';
        taskButton.style.fontSize = '18px';
        taskButton.style.backgroundColor = 'rgba(200, 40, 40, 0.85)';
        taskButton.style.color = 'white';
        taskButton.style.border = 'none';
        taskButton.style.borderRadius = '12px';
        taskButton.style.cursor = 'pointer';
        taskButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        taskButton.style.transition = 'all 0.2s';

        taskButton.onmouseover = function() {
            this.style.backgroundColor = 'rgba(255, 60, 60, 0.9)';
            this.style.transform = 'translateY(-2px)';
        };
        taskButton.onmouseout = function() {
            this.style.backgroundColor = 'rgba(200, 40, 40, 0.85)';
            this.style.transform = 'translateY(0)';
        };

        taskButton.onclick = (function(id) {
            return function() {
                var targetApp = document.getElementById(id);
                if (targetApp && desktopbody.contains(targetApp)) {
                    desktopbody.removeChild(targetApp);
                    tasks--;
                    // Reopen Tasks to refresh the list instantly
                    Tasks();
                }
            };
        })(appId);

        appbody.appendChild(taskButton);
    }

    // If no other apps are open
    if (appbody.children.length === 1) {
        var noApps = document.createElement('div');
        noApps.innerHTML = 'No other applications are currently running.';
        noApps.style.textAlign = 'center';
        noApps.style.padding = '50px';
        noApps.style.fontSize = '18px';
        noApps.style.color = '#aaa';
        noApps.style.fontStyle = 'italic';
        appbody.appendChild(noApps);
    }
}