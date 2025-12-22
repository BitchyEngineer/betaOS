/*  Copyright nononopmv 2025
    betaOS Copyright (C) 2025 nononopmv
    Resdistribution is allowed under certain conditions,
    See LICENSE file for details.
*/
bootDesktop();
var betaosversion = "1.1.1";
var defaultengine;
var saveddefault = localStorage.getItem("DefaultEngine");
var savedtheme = localStorage.getItem("theme");
var batterybar = document.getElementById("batteryprogress");
var errorsound = new Audio("sounds/so4error.mp3");
var notifsound;
var notifsounds = ['notifsound.mp3', 'notifsound2.wav', 'notifsound3.wav', 'notifsound4.wav'];
var rsod = false;
var donotdis = false;
var wificon = true;

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
var savedscripts = localStorage.getItem("savedscripts");

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
    - RemindMe app added
    - Mobile[Testing only] support added
    - betaStore (app store) added
    - Hypnotube app removed
.betaOS 1.0.3
    - New apps added to betaStore
    - betaStore bug fixes
    - New randomized notification sounds
    - App library restructured. Each app is now its own script to reduce load times and lag.
    - AudioPlayer can now play audio files saved in the Files app
.betaOS 1.1.0
    - General settings added
    - ControlArea added (click the date & time in the lower right corner)
    - System controls moved to ControlArea
    - Brightness & volume controls added
    - NightLight added (changes the display to a warmer color temperature to be easier on your eyes)
    - Clear theme added
    - Design improvements, fixes, and tweaks
    - Bugs squashed (ew)
    - Clips added to Nononopmv app (more clips coming soon)
    - Lockscreen redesigned
    - User settings updated
    - Custom user icons
    - New icons for Settings, betaNet, betaStore, ScriptInjector, betaAssist & RemindMe
    - New apps available in betaStore
    - Notification center added
    - Desktop shortcuts can be rearranged/swapped
    - Confirm before deleting shortcuts
