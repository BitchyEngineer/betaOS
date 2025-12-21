function RemindMe(){
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
    var appsname = 'RemindMe';
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

    var rhour = document.createElement('input');
    var rminute = document.createElement('input');
    var ampmsel = document.createElement('select');
    var rmessage = document.createElement('input');
    var createremind = document.createElement('button');
    var prompttxt = document.createElement('p');
    var ampm = ['AM', 'PM'];
    //rhour.id = 'hoursel';
    rhour.type = 'number';
    rhour.max = 12; // 12-hour format
    rhour.placeholder = 'HH';
    //rminute.id = 'minutesel';
    rminute.type = 'number';
    rminute.max = 59;
    rminute.placeholder = 'MM';
    rmessage.type = 'text';
    rmessage.placeholder = "Reminder message...";
    prompttxt.innerText = "Pick the exact time and then you will get a notification reminding you to do whatever you want."

    for (var i = 0; i < ampm.length; i++) {
        var ampmopt = document.createElement('option');
        ampmopt.innerHTML = ampm[i];
        ampmopt.value = ampm[i];
        ampmsel.appendChild(ampmopt);
    }

    createremind.innerHTML = 'Create Reminder';
    createremind.onclick = function() {
        var hour = parseInt(rhour.value);
        var minute = parseInt(rminute.value);
        var selectedAmpm = ampmsel.value;

        // Convert time to 24-hour format
        if (selectedAmpm === 'PM' && hour < 12) {
            hour += 12;
        } else if (selectedAmpm === 'AM' && hour === 12) {
            hour = 0;
        }

        // Get current time
        var now = new Date();
        var notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

        // If the notification time is before the current time, set it for the next day
        if (notificationTime <= now) {
            notificationTime.setDate(notificationTime.getDate() + 1);
        }

        // Calculate the delay in milliseconds
        var delay = notificationTime.getTime() - now.getTime();

        // Schedule the push notification
        setTimeout(function() {
            pushNotification("RemindMe", rmessage.value, 'RemindMe()');
        }, delay);
    };

    appbody.appendChild(rhour);
    appbody.appendChild(rminute);
    appbody.appendChild(ampmsel);
    appbody.appendChild(rmessage);
    appbody.appendChild(createremind);
    appbody.appendChild(prompttxt);
}