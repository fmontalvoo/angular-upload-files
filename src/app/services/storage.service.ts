import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  public uploadFile(file: any) {
    const filePath = `files/${file.name}`;
    const task = this.storage.upload(filePath, file);
    task.then(
      response => response.ref.getDownloadURL()
        .then(response => console.log(response))
    )
      .catch(error => console.log(error));
  }

  public uploadImage(file: any, img: string) {

    const ref = this.storage.ref(`files/${file.name}`);

    ref.putString(img, 'data_url').then(function (response) {
      response.ref.getDownloadURL()
        .then(response => console.log(response));
    });

  }
}