.betaOS 1.1.1
    - Download betaOS updates from the Settings app
    - Titles will show above the cursor when hovering over icons
    - Bug fixes and other minor improvements`;

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
var ControlArea = document.createElement('div');
var notifcontain = document.createElement('div');
var noNotifMsg = document.createElement('div');
var notifshow = false;
rightnav.className = 'rightdiv';
rightnav.id = 'rightdiv';
ControlArea.className = 'rightcon';
ControlArea.id = 'rightcon';
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
    setTimeout(function(){boottxt.innerText+="\n betaOS " + betaosversion}, 350);
    console.log("betaOS " + betaosversion);
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

var tooltip = document.createElement('div');
tooltip.className = 'custom-tooltip';
document.body.appendChild(tooltip);

document.addEventListener('mouseover', function(e) {
    if (e.target.title || e.target.dataset.title) {
        tooltip.textContent = e.target.title || e.target.dataset.title;
        tooltip.style.opacity = '1';

        // Position above the cursor
        tooltip.style.left = (e.pageX) + 'px';
        tooltip.style.top = (e.pageY - 50) + 'px'; // 35px above cursor (adjust if needed)

        // Hide default title
        if (e.target.title) {
            e.target.dataset.title = e.target.title;
            e.target.title = '';
        }
    }
});

document.addEventListener('mousemove', function(e) {
    if (tooltip.style.opacity === '1') {
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY - 35) + 'px'; // follows above cursor
    }
});

document.addEventListener('mouseout', function(e) {
    tooltip.style.opacity = '0';

    // Restore default title
    if (e.target.dataset.title) {
        e.target.title = e.target.dataset.title;
        delete e.target.dataset.title;
    }
});

document.addEventListener('mouseleave', function() {
    tooltip.style.opacity = '0';
});

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
var notifStack = [];
function pushNotif(appname, message, notifaction){
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
    notifname.style.marginBottom = '5px';
    notifmessage.innerHTML = message;
    notifmessage.style.marginBottom = '5px';
    deletebutt.className = "notifbutt";
    openbutt.className = "notifbutt";
    deletebutt.innerHTML = "Dismiss";
    deletebutt.onclick = function(){
        notifcontain.removeChild(notifbody);
        notifStack = notifStack.filter(n => n !== notifbody);
        repositionNotifications();
        updateNoNotifMessage();
    };
    openbutt.innerHTML = "Open";
    openbutt.setAttribute('onclick', notifaction + `
        desktopbody.removeChild(notifbody); 
        notifStack = notifStack.filter(n => n !== notifbody); 
        repositionNotifications();`);

    if(savedtheme){
        notifbody.style.backgroundColor = localStorage.getItem('theme');
    } else {
        notifbody.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }

    
    notifsound = new Audio('sounds/' + notifsounds[Math.floor(Math.random() * notifsounds.length)]);

    if(donotdis == true){
        notifcontain.style.display = 'none';
        notifshow = false;
    } else if (donotdis == false){
        notifcontain.style.display = 'block';
        notifshow = true;
        notifsound.play();
    }

    notifcontain.appendChild(notifbody);
    notifbody.appendChild(notifname);
    notifbody.appendChild(notifmessage);
    notifbody.appendChild(notifcontrol);

    if(notifaction === null){
        notifcontrol.appendChild(deletebutt);
    } else{
        notifcontrol.appendChild(openbutt);
        notifcontrol.appendChild(deletebutt);
    }
    
    notifStack.push(notifbody);
    repositionNotifications();
    updateNoNotifMessage();
}

function repositionNotifications(){
    var notifHeight = 200;
    var gap = 10;
    var baseTop = 20;
    
    notifStack.forEach(function(notif, index){
        var topPosition = baseTop + ((notifStack.length - 1 - index) * (notifHeight + gap));
        notif.style.top = topPosition + 'px';
    });
}

var so4icon = document.createElement('img');
var startupbar = document.createElement('div');

function startUp(){
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'black';
    startupbar.className = 'sloadbar';
    so4icon.src = 'images/beta.png';
    so4icon.className = 'so4icon';
    var startsound = new Audio('sounds/startupsound.mp3');
    startsound.autoplay = true;
    desktopbody.appendChild(startsound);
    desktopbody.appendChild(so4icon);
    //setTimeout(function(){desktopbody.appendChild(startupbar);},3000);
    setTimeout(function(){
        so4icon.src = 'images/Nono.png';
    }, 5000)
    setTimeout(function(){
        loadDesktop();
        desktopbody.removeChild(so4icon);
        desktopbody.removeChild(startsound);
    }, 10000);
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

var apps;

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

    bootUpdateCheck();

    // Create app buttons using a loop
    apps = [
        { name: 'Files', icon: 'Files.png', src: 'Files.js'},
        { name: 'Settings', icon: 'Settings.png', src: 'Settings.js' },
        { name: 'Console', icon: 'Console.png', src: 'Console.js'},
        { name: 'betaNet', icon: 'betaNet.png', src: 'betaNet.js'},
        { name: 'betaStore', icon: 'betaStore.png', src: 'betaStore.js'},
        { name: 'NudeVista', icon: 'Nudevista.png', src: 'NudeVista.js'},
        { name: 'Nono', icon: 'Nono.png', src: 'Nono.js'},
        { name: 'Timer', icon: 'Timer.png', src: 'Timer.js'},
        { name: 'ScriptInjector', icon: 'ScriptInjector.png', src: 'ScriptInjector.js'},
        { name: 'betaAssist', icon: 'BetaAssist.png', src: 'betaAssist.js'},
        { name: 'ScriptEdit', icon: 'ScriptEdit.png', src: 'ScriptEdit.js'},
        { name: 'RemindMe', icon: 'RemindMe.png', src: 'RemindMe.js'}
    ];

    var appButton;

    apps.forEach(function(app){
        var newScript = document.createElement('script');
        newScript.src = "SystemApps/" + app.src;
        document.body.appendChild(newScript);

        appButton = document.createElement('button');
        appButton.className = 'appicon';
        appButton.style.backgroundImage = 'url(images/' + app.icon + ')';
        appButton.title = app.name;
        appButton.setAttribute("onclick", app.name + "(); desktopbody.removeChild(actioncenter);");
        appcenter.appendChild(appButton);
    });

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
    actionmenuicon.style = 'background: url("images/bStart.png"); background-size: 50px 50px;';
    actionmenuicon.className = 'appicon';
    actionmenuicon.title = 'App Library';
    actionmenuicon.setAttribute("onclick", "desktopbody.appendChild(actioncenter);");
    actiondiv.appendChild(actionmenuicon);

    var appicon1 = document.createElement('button');
    appicon1.type = 'image';
    appicon1.style = 'background: url("images/Settings.png"); background-size: 50px 50px;';
    appicon1.className = 'appicon';
    appicon1.title = 'Settings';
    appicon1.setAttribute("onclick", "Settings()");
    appdiv.appendChild(appicon1);

    var appicon2 = document.createElement('button');
    appicon2.type = 'image';
    appicon2.style = 'background: url("images/Files.png"); background-size: 50px 50px;';
    appicon2.className = 'appicon';
    appicon2.title = 'Files';
    appicon2.setAttribute("onclick", "Files()");
    appdiv.appendChild(appicon2);

    var appicon3 = document.createElement('button');
    appicon3.type = 'image';
    appicon3.style = 'background: url("images/Nono.png"); background-size: 50px 50px;';
    appicon3.className = 'appicon';
    appicon3.title = 'Nono';
    appicon3.setAttribute("onclick", "Nono()");
    appdiv.appendChild(appicon3);

    var notifbdiv = document.createElement('div');
    notifbdiv.id = 'funcdiv';

    var funcdiv = document.createElement('div');
    funcdiv.id = 'funcdiv';

    var notifs = document.createElement('button');
    notifs.type = 'image';
    notifs.style = 'background: url("images/Notifs.png"); background-size: 50px 50px;';
    notifs.className = 'funcicon';
    notifs.id = 'notificon';
    notifs.title = 'Notifications';
    notifs.onclick = function(){
        if(notifshow == true){
            notifshow = false;
            notifcontain.style.display = 'none';
        } else if (notifshow == false){
            notifshow = true;
            notifcontain.style.display = 'block';
        }
    };

    var clockb = document.createElement('button');
    clockb.className = 'datetime';
    clockb.id = 'datetime';
    if(savedtheme){
        clockb.style.backgroundColor = localStorage.getItem('theme');
        notifs.style.backgroundColor = localStorage.getItem('theme');
    }

    rightnav.appendChild(funcdiv);
    rightnav.appendChild(clockb);
    rightnav.appendChild(notifbdiv);
    notifbdiv.appendChild(notifs);

    
    function addfunc(funcname){
        var enfunc = document.createElement('button');
        enfunc.type = 'image';
        enfunc.id = funcname;
        enfunc.style = 'background: url("images/' + funcname + '.png"); background-size: 50px 50px;';
        enfunc.className = 'funcicon';
        enfunc.title = funcname;
        funcdiv.appendChild(enfunc);
    }

    function delfunc(funcname){
        var funcdel = document.getElementById(funcname);
        funcdiv.removeChild(funcdel);
    }

    //NotifCenter

    notifcontain.className = 'notifcontain';
    notifcontain.style.position = 'fixed';
    notifcontain.style.bottom = '80px';     // stays 80px above the bottom of the viewport
    notifcontain.style.right = '10px';
    notifcontain.style.top = '10px';
    notifcontain.style.height = 'calc(100vh - 80px)'; // full height minus the 80px bottom offset
    notifcontain.style.width = '440px';
    notifcontain.style.zIndex = '10000';
    notifcontain.style.overflowY = 'auto';  // scrollable up and down only
    notifcontain.style.overflowX = 'hidden'; // no horizontal scrolling
    notifcontain.style.pointerEvents = 'auto'; // allows scrolling inside
    notifcontain.style.backdropFilter = 'blur(15px)';
    notifcontain.style.borderRadius = '25px';
    notifcontain.style.boxShadow = 'rgba(0,0,0,0.5) 0 0 2.5px 2.5px';
    notifcontain.style.display = 'none';
    notifcontain.style.animation = 'slidenotifs';
    notifcontain.style.animationDuration = '2s';

    noNotifMsg.innerText = 'No Notifications';
    noNotifMsg.style.position = 'absolute';
    noNotifMsg.style.top = '50%';
    noNotifMsg.style.left = '50%';
    noNotifMsg.style.transform = 'translate(-50%, -50%)';
    noNotifMsg.style.fontSize = '24px';
    noNotifMsg.style.color = 'white';
    noNotifMsg.style.textAlign = 'center';
    noNotifMsg.style.width = '100%';
    noNotifMsg.style.pointerEvents = 'none'; // doesn't block clicks/scroll
    noNotifMsg.id = 'no-notif-msg';

    // Function to show/hide the message based on notifStack

    // Initial check
    updateNoNotifMessage();

    desktopbody.appendChild(notifcontain);

    // Control area
    ControlArea.style.position = 'fixed';
    ControlArea.style.width = '260px';
    ControlArea.style.padding = '20px';
    ControlArea.style.color = 'white';
    ControlArea.style.borderRadius = '15px';
    ControlArea.style.display = 'none';
    ControlArea.style.zIndex = '10010';
    ControlArea.style.background = navbar.style.background;

    // Background brightness slider
    var bgLabel = document.createElement('h3');
    bgLabel.innerText = 'Brightness';
    ControlArea.appendChild(bgLabel);

    var bgSlider = document.createElement('input');
    bgSlider.type = 'range';
    bgSlider.min = '10';
    bgSlider.max = '100';
    bgSlider.value = localStorage.getItem('bgBrightness') || '80';
    bgSlider.style.width = '100%';
    ControlArea.appendChild(bgSlider);

    var br1 = document.createElement('br');
    ControlArea.appendChild(br1);

    // Page volume slider
    var volLabel = document.createElement('h3');
    volLabel.innerText = 'Volume';
    ControlArea.appendChild(volLabel);

    var volSlider = document.createElement('input');
    volSlider.type = 'range';
    volSlider.min = '0';
    volSlider.max = '100';
    volSlider.value = localStorage.getItem('pageVolume') || '80';
    volSlider.style.width = '100%';
    volSlider.style.marginBottom = '10px';
    ControlArea.appendChild(volSlider);

    var Wifi = document.createElement('button');
    Wifi.style = 'background: url("images/Wifi.png"); background-size: 50px 50px; background-color: rgba(255, 0, 0, 0.5)';
    Wifi.title = 'Wifi';
    Wifi.className = 'appicon';
    ControlArea.appendChild(Wifi);
    addfunc("Wifi");

    var NighLight = document.createElement('button');
    NighLight.style = 'background: url("images/NightLight.png"); background-size: 50px 50px;';
    NighLight.title = 'NightLight';
    NighLight.className = 'appicon';
    ControlArea.appendChild(NighLight);

    var DND = document.createElement('button');
    DND.style = 'background: url("images/DND.png"); background-size: 50px 50px;';
    DND.title = 'Do Not Disturb';
    DND.className = 'appicon';
    ControlArea.appendChild(DND);

    var Personalize = document.createElement('button');
    Personalize.style = 'background: url("images/Personalize.png"); background-size: 50px 50px;';
    Personalize.title = 'Personalize';
    Personalize.className = 'appicon';
    ControlArea.appendChild(Personalize);

    var LockDevice = document.createElement('button');
    LockDevice.style = 'background-image: url("images/LockDevice.png"); background-size: 50px 50px';
    LockDevice.title = 'Lock Device';
    LockDevice.className = 'appicon';
    ControlArea.appendChild(LockDevice);

    var Respring = document.createElement('button');
    Respring.style = 'background: url("images/Respring.png"); background-size: 50px 50px;';
    Respring.title = 'Respring';
    Respring.className = 'appicon';
    ControlArea.appendChild(Respring);

    // Overlay for brightness
    var overlay = document.createElement('div');
    overlay.id = 'bgOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = (100 - bgSlider.value) / 100;
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9998';
    desktopbody.appendChild(overlay);

    // Overlay for color temp
    var overlay2 = document.createElement('div');
    var nlon = false;
    overlay2.id = 'bgOverlay';
    overlay2.style.position = 'fixed';
    overlay2.style.top = '0';
    overlay2.style.left = '0';
    overlay2.style.width = '100%';
    overlay2.style.height = '100%';
    overlay2.style.backgroundColor = 'rgba(252, 155, 0, 0.25)';
    overlay2.style.opacity = 25;
    overlay2.style.pointerEvents = 'none';
    overlay2.style.zIndex = '10000';
    overlay2.style.display = 'none';
    desktopbody.appendChild(overlay2);

    overlay.style.opacity = (100 - bgSlider.value) / 100;

    bgSlider.oninput = function() {
        overlay.style.opacity = (100 - this.value) / 100;
        localStorage.setItem('bgBrightness', this.value);
    };

    Wifi.onclick = function(){
        if(wificon == false){
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            wificon = true;
            addfunc("Wifi");
        } else if (wificon == true){
            this.style.backgroundColor = 'inherit';
            wificon = false;
            delfunc("Wifi");
        }
    };

    NighLight.onclick = function() {
        if(nlon == false){
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            overlay2.style.display = 'block';
            nlon = true;
            addfunc("NightLight");
        } else if (nlon == true) {
            this.style.backgroundColor = 'inherit';
            overlay2.style.display = 'none';
            nlon = false;
            delfunc("NightLight");
        }
    };

    DND.onclick = function(){
        DoNotDisturb();
        if(donotdis == true){
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            addfunc("DND");
        } else if (donotdis == false){
            this.style.backgroundColor = 'inherit';
            delfunc("DND");
        }
    };

    Personalize.onclick = function(){
        Settings();
        openSett(event, "Personalization");
    };

    LockDevice.onclick = function(){
        signOut();
    };

    Respring.onclick = function(){
        location.reload();
    };

    volSlider.oninput = function() {
        var mediaElements = document.querySelectorAll('audio, video');
        mediaElements.forEach(function(media) {
            media.volume = this.value / 100;
        }.bind(this));
        localStorage.setItem('pageVolume', this.value);
    };

    var currentMedia = document.querySelectorAll('audio, video');
    currentMedia.forEach(function(media) {
        media.volume = volSlider.value / 100;
    });

    desktopbody.appendChild(ControlArea);

    // Click on rightnav to show widget, hide when mouse leaves widget
    clockb.onclick = function() {
        ControlArea.style.display = 'block';
    };

    ControlArea.onmouseleave = function() {
        ControlArea.style.display = 'none';
    };

    startTime();

    function startTime() {
        var date = new Date();
        var day = date.getDate();          // fixed: getDate() for day of month (1-31)
        var month = date.getMonth() + 1;   // fixed: getMonth() is 0-11, so add 1 for 1-12
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var midday = "AM";
        midday = (hour >= 12) ? "PM" : "AM";
        hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour);
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);

        clockb.innerHTML = month + "/" + day + "/" + year + " | " + hour + ":" + min + " " + midday;

        var t = setTimeout(startTime, 1000);
    }

    function updateTime(k) {
        if (k < 10) {
            return "0" + k;
        } else {
            return k;
        }
    }

    if(savednav){
        pinneddiv.innerHTML = localStorage.getItem("savednav");
    }

    if(savedtheme){
        navbar.style.backgroundColor = localStorage.getItem('theme');
        actioncenter.style.backgroundColor = localStorage.getItem('theme');
        ControlArea.style.backgroundColor = localStorage.getItem('theme');
    }

    actioncenter.className = 'popuplist';

    var controlcenter = document.createElement('div');
    var usercard = document.createElement('div');
    var usertxt = document.createElement('h1');
    var userpic = document.createElement('img');

    usercard.className = 'usercard';
    usertxt.className = 'usernametxt';
    usertxt.innerHTML = un;
    userpic.className = 'userpic';
    if(usericon){
        userpic.src = usericon;
    } else {
        userpic.src = 'images/user.png';
    }
    usercard.appendChild(userpic);
    usercard.appendChild(usertxt);

    controlcenter.className = 'controlcenter';

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

    sysapps = [
        { name: 'Files', icons: 'Files.png'},
        { name: 'Settings', icons: 'Settings.png'},
        { name: 'Console', icons: 'Console.png'},
        { name: 'ScriptInjector', icons: 'ScriptInjector.png'},
        { name: 'betaAssist', icons: 'betaAssist.png'},
    ];

    // Run this once (e.g. after defining sysapps, or when building the control center)

    sysapps.forEach(function(app) {
        var btn = document.createElement('button');
        btn.className = 'appicon';
        btn.style.backgroundImage = "url('images/" + app.icons + "')";
        btn.style.backgroundSize = '50px 50px'; // force exact size
        btn.style.backgroundRepeat = 'no-repeat';
        btn.style.backgroundPosition = 'center';
        btn.style.width = '60px';  // slightly larger than image to make click area nice
        btn.style.height = '60px';
        btn.style.border = 'none';
        btn.style.padding = '0';
        btn.style.margin = '10px';
        btn.title = app.name;

        btn.onclick = function() {
            eval(app.name + "()");
            desktopbody.removeChild(actioncenter);
        };

        controlcenter.appendChild(btn);
    });


    // Load saved apps when the script is loaded
    loadSavedApps();

    if(un){
        if(pw){
            return;
        }
    } else {
        pushNotif("Settings", "Setup your account credentials before using betaOS", "Settings(); openSett(event,'User');");
    }

    document.onerror = function(){pushNotif("System Error", Error(), null)};
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

function updateNoNotifMessage() {
    if (notifStack.length === 0) {
        notifcontain.appendChild(noNotifMsg);
    } else {
        if (noNotifMsg.parentElement) {
            notifcontain.removeChild(noNotifMsg);
        }
    }
}

function DoNotDisturb(){
    if(donotdis == true){
        donotdis = false;
        notifsound = new Audio('sounds/' + notifsounds[Math.floor(Math.random() * notifsounds.length)]);
    } else if (donotdis == false){
        donotdis = true;
        notifsound = null;

    }
}

// Run this once when betaOS starts (e.g. at the end of your main script)

function check420() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    if (hours === 16 && minutes === 20) {
        pushNotif(
            "betaOS System",
            "Smoke some weed and then goon your fucking brains out, beta.",
            null
        );
    }

    // Check again in one minute
    setTimeout(check420, 60000);
}

// Start the checker
check420();

var classicMode = false


//Sign In
function signIn(){
    lockbody.style.display = "none";
    desktopbody.style.display = "block";
}

var un = localStorage.getItem("username");
var pw = localStorage.getItem("password");
var usericon = localStorage.getItem("usericon");
var sotxt = document.createElement('img');
var userdiv = document.createElement("div");
var timetxt = document.createElement('h1');
var loginbar = document.createElement('div');
var lockbody = document.createElement('div');
var passwordInput = document.createElement('input');
var signInBtn = document.createElement('button');
lockbody.id = 'lockbody';
lockbody.style.display = 'none';
document.body.appendChild(lockbody);

//Sign Out
function signOut(){
    desktopbody.style.display = 'none';
    lockbody.style.display = 'block';

    timetxt.style.textShadow = 'rgba(0,0,0,.5) 5px 5px 5px';
    timetxt.style.fontFamily = "Arial";
    timetxt.style.fontSize = '100px';
    timetxt.style.opacity = '50%';
    timetxt.style.alignItems = 'center';
    timetxt.style.justifyContent = 'center';
    timetxt.style.display = 'flex';

    // User icon
    var userIcon = document.createElement('img');
    var savedIcon = localStorage.getItem('usericon');
    if (savedIcon && savedIcon.trim() !== '') {
        userIcon.src = savedIcon.trim();
    } else {
        userIcon.src = 'images/user.png';
    }
    userIcon.style.width = '120px';
    userIcon.style.height = '120px';
    userIcon.style.borderRadius = '50%';
    userIcon.style.objectFit = 'cover';
    userIcon.style.border = '4px solid rgba(255,255,255,0.6)';
    userIcon.style.marginBottom = '20px';

    userIcon.onerror = function() {
        this.src = 'images/user.png';
    };

    userdiv.innerText = un || "User";
    userdiv.style.fontSize = "50px";
    userdiv.style.marginTop = "10px";
    userdiv.style.marginBottom = "40px";
    userdiv.style.fontFamily = "Arial";

    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.value = "";
    passwordInput.style.fontSize = "30px";
    passwordInput.style.padding = "15px";
    passwordInput.style.width = "300px";
    passwordInput.style.marginTop = "30px";
    passwordInput.style.textAlign = "center";

    signInBtn.innerText = "Unlock";
    signInBtn.style.fontSize = "24px";
    signInBtn.style.padding = "15px 40px";
    signInBtn.style.marginTop = "20px";
    signInBtn.style.cursor = "pointer";

    lockbody.style.display = "flex";
    lockbody.style.flexDirection = "column";
    lockbody.style.alignItems = "center";
    lockbody.style.justifyContent = "center";
    lockbody.style.position = "fixed";
    lockbody.style.top = "0";
    lockbody.style.left = "0";
    lockbody.style.width = "100%";
    lockbody.style.height = "100%";
    lockbody.style.background = "rgba(0,0,0,0.2)";
    lockbody.style.backdropFilter = 'blur(15px)';
    lockbody.style.zIndex = "9999";

    // Clear previous contents and append in correct order
    lockbody.innerHTML = '';
    lockbody.appendChild(timetxt);
    lockbody.appendChild(userIcon);
    lockbody.appendChild(userdiv);
    lockbody.appendChild(passwordInput);
    lockbody.appendChild(signInBtn);

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
        timetxt.innerHTML = hour + ":" + min + " " + midday; /* adding time to the div */
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

    function trySignIn() {
        if(passwordInput.value === pw){
            signIn();
        } else {
            // Play error sound
            var errorSound = document.createElement('audio');
            errorSound.src = "sounds/Error.mp3";
            errorSound.play();

            // Show alert after a tiny delay so the sound can start playing first
            setTimeout(function() {
                alert("Password incorrect. Please try again.");
            }, 100); // 100ms delay is enough for the sound to begin
        }
    }

    signInBtn.onclick = trySignIn;

    passwordInput.onkeydown = function(e) {
        if (e.key === "Enter") {
            trySignIn();
        }
    };

    passwordInput.focus();
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
conmenu1butt1.setAttribute('onclick',"Settings(); openSett(event,'Personalization');");
conmenu1butt2.setAttribute('onclick',"Settings(); openSett(event,'Shortcuts');");
conmenu1butt3.onclick = function () {
    newSticky();
};
conmenu1butt4.setAttribute('onclick','Tasks();');
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

//close apps
function closeApp(appname){
    desktopbody.removeChild(appname);
}

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

var isEditMode = false;
var draggedIcon = null;

function editMode(){
    if (isEditMode) return;
    isEditMode = true;

    pushNotif("Edit Mode", "Drag desktop icons to rearrange them in the grid. Drop anywhere — the icon will move to that spot in the grid order. Right-click or long-press to delete. Exit via context menu when done.", null);

    deskgrid.ondragover = function(e) {
        e.preventDefault();
    };

    deskgrid.ondrop = function(e) {
        e.preventDefault();
        if (draggedIcon) {
            deskgrid.appendChild(draggedIcon); // moves to end of DOM
            localStorage.setItem('saveddesk', deskgrid.innerHTML);
            draggedIcon = null;
        }
    };

    var icons = deskgrid.querySelectorAll('.appicon');
    icons.forEach(function(icon) {
        icon.draggable = true;

        icon.ondragstart = function(e) {
            draggedIcon = this;
            this.style.opacity = '0.5';
            e.dataTransfer.setData('text/plain', '');
        };

        icon.ondragend = function() {
            this.style.opacity = '1';
        };

        // Right-click delete
        icon.oncontextmenu = function(e) {
            e.preventDefault();
            if (confirm("Delete this icon?")) {
                this.remove();
                localStorage.setItem('saveddesk', deskgrid.innerHTML);
            }
        };
    });
}

function normMode(){
    location.reload();
}

var currentTasks = 0;
var tasks = 0;
var numTasks = document.getElementById('numtasks');

function AudioPlayer(audio){
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
    var appsname = 'AudioPlayer';
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

    var audioPlayer = document.createElement('audio');
    audioPlayer.preload = 'metadata';

    var playButton = document.createElement('button');
    var pauseButton = document.createElement('button');
    var stopButton = document.createElement('button');
    var fileNameDisplay = document.createElement('div');
    var seekBar = document.createElement('input');
    var timeDisplay = document.createElement('div');

    fileNameDisplay.innerText = 'Not Playing';
    fileNameDisplay.style.marginBottom = '8px';
    fileNameDisplay.style.fontWeight = 'bold';

    playButton.innerText = 'Play';
    pauseButton.innerText = 'Pause';
    stopButton.innerText = 'Stop';

    seekBar.type = 'range';
    seekBar.value = 0;
    seekBar.min = 0;
    seekBar.step = '0.1';
    seekBar.style.width = '90%';
    seekBar.style.margin = '10px';

    timeDisplay.textContent = '0:00 / 0:00';
    timeDisplay.style.fontSize = '12px';
    timeDisplay.style.color = '#ccc';

    appbody.appendChild(fileNameDisplay);
    appbody.appendChild(audioPlayer);
    appbody.appendChild(playButton);
    appbody.appendChild(pauseButton);
    appbody.appendChild(stopButton);
    appbody.appendChild(seekBar);
    appbody.appendChild(timeDisplay);

    var currentAudioContent = "videos/" + audio;

    // FULLY WORKING CONTROLS – FIXED
    function loadAudio() {
        audioPlayer.src = currentAudioContent;
        let fileName = currentAudioContent.split('/').pop();
        fileNameDisplay.innerText = fileName;
    }

    playButton.onclick = function() {
        if (!audioPlayer.src) loadAudio();
        audioPlayer.play();
    };

    pauseButton.onclick = function() {
        audioPlayer.pause();
    };

    stopButton.onclick = function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        seekBar.value = 0;
        timeDisplay.textContent = '0:00 / 0:00';
    };

    // Seek bar + time display
    audioPlayer.addEventListener('timeupdate', function() {
        if (audioPlayer.duration) {
            seekBar.max = audioPlayer.duration;
            seekBar.value = audioPlayer.currentTime;
            const format = t => {
                const m = Math.floor(t / 60);
                const s = Math.floor(t % 60);
                return m + ':' + (s < 10 ? '0' + s : s);
            };
            timeDisplay.textContent = format(audioPlayer.currentTime) + ' / ' + format(audioPlayer.duration);
        }
    });

    audioPlayer.addEventListener('loadedmetadata', function() {
        seekBar.max = audioPlayer.duration;
    });

    seekBar.addEventListener('input', function() {
        audioPlayer.currentTime = seekBar.value;
    });
}

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
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";
    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";
    appbody.className = 'appbody';
    minimize.type = 'image';
    minimize.title = 'Minimize';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";
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
}

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
}

function addAppToStore(appName, repoUrl, appimg) {
    // Create button for the app
    var appButton = document.createElement('button');
    appButton.className = 'appicon';
    appButton.style.backgroundImage = 'url(' + appimg + ')';
    appButton.title = appName;
    appButton.setAttribute('onclick', appName + "(); desktopbody.removeChild(actioncenter);");
    appcenter.appendChild(appButton);

    // Append the script
    var script = document.createElement('script');
    script.src = repoUrl; // URL of the GitHub repository
    script.id = appName; // Assign the app name as the script id
    script.async = true;
    document.body.appendChild(script); // Add to the body

    // Save app information to local storage
    saveAppToStorage(appName, repoUrl);
    pushNotif(appName, appName + " has been installed. Open it from the app center.", appName + "();");
}

function saveAppToStorage(appName, repoUrl) {
    let savedApps = JSON.parse(localStorage.getItem('savedApps')) || [];
    let savedScripts = JSON.parse(localStorage.getItem('savedScripts')) || [];

    // Prevent duplicate entries while saving
    if (!savedApps.includes(appName)) {
        savedApps.push(appName);
        localStorage.setItem('savedApps', JSON.stringify(savedApps));
    }

    // Check and store the corresponding repo URL
    if (!savedScripts.includes(repoUrl)) {
        savedScripts.push(repoUrl);
        localStorage.setItem('savedScripts', JSON.stringify(savedScripts));
    }
}

function loadSavedApps() {
    let savedApps = JSON.parse(localStorage.getItem('savedApps'));
    let savedScripts = JSON.parse(localStorage.getItem('savedScripts'));

    // Only load saved apps if there are any
    if (savedApps) {
        for (let i = 0; i < savedApps.length; i++) {
            let appName = savedApps[i];
            let repoUrl = savedScripts[i] || '';
            let appimg = 'images/' + appName + '.png'; // Image path

            // Create the app button
            var appButton = document.createElement('button');
            appButton.className = 'appicon';
            appButton.style.backgroundImage = 'url(' + appimg + ')';
            appButton.title = appName;
            appButton.setAttribute('onclick', appName + "(); desktopbody.removeChild(actioncenter);");
            appcenter.appendChild(appButton); // Add to the app center

            // Append the script to the document
            var script = document.createElement('script');
            script.src = repoUrl;
            script.id = appName;
            script.async = true;
            document.body.appendChild(script); // Add script to the body
        }
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

var top_z = 200;

function bringToFront(appname){
    var appelm = document.getElementById(appname);
    if(typeof(appelm) != 'undefined' && appelm != null){
        document.getElementById(appname).style.zIndex = ++top_z;
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
    objbrowserName = "Microsoft Internet Explorer (idk why tf you're using IE)"; 
    objfullVersion = objAgent.substring(objOffsetVersion+5); 
}else if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) { 
    objbrowserName = "Firefox"; 
}else if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1) { 
    objbrowserName = "Safari"; 
    objfullVersion = objAgent.substring(objOffsetVersion+7); 
    if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) objfullVersion = objAgent.substring(objOffsetVersion+8); 
}

var menucon = document.getElementById("menu");

// === UPDATE CHECKER ===
async function checkForUpdate() {
    try {
        const response = await fetch('https://api.github.com/repos/nononodev/betaOS/releases/latest');
        const data = await response.json();

        if (!data.tag_name) {
            alert('Could not retrieve latest version info.');
            return;
        }

        const latestVersion = data.tag_name.trim(); // e.g. "v1.1.0" or "1.1.0"
        const currentVersion = betaosversion.trim();

        // Simple version comparison (removes 'v' prefix if present and compares as strings)
        const normalize = v => v.replace(/^v/i, '');
        const isNewer = normalize(latestVersion) > normalize(currentVersion);

        if (isNewer) {
            const confirmUpdate = confirm(
                `New update available: ${latestVersion}\n` +
                `You are running: ${currentVersion}\n\n` +
                `Release notes:\n${data.body || 'No notes provided'}\n\n` +
                `Download the update now? \n\n` +
                `You will need to extract the zip file and move its contents to your betaOS folder, replacing the old files.`
            );

            if (confirmUpdate) {
                const zipUrl = data.zipball_url;
                const a = document.createElement('a');
                a.href = zipUrl;
                a.download = `betaOS-${latestVersion}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } else {
            alert(`You are up to date!\nCurrent version: ${currentVersion}`);
        }
    } catch (err) {
        alert('Could not check for updates. Are you online?');
        console.error(err);
    }
}

