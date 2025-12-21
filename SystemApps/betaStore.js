function betaStore(){
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
    var appsname = 'betaStore';
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
    
    // Array of apps to be added to the betaStore
    var apps = [
        { name: "JSFiddle", icon: "images/JSFiddle.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/JSFiddle.js"},
        { name: "SpankBang", icon: "images/SpankBang.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/SpankBang.js" },
        { name: "GoonTimer", icon: "images/GoonTimer.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/GoonTimer.js" },
        { name: "TodoList", icon: "images/TodoList.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/TodoList.js" },
        { name: "Snake", icon: "images/Snake.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/Snake.js" },
        { name: "Pong", icon: "images/Pong.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/Pong.js" },
        { name: "Goonermon", icon: "images/Goonermon.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/Goonermon.js" },
        { name: "GoonComp", icon: "images/GoonComp.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/GoonComp.js" },
        { name: "GoonerGalaxy", icon: "images/GoonerGalaxy.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/GoonerGalaxy.js" },
        { name: "Calculator", icon: "images/Calculator.png", repo: "https://cdn.jsdelivr.net/gh/nononodev/betaStoreApps@main/Calculator.js"},
    ];

    // Create a store container
    var storeContainer = document.createElement('div');
    storeContainer.className = 'betaStoreContainer';

    // Create a search bar
    var searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search for an app...';
    searchBar.className = 'searchBar';
    storeContainer.appendChild(searchBar);

    // Create a container for app entries
    var appEntriesContainer = document.createElement('div');
    appEntriesContainer.className = 'appEntries';

    // Loop through the apps array and create UI elements
    apps.forEach(function(app) {
        var appEntry = document.createElement('div');
        appEntry.className = 'appEntry';

        var appIcon = document.createElement('img');
        appIcon.src = app.icon; // Icon source
        appIcon.alt = app.name; // Alt text
        appEntry.appendChild(appIcon);

        var appName = document.createElement('span');
        appName.innerText = app.name;
        appEntry.appendChild(appName);

        var installButton = document.createElement('button');

        // Retrieve saved apps from local storage
        var savedApps = JSON.parse(localStorage.getItem('savedApps')) || [];

        // Check if the app is already in the savedApps array
        if (savedApps.includes(app.name)) {
            installButton.innerText = 'Installed';
            installButton.setAttribute('onclick', app.name + "()");// Disable the button
            installButton.style.backgroundColor = 'rgba(0, 255, 4, 0.506)';
        } else {
            installButton.innerText = 'Install';
            installButton.onclick = function() {
                addAppToStore(app.name, app.repo, app.icon);
                installButton.innerText = 'Installed';
                installButton.disabled = true; // Disable the button
                installButton.style.backgroundColor = 'rgba(0, 255, 4, 0.506)'; // Add the app to the store
            };
        }

        appEntry.appendChild(installButton);
        appEntriesContainer.appendChild(appEntry);
    });

    storeContainer.appendChild(appEntriesContainer); // Add the app entries to the store container

    appbody.appendChild(storeContainer); // Add the store container to the app body

    // Search functionality
    searchBar.addEventListener('keyup', function() {
        var filter = searchBar.value.toLowerCase();
        var appEntries = appEntriesContainer.getElementsByClassName('appEntry');

        Array.from(appEntries).forEach(function(entry) {
            var appNameText = entry.getElementsByTagName('span')[0].innerText.toLowerCase();
            if (appNameText.indexOf(filter) > -1) {
                entry.style.display = ''; // Show matching entry
            } else {
                entry.style.display = 'none'; // Hide non-matching entry
            }
        });
    });
}