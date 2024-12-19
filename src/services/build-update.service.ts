import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildUpdateService {
  constructor(private swUpdate: SwUpdate) {
    this.startPeriodicUpdateChecks();
  }

  startPeriodicUpdateChecks() {
    // Ensure service worker updates are enabled
    if (!this.swUpdate.isEnabled) {
      console.log('Service Worker Updates not enabled');
      return;
    }

    // Check for updates every 1 minute (60000 milliseconds)
    interval(60000).subscribe(() => {
      this.checkForUpdate();
    });
  }

  private checkForUpdate() {
    this.swUpdate.checkForUpdate().then(() => {
      // Listen for available updates
      this.swUpdate.versionUpdates.subscribe(event => {
        // Show SweetAlert as soon as an update is detected
        if(event.type == "VERSION_DETECTED") {
          console.log("New version detected and starting to install");
        }
        else if(event.type == "VERSION_INSTALLATION_FAILED") {
          console.error('Failed to install the update');
          console.error(event.error);
        }
        else if(event.type == "VERSION_READY") {
          console.log(`running version: ${event.currentVersion.hash}`);
          console.log(`available version: ${event.latestVersion.hash}`);
          Swal.fire({
            title: 'New Version Available',
            text: 'A new version of the application has been deployed.',
            icon: 'info',
            confirmButtonText: 'Update',
          }).then((result) => {
            if (result.isConfirmed) {
              // Activate the new version and reload
              this.swUpdate.activateUpdate().then(() => {
                document.location.reload();
              });
            }
          });
        }
      });
    }).catch(err => {
      console.error('Failed to check for updates', err);
    });
  }
}