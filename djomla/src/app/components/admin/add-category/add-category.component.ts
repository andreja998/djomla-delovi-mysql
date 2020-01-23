import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { SearchItem } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCategoryF: FormGroup;
  removeCategoryF: FormGroup;
  updateCategoryF: FormGroup;
  categories: SearchItem[];

  constructor(private formBuilder: FormBuilder, private carService: CarService, private toast: ToastrService) {}

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
    console.log(this.removeCategoryF.value.category.id);
    this.carService.removeCategory(this.removeCategoryF.value.category.id).subscribe(
      res => {
        this.categories = this.categories.filter((value, index, array) => {
          return value.id !== this.removeCategoryF.value.category.id;
        });
        this.removeCategoryF.reset();
        this.updateCategoryF.reset();

        this.toast.success('Kategorija uspešno uklonjena');
      },
      err => {
        this.toast.error('Greška, kategorija nije uklonjena');
      }
    );
  }

  updateCategory() {
    const exist = this.categories.filter(value => {
      return value.name === this.updateCategoryF.value.categoryName;
    });
    console.log(this.updateCategoryF.value.category);
    if (exist.length === 0) {
      this.carService.updateCategory(new SearchItem(this.updateCategoryF.value.categoryName, this.updateCategoryF.value.category.id)).subscribe(
        res => {
          this.categories = this.categories.filter(value => {
            return value.id !== this.updateCategoryF.value.category.id;
          });

          this.categories = [...this.categories, new SearchItem(this.updateCategoryF.value.categoryName, this.updateCategoryF.value.category.id)];
          this.toast.success('Naziv kategorije promenjen');
        },
        err => {
          this.toast.error('Greška, kategorija nije promenjena');
        }
      );
    } else {
      this.toast.error('Kategorija sa unetim nazivom postoji');
    }
  }

  addCategory() {
    const exist = this.categories.filter(value => {
      return value.name === this.addCategoryF.value.category;
    });
    if (exist.length === 0) {
      console.log(this.addCategoryF.value.category);
      this.carService.createCategory(this.addCategoryF.value.category).subscribe(
        res => {
          this.removeCategoryF.reset();
          this.updateCategoryF.reset();
          this.categories = [...this.categories, res];
          this.toast.success('Kategorija uspešno dodata');
        },
        err => {
          this.toast.error('Greška, kategorija nije dodata');
        }
      );
    } else {
      this.toast.error('Kategorija sa unetim nazivom postoji');
    }
  }
}
