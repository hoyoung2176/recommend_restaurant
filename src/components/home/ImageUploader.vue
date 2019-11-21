<template>

    <div class='image-uploader'>
     
    <file-pond
        class="filepond"
        id="file-fond"
        name="test"
        ref="pond"
        class-name="my-pond"
        label-idle="click or drag"
        allow-multiple="false"
        :server="server"
        instantUpload="false"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"
        v-on:updatefiles="handleUpdateFile"/>
        
    </div>
</template>


<script>
import axios from "axios";

const CLIENT_ID = "8f3aec7ee110dce";
const ROOT_URL = "https://api.imgur.com";


import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview );

export default {
    name: 'image-uploader',
    data: function() {
        return { 
            myFiles: [],
            userImageLink : "",
            server: {
                process:(fieldName, file, metadata, load, error, progress, abort) => {

                    const fd=  new FormData();
                    fd.append('image',file,fieldName)

                    axios.post('https://api.imgur.com/3/image',fd,{
                        headers : {
                             Authorization: 'Client-ID 8f3aec7ee110dce'
                        },
                         onUploadProgress: (e) => {
                            progress(e.lengthComputable, e.loaded, e.total)
                        }

                 }).then(res => {
                        this.userImage = res.data.data.link;
                        console.log(this.userImage);
                 })
                         return {
                              abort: () => {
                                  source.cancel('Operation canceled by the user.')
                                  abort()
                              }
                        }
                }
            }   
        };
    },
    methods: {
        handleFilePondInit: function() {
        },
        handleUpdateFile(){
            this.$emit('get-upload-files',this.$refs.pond.getFile())
        }
    },
    components: {
        FilePond
    }
};
</script>

<style>

#file-fond{
    width: 50%;
    margin: auto;
}
.filepond--action-process-item{
    visibility:hidden;
}

</style>