function Files(){
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
    var appsname = 'Files';
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
    
    var fileInput = document.createElement('input');
    var uploadButton = document.createElement('button');
    var searchInput = document.createElement('input');
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

        // Append elements to app body
        appbody.appendChild(fileInput);
        appbody.appendChild(uploadButton);
        appbody.appendChild(searchInput);
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
                    AudioPlayer(fileData.name); // Open the AudioPlayer (implement this function separately)
                } else if (fileData.name.endsWith('.mp4') || fileData.name.endsWith('.mov')) {
                    vidPlay(fileData.name, 'videos/' + fileData.name); // Function to play video files
                } else {
                    alert('File type not supported for playback.'); // Alert for unsupported file types
                }
            };
                
            fileList.appendChild(fileButton);
        }

        // Search file handler
        searchInput.addEventListener('input', function() {
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
        });
    };

    request.onerror = function(event) {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}