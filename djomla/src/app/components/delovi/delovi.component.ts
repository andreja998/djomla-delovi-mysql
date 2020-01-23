import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { SearchMode } from 'src/app/utils';
import { PretrazivacComponent } from '../pretrazivac/pretrazivac.component';
import { CarService } from 'src/app/services/car.service';
import { SearchService } from 'src/app/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-delovi',
  templateUrl: './delovi.component.html',
  styleUrls: ['./delovi.component.scss']
})
export class DeloviComponent implements OnInit, OnChanges {
  searchName = 'Pretraga Delova';
  searchMode = SearchMode.DETAILED;
  parts: Array<any> = [];
  pageOfItems: Array<any> = [];

  pager = {};
  markId: number;
  modelId: number;
  categoryId: number;
  subCategoryId: number;

  screenSmall: boolean;

  @ViewChild('pretrazivac', { static: false })
  searchComponent: PretrazivacComponent;

  constructor(
    private carService: CarService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    // pull from url parts to filter
    // this.route.queryParams.subscribe(params => {
    //   this.carService.getPartsByModel(undefined, undefined, undefined, undefined,).subscribe(parts => {
    //     this.parts = parts;
    //     if (this.carService.currentPage) {
    //       this.carService.currentPage.subscribe(res => {
    //         this.page = res;
    //       });
    //     }
    //   });
    // });
    // return when null all parts
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe(state => {
      if (state.matches) {
        this.screenSmall = true;
      } else {
        this.screenSmall = false;
      }
    });
  }

  ngOnChanges() {}

  onSearch(event: any) {
    console.log(event);
    this.modelId = event.model == null ? undefined : event.model.id;
    this.markId = event.mark == null ? undefined : event.mark.id;
    this.categoryId = event.category == null ? undefined : event.category.id;
    this.subCategoryId = event.subCategory == null ? undefined : event.subCategory.id;

    this.carService
      .getPartsByModel(
        event.model == null ? undefined : event.model.id,
        event.mark == null ? undefined : event.mark.id,
        event.category == null ? undefined : event.category.id,
        event.subCategory == null ? undefined : event.subCategory.id,
        1
      )
      .subscribe(
        res => {
          console.log('fffff');
          this.pager = res['pager'];
          this.parts = res['parts'];
        },
        err => {
          console.log(err);
        }
      );
  }

  loadPage(page: number) {
    console.log(this.modelId);
    this.carService.getPartsByModel(this.modelId, this.markId, this.categoryId, this.subCategoryId, page).subscribe(
      res => {
        console.log('fffff');
        this.pager = res['pager'];
        this.parts = res['parts'];
      },
      err => {
        console.log(err);
      }
    );
  }

  onPartClick(id: string) {
    this.router.navigate(['deo'], { queryParams: { partId: id } });
  }

  // Retreive all number of items and set their value to 1
  // Count per page how many items and calculate the offset
  // On page change call the service to get items for calculated offset
  // Set retreived items to display
  // onChangePage(event: any) {
  //   this.pageOfItems = event.page_of_items;
  //   console.log(event["current_page"]);
  //   this.carService.name = "Andreja";
  // }
}
