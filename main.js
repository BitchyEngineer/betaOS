/*  Copyright nononopmv 2025
    betaOS Copyright (C) 2025 nononopmv
    Resdistribution is allowed under certain conditions,
    See LICENSE file for details.
*/
bootDesktop();
var betaOSversion = "1.0.2";
var defaultengine;
var saveddefault = localStorage.getItem("DefaultEngine");
var savedtheme = localStorage.getItem("theme");
var batterybar = document.getElementById("batteryprogress");
var errorsound = new Audio("sounds/so4error.mp3");
var chargesound = new Audio("sounds/so4chargesound.mp3");
var rsod = false;

//Time(Clock stuff)
/*function startTime() {
    var date = new Date();non
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM";
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("datetime").innerHTML = hour + ":" + min + ":" + sec + " " + midday;
      var t = setTimeout(startTime, 1000);
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }*/
  
  //startTime();

var savednav = localStorage.getItem("savednav");
var saveddesk = localStorage.getItem("saveddesk");

var changelog = `betaOS Changelog:
.betaOS 1.0.0
    - betaAssist added
    - Nononopmv app added
    - NudVista app added
    - Settings app added (some features still missing)
    - New backgrounds added
    - Themes added
.betaOS 1.0.1
    - Theme names changed
    - More themes added
    - More backgrounds added
    - Hypnotube app added (certain site features may not work correctly)
    - NudeVista updated to make links work, but websites still don't fully show up correctly due to security features they use like cross-origin blocking.
    - Desktop shortcuts added
    - New prompts & responses added to betaAssist
.betaOS 1.0.2
    - Files app added
    - AudioPlayer added
    - Mobile support added`;

var savedbackground = localStorage.getItem('background');


