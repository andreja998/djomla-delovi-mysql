import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SearchItem } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {
  chooseCategory: FormGroup;
  addSubCategoryF: FormGroup;
  removeSubCategoryF: FormGroup;
  updateSubCategoryF: FormGroup;
  subCategories: SearchItem[];
  categories: SearchItem[];

  constructor(private formBuilder: FormBuilder, private carService: CarService, private toast: ToastrService) {}

  ngOnInit() {
    this.chooseCategory = this.formBuilder.group({
      category: [null, [Validators.required]]
    });
    this.addSubCategoryF = this.formBuilder.group({
      subCategoryName: [null, [Validators.required]]
    });
    this.removeSubCategoryF = this.formBuilder.group({
      subCategory: [null, [Validators.required]]
    });
    this.updateSubCategoryF = this.formBuilder.group({
      subCategory: [null, [Validators.required]],
      subCategoryName: [null, [Validators.required]]
    });
    this.carService.getCategories().subscribe(res => {
      this.categories = res;
    });

    this.onCategoryChange();
  }

  onCategoryChange(): void {
    this.chooseCategory.get('category').valueChanges.subscribe(res => {
      if (this.chooseCategory.get('category').value) {
        this.carService.getSubCategories(res.id).subscribe(subcategories => {
          this.subCategories = subcategories;
          this.removeSubCategoryF.reset();
          this.updateSubCategoryF.reset();
          console.log(subcategories);
        });
      }
    });
  }

  removeSubCategory() {
    console.log(this.removeSubCategoryF.value.subCategory.id);
    this.carService.removeSubCategory(this.removeSubCategoryF.value.subCategory.id).subscribe(
      res => {
        this.subCategories = this.subCategories.filter((value, index, array) => {
          return value.id !== this.removeSubCategoryF.value.subCategory.id;
        });
        this.removeSubCategoryF.reset();
        this.updateSubCategoryF.reset();

        this.toast.success('Potkategorija uspešno uklonjena');
      },
      err => {
        this.toast.error('Greška, potkategorija nije uklonjena');
      }
    );
  }

  updateSubCategory() {
    const exist = this.subCategories.filter(value => {
      return value.name === this.updateSubCategoryF.value.subCategoryName;
    });
    console.log(exist);
    if (exist.length === 0) {
      this.carService
        .updateSubCategory(
          this.chooseCategory.value.category as SearchItem,
          new SearchItem(this.updateSubCategoryF.value.subCategoryName, this.updateSubCategoryF.value.subCategory.id)
        )
        .subscribe(
          res => {
            const updated = this.subCategories.filter(value => {
              return value.name !== this.updateSubCategoryF.value.subCategory.name;
            });
            this.subCategories = [...updated, new SearchItem(this.updateSubCategoryF.value.subCategoryName, this.updateSubCategoryF.value.subCategory.id)];
            this.updateSubCategoryF.reset();
            this.removeSubCategoryF.reset();
            this.toast.success('Naziv potkategorije promenjen');
          },
          err => {
            this.toast.error('Greška, potkategorija nije promenjena');
          }
        );
    } else {
      this.toast.error('Potkategorija sa unetim nazivom postoji');
    }
  }

  addSubCategory() {
    const exist = this.subCategories.filter(value => {
      return value.name === this.addSubCategoryF.value.subCategoryName;
    });
    if (exist.length === 0) {
      this.carService.createSubCategory(this.addSubCategoryF.value.subCategoryName, this.chooseCategory.value.category as SearchItem).subscribe(
        res => {
          this.removeSubCategoryF.reset();
          this.updateSubCategoryF.reset();
          this.subCategories = [...this.subCategories, res];
          this.toast.success('Potkategorija uspešno dodata');
        },
        err => {
          this.toast.error('Greška, kategorija nije dodata');
        }
      );
    } else {
      this.toast.error('Potkategorija sa unetim nazivom postoji');
    }
  }
}
