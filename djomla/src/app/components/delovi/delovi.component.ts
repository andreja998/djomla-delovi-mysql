import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges
} from "@angular/core";
import { SearchMode } from "src/app/utils";
import { PretrazivacComponent } from "../pretrazivac/pretrazivac.component";
import { CarService } from "src/app/services/car.service";
import { SearchService } from "src/app/services/search.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-delovi",
  templateUrl: "./delovi.component.html",
  styleUrls: ["./delovi.component.scss"]
})
export class DeloviComponent implements OnInit, OnChanges {
  searchName = "Pretraga Delova";
  searchMode = SearchMode.DETAILED;
  parts: Array<any> = [];
  pageOfItems: Array<any> = [];
  page = 1;

  @ViewChild("pretrazivac", { static: false })
  searchComponent: PretrazivacComponent;

  constructor(
    private carService: CarService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // pull from url parts to filter
    this.route.queryParams.subscribe(params => {
      this.carService
        .getPartsByModel(undefined, undefined, undefined, undefined)
        .subscribe(parts => {
          this.parts = parts;
          if (this.carService.currentPage) {
            this.carService.currentPage.subscribe(res => {
              this.page = res;
            });
          }
        });
    });
    // return when null all parts
  }

  ngOnChanges() {}

  onSearch(event: any) {
    console.log(event);
    this.carService
      .getPartsByModel(
        event.model == null ? undefined : event.model.id,
        event.mark == null ? undefined : event.mark.id,
        event.category == null ? undefined : event.category.id,
        event.subCategory == null ? undefined : event.subCategory.id
      )
      .subscribe(parts => {
        this.parts = parts;
        this.page = 1;
        this.carService.currentPage = of(1);
      });
  }

  onPartClick(id: string) {
    this.router.navigate(["deo"], { queryParams: { partId: id } });
  }

  onChange(event: number) {
    this.page = event;
    this.carService.currentPage = of(event);
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