function dragWindow(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//Start Up UI and Functionality
var textarea = document.createElement("textarea");
var navbar = document.createElement('div');
var rightnav = document.createElement('div');
rightnav.className = 'rightdiv';
rightnav.id = 'rightdiv';
var desktopbody = document.getElementById('desktopbody');
var startupscreen = document.createElement('img');
startupscreen.style.width = '100%';
startupscreen.style.height = '100%';
var actioncenter = document.createElement('div');
var appcenter = document.createElement('div');
appcenter.className = 'appcenter';

function bootDesktop(){
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';

    /*if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { 
        objbrowserName = "Chrome"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7);
    }else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { 
        objbrowserName = "Microsoft Internet Explorer"; 
        objfullVersion = objAgent.substring(objOffsetVersion+5); 
        //console.error(e344);
        //RSOD(e344);
    }else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
        objbrowserName = "Firefox"; 
        //console.error(e344);
        //RSOD(e344);
    }else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
        objbrowserName = "Safari"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7); 
        if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
        //console.error(e344);
        //RSOD(e344);
    }*/

    var boottxt = document.createElement('div');
    var desktopbody = document.getElementById('desktopbody');
    boottxt.style.color = 'white';
    boottxt.style = 'width: 100%; height: 100%';
    desktopbody.appendChild(boottxt);

    setTimeout(function(){boottxt.innerText+="\n" + objbrowserName + objfullVersion}, 250);
    console.log(objbrowserName + objfullVersion);
    setTimeout(function(){boottxt.innerText+="\n betaOS " + betaOSversion}, 350);
    console.log("betaOS " + betaOSversion);
    setTimeout(function(){boottxt.innerText+="\n Copyright nononopmv 2025"; console.log("copyright nononopmv 2025")}, 500);
    setTimeout(function(){boottxt.innerText+="\n betaOS Copyright (C) 2025 nononopmv"; console.log("betaOS Copyright (C) 2025 nononopmv")}, 650);
    setTimeout(function(){boottxt.innerText+="\n Resdistribution is allowed under certain conditions"; console.log("Redistribution is allowed under certain conditions")}, 750);
    setTimeout(function(){boottxt.innerText+="\n See LICENSE file for details"; console.log("See LICENSE file for details")}, 850);
    setTimeout(function(){boottxt.innerText+="\n System dependencies loaded successfully"; console.log("System dependencies loaded successfully")}, 1000);
    setTimeout(function(){boottxt.innerText+="\n Loading JavaScript"; console.log("Loading JavaScript")}, 1150);
    setTimeout(function(){boottxt.innerText+="\n Loading programs"; console.log("Loading programs")}, 1250);
    setTimeout(function(){boottxt.innerText+="\n JavaScript loaded successfully"; console.log("JavaScript loaded successfully")}, 1350);
    setTimeout(function(){boottxt.innerText+="\n Programs loaded successfully"; console.log("Programs loaded successfully")}, 1500);
    setTimeout(function(){boottxt.innerText+="\n Loading betaAssist"; console.log("Loading betaAssist")}, 1600);
    setTimeout(function(){boottxt.innerText+="\n betaAssist loaded successfully"; console.log("betaAssist loaded successfully")}, 1700);
    setTimeout(function(){boottxt.innerText+="\n Loading app icons"; console.log("Loading app icons")}, 1850);
    setTimeout(function(){boottxt.innerText+="\n Loading background images"; console.log("Loading background images")}, 1950);
    setTimeout(function(){boottxt.innerText+="\n App icons loaded successfully"; console.log("App icons loaded successfully")}, 2100);
    setTimeout(function(){boottxt.innerText+="\n Background images loaded successfully"}, 2200);
    setTimeout(function(){boottxt.innerText+="\n See the changelog in the About section of Settings"}, 2450);
    setTimeout(function(){boottxt.innerText+="\n Starting up betaOS..."; console.log("Starting up betaOS...")}, 2550);
    
    setTimeout(function(){desktopbody.removeChild(boottxt); startUp();}, 2900);
}

//Drag & Rearrange Icons
function dragStarted(evt){
    //start drag
    source=evt.target;
    //set data
    evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
    //specify allowed transfer
    evt.dataTransfer.effectAllowed = "move";
}

function draggingOver(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
}

function dropped(evt){
    evt.preventDefault();
    evt.stopPropagation();
    source.innerHTML = evt.target.innerHTML;
    evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
}

//Notifications System
var notificationStack = [];
function pushNotification(appname, message){
    var notifbody = document.createElement('div');
    var notifname = document.createElement('h1');
    var notifmessage = document.createElement('p');
    var notifcontrol = document.createElement('div');
    var deletebutt = document.createElement('button');
    var openbutt = document.createElement('button');
    var okaybutt = document.createElement('button');
    notifcontrol.className = 'notifcontrol';
    notifbody.className = 'notifbody';
    notifbody.style.zIndex = top_z+10;
    notifname.innerHTML = appname;
    notifmessage.innerHTML = message;
    deletebutt.className = "notifbutt";
    openbutt.className = "notifbutt";
    deletebutt.innerHTML = "Dismiss";
    deletebutt.onclick = function(){
        desktopbody.removeChild(notifbody);
        notificationStack = notificationStack.filter(n => n !== notifbody);
        repositionNotifications();
    };
    openbutt.innerHTML = "Open";
    openbutt.onclick = function(){
        betaApp(appname);
        desktopbody.removeChild(notifbody);
        notificationStack = notificationStack.filter(n => n !== notifbody);
        repositionNotifications();
    };

    if(savedtheme){
        notifbody.style.backgroundColor = localStorage.getItem('theme');
    } else {
        notifbody.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }

    chargesound.play();

    desktopbody.appendChild(notifbody);
    notifbody.appendChild(notifname);
    notifbody.appendChild(notifmessage);
    notifcontrol.appendChild(openbutt);
    notifcontrol.appendChild(deletebutt);
    notifbody.appendChild(notifcontrol);
    
    notificationStack.push(notifbody);
    repositionNotifications();
}

function repositionNotifications(){
    var notifHeight = 200;
    var gap = 10;
    var baseTop = 20;
    
    notificationStack.forEach(function(notif, index){
        var topPosition = baseTop + ((notificationStack.length - 1 - index) * (notifHeight + gap));
        notif.style.top = topPosition + 'px';
    });
}

var so4icon = document.createElement('img');
var startupbar = document.createElement('div');

function startUp(){
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    startupbar.className = 'sloadbar';
    so4icon.src = 'images/betaOS full.png';
    so4icon.className = 'so4icon';
    var startsound = new Audio('sounds/startupsound.mp3');
    startsound.autoplay = true;
    desktopbody.appendChild(startsound);
    desktopbody.appendChild(so4icon);
    //setTimeout(function(){desktopbody.appendChild(startupbar);},3000);
    setTimeout(function(){
        loadDesktop();
        desktopbody.removeChild(so4icon);
        desktopbody.removeChild(startsound);
    }, 4000);
}

var devicesupported = true;


var actiondiv = document.createElement('div');
var appdiv = document.createElement('div');
var pinneddiv = document.createElement('div');
var deskgrid = document.createElement('div');
deskgrid.className = 'deskgrid';
pinneddiv.className = 'pinneddiv';
var minimized = document.createElement("div");
minimized.className = "miniapps";

function minimizer(appname){
    var miniicon = document.createElement("button");
    document.getElementById(appname).style.display = "none";
    // Extract clean app name: remove numbers, parentheses, decimals
    var cleanAppName = appname.replace(/[0-9().]/g, '');
    miniicon.title = cleanAppName;
    miniicon.id = appname + "_icon";
    miniicon.className = "miniicon";
    // Set background image using clean app name
    miniicon.style.backgroundImage = 'url("images/' + cleanAppName + '.png")';
    miniicon.style.backgroundSize = '50px 50px';
    miniicon.style.backgroundRepeat = 'no-repeat';
    miniicon.style.backgroundPosition = 'center';
    minimized.appendChild(miniicon);
    miniicon.onclick = function(){
        document.getElementById(appname).style.display = "inline";
        minimized.removeChild(miniicon);
        bringToFront(appname);
    };
}

//Desktop Loading Sequence
function loadDesktop(){

    if(savedbackground){
        document.body.style.backgroundImage = localStorage.getItem('background');
    } else{
        document.body.style.backgroundImage = 'url("images/Nonono.png")';
    }

    desktopbody.appendChild(deskgrid);

    if(saveddesk){
        deskgrid.innerHTML = saveddesk;
    } else {
        deskgrid.innerHTML = '';
    }

    navbar.className = 'navbar';
    navbar.id = 'navbar';
    desktopbody.appendChild(navbar);
    desktopbody.appendChild(rightnav);
    actiondiv.id = 'actiondiv';
    appdiv.id = 'appdiv';
    navbar.appendChild(actiondiv);
    navbar.appendChild(appdiv);
    navbar.appendChild(pinneddiv);
    navbar.appendChild(minimized);

    var actionmenuicon = document.createElement('button');
    actionmenuicon.type = 'image';
    actionmenuicon.style = 'background: url("images/beta no bg.png"); background-size: 50px 50px;';
    actionmenuicon.className = 'appicon';
    actionmenuicon.title = 'betaOS';
    actionmenuicon.setAttribute("onclick", "desktopbody.appendChild(actioncenter);");
    actiondiv.appendChild(actionmenuicon);

    var appicon1 = document.createElement('button');
    appicon1.type = 'image';
    appicon1.style = 'background: url("images/Settings.png"); background-size: 50px 50px;';
    appicon1.className = 'appicon';
    appicon1.title = 'Settings';
    appicon1.setAttribute("onclick", "betaApp('Settings')");
    appdiv.appendChild(appicon1);
    
    var appicon2 = document.createElement('button');
    appicon2.type = 'image';
    appicon2.style = 'background: url("images/Files.png"); background-size: 50px 50px;';
    appicon2.className = 'appicon';
    appicon2.title = 'Files';
    appicon2.setAttribute("onclick", "betaApp('Files')");
    appdiv.appendChild(appicon2);

    var appicon3 = document.createElement('button');
    appicon3.type = 'image';
    appicon3.style = 'background: url("images/Nononopmv.png"); background-size: 50px 50px;';
    appicon3.className = 'appicon';
    appicon3.title = 'Nononopmv';
    appicon3.setAttribute("onclick", "betaApp('Nononopmv');");
    appdiv.appendChild(appicon3);

    var clockb = document.createElement('button');
    clockb.id = 'datetime';
    if(savedtheme){
        clockb.style.backgroundColor = localStorage.getItem('theme');
    }
    rightnav.appendChild(clockb);
    startTime();
    function startTime() {
        var date = new Date();
        var day = date.getDay()+7;
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM";
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        clockb.innerHTML = month + "/" + day + "/" + year + " | " + hour + ":" + min + ":" + sec + " " + midday;
          var t = setTimeout(startTime, 1000);
    }
      
    function updateTime(k) {
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
    }
    
    if(savednav){
        pinneddiv.innerHTML = localStorage.getItem("savednav");
    }

    if(savedtheme){
        navbar.style.backgroundColor = localStorage.getItem('theme');
        actioncenter.style.backgroundColor = localStorage.getItem('theme');
    }

    actioncenter.className = 'popuplist';

    var ltxt = document.createElement('h2');
    var signoutbutt = document.createElement('button');
    var restartbutt = document.createElement('button');
    var controlcenter = document.createElement('div');
    var usercard = document.createElement('div');
    var usertxt = document.createElement('h1');
    var userpic = document.createElement('img');
    var testnotif = document.createElement('button');
    var testerror = document.createElement('button');

    usercard.className = 'usercard';
    usertxt.className = 'usernametxt';
    usertxt.innerHTML = un;
    userpic.className = 'userpic';
    userpic.src = 'images/profile-pic.png';
    usercard.appendChild(userpic);
    usercard.appendChild(usertxt);

    ltxt.innerHTML = "System"; 

    signoutbutt.style = 'background-image: url("images/lock.png"); background-size: 50px 50px';
    signoutbutt.title = 'Sign Out';
    signoutbutt.onclick = function(){signOut();};
    signoutbutt.className = 'appicon';

    restartbutt.style = 'background-image: url("images/restart.png"); background-size: 50px 50px';
    restartbutt.title = 'Restart';
    restartbutt.onclick = function(){location.reload();};
    restartbutt.className = 'appicon';

    testnotif.style = 'background-image: url("images/notiftest.png"); background-size: 50px 50px';
    testnotif.title = 'Test Notif';
    testnotif.onclick = function(){pushNotification("testing", "TESTING TESTING 294184")};
    testnotif.className = 'appicon';
    
    testerror.style = 'background-image: url("images/errortest.png"); background-size: 50px 50px';
    testerror.title = 'Test Error';
    testerror.onclick = function(){betaApp("Error");};
    testerror.className = 'appicon';

    controlcenter.className = 'controlcenter';

    // Create app buttons using a loop
    var apps = [
        { name: 'Files', icon: 'Files.png'},
        { name: 'Settings', icon: 'Settings.png' },
        { name: 'NudeVista', icon: 'Nudevista.png' },
        { name: 'Nononopmv', icon: 'Nononopmv.png' },
        { name: 'Timer', icon: 'Timer.png' },
        { name: 'Hypnotube', icon: 'Hypnotube.png' },
        { name: 'ScriptInjector', icon: 'ScriptInjector.png' },
        { name: 'Shortcuts', icon: 'Shortcuts.png', onclick: "betaApp('Settings'); openSett(event, 'Shortcuts'); desktopbody.removeChild(actioncenter);" },
        { name: 'betaAssist', icon: 'BetaAssist.png' },
        { name: 'ScriptEdit', icon: 'ScriptEdit.png' }
    ];

    apps.forEach(function(app){
        var appButton = document.createElement('button');
        appButton.className = 'appicon';
        appButton.style.backgroundImage = 'url(images/' + app.icon + ')';
        appButton.title = app.name;
        if(app.onclick){
            appButton.setAttribute("onclick", app.onclick);
        } else {
            appButton.setAttribute("onclick", "betaApp('" + app.name + "'); desktopbody.removeChild(actioncenter);");
        }
        appcenter.appendChild(appButton);
    });

    var actionarea = document.createElement('div');
    actionarea.id = 'actionarea';

    var closebutt = document.createElement('button');
    closebutt.type = 'image';
    closebutt.id = "close"
    closebutt.title = 'Close';
    closebutt.src = "images/close.png";
    closebutt.style.fontFamily = "Arial";
    closebutt.className = "appheadbutt";
    closebutt.style.position = 'relative';
    closebutt.style.right = '0px';
    closebutt.onclick = function () { desktopbody.removeChild(actioncenter); };

    actioncenter.appendChild(closebutt);
    actioncenter.appendChild(appcenter);
    actioncenter.appendChild(controlcenter);

    controlcenter.appendChild(usercard);
    controlcenter.appendChild(ltxt);
    controlcenter.appendChild(signoutbutt);
    controlcenter.appendChild(restartbutt);
    controlcenter.appendChild(testnotif);
    controlcenter.appendChild(testerror);

    //pushNotification("Settings", "Check changelog for updates and changes");
    if(un){
        if(pw){
            return;
        }
    } else {
        pushNotification("Settings", "Setup your account credentials before using betaOS");
    }
}

function RSOD(message){
    rsod = true;
    errorsound.play();
    document.body.innerHTML = '';
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'red';
    document.body.innerText+="\n " + message;
    document.body.innerText+='\n Press CTRL + R or F5 for a system refresh';

}

var classicMode = false

//Sign In
function signIn(){
    desktopbody.removeChild(timetxt);
    //desktopbody.removeChild(loginbar);
    navbar.appendChild(actiondiv);
    navbar.appendChild(appdiv);
    navbar.appendChild(pinneddiv);
    navbar.appendChild(minimized);
    desktopbody.appendChild(deskgrid);
    desktopbody.appendChild(navbar);
    desktopbody.appendChild(rightnav);
    desktopbody.appendChild(conmenu1);

    if(saveddesk){
        deskgrid.innerHTML = localStorage.getItem("saveddesk");
    }
   
    if(savednav){
        pinneddiv.innerHTML = '';
        pinneddiv.innerHTML = localStorage.getItem("savednav");
    }
}

var un = localStorage.getItem("username");
var pw = localStorage.getItem("password");

var sotxt = document.createElement('h2');
var userdiv = document.createElement("div");
var timetxt = document.createElement('h1');
var loginbar = document.createElement('div');

//Sign Out
function signOut(){
    var usernamein = document.createElement('input');
    var passinput = document.createElement('input');
    var loginbutt = document.createElement('button');
    var vnum = document.createElement('h3');
    userdiv.className = 'soalert';
    usernamein.className = 'logininput';
    usernamein.placeholder = 'Username';
    passinput.className = 'logininput';
    passinput.placeholder = 'Password';
    passinput.type = "password";
    loginbutt.className = 'loginbutt';
    loginbutt.innerHTML = "Sign In";
    loginbutt.onclick = function(){
        var username = usernamein.value;
        var password = passinput.value;
        if(username === un){
            if(password === pw){
                signIn();
                userdiv.removeChild(sotxt);
                userdiv.removeChild(usernamein);
                userdiv.removeChild(passinput);
                userdiv.removeChild(loginbutt);
                userdiv.removeChild(vnum);
                desktopbody.removeChild(userdiv);
            } else {
                pushNotification("System", "Username or password is incorrect");
            }
        } else {
            pushNotification("System", "Username or password is incorrect");
        }
    };
    vnum.innerHTML = "betaOS " + betaOSversion;
    vnum.style.opacity = '50%';
    sotxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    timetxt.style.alignItems = 'center';
    timetxt.style.justifyContent = 'center';
    timetxt.style.display = 'flex';
    sotxt.innerHTML = 'betaOS';
    sotxt.style.fontSize = '65px';
    sotxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    sotxt.style.fontFamily = "Arial";
    sotxt.style.opacity = '50%';
    loginbar.className = 'logbar';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    loginbar.onclick = function () {signIn();};
    desktopbody.innerHTML = '';
    userdiv.appendChild(sotxt);
    userdiv.appendChild(usernamein);
    userdiv.appendChild(passinput);
    userdiv.appendChild(loginbutt);
    userdiv.appendChild(vnum);
    desktopbody.appendChild(userdiv);
    desktopbody.appendChild(timetxt);
    //desktopbody.appendChild(loginbar);
    startLockTime();
    function startLockTime() {
        var date = new Date(); /* creating object of Date class */
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        timetxt.innerHTML = hour + ":" + min + ":" + sec + " " + midday; /* adding time to the div */
          var t = setTimeout(startLockTime, 1000); /* setting timer */
      }
      
      function updateTime(k) { /* appending 0 before time elements if less than 10 */
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
      }
}

//SleepMode
function sleepMode(){
    timetxt.style.fontSize = '85px';
    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    desktopbody.style.color = 'white';
    desktopbody.style.textAlign = 'center';
    desktopbody.onkeypress = function(){
        signIn();
    };
    desktopbody.innerHTML = '';
    desktopbody.appendChild(timetxt);
    startLockTime();
    function startLockTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = checkLockTime(m);
        timetxt.innerHTML = h + ":" + m;
        var t = setTimeout(startLockTime, 500);
    }

    function checkLockTime(i) {
        if (i < 10) { i = "0" + i; }
        return i;
    }
}


