    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var time = 0; //game timer
    var score = 0;
    var arr2 = [];
    var myint;
    var imageData;
    var fileSystem;
    var gallery_cnt;
    var slashcntr = 0;
    var position = 0;
    // Wait for Cordova to connect with the device
    //
  
  
    function init(){
      document.addEventListener("deviceready",onDeviceReady,false);
    }
  
    // Cordova is ready to be used!
    //
    function onDeviceReady() {
      // navigator.notification.alert("Application Started");
       // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        capturePhoto();
    }

    function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("PuzzlePic", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
    } 

    function onGetDirectorySuccess(dir) { 
          //console.log("Created dir "+dir.name); 
          alert(dir+" inside onGetDirectorySuccess");
    } 

    function onGetDirectoryFail(error) { 
         //console.log("Error creating directory "+error.code); 
         alert("Error can not create directory" +error.code)
    } 
    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      //console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      //var playboard = $('.playboard').val();

      //
     // playboard.width(100);
      //playboard.height(100);
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = /*"data:image/jpeg;base64," +*/ imageData;
      //alert(imageData);

    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('playboard-normal');

      // Unhide image elements
      //
      largeImage.style.display = 'block';


      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
      largeImage.width(200); // Units are assumed to be pixels
      largeImage.height(200);
      
    }

    // A button will call this function
    //
    function capturePhoto() {
     // alert("Take a photo!");
    // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(start, onFail,{
            quality : 25, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true });         
   }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }



    function touchHandler(event)
    {
      var touches = event.changedTouches,
      first = touches[0],
      type = "";
      switch(event.type)
      {
        case "touchstart": type="mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
      }
      var simulatedEvent = document.createEvent("MouseEvent");
       simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);
      first.target.dispatchEvent(simulatedEvent); 
      event.preventDefault();
    }

    function checkwin(imageData, fileSystem)
    {
       //alert("Inside checkwin");
       var z=1;
       var win = 0;
        $('.place').each(function(i, obj) 
            {
                      if(this.querySelector("#img"+z))
                        {
                          win++;
                        }
                      z++;
            });
        if(win==16)
        {
          clearInterval(myint);
          alert("Puzzle successfully solved!");
          alert(imageData+"after puzzle is solved but inside checkwin");
          /*alert(fileSystem);
          var parent = fileSystem.root.PuzzlePic,
          newName = "gallerySample", //need to change

          parentEntry = new DirectoryEntry({fullPath: parent});

          // move the directory to a new directory and rename it
          imageData.moveTo(parentEntry, newName, successMove, failMove);*/
          //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveFile, null);

          /*var smallImage = document.getElementById('image1');
          smallImage.style.display = 'block';

          smallImage.src = /*"data:image/jpeg;base64," +*/ //imageData;*/
          //addFolder();
          
          moveFile(imageData);
          navigator.app.exitApp();
          return true;
        }
        else
        {
          return false;
        }
    }

    function onSuccess(fileSystem){
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, moveFile, null); 
      return fileSystem
    }

    function moveFile(imageData){

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

            var entry=fileSystem.root; 

            function createDirectory(entry, imageData) {
       //Do something even interesting
                  alert("inside createDirectory");
                  
                  entry.getDirectory("PuzzlePic", {create: true, exclusive: false}, function(parent) {
                         alert("Parent Name: " + parent.name);
                        /*function copyToGallery(entry, imageData) {
                            alert("inside copyToGallery");
                   //Do something even interesting
                            parentEntry = new DirectoryEntry({fullPath: entry});
                          // copy the file to a new directory and rename it
                            imageData.copyTo(parentEntry, "sample.jpg", copySucess, copyFail);
                              
                        }*/
                    }, onGetDirectoryFail);
            }
        }, null);
       /*var fileURI = imageData;
       alert(fileURI+"--->fileURI");

       position = fileURI.lastIndexOf('/');
       alert(position+"--->position");

       var endPos = fileURI.length - 1;
       alert(endPos);
       var newPos = position + 1;
       alert(newPos+"new Position");
       var entry=fileURI.slice(0, newPos); 
       alert(entry+" after slicing the data");
       createDirectory(entry);
       copyToGallery (fileURI);*/

      
       
       /* alert(fileSystem);
        var parent = fileSystem.root.PuzzlePic,
          newName = "gallerySample", //need to change

          parentEntry = new DirectoryEntry({fullPath: parent});
          alert(parent);

          // move the directory to a new directory and rename it
          imageData.moveTo(parentEntry, newName, successMove, failMove);*/
    }

    function copySuccess(data){
        alert("copySuccess");
    }

    function copyFail(data){
        alert("Fail");
    }


    function createDirectory(entry){
        alert("inside createDirectory");
        entry.getDirectory("PuzzlePic", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
    }

    function copyToGallery (fileURI){
       alert("inside copyToGallery")
        var folderName = "PuzzlePic";
      
       var galleryFolder = [fileURI.slice(0, newPos), folderName, fileURI.slice(newPos)].join(''); //directory of photo/PuzzlePic/hgajkfgl.jpg
       alert(galleryFolder+"---->galleryFolder");
       parentEntry = new DirectoryEntry({fullPath: galleryFolder});


    // copy the file to a new directory and rename it
      fileURI.copyTo(parentEntry, "sample.jpg", null, null);

    }

    function successMove(){
      alert("successfully moved");
    }

    function faileMove(){
      alert("Fail to move data");
    }

    function createRand()
    {
      var arr = [];
      for(var x=0;x<=15;x++)
      {
        arr[x] = x+1;
      }

      return arr;
    }

    function touchinit()
    {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }


    function start(imageData) {
      var imageData=imageData;

      touchinit();
      
      var i = 1;
      var z = 1
      var x = 0;
      var y = 0;
      var array = createRand();

      for(z=1;z<=16;z++)
      {
          var num = Math.floor(Math.random() * array.length);
          var roll = array.splice(num, 1);
          m = roll;
          $("#playblock"+z).append("<div id='puzz"+z+"' class='puzz'></div>");
          $("#puzz"+z).append("<img class='img' id='img"+m+"' draggable='false'  style='overflow: hidden;' src='"+imageData+"' width='200px' height='200px'/>");
      }


      for(z=1;z<=16;z++)
      {
        $("#container").append("<div id='place"+z+"' class='place' style='float:left; border: 1px dotted black; height:50px; width: 50px;'></div>");
          
      }



       $('.puzz').draggable({helper: 'clone', revert: true});

      var stockArea = $('.place, .playblock-normal').droppable({
        drop: function (event, ui) {
            if(this.innerHTML.length < 5)
            {
            ui.helper.fadeOut();
            var target = $('.place');
            $(this).empty();
            $(ui.draggable).appendTo(this);

            if(this.querySelector("#img"+this.id.substring(5)))
              {
                if(jQuery.inArray(this.id.substring(5), arr2) < 0)
                {
                          arr2.push(this.id.substring(5));
                         score = score + (100 + (500/time)); 
                          document.getElementById('points').innerText = parseInt(score);
                }
              }
             checkwin(imageData);
            }
        }
      });     
      
      for(y=1; y<=4; y++)
      {
        for(x=1; x<=4; x++)
        {     
          document.getElementById('img'+i).style.marginLeft = -(x-1)*50+"px"; 
          document.getElementById('img'+i).style.marginTop = -(y-1)*50+"px"; 
          i++;
        }
      }
      myint = window.setInterval(timer, 1000);

    }

    function timer()
    {
      document.getElementById('play-timer').innerText = time++;
      if(time == 500)
      {
        clearInterval(myint);
        alert("Game Over");
      }
    }

  