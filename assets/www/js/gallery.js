
var imgSrc = new Array();

function viewGallery (){

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	
		function(fileSys) {
            //alert("inside fileSys function");
            fileSys.root.getDirectory("PuzzlePic", {create:true, exclusive: false},
                function(directory) {
                    //alert("inside directory");
                    //alert(directory.fullPath+" -->value returned by getDirectory fullPath");
                    //alert(directory.name+" -->value returned by getDirectory name");
                    //var myPath = fs.root.PuzzlePic;
					//console.log("Root = " + fs.root.fullPath);
					var directoryReader = directory.createReader();
						directoryReader.readEntries(function(entries) {
							var i;
							//imgSrc.length = entries.length;
							for (i=0; i<entries.length; i++) {
								alert("entries");
								$("#gallery-content").append("<img class='gallery-image'  id='img"+i+"' src='"+entries[i].fullPath+"'/>"); 
								//console.log(entries[i].name);
								//alert(entries[i].name+" entries name displayed in " +i);
								//alert(entries[i].fullPath+" entries root fullPath displayed in " +i);
								//imgSrc[i] = entries.root.fullPath;
								//imgSrc[i] = "/"+directory.name+ "/"+ entries.name;
								//alert(imgSrc[i]+"image source saved")
								//imgSrc[i] = readFileURL(entries[i]);
								//alert(imgSrc[i]+" -->imgSrc");
								//var file = entries;
                				//alert(file+" file inside loop");
				             /*   var picReader = new FileReader();
				                
				               // picReader.addEventListener("load",function(event){
				                    
				                 picReader.onloadend = function(event) {
								    console.log(event.target.result);
								    alert("inside picReader onload");
								    //init(event.target.result);
								    alert(event.target.result);
								    var mySource = event.target.result;
								    alert(mySource+" mySource value");
								     $("#gallery-content").append("<img class='gallery-image' id='img"+i+"' src='"+mySource+"'/>"); 

								};   //var picFile = event.target;
				                    */
				                             
				                
				               // });
				                
				                 //Read the image
				                //picReader.readAsDataURL(entries[i]);

							}

							//displayImages();
						});
                              
                }, resOnError);
       }, resOnError);

	
			
}

function resOnError(error) { 
         //console.log("Error creating directory "+error.code); 
         alert("Error can not create directory" +error.code)
} 