//Context Menu 1
var conmenu1 = document.getElementById('menu');
var conmenu1butt1 = document.getElementById('conbutt1');
var conmenu1butt2 = document.getElementById('conbutt2');
var conmenu1butt3 = document.getElementById('conbutt3');
var conmenu1butt4 = document.getElementById('conbutt4');
var conmenu1butt5 = document.getElementById('conbutt5');
var conmenu1butt6 = document.getElementById('conbutt6');

if(savedtheme){
    conmenu1.style.backgroundColor = localStorage.getItem('theme');
}
conmenu1butt1.onclick = function () { betaApp('Settings'); openSett(event, 'Personalization'); };
conmenu1butt2.onclick = function () { betaApp('Settings'); openSett(event, 'Shortcuts'); };
conmenu1butt3.onclick = function () {
    newSticky();
};
conmenu1butt4.onclick = function () {
    betaApp("Tasks");
};
conmenu1butt5.onclick = function () {
    editMode();
    this.remove();
    conmenu1butt6.style.display = 'flex';
};
conmenu1butt6.onclick = function () {
    normMode();
};


/*conmenu1.appendChild(conmenu1butt1);
conmenu1.appendChild(conmenu1butt4);
conmenu1.appendChild(conmenu1butt8);
conmenu1.appendChild(conmenu1butt6);
conmenu1.appendChild(conmenu1butt9);
document.body.appendChild(conmenu1);*/

//StickyNotes
function newSticky(){
    var notebodydiv = document.createElement("div");
    var notehead = document.createElement('div');
    var notetxt = document.createElement("textarea");
    var closeb = document.createElement('button');
    var notenumber = Math.random();
    closeb.type = 'image';
    closeb.id = "close"
    closeb.title = 'Close';
    closeb.src = "images/close.png";
    closeb.style.fontFamily = "Arial";
    closeb.className = "appheadbutt";
    closeb.onclick = function(){desktopbody.removeChild(notebodydiv);};
    notebodydiv.className = 'notebody';
    notenumber++;
    notebodydiv.id = "notebody" + notenumber;
    notehead.className = "noteheader";
    notehead.id = notebodydiv.id + "header";
    notebodydiv.onclick = function(){bringToFront(notebodydiv.id);};
    notetxt.className = 'notetxt';
    desktopbody.appendChild(notebodydiv);
    notebodydiv.appendChild(notehead);
    notehead.appendChild(closeb);
    notebodydiv.appendChild(notetxt);
    dragWindow(document.getElementById("notebody" + notenumber));
}

//DarkMode Toggle
function darkToggle2(){
    var darkmodeon = document.getElementById("darkmodetoggle2").checked;
    if(darkmodeon == true){
        darkMode();
    }else if(darkmodeon == false){
        lightMode();
    }
    console.log(darkmodeon);
}

var nb = document.querySelector('.navbar');

