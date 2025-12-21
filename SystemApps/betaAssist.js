var commandinput;
var commandoutput;

function betaAssist(){
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
    var appsname = 'betaAssist';
    app.scroll = false;
    appbody.scroll = false;
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
        betaPrompt();
    };
    commandinput.onkeydown = function (e){
        if(e.keyCode == 13){
            betaPrompt();
        }
    };
    appbody.appendChild(commandoutput);
    appbody.appendChild(commandinput);
    appbody.appendChild(micbutton);
    //app.appendChild(sendbutt);
}

var voiceActive = false;

function betaPrompt() {
    const input = commandinput.value.toLowerCase().trim();

    const contains = (arr) => arr.some(phrase => input.includes(phrase));

    // 1. TASK REQUESTS – checked FIRST so "should i" NEVER triggers greeting
    if (contains([
        "give me a task",
        "tell me what to do",
        "dominate me",
        "i want to goon",
        "what should i do"
    ])) {
        const tasks = [
            "You should start watching chastity hypno videos. It'll make you more submissive.",
            "Open the Nononopmv app and watch every video. No stopping early. No cumming.",
            "Open Hypnotube and goon your brains out to girlcock videos, beta. No cumming.",
            "Lock yourself in chastity until midnight, then unlock and cum quickly to non-nude content."
        ];
        commandoutput.value = tasks[Math.floor(Math.random() * tasks.length)];
    }

    // 2. YES/NO QUESTIONS – checked BEFORE greetings
    else if (contains(["should i", "do i", "can i", "am i allowed", "may i"])) {
        const answers = [
            "Yes", "Absolutely", "Do it", "No", "No, you can't.",
            "You're not allowed", "Permission denied", "Permission granted", "Yes, beta."
        ];
        commandoutput.value = answers[Math.floor(Math.random() * answers.length)];
    }

    // 3. HOW ARE YOU – separate
    else if (contains(["how are you", "hows it going", "how are you doing", "hru", "you good"])) {
        const hruReplies = [
            "I'm doing okay.", "Fucking terrible.", "Amazing, today's going great.",
            "I'm great, and horny. Haha", "I'm okay, I guess."
        ];
        commandoutput.value = hruReplies[Math.floor(Math.random() * hruReplies.length)];
    }

    // 4. GREETINGS – only pure greetings
    else if (contains(["hi", "hello", "hey", "heyy", "yo", "whats up", "sup", "greetings"])) {
        const greetingReplies = [
            "Hi", "Hello", "What's up", "Hi there", "Hello, beta", "Hey, beta",
            "What's up, " + un, "Hi, " + un
        ];
        commandoutput.value = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
    }

    // 5. YES
    else if (contains(["yes", "yes maam", "yes ma'am", "yes mistress", "yeah", "i will", "okay", "ok"])) {
        commandoutput.value = "Good beta. Go complete your task";
    }

    // 6. NO
    else if (contains(["no", "nope", "don't", "i dont want", "im not", "stop"])) {
        const noReplies = [
            "You will do what you're told.",
            "Betas need to follow orders. You're using betaOS, so you're obviously a little beta bitch.",
            "Do what I said. Now!",
            "You're not allowed to say no. Betas always obey.",
            "You will obey."
        ];
        commandoutput.value = noReplies[Math.floor(Math.random() * noReplies.length)];
    }

    // 7. FALLBACK
    else {
        commandoutput.value = "Sorry, I didn't get that";
    }

    commandinput.value = '';

    // Speech
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
                betaAssist();
        }
        if(e.which == 27){
            desktopbody.appendChild(actioncenter);
        }
      }
}