// === AUTO UPDATE CHECK ON STARTUP ===
async function bootUpdateCheck() {
    try {
        const response = await fetch('https://api.github.com/repos/nononodev/betaOS/releases/latest');
        const data = await response.json();

        if (!data.tag_name) {
            return; // silent fail if no info
        }

        const latestVersion = data.tag_name.trim();
        const currentVersion = betaosversion.trim();

        const normalize = v => v.replace(/^v/i, '');
        const isNewer = normalize(latestVersion) > normalize(currentVersion);

        if (isNewer) {
            pushNotif(
                "Settings",
                `New betaOS update available: ${latestVersion}`,
                function() {
                    Settings();
                    // Wait for Settings app to load, then open About tab
                    setTimeout(function() {
                        var aboutTab = document.querySelector('.tablinks[onclick*="About"]') || 
                                       Array.from(document.querySelectorAll('.tablinks')).find(btn => btn.innerHTML === 'About');
                        if (aboutTab) {
                            aboutTab.click();
                        }
                    }, 500); // small delay to ensure Settings is ready
                }
            );
        } else {
            console.log("betaOS " + betaosversion + " is up to date.");
        }
    } catch (err) {
        // Silent on startup - no alert, no console if you don't want
        console.error('Boot update check failed:', err);
    }
}