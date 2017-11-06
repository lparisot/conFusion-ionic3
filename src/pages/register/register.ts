import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;
  imageSrc: string = 'assets/images/logo.png';
  base64Img: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private file: File,
    private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
       firstname: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
       lastname: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
       username: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
       password: [ '', [Validators.required, Validators.minLength(8), Validators.maxLength(25)] ],
       telnum: [ '', [Validators.required, Validators.pattern] ],
       email: [ '', [Validators.required, Validators.email] ]
     });

     this.camera.cleanup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(true);
  }

  getFromCamera() {
    console.log('Get from Camera');

    this.getPicture(this.setOptions(this.camera.PictureSourceType.CAMERA));
  }

  getFromLibrary() {
    console.log('Get from Photo Library');

    this.getPicture(this.setOptions(this.camera.PictureSourceType.PHOTOLIBRARY));
  }

  getPicture(srcType) {
    // bug with the DestinationType.FILE_URI
    // retrieve something like file:///var/mobile/Containers/Data/Application/8480470B-22B2-48BE-B561-66B545BBD8B9/tmp/cdv_photo_001.jpg
    // see https://github.com/Telerik-Verified-Plugins/WKWebView/issues/215
    // need to use cordova-plugin-file to modify the URI
    this.camera
      .getPicture(srcType)
      .then(
        fileUri => {
          console.log(fileUri);
          //var relativeUri = '/' + fileUri.replace(this.file.applicationStorageDirectory, '');
          //var relativeUri = fileUri.split("file:///")[1];
          //console.log(relativeUri);
          //this.moveFileToExternaleStorage(fileUri);
          this.imageSrc = fileUri;
        },
        err => {
          console.log('Error obtaining picture ' + err);
        }
      );
  }

  setOptions(srcType) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      sourceType: srcType,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    }
    return options;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

  moveFileToExternaleStorage(fileName: string) {
    let dataDirectory: string = this.file.dataDirectory;
    console.log('dataDirectory: ' + dataDirectory);
    let currentPath: string = this.file.applicationStorageDirectory + 'tmp/';
    console.log('currentPath: ' + currentPath);

    fileName = fileName.split("/").pop();
    console.log('fileName: ' + fileName);

    this.file.moveFile(currentPath, fileName, dataDirectory, fileName)
      .then(entry => {
        console.log('Move file: ' + entry.nativeURL);
        this.imageSrc = entry.nativeURL;
      });
  }

 }
