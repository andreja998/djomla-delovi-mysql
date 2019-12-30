import { Component, OnInit, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarService } from "src/app/services/car.service";
import { SearchItem } from "src/app/utils";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"]
})
export class AddCategoryComponent implements OnInit {
  addCategoryF: FormGroup;
  removeCategoryF: FormGroup;
  updateCategoryF: FormGroup;
  categories: SearchItem[];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.addCategoryF = this.formBuilder.group({
      category: [null, [Validators.required]]
    });
    this.removeCategoryF = this.formBuilder.group({
      category: [null, [Validators.required]]
    });
    this.updateCategoryF = this.formBuilder.group({
      category: [null, [Validators.required]],
      categoryName: [null, [Validators.required]]
    });
    this.carService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  removeCategory() {
    this.carService
      .removeCategory(this.removeCategoryF.value.category.id)
      .subscribe(
        res => {
          this.categories = this.categories.filter((value, index, array) => {
            return value.id !== this.removeCategoryF.value.category.id;
          });
          this.removeCategoryF.reset();
          this.updateCategoryF.reset();

          this.toast.success("Kategorija uspešno uklonjena");
        },
        err => {
          this.toast.error("Greška, kategorija nije uklonjena");
        }
      );
  }

  updateCategory() {
    const exist = this.categories.filter(value => {
      return value.name === this.updateCategoryF.value.categoryName;
    });
    console.log(exist);
    if (exist.length === 0) {
      this.carService
        .updateCategory(this.updateCategoryF.value.category)
        .subscribe(res => {
          this.categories = this.categories.filter(value => {
            return value.id !== this.updateCategoryF.value.category.id;
          });

          this.categories = [
            ...this.categories,
            new SearchItem(
              this.updateCategoryF.value.categoryName,
              this.updateCategoryF.value.category.id
            )
          ];
          this.toast.success("Naziv kategorije promenjen");
        },
        err => {
          this.toast.error('Greška, kategorija nije promenjena');
        });
    } else {
      this.toast.error("Kategorija sa unetim nazivom postoji");
    }
  }

  addCategory() {
    const exist = this.categories.filter(value => {
      return value.name === this.updateCategoryF.value.categoryName;
    });
    if (exist.length === 0) {
      this.carService.createCategory(this.updateCategoryF.value.categoryName).subscribe(res => {
        this.removeCategoryF.reset();
        this.updateCategoryF.reset();
        this.categories = [...this.categories, new SearchItem(res.category_name, res.id)];
      }, 
      err => {
        this.toast.error('Greška, kategorija nije dodata');
      })
    } else {
      this.toast.error("Kategorija sa unetim nazivom postoji");
    }
  }
}
