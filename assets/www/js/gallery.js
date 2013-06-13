

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
								alert(entries[i]+" entries displayed in " +i);
							}
						});
                              
                }, resOnError);
       }, resOnError);
			
}

function resOnError(error) { 
         //console.log("Error creating directory "+error.code); 
         alert("Error can not create directory" +error.code)
} 