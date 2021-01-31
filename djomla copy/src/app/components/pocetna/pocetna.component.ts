import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';
import { SearchMode } from 'src/app/utils';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  searchName = 'Brza pretraga';
  searchMode = SearchMode.SIMPLE;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
  }

  onSearch(event: any) {
    this.router.navigate(['delovi']);
  }

}
