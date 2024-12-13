import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BuildUpdateService {

  constructor(private swUpdate: SwUpdate) {
    this.listenForUpdates();
  }

  private listenForUpdates() {
    if (this.swUpdate.isEnabled) {
      // this.swUpdate.versionUpdates.subscribe(event => {
      //   if (event.type === 'VERSION_READY') {
      //     this.notifyUser();
      //   }
      // });
      setInterval(() => {
        this.swUpdate.checkForUpdate().then(isUpdateAvailable => {
          if (isUpdateAvailable) {
            this.notifyUser();
          }
        })
      }, 60000)
    }
  }

  private notifyUser() {
    Swal.fire({
      title: 'Update Available',
      text: 'A new version is available',
      icon: 'warning',
      confirmButtonText: 'Update',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.refreshApp();
      }
    })
  }

  private refreshApp() {
    window.location.reload();
  }
}

