



function viewGallery (){

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	function(fs) {
				/*console.log("Root = " + fs.root.fullPath);
				var directoryReader = fs.root.createReader();
				directoryReader.readEntries(function(entries) {
					var i;
					for (i=0; i<entries.length; i++) {
						console.log(entries[i].name);
					}
				}, function (error) {

						alert(error.code);
				})*/
				alert(fs);
				var entry = fs.root.fullPath;
				//var myFs = entry.toURI();
				alert(entry+" -->myFs");

			}, function (error) {
				alert(error.code);
			});
}