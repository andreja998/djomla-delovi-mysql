import { Component, OnInit } from '@angular/core';
import { SearchMode } from 'src/app/utils';

@Component({
  selector: 'app-delovi',
  templateUrl: './delovi.component.html',
  styleUrls: ['./delovi.component.scss']
})
export class DeloviComponent implements OnInit {

  searchName = 'Pretraga Delova';
  searchMode = SearchMode.DETAILED;

  constructor() { }

  ngOnInit() {
  }

}
