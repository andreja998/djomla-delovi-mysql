import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from "@angular/core";
import { Paginate, paginate } from "./paginate-logic";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager: Paginate = new Paginate();

  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    console.log(this.pager);
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(
      this.items.length,
      page,
      this.pageSize,
      this.maxPages
    );

    // get new page of items from items array
    const pageOfItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    console.log(this.pager);
    // call change page function in parenle.log(t component
    this.changePage.emit({
      page_of_items: pageOfItems,
      current_page: this.pager.currentPage
    });
  }
}
