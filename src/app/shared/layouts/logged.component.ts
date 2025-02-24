import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  imports: [CommonModule, RouterOutlet, HeaderComponent]
})
export class LoggedComponent { }
