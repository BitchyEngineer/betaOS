function Nono(){
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
    var appsname = 'Nono';
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

    var ntab = document.createElement('div');
    var videos = ['BCIT1','BCIT2','BCIT3','BCIT4','BCIT5', 'BCIT6'];
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

var clipsList = document.createElement("div");
clipsList.scroll = true; 
clipsList.style.display = 'block';
clipsList.style.height = '100%';
clipsList.style.width = '100%';
clipsList.id = 'Clips';
clipsList.name = 'Clips';
clipsList.className = "ntabcontent";

// === FALLBACK: Since this is local (file://) and JavaScript cannot list files in a folder for security reasons ===
// === We keep your original manual array so it actually works ===

var clip = ['AdoredFarawayBabirusa','AmplePrizeEel','AppropriateWearySeaurchin','AshamedStripedSnail',
            'AuthorizedBlaringFulmar', ''];
// Add new video base names here whenever you add a new .mp4 to the nonoclips folder

// Build the list from the manual array
for(let i = 0; i < clip.length; i++){
    var cthumbnail = document.createElement('button');
    cthumbnail.className = 'vthumb';
    cthumbnail.id = "thumbnail" + clip[i];
    cthumbnail.title = clip[i];
    cthumbnail.innerText = clip[i];  // Show the name as text (no thumbnail image)
    cthumbnail.style.backgroundColor = '#222';
    cthumbnail.style.color = 'white';
    cthumbnail.style.border = '1px solid #555';
    cthumbnail.style.padding = '20px';
    cthumbnail.style.margin = '10px';
    cthumbnail.style.fontSize = '16px';
    cthumbnail.style.minWidth = '200px';
    cthumbnail.style.textAlign = 'center';
    cthumbnail.style.cursor = 'pointer';

    cthumbnail.onclick = function(){
        vidPlay("nonoclips/" + clip[i] + ".mp4");
    };
    clipsList.appendChild(cthumbnail);
}

// Optional: message if you want to remind yourself to update the list
if (videos.length === 0) {
    var msg = document.createElement('p');
    msg.innerText = 'No videos listed. Add base names to the videos array above.';
    msg.style.color = 'white';
    msg.style.textAlign = 'center';
    msg.style.padding = '40px';
    bcitlist.appendChild(msg);
}

    appbody.appendChild(ntab);
    appbody.appendChild(bcitlist);
    appbody.appendChild(teasers);
    appbody.appendChild(clipsList);

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