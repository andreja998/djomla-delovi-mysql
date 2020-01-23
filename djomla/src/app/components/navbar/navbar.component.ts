import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  role = '';
  constructor(private authUser: AuthUserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.authUser.getRole());
    this.role = this.authUser.getRole();
    this.authUser.role.subscribe(res => {
      this.role = res;
    });
  }

  clickRoute() {
    this.router.navigate([{ outlets: { 'admin-router': ['add-mark'] } }]);
  }
}
