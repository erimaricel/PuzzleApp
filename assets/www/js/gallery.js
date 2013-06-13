
var imgSrc = new Array();

function viewGallery (){

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	
		function(fileSys) {
            alert("inside fileSys function");
            fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
                function(directory) {
                    alert("inside directory");
                    alert(directory.fullPath+" -->value returned by getDirectory");
                    //var myPath = fs.root.PuzzlePic;
					//console.log("Root = " + fs.root.fullPath);
					var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							var i;
							for (i=0; i<entries.length; i++) {
								//console.log(entries[i].name);
								alert(entries[i].name+" entries name displayed in " +i);
								alert(entries[i].fullPath+" entries fullPath displayed in " +i);
								imgSrc[i] = entries.fullPath;
							}
						});
                              
                }, resOnError);
       }, resOnError);

	displayImages();
			
}

function resOnError(error) { 
         //console.log("Error creating directory "+error.code); 
         alert("Error can not create directory" +error.code)
} 

function displayImages () {
	var i;
	for (var i = 0; i <= imgSrc.length; i++) {
		$("#gallery-content").append("<img id='img"+i+"' src='"+imgSrc[i]+"' width='200px' height='200px'/>");
	};
}