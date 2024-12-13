import { Component } from '@angular/core';
import { BuildUpdateService } from 'src/services/build-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private buildUpdateService: BuildUpdateService) {}
  title = 'angular-router-sample';
}
