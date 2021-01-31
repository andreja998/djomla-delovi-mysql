import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('navbar', { static: false }) navbar: NavbarComponent;

  title = 'djomla';

  constructor(private navService: NavbarService) {}

  ngAfterViewInit() {}
}
