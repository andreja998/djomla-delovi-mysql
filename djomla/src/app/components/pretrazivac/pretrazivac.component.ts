import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewEncapsulation
} from "@angular/core";
import { SearchItem, SearchMode } from "src/app/utils";
import Stepper from "bs-stepper";
import { CarService } from "src/app/services/car.service";
import { SearchService } from "src/app/services/search.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pretrazivac",
  templateUrl: "./pretrazivac.component.html",
  styleUrls: ["./pretrazivac.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PretrazivacComponent implements OnInit {
  @Input() searchMode: string;
  @Input() searchName: string;

  @Output() search: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  marks: SearchItem[];
  models: SearchItem[];
  categories: SearchItem[];
  subCategories: SearchItem[];

  selectedMark: SearchItem = null;
  selectedModel: SearchItem = null;
  selectedCategory: SearchItem = null;
  selectedSubCategory: SearchItem = null;

  searchDisabled = true;

  stepper: Stepper;

  constructor(
    private carService: CarService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carService.getMarks().subscribe(marks => {
      this.marks = marks;
    });
  }

  onMarkChange(value: any) {
    console.log("MAAARK");
    this.handleSearchButton();
    if (this.selectedMark) {
      this.carService.getModels(this.selectedMark.id).subscribe(models => {
        console.log("Radim u pocetnoj :D");
        this.models = models;
      });
    } else {
      this.models = [];
      this.categories = [];
      this.subCategories = [];
      this.selectedModel = null;
      this.selectedCategory = null;
      this.selectedSubCategory = null;
    }
  }

  onModelChange(value?: any) {
    console.log("MODEEL!");
    this.handleSearchButton();
    if (this.selectedModel) {
      this.carService.getCategories().subscribe(categories => {
        this.categories = categories;
      });
    } else {
      this.categories = [];
      this.subCategories = [];
      this.selectedCategory = null;
      this.selectedSubCategory = null;
    }
  }

  onCategoryChange(value: any) {
    if (this.selectedCategory) {
      this.carService.getSubCategories(value).subscribe(subCategories => {
        this.subCategories = subCategories;
      });
    } else {
      this.subCategories = [];
      this.selectedSubCategory = null;
    }
  }

  onSubCategoryChange(value: any) {
    console.log(this.selectedSubCategory);
  }

  onSearch() {
    // this.searchService.selectedCategory = this.selectedCategory;
    // this.searchService.selectedMark = this.selectedMark;
    // this.searchService.selectedModel = this.selectedModel;
    this.search.emit({
      mark: this.selectedMark,
      model: this.selectedModel,
      category: this.selectedCategory,
      subCategory: this.selectedSubCategory
    });
  }

  handleSearchButton() {
    console.log("Handle!");
    if (this.selectedMark === null || this.selectedModel === null) {
      this.searchDisabled = true;
    } else {
      this.searchDisabled = null;
    }
  }
}