function editMode(){
    var iconedit = document.getElementsByClassName('appicon');
    pushNotification("EditMode", "Any icon you click on the desktop or doc will be deleted. Open the context menu and click 'Exit EditMode' when you're done.")
    for(var i = 0; i < iconedit.length; i++){
        iconedit[i].onclick = function(){
            if(this.className === 'appicon'){
                this.remove();
                localStorage.setItem('saveddesk', deskgrid.innerHTML);
                localStorage.setItem('savednav', pinneddiv.innerHTML)
            }
        };
    }
}

function normMode(){
    location.reload();
    localStorage.setItem("savednav", pinneddiv.innerHTML);
}

var currentTasks = 0;
var tasks = 0;
var numTasks = document.getElementById('numtasks');

var currentAudioContent = ''; // Global variable to hold the audio data


function vidPlay(vidtitle){
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
    var appsname = "VidPlay";
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
    appheadtext.innerText = vidtitle;
    close.type = 'image';
    close.id = "close"
    close.title = 'Close';
    close.src = "images/close.png";
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";
    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.src = "images/fullscreen.png";
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";
    appbody.className = 'appbody';
    minimize.type = 'image';
    minimize.title = 'Minimize';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";
    minimize.backgroundImage = "images/minimize.png";
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
    app.onclick = function () {bringToFront(app.id)};
    close.onclick = function () { desktopbody.removeChild(app); tasks--;};
    fullscreen.onclick = function () {
        if (isfull == false){
            app.style.width = '100%';
            app.style.height = 'calc(100% - 50px)'; 
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

    var vidplayer = document.createElement("video");
    vidplayer.className = "vidplay";
    vidplayer.src = "videos/" + vidtitle;
    vidplayer.controls = true;
    appheadtext.innerHTML = vidtitle;
    appbody.appendChild(vidplayer);
    bringToFront(app.id);
}


//Stock apps in betaOS
function betaApp(appsname){
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
    close.src = "images/close.png";
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";
    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.src = "images/fullscreen.png";
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";
    minimize.type = 'image';
    minimize.title = 'Small';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";
    minimize.backgroundImage = "images/minimize.png";
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

    var webbox = document.createElement('div');
    webbox.style = document.getElementsByTagName('iframe');

    function fetchContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                    return response.text().then(html => ({
                        currentUrl: response.url, // Get the final URL after redirects
                        html: html // The fetched HTML content
                    }));
                })
                .then(({ currentUrl, html }) => {
                    // Create a shadow host to prevent CSS interference
                    const shadowHost = document.createElement('div');
                    const shadow = shadowHost.attachShadow({ mode: 'open' });

                    // Set the HTML content in the shadow DOM
                    shadow.innerHTML = html;

                    // Modify links to ensure they use the correct URL structure
                    const links = shadow.querySelectorAll('a');
                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        // Adjust relative links to use the full current URL
                        if (href && !href.startsWith('http')) {
                            link.setAttribute('href', new URL(href, currentUrl).href);
                        }

                        // Handle link clicks for dynamic loading
                        link.addEventListener('click', function(event) {
                            event.preventDefault(); // Prevent default navigation
                            fetchContent(link.href); // Fetch new content into the same div
                        });
                    });

                    // Handle form submissions for search
                    const forms = shadow.querySelectorAll('form');
                    forms.forEach(form => {
                        form.addEventListener('submit', function(event) {
                            event.preventDefault(); // Prevent default form submission
                            
                            // Prepare the search URL
                            const formAction = form.getAttribute('action');
                            const formMethod = form.getAttribute('method') || 'GET';
                            const formData = new URLSearchParams(new FormData(form)).toString();

                            // Construct the search URL based on method
                            const searchUrl = formMethod.toUpperCase() === 'POST' 
                                ? formAction 
                                : `${formAction}?${formData}`;
                            
                            fetchContent(searchUrl); // Fetch results for the search
                        });
                    });

                    // Clear existing content and append the new shadow host
                    webbox.innerHTML = ''; // Clear previous content
                    webbox.appendChild(shadowHost); // Add the shadow DOM

                    // Ensure dropdowns are functional
                    const dropdownButtons = shadow.querySelectorAll('button'); // Adjust if not buttons
                    dropdownButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const dropdownContent = button.nextElementSibling; // Adjust based on structure
                            if (dropdownContent) {
                                dropdownContent.classList.toggle('visible'); // Use your CSS class for dropdown visibility
                            }
                    });
                });
            })
        .catch(error => console.error('Error fetching content:', error));
    }

    if (appsname === "NudeVista") {
        var vistbox = document.createElement('iframe');
        appbody.appendChild(vistbox);
        vistbox.src = 'https://nudevista.com';
    }else if(appsname === "Hypnotube"){
        appbody.appendChild(webbox);
        // Load the initial content
        fetchContent('https://hypnotube.com'); // Replace with the desired initial URL



    } else if(appsname === "betaNet"){
        var urlinput = document.createElement('input');
        var fbutt = document.createElement('button');
        var bbutt = document.createElement('button');
        var sbutt = document.createElement('button');
        
        appbody.appendChild(urlinput);
        appbody.appendChild(sbutt);
        appbody.appendChild(webbox);

        urlinput.type = 'text';
        urlinput.placeholder = 'Search or type url';
        sbutt.innerHTML = 'Go';
        sbutt.onclick = function(){   
            var geturl = urlinput.value;
            fetchContent(geturl);
        };

    }else if(appsname === "Tasks"){
        var tasknum = document.createElement('h1');
        var closeall = document.createElement('button');
        var refreshb = document.createElement('button');
        refreshb.innerHTML = "Refresh";
        refreshb.onclick = function(){
            taskManage();
        };
        appbody.appendChild(tasknum);
        appbody.appendChild(refreshb);
        //app.appendChild(closeall);
        function taskManage(){
            appbody.innerHTML = "";
            appbody.appendChild(tasknum);
            appbody.appendChild(refreshb);
            var task = document.getElementsByClassName('app');
            var taska = [];
            currentTasks = document.getElementsByClassName('app').length;
            tasknum.innerHTML = "Current Tasks: " + currentTasks;
            
            for(var i = 0; i < currentTasks; i++){
                taska.push(task[i].id + '\n');
                if(taska.length > currentTasks){
                if(task[i].id = taska[i]){
                        taska[i].pop();
                    }
                } 
            }

            for (var i = 0; i < taska.length; i++){
                var taskbutt = document.createElement('button');
                taskbutt.innerHTML = taska[i];
                taskbutt.id = 'task-' + task.id;
                taskbutt.onclick = function(){
                    desktopbody.remove(document.getElementById(taska[i].value));
                    tasks--;
                };
                appbody.appendChild(taskbutt);
                console.log(taska[i] + " - running");
            }
        }
        appbody.appendChild(tasknum);
        appbody.appendChild(refreshb);
    } else if(appsname === "Nononopmv"){
        var ntab = document.createElement('div');
        var videos = ['BCIT1','BCIT2','BCIT3','BCIT4','BCIT5'];
        var thumbnails = [];
        var bcitlist = document.createElement("div");
        var pages = ['BCIT', 'Teasers', 'Clips','About']
        appbody.scroll = false;
        appbody.style.overflow = 'hidden';
        ntab.className = 'ntab';
        bcitlist.scroll = true; 
        bcitlist.style.display = 'block';
        bcitlist.style.height = '100%';
        bcitlist.style.width = '100%';
        bcitlist.id = 'BCIT';
        bcitlist.name = 'BCIT';
        bcitlist.className = "ntabcontent";
        for(let i = 0; i < videos.length; i++){
            var thumbnail = document.createElement('button');
            thumbnails.push(videos[i] + ".png");
            thumbnail.type = 'image';
            thumbnail.style.backgroundImage = 'url(vthumbnails/' + videos[i] + '.png)';
            thumbnail.className = 'vthumb';
            thumbnail.id = "thumbnail" + videos[i];
            thumbnail.title = videos[i];
            thumbnail.onclick = function(){
                vidPlay(videos[i] + ".mp4");
            };
            bcitlist.appendChild(thumbnail);
        }

        var teasers = document.createElement("div");
        var placeholdtxt = document.createElement("h1");
        placeholdtxt.innerHTML = "COMING SOON";
        teasers.appendChild(placeholdtxt);
        teasers.style.display = 'none';
        teasers.id = 'Teasers';
        teasers.className = 'ntabcontent';
        teasers.name = 'Teasers';

        var clips = document.createElement("div");
        var placeholdtxt2 = document.createElement("h1");
        placeholdtxt2.innerHTML = "COMING SOON";
        clips.appendChild(placeholdtxt2);
        clips.style.display = 'none';
        clips.id = 'Clips';
        clips.className = 'ntabcontent';
        clips.name = 'Clips';

        appbody.appendChild(ntab);
        appbody.appendChild(bcitlist);
        appbody.appendChild(teasers);
        appbody.appendChild(clips);

        //var placeholdtxt = document.createElement("h1");
        //placeholdtxt.innerHTML = "COMING SOON";

        for(let i = 0; i < pages.length; i++){
            var pagebutt = document.createElement('button');
            ntab.className = 'ntab';
            pagebutt.className = 'ntablinks';
            pagebutt.innerHTML = pages[i];
            ntab.appendChild(pagebutt);
            pagebutt.onclick = function(){
                openNvTab(event, pages[i]);
            };
        }

        /*if (pages[0]){

        } else if (pages[1]){

        } else if (pages[2]){

        }*/
            
    } else if(appsname === "Files") {
        var fileInput = document.createElement('input');
        var uploadButton = document.createElement('button');
        var searchInput = document.createElement('input');
        var searchButton = document.createElement('button');
        var fileList = document.createElement('div');

        // Initialize IndexedDB
        var db;
        var request = indexedDB.open("FileStorage", 3); // Incremented version to 2
        request.onupgradeneeded = function(event) {
            db = event.target.result;

            if (!db.objectStoreNames.contains("videos")) {
                db.createObjectStore("videos", { keyPath: "name" }); // Create object store if it doesn't exist
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            displayFiles(); // Display files if any

            // Set up file input and buttons inside `onsuccess`
            fileInput.type = 'file';
            fileInput.className = 'uploadbutt';
            fileInput.text = 'Choose a file';
            uploadButton.innerText = 'Upload File';
            searchInput.type = 'text';
            searchInput.placeholder = 'Search Files...';
            searchButton.innerText = 'Search';

            // Append elements to app body
            appbody.appendChild(fileInput);
            appbody.appendChild(uploadButton);
            appbody.appendChild(searchInput);
            appbody.appendChild(searchButton);
            appbody.appendChild(fileList);

            // Upload file handler
            // Notify the user where the file will be saved

            uploadButton.onclick = function() {
                var file = fileInput.files[0];
                if (!file) { alert('Please select a file to upload.'); return; }

                var isVideo = file.name.endsWith('.mp4') || file.name.endsWith('.avi') || file.name.endsWith('.mov');
                var isAudio = file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.ogg');
                if (!(isVideo || isAudio)) { alert('The uploaded file is not an audio or video file.'); return; }

                var reader = new FileReader();
                reader.onload = function(event) {
                    var transaction = db.transaction(["videos"], "readwrite");
                    var store = transaction.objectStore("videos");
                    store.put({ name: file.name, content: event.target.result });

                    var blob = new Blob([event.target.result], { type: file.type || 'application/octet-stream' });
                    var url = URL.createObjectURL(blob);

                    var a = document.createElement('a');
                    a.href = url;
                    a.download = file.name; // download hint (Safari uses its setting to decide dialog)
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    alert(`Your ${isVideo ? 'video' : 'audio'} is ready. Please save it into the "betaOS/videos" folder.`);
                    displayFiles();
                    fileInput.value = '';
                };
                reader.readAsArrayBuffer(file);
            };
            // Display uploaded files
            function displayFiles() {
                var transaction = db.transaction(["videos"]); // Use "videos" store
                var store = transaction.objectStore("videos");
                var request = store.getAll();

                request.onsuccess = function(event) {
                    var files = event.target.result;
                    fileList.innerHTML = ''; // Clear previous entries
                    files.forEach(createFileButton); // Create a button for each file
                };
            }

            function createFileButton(fileData) {
                var fileButton = document.createElement('button');
                fileButton.className = 'backgroundoption'; 
                fileButton.innerText = fileData.name;
                fileButton.style.width = '400px';
                fileButton.style.height = '60px';

                if(fileData.name.endsWith('.mp3') || fileData.name.endsWith('.wav') || fileData.name.endsWith('.ogg')){
                    fileButton.style.backgroundColor = 'rgba(0,255,0,0.25)';
                } else if (fileData.name.endsWith('.mp4') || fileData.name.endsWith('.avi') || fileData.name.endsWith('.mov')) {
                    fileButton.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
                }

                // Determine file type and set behavior
                fileButton.onclick = function() {
                    if (fileData.name.endsWith('.mp3') || fileData.name.endsWith('.wav') || fileData.name.endsWith('.ogg')) {
                        currentAudioContent = fileData.content; // Set current audio content globally
                        betaApp("AudioPlayer"); // Open the AudioPlayer (implement this function separately)
                    } else if (fileData.name.endsWith('.mp4') || fileData.name.endsWith('.mov')) {
                        vidPlay(fileData.name); // Function to play video files
                    } else {
                        alert('File type not supported for playback.'); // Alert for unsupported file types
                    }
                };
                
                fileList.appendChild(fileButton);
            }

            // Search file handler
            searchButton.onclick = function() {
                var query = searchInput.value.toLowerCase();
                var transaction = db.transaction(["videos"]); // Use "videos" store
                var store = transaction.objectStore("videos");
                var request = store.getAll();

                request.onsuccess = function(event) {
                    var files = event.target.result;
                    fileList.innerHTML = ''; // Clear previous search results
                    files.forEach(function(fileData) {
                        if (fileData.name.toLowerCase().includes(query)) {
                            createFileButton(fileData); // Create button for matching files
                        }
                    });
                };
            };
        };

        request.onerror = function(event) {
            console.error("Error opening IndexedDB:", event.target.error);
        };
    } else if(appsname === "AudioPlayer") {
        var audioPlayer = document.createElement('audio');
        var playButton = document.createElement('button');
        var stopButton = document.createElement('button');
        var fileNameDisplay = document.createElement('div'); // Element to display the audio filename

        // Set up playback buttons
        fileNameDisplay.innerText = 'Not Playing';
        playButton.innerText = 'Play';
        stopButton.innerText = 'Stop';

        // Append elements to app body
        appbody.appendChild(fileNameDisplay); // Append filename display first
        appbody.appendChild(audioPlayer);
        appbody.appendChild(playButton);
        appbody.appendChild(stopButton);

        // Function to handle playing the audio
        playButton.onclick = function() {
            if (currentAudioContent) {
                audioPlayer.src = currentAudioContent; // Set the source to the global variable
                
                // Get the filename
                let fileName;
                if (typeof currentAudioContent === 'string') {
                    // If it's a URL or string path
                    fileName = currentAudioContent.split('/').pop();
                } else if (currentAudioContent instanceof File) {
                    // If currentAudioContent is a File object
                    fileName = currentAudioContent.name;
                } else {
                    fileName = 'Unknown file'; // Default fallback
                }
                
                fileNameDisplay.innerText = fileName; // Display the filename
                audioPlayer.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                alert('No audio file selected.');
            }
        };

        // Stop audio button handler
        stopButton.onclick = function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0; // Reset to the start
            fileNameDisplay.innerText = ''; // Clear the displayed filename
        };
    } else if (appsname === "Settings") {
        var tab = document.createElement('div');
        var generalsettings = document.createElement('div');
        var backgroundsettings = document.createElement('div');
        var widgets = document.createElement('div');
        var about = document.createElement('div');
        var basssett = document.createElement('div');
        var shortcuts = document.createElement('div');
        var usersett = document.createElement('div');
        var changelogsett = document.createElement('div');

        var sett = ['General', 'Personalization', 'About', /*'betaAssist',*/ 'Shortcuts', 'User', 'Changelog'];

        for(let i = 0; i < sett.length; i++){
            var settbutt = document.createElement('button');
            tab.className = 'tab';
            settbutt.className = 'tablinks';
            settbutt.innerHTML = sett[i];
            tab.appendChild(settbutt);
            settbutt.onclick = function(){
                openSett(event, sett[i]);
            };
        }

        appbody.scroll = false;
        appbody.style.overflow = 'hidden';
        tab.className = 'tab';
        generalsettings.className = 'tabcontent';
        generalsettings.id = 'General';
        generalsettings.style.display = 'inline';
        generalsettings.innerHTML = "<h1> General </h1><p>General settings will be available in future updates.</p>";
        
        appbody.appendChild(tab);
        //appbody.appendChild(basssett);
        appbody.appendChild(usersett);
        appbody.appendChild(generalsettings);

        basssett.className = 'tabcontent';
        basssett.id = 'betaAssist';
        var basstext = document.createElement("h1");
        var voiceopttxt = document.createElement('h2');
        var voiceoptbox = document.createElement('label');
        var voiceopt = document.createElement('input');
        var voptslide = document.createElement('span');
        basstext.innerHTML = 'betaAssist Settings';
        voiceopttxt.innerHTML = 'Voice Over: ';
        voiceoptbox.class = 'switch';
        voiceopt.type = 'checkbox';
        voptslide.class = 'slider';

        voiceopt.checked = false;

        if(voiceopt.checked == true){
            voiceActive = true;
        } else if (voiceopt.checked == false){
            voiceActive = false;
        }

        basssett.appendChild(basstext);
        basssett.appendChild(voiceopttxt);
        voiceoptbox.appendChild(voiceopt);
        voiceoptbox.appendChild(voptslide);
        basssett.appendChild(voiceoptbox);
        appbody.appendChild(basssett);

        usersett.id = 'User';
        usersett.className = 'tabcontent';

        var usernamein = document.createElement('input');
        var passinput = document.createElement('input');
        var loginbutt = document.createElement('button');
        var warntxt = document.createElement('h3');
        warntxt.innerHTML = "betaOS will restart when you set your new account credentials";
        userdiv.className = 'soalert';
        usernamein.className = 'logininput';
        usernamein.placeholder = 'Username';
        passinput.className = 'logininput';
        passinput.placeholder = 'Password';
        passinput.type = "password";
        loginbutt.className = 'loginbutt';
        loginbutt.innerHTML = "Set";
        loginbutt.onclick = function(){
            var username = usernamein.value;
            var password = passinput.value;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            location.reload();
        };
        usersett.appendChild(warntxt);
        usersett.appendChild(usernamein);
        usersett.appendChild(passinput);
        usersett.appendChild(loginbutt);

        backgroundsettings.scroll = true;
        backgroundsettings.style.overflow = 'scroll';
        backgroundsettings.className = 'tabcontent';

        appbody.appendChild(backgroundsettings);
        backgroundsettings.style.display = 'none';
        backgroundsettings.id = 'Personalization';

        var backgroundtxt = document.createElement("h1");
        backgroundtxt.innerHTML = "Background";
        backgroundsettings.appendChild(backgroundtxt);
        
        var bchoices = ['Nonono', 'HiddenGooner', 'Backside', 'Exposed', 'GettinDirty', 
            'Pineapple', 'WindowShopper', 'Anime1', 'Hermoine', 'Boobs', 'AssInTheWoods', 
            'CarShot', 'InTheField', 'OnTheTracks', 'BlackLatex', 'LoveHer', 'BlackLace', 
            'BeachTime', 'GuitarGirl', 'ShoesOffFeetUp'];
        for (var i = 0; i < bchoices.length; i++){
            var bchoice = document.createElement('button');
            bchoice.id = bchoices[i] + appnumber;
            bchoice.type = 'image';
            bchoice.style.backgroundImage = "url('images/" + bchoices[i] + ".png')";
            bchoice.className = 'backgroundoption';
            bchoice.choiceName = bchoices[i];
            bchoice.onclick = function () { 
                document.body.style.backgroundImage = 'url(images/' + this.choiceName + '.png)'; 
                localStorage.setItem('background','url(images/' + this.choiceName + '.png)');
            };
            backgroundsettings.appendChild(bchoice);
        }

        var themetxt = document.createElement("h1");
        themetxt.innerHTML = "Themes";
        backgroundsettings.appendChild(themetxt);

        var tchoices = [
            {name: 'One In The Pink', color: 'rgba(238, 39, 149, 0.65)'}, 
            {name: 'Red Sea', color: 'rgba(255, 0, 0, 0.65)'},
            {name: 'Mars', color: 'rgba(234, 95, 3, 0.65)'},
            {name: 'Orange Soda', color: 'rgba(255, 165, 0, 0.65)'}, 
            {name: 'Sunrays', color: 'rgba(254, 224, 3, 0.65)'},
            {name: 'Green Apple', color: 'rgba(0, 255, 0, 0.65)'},
            {name: 'Aquarium', color: 'rgba(12, 224, 178, 0.65)'},
            {name: 'Ocean Water', color: 'rgba(0, 0, 255, 0.65)'},
            {name: 'Midnight Light', color: 'rgba(117, 14, 227, 0.65)'},
            {name: 'Violet Vision', color: 'rgba(128, 0, 128, 0.65)'}, 
            {name: 'Dark Mode', color: 'rgba(0, 0, 0, 0.65)'}, 
            {name: 'Light Mode', color: 'rgba(149, 149, 149, 0.65)'}
        ];

        /*tchoices.forEach(function(choice){
            var tchoice = document.createElement('button');
            tchoice.id = tchoices.name + appnumber;
            tchoice.type = 'text';
            tchoice.innerHTML = tchoices.name;
            tchoice.style.backgroundColor = tchoices.color;
            tchoice.className = 'backgroundoption';
            tchoice.colorChoice = tchoices.color;
            tchoice.onclick = function () { 
                document.getElementById('navbar').backgroundColor = this.colorChoice; 
                localStorage.setItem('navbar.backgroundColor', this.colorChoice);
            };
            backgroundsettings.appendChild(tchoice);
        });*/
        for (var i = 0; i < tchoices.length; i++){
            var tchoice = document.createElement('button');
            tchoice.id = tchoices[i].name + appnumber;
            tchoice.type = 'text';
            tchoice.innerHTML = tchoices[i].name;
            tchoice.style.backgroundColor = tchoices[i].color;
            tchoice.className = 'backgroundoption';
            tchoice.onclick = function () { 
                document.getElementById('navbar').style.backgroundColor = this.style.backgroundColor;
                app.style.backgroundColor = this.style.backgroundColor;
                actioncenter.style.backgroundColor = this.style.backgroundColor;
                document.getElementById('datetime').style.backgroundColor = this.style.backgroundColor;
                conmenu1.style.backgroundColor = this.style.backgroundColor;
                localStorage.setItem('theme', this.style.backgroundColor);
            };
            backgroundsettings.appendChild(tchoice);
        }

        var backgroundinput = document.createElement('input');
        var backgroundaddbutt = document.createElement('button');
        backgroundaddbutt.innerHTML = 'Add';
        backgroundinput.placeholder = "Background URL";
        backgroundaddbutt.onclick = function () {
            document.body.style.backgroundImage = "url('" +  backgroundinput.value + "')"; 
            custombackground = document.createElement('input');
            custombackground.type = 'image';
            custombackground.src = backgroundinput.value;
            custombackground.className = 'backgroundoption';
            custombackground.onclick = function () { document.body.style.backgroundImage = "url('" +  backgroundinput.value + "')";
            localStorage.setItem('background',"url('" +  backgroundinput.value + "')");};
            choices
        };
        //backgroundsettings.appendChild(backgroundinput);
        //backgroundsettings.appendChild(backgroundaddbutt);

        appbody.appendChild(about);
        about.className = 'tabcontent';
        about.id = "About" ;

        var betaOStxt = document.createElement('h1');
        var browserversion = document.createElement('h1');
        var copyright = document.createElement('h1');
        var logoimg = document.createElement('img');
        var systemreset = document.createElement ("button");
        app.style.color = 'white';
        browserversion.innerHTML = objbrowserName + ": " + objfullVersion;
        betaOStxt.innerHTML = "betaOS " + betaOSversion;
        copyright.innerHTML = "© nononopmv 2025";
        logoimg.src = 'images/betaOS full.png';
        logoimg.style = 'height: 150px';
        systemreset.innerHTML = "Reset System";
        systemreset.onclick = function(){
            localStorage.clear();
            location.reload();
        };
        about.appendChild(betaOStxt);
        about.appendChild(logoimg);
        about.appendChild(copyright);
        about.appendChild(browserversion);
        about.appendChild(systemreset);
        
        appbody.appendChild(shortcuts);
        shortcuts.id = "Shortcuts";
        shortcuts.className = "tabcontent"

        var appnameshort = document.createElement('input');
        var shortaddnav = document.createElement('button');
        var shortadddesk = document.createElement('button');
        var newshortcut = document.createElement('button');
        var navshort = document.createElement('button');
        var appdiv = document.getElementById("appdiv");
        var noticetxt = document.createElement("h3");
        var resetsc = document.createElement("button");
        var iconpreview = document.createElement('img');
        newshortcut.type = 'image';
        newshortcut.style.width = '50px';
        newshortcut.style.height = '50px';
        newshortcut.style.textAlign = 'center';
        appnameshort.type = 'text';
        appnameshort.placeholder = "App name";
        shortaddnav.innerHTML = 'Navbar';
        shortadddesk.innerHTML = 'Desktop';
        noticetxt.innerHTML = "***NAMES ARE CASE SENSITIVE***"
        resetsc.innerHTML = "Reset Shortcuts";
        resetsc.title = "This will remove all added shortcuts";
        resetsc.onclick = function () {localStorage.removeItem("savednav"); window.location.reload();};
        iconpreview.style.width = '20%';
        iconpreview.style.width = '20%';
        shortcuts.appendChild(appnameshort);
        shortcuts.appendChild(shortaddnav);
        shortcuts.appendChild(shortadddesk);
        shortcuts.appendChild(resetsc);
        shortcuts.appendChild(noticetxt);
        shortcuts.appendChild(iconpreview);
        shortaddnav.onclick = function () {
            iconpreview.src = "images/" + appnameshort.value + ".png";
            navshort.title = appnameshort.value;
            navshort.style = 'background-image: url("images/' + appnameshort.value + '.png"); background-size: 50px 50px;';
            navshort.className = 'appicon';
            if(appnameshort.value != "Shortcuts"){
                navshort.setAttribute("onclick", "betaApp('" + appnameshort.value + "')");
            } else if(appnameshort.value = "Shortcuts"){
                navshort.setAttribute("onclick", "betaApp('Settings'); openSett(event, 'Shortcuts');");
            }
            pinneddiv.appendChild(navshort);
            localStorage.setItem("savednav", pinneddiv.innerHTML);
            desktopbody.removeChild(app);
        };

        shortadddesk.onclick = function () {
            iconpreview.src = "images/" + appnameshort.value + ".png";
            newshortcut.title = appnameshort.value;
            newshortcut.style = 'background-image: url("images/' + appnameshort.value + '.png"); background-size: 50px 50px;';
            newshortcut.className = 'appicon';
            if(appnameshort.value != "Shortcuts"){
                newshortcut.setAttribute("onclick", "betaApp('" + appnameshort.value + "')");
            } else if(appnameshort.value = "Shortcuts"){
                newshortcut.setAttribute("onclick", "betaApp('Settings'); openSett(event, 'Shortcuts');");
            }
            deskgrid.appendChild(newshortcut);
            desktopbody.removeChild(app);
            localStorage.setItem("saveddesk", deskgrid.innerHTML);
        };

        appbody.appendChild(changelogsett);
        changelogsett.id = "Changelog";
        changelogsett.className = "tabcontent";

        var changelogtext = document.createElement('textarea');
        changelogtext.value = changelog;
        changelogtext.style.width = '100%';
        changelogtext.style.height = 'calc(100% - 20px)';
        changelogtext.style.color = 'white';
        changelogtext.style.backgroundColor = 'black';
        changelogtext.readOnly = true;
        changelogtext.style.resize = 'none';
        changelogsett.appendChild(changelogtext);

    } else if(appsname === "Discord"){
        var disframe = document.createElement('iframe');
        disframe.src = 'https://discordapp.com/';
        appbody.appendChild(disframe);
    } else if(appsname === "Timer"){
        var timeleft = document.createElement('h1');
        var timeset = document.createElement('input');
        var setbutton = document.createElement('button');
        var stopbutton = document.createElement('button');
        var resetbutton = document.createElement('button');
        var timesuptext = document.createElement('h1');
        var timing;
        var alarm = new Audio('sounds/analog-watch-alarm_daniel-simion.mp3');
        app.style.width = '300px';
        app.style.height = '300px';
        app.style.resize = 'none';
        headbuttdiv.removeChild(minimize);
        headbuttdiv.removeChild(fullscreen);
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
                    pushNotification("Timer","Time's up!!!");
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
        
    } else if(appsname === "vmOS"){
        var osview = document.createElement('iframe');
        var tabdiv = document.createElement('div');
        tabdiv.className = 'tab';
        var oschoice1 = document.createElement('button');
        oschoice1.className = 'tablinks';
        var oschoice2 = document.createElement('button');
        oschoice2.className = 'tablinks';
        var oschoice3 = document.createElement('button');
        oschoice3.className = 'tablinks';
        var oschoice4 = document.createElement('button');
        oschoice4.className = 'tablinks';
        var oschoice5 = document.createElement('button');
        oschoice5.className = 'tablinks';
        var oschoice6 = document.createElement('button');
        oschoice6.className = 'tablinks';
        var hidebutt = document.createElement('button');
        hidebutt.className = 'tablinks';
        osview.style.width = '100%';
        osview.style.height = '97.5%';
        oschoice1.innerHTML = 'Windows 93';
        oschoice1.onclick = function () {
            osview.src = 'https://windows93.net';
        };
        oschoice2.innerHTML = 'OS.js';
        oschoice2.onclick = function () {
            osview.src = 'https://demo.os-js.org/';
        };
        oschoice3.innerHTML = 'betaOS';
        oschoice3.onclick = function () {
            osview.src = 'index.html';
        };
        hidebutt.innerHTML = 'Hide';
        hidebutt.title = 'Click header to show OS selector';
        hidebutt.onclick = function(){
            tabdiv.style.display = 'none';
        };
        apphead.title = "Click to show OS selector";
        apphead.onclick = function(){
            tabdiv.style.display = 'inline-block';
        };
        tabdiv.appendChild(oschoice1);
        tabdiv.appendChild(oschoice2);
        tabdiv.appendChild(oschoice3);
        tabdiv.appendChild(hidebutt);
        appbody.appendChild(tabdiv);
        appbody.appendChild(osview);
        osview.innerHTML = 'Select an OS';
    } else if(appsname === "betaAssist"){
        app.style.display = 'inline';
        commandinput = document.createElement('input');
        commandoutput = document.createElement('textarea');
        var micbutton = document.createElement('button');
        var sendbutt = document.createElement("button");
        apphead.style.background = "rgba(0,0,0,0)";
        commandinput.placeholder = 'Type a message';
        commandinput.style = 'height: 75px; border-style: none;  width:75%; font-size: 50px; border-radius: 15px; color: white; outline: none;';
        commandinput.type = "text";
        commandoutput.style = 'height:75%; text-shadow: 2.5px 2.5px 2.5px black; width:100%; font-size: 50px; border-style: none; resize: none; color:white; background: rgba(0,0,0,0)';
        commandoutput.readOnly = true;
        sendbutt.innerHTML = "Send";
        sendbutt.className = "appchoice";
        micbutton.style = "background-Image: url(images/mic.png); width: 75px; height: 75px; background-size: 75px 75px;";
        micbutton.onclick = function () {
            betaAssist();
        };
        commandinput.onkeydown = function (e){
            if(e.keyCode == 13){
                betaAssist();
            }
        };
        appbody.appendChild(commandoutput);
        appbody.appendChild(commandinput);
        appbody.appendChild(micbutton);
        //app.appendChild(sendbutt);
    } else if(appsname === "ScriptEdit"){
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
                betaApp("Browser");
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
    } else if(appsname === "ScriptInjector"){
        var srcinput = document.createElement('input');
        var srcinputlink = document.createElement('input');
        var injectbutt = document.createElement('button');
        var injectbutt2 = document.createElement('button');
        var noticetext = document.createElement('h2');
        srcinput.type = 'file';
        srcinput.class = 'srcinput';
        srcinputlink.type = 'text';
        srcinputlink.placeholder = 'Script URL Path';
        injectbutt.innerHTML = "Inject(Local)";
        injectbutt.class = 'injectbutt';
        injectbutt.onclick = function(){
            //Read and add new script
            var newscript = document.createElement("script");
            desktopbody.appendChild(newscript);
            
            var reader = new FileReader();

            reader.onload = function (event) {
                newscript.src = event.target.result;
            };

            reader.readAsDataURL(srcinput.files[0]);
        };
        injectbutt2.innerHTML = "Inject(URL)";
        injectbutt2.class = 'injectbutt';
        injectbutt2.onclick = function(){
            var newscript = document.createElement("script");
            desktopbody.appendChild(newscript);
            newscript.src = srcinputlink.value;
        };
        noticetext.innerHTML = "NOTE: This program is still in beta and could have issues, report any issues you experience on the betaOS website.";
        appbody.appendChild(srcinput);
        appbody.appendChild(srcinputlink);
        appbody.appendChild(injectbutt);
        appbody.appendChild(injectbutt2);
        appbody.appendChild(noticetext);
    } else {
        var ehtxt = document.createElement("h1");
        var edtxt = document.createElement("h3");
        ehtxt.innerHTML = "ERROR:";
        edtxt.innerHTML = e343;
        headbuttdiv.removeChild(fullscreen);
        headbuttdiv.removeChild(minimize);
        app.style.width = '25%'; 
        app.style.height = '25%';
        app.style.top = '35%'; 
        app.style.left = '35%';
        isfull = false;
        if(savedtheme){
            app.style.backgroundColor = localStorage.getItem('theme');
        }
        appbody.appendChild(ehtxt);
        appbody.appendChild(edtxt);
        console.error(e343);
        errorsound.play();
    }
}

