import { Component } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-upload-files';

  private file!: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  public img: string = '';

  constructor(private storage: StorageService) {

  }

  public loadFile(event: any) {
    this.file = <File>event.target.files[0];
    console.log(this.file);
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      if (typeof reader.result == 'string')
        this.img = reader.result;
    }
  }

  public uploadFile() {
    if (this.file) {
      this.storage.uploadFile(this.file);
    } else {
      console.error("No escogio ningun archivo");
    }
  }

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.file = <File>event.target.files[0];
  }
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  public uploadImage() {
    if (this.file) {
      this.storage.uploadImage(this.file, this.croppedImage);
    } else {
      console.error("No escogio ningun archivo");
    }
  }

}
