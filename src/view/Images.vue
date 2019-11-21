
<script>
import FirebaseService from "@/plugins/FirebaseService"

// get elements
let uploader = document.getElementById('uploader')
let fileButton = document.getElementById('filebutton')

// listen for file selection
fileButton.addEventListener('change', function(e){
    // get file
    var file = e.target.files[0]

    // create a storage ref
    var storageRef = firebase.storage().ref('upload_imgs/' + file.name)

    // upload file
    var task = storageRef.put(file)

    // update progress bar
    task.on('state_changed', 
    function progress(snaphot){
    var percentage = (snapshot.bytesTransferred / 
    snapshot.totalBytes) * 100;
    uploader.value = percentage;
    
    },
    function error(err){

    },
    function complete(){

    }
    )

    })

</script>