var errorcodes = `
betaOS Error Codes:
-E343: Program nonexistent/not found
-E344: Browser not supported
-E345: Device not supported
-E346: Loading failure`;

var e343 = new Error("E343: Program nonexistent/not found");
var e344 = new Error("E344: Browser not supported");
var e345 = new Error("E345: Device not supported");
var e346 = new Error("E346: Loading failure");

function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (e) {
            commandinput.value
                = e.results[0][0].transcript;
            recognition.stop();
        };

        recognition.onerror = function (e) {
            recognition.stop();
        }

    }
}

document.onkeyup = function (e){
    document.onkeyup=function(e){
        var e = e || window.event;
        if(e.which == 9) {
                betaApp("betaAssist");
        }
        if(e.which == 27){
            desktopbody.appendChild(actioncenter);
        }
      }
    //if(e.keyCode == 83 && e.keyCode == 32){
    //      betaApp("BetaAssist");
    //}
}

function openSett(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openNvTab(evt, pageName2) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("ntabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("ntablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName2).style.display = "block";
    evt.currentTarget.className += " active";
}

function openBTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("btabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

var top_z = 10;

function bringToFront(appname){
    var appelm = document.getElementById(appname);
    if(typeof(appelm) != 'undefined' && appelm != null){
        document.getElementById(appname).style.zIndex = ++top_z;
    }
}

var voiceActive = false;

function betaAssist(){

    var taskinputs = [
        "give me a task",
        "tell me what to do",
        "dominate me",
        "i want to goon",
        "what should i do"
    ];
    
    var greetings = [
        "hi",
        "hello",
        "whats up",
        "yo",
        "hey",
        "greetings"
    ];

    var qwords = [
        "who",
        "what",
        "where",
        "why",
        "how"
    ];
    
    var tasks = [
        "You should start watching chastity hypno videos. It'll make you more submissive.",
        "Open the Nononopmv app that's in the dock at the bottom of the screen and watch every video. No stopping early. No cumming.",
        "Open Hypnotube and goon your fucking brains out to girlcock videos, beta. No cumming. If you cum, you get locked in chastity.",
        "Lock yourself in chastity until midnight, then unlock and cum quickly to non-nude content."
    ];
    
    var greetingreplies = [
        "Hi",
        "Hello",
        "What's up",
        "Hi there",
        "Hello, beta",
        "What's up my diggity dogs?",
        "What's up, " + un,
        "Hi, " + un,
        "Hello, " + un
    ];

    var hruquestions = [
        'how are you',
        'hows it going',
        'how are you doing',
        'are you okay',
        'are you doing okay',
        'is everything alright'
    ];

    var hrureplies = [
        "I'm doing okay.",
        "I'm okay",
        "I'm doing okay",
        "Fucking terrible.",
        "Amazing, today's going great.",
        "I'm great, and horny. Haha",
        "I'm okay, I guess.",
    ];

    var yesses = [
        "yes",
        "yes maam",
        "yes ma'am",
        "absolutely",
        "yes mistress",
        "yes master",
        "yeah",
        "i will",
        "ill do it"
    ];

    var nos = [
        "no",
        "i dont want to",
        "no i dont want to",
        "im not in the mood",
        "stop"
    ];

    var noresponse = [
        "You will do what you're told.",
        "Betas need to follow orders. You're using betaOS, so you're obviously a little beta bitch.",
        "Do what I said. Now!",
        "You're not allowed to say no. Betas always obey.",
        "You will obey."
    ];

    var yesresponse = [
        "Good beta. Go complete your task",

    ];

    if(taskinputs.includes(commandinput.value)){
        commandoutput.value = tasks[Math.floor(Math.random() * tasks.length)];
    } else if(greetings.includes(commandinput.value)){
        commandoutput.value = greetingreplies[Math.floor(Math.random() * greetingreplies.length)];
    } else if(hruquestions.includes(commandinput.value)){
        commandoutput.value = hrureplies[Math.floor(Math.random() * hrureplies.length)];
    } else if(yesses.includes(commandinput.value)){
        commandoutput.value = yesresponse[Math.floor(Math.random() * yesresponse.length)];
    } else if(nos.includes(commandinput.value)){
        commandoutput.value = noresponse[Math.floor(Math.random() * noresponse.length)];
    } else {
        commandoutput.value = "Sorry, I didn't get that";
    }

    commandinput.value = '';

    var available_voices = window.speechSynthesis.getVoices();
    
    var english_voice = '';

    for(var i=0; i<available_voices.length; i++) {
        if(available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if(english_voice === ''){
        english_voice = available_voices[3];
    }
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = commandoutput.value;
    utter.voice = english_voice;

    if (voiceActive = true){
        window.speechSynthesis.speak(utter);
    }
        
}

var apps = document.getElementsByClassName("app");

//Browser Version
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent; 
var objbrowserName = navigator.appName; 
var objfullVersion = ''+parseFloat(navigator.appVersion); 
var objBrMajorVersion = parseInt(navigator.appVersion,10); 
var objOffsetName,objOffsetVersion,ix; 
if ((objOffsetVersion=objAgent.indexOf("Chrome"))!=-1) { 
    objbrowserName = "Chrome"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
}else if ((objOffsetVersion=objAgent.indexOf("MSIE"))!=-1) { 
    objbrowserName = "Microsoft Internet Explorer(It is reccomended that you use Chrome)"; 
    objfullVersion = objAgent.substring(objOffsetVersion+5); 
}else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
    objbrowserName = "Firefox(It is reccomended that you use Chrome)"; 
}else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
    objbrowserName = "Safari(It is reccomended that you use Chrome)"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
    if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
}

var menucon = document.getElementById("menu");
var darkmodesound = new Audio("sounds/dark mode sound.mp3");
var lightmodesound = new Audio("sounds/light mode sound.mp3");