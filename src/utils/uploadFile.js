import storage from "../config/firebaseStorage";
import { v4 as uuid } from "uuid";

export default function uploadFile(file, path, imgSetter, progressSetter) {
  const storageRef = storage.ref();

  const fileName = `${uuid()}-${file.name}`;
  console.log(pathRef);
  const pathRef = storageRef.child({path}+"/"+{fileName}).put(file).then(snapshot => {
    console.log('Uploaded.');
});

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      if(progressSetter){
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        progressSetter(progress);
      }
      
    },
    function (error) {
      alert("There was a problem uploading the file. Please try again later.");
      console.error(error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        if(imgSetter) imgSetter(downloadURL);
        else return downloadURL;
      });
    }
  );
}
