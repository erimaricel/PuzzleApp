
var imgSrc = new Array();

function viewGallery (){

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	
		function(fileSys) {
            alert("inside fileSys function");
            fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
                function(directory) {
                    alert("inside directory");
                    alert(directory.fullPath+" -->value returned by getDirectory fullPath");
                    alert(directory.name+" -->value returned by getDirectory name");
                    //var myPath = fs.root.PuzzlePic;
					//console.log("Root = " + fs.root.fullPath);
					var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							var i;
							imgSrc.length = entries.length;
							for (i=0; i<entries.length; i++) {
								//console.log(entries[i].name);
								alert(entries[i].name+" entries name displayed in " +i);
								alert(entries[i].fullPath+" entries root fullPath displayed in " +i);
								//imgSrc[i] = entries.root.fullPath;
								imgSrc[i] = "/"+directory.name+ "/"+ entries.name;
								alert(imgSrc[i]+"image source saved")
							}

							displayImages();
						});
                              
                }, resOnError);
       }, resOnError);

	
			
}

function resOnError(error) { 
         //console.log("Error creating directory "+error.code); 
         alert("Error can not create directory" +error.code)
} 

function displayImages () {
	alert("inside displayImages function");
	var i;
	for (var i = 0; i <= imgSrc.length; i++) {
		$("#gallery-content").append("<img class='gallery-image' id='img"+i+"' src='"+imgSrc[i]+"'/>");
	};
}