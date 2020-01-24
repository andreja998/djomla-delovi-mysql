import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SearchItem, Part } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType, HttpEvent, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.scss']
})
export class AddPartComponent implements OnInit {
  partF: FormGroup;
  fileArr = [];
  fileObj = [];
  imgForm: FormGroup;
  msg: string;
  progress: number = 0;
  removeUrls: string[] = [];

  subCategories: SearchItem[];
  categories: SearchItem[];
  marks: SearchItem[];
  models: SearchItem[];

  searchText: string = '';

  part: Part = new Part();
  pager = {};
  parts: Part[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toast: ToastrService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.partF = this.formBuilder.group({
      partName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      markG: new FormGroup({
        mark: new FormControl(null, [Validators.required]),
        model: new FormControl(null, [Validators.required])
      }),
      categoryG: new FormGroup({
        category: new FormControl(null, [Validators.required]),
        subCategory: new FormControl(null, [Validators.required])
      })
    });
    this.imgForm = this.formBuilder.group({
      avatar: [null]
    });
    this.carService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.carService.getMarks().subscribe(res => {
      this.marks = res;
    });
    // this.onCategoryChange();
  }

  onMarkChange(value: any) {
    console.log('MODELLIIIEIEIIE');
    if (this.part.mark) {
      this.carService.getModels(value.id).subscribe(models => {
        this.models = models;
        console.log(models);
        this.part.model = null;
      });
    }
  }

  onCategoryChange(value: any) {
    if (this.part.category) {
      console.log(value);
      this.carService.getSubCategories(value.id).subscribe(subCategories => {
        this.subCategories = subCategories;
        this.part.subCategory = null;
      });
    }
  }

  loadPage(page) {
    // get page of items from api
    console.log('asdasdasd');
    this.carService.getPartsByName(this.searchText, page).subscribe(
      res => {
        console.log('fffff');
        if (res['parts'].length !== 0) {
          this.pager = res['pager'];
          this.parts = res['parts'];
        } else {
          console.log('Nema nista');
          this.parts = [];
          this.pager = {};
        }
      },
      err => {}
    );
  }

  onPartClick(id: number) {
    this.carService.getPart(id).subscribe(res => {
      this.part = res;
      this.updateForm();
      this.progress = 0;
      this.fileArr = [];
      this.fileObj = [];
      this.parts = [];
      this.pager = {};
      this.carService.getImagesById(this.part.id).subscribe(images => {
        images.forEach(img => {
          this.fileArr.push({ item: undefined, url: img['url'], remove: false, destination: img['destination'] });
        });
      });
      console.log(this.part);

      const el = document.getElementById('search-content');
      el.setAttribute('style', 'display: none');
    });
  }

  loadImagesById() {
    this.carService.getImagesById(this.part.id).subscribe(images => {
      images.forEach(img => {
        this.fileArr.push({ item: undefined, url: img['url'], remove: false, destination: img['destination'] });
      });
    });
  }

  onSearch() {
    this.loadPage(1);
    const el = document.getElementById('search-content');
    el.setAttribute('style', 'display: block');
  }

  serializeItems(items: Array<any>): Part[] {
    const parts: Part[] = [];
    items.forEach(element => {
      const part = new Part(
        element['PART_ID'],
        element['PART_NAME'],
        element['PART_DESC'],
        element['PART_PRICE'],
        new SearchItem(element['MAKER_NAME'], element['MAKER_ID']),
        new SearchItem(element['MODEL_NAME'], element['MODEL_ID']),
        new SearchItem(element['CATEGORY_NAME'], element['CATEGORY_ID']),
        new SearchItem(element['SUBCATEGORY_NAME'], element['SUBCATEGORY_ID'])
      );
      parts.push(part);
    });

    return parts;
  }

  updateForm() {
    this.models = [];
    this.subCategories = [];
    this.partF.get('partName').patchValue(this.part.name);
    this.partF.get('description').patchValue(this.part.description);
    this.partF.get('price').patchValue(this.part.price);
    if (this.part.mark) {
      this.carService.getModels(this.part.mark.id).subscribe(models => {
        this.models = models;
      });
    }
    if (this.part.category) {
      this.carService.getSubCategories(this.part.category.id).subscribe(subCategories => {
        this.subCategories = subCategories;
      });
    }
  }

  resetForm() {
    this.partF.reset();
    this.part.id = null;
    this.carService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.carService.getMarks().subscribe(marks => {
        this.marks = marks;
      });
    });
  }

  prepare(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = e as HTMLInputElement;
      const url = URL.createObjectURL(file[i]);
      this.fileArr.push({ item, url: url, remove: false, destination: null });
    });

    this.fileArr.forEach(item => {
      this.fileObj.push(item.item);
    });

    // Set files form control
    this.imgForm.patchValue({
      avatar: this.fileObj
    });

    console.log(this.fileObj);
    console.log(this.fileArr);

    this.imgForm.get('avatar').updateValueAndValidity();
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  updatePart() {
    this.carService.updatePart(this.part).subscribe(
      part => {
        this.part = part;
        this.updateImages(this.part.id);
        this.toast.success('Deo promenjen');
      },
      err => {
        this.toast.error('Deo nije promenjen');
      }
    );
  }

  removePart() {
    this.carService.removePart(this.part.id).subscribe(
      res => {
        this.toast.success('Deo je uklonjen');

        this.prepareRemovalImages();
        console.log(this.removeUrls);
        this.carService.removeImages(this.removeUrls).subscribe(
          res => {
            this.progress = 0;
            this.fileArr = [];
            this.fileObj = [];
            this.part.id = null;
            this.partF.reset();
            this.toast.success('Slike uklonjene');
          },
          err => {
            console.log(err);
            this.toast.error('Slike nisu uklonjene');
          }
        );
      },
      err => {
        this.toast.error('Deo nije uklonjen');
      }
    );
  }

  createPart() {
    this.carService.createPart(this.part).subscribe(res => {
      this.toast.success('Deo je dodat');
      this.updateImages(this.part.id);
    });
    console.log(this.part);

    console.log(this.part);
  }

  closeSearch() {
    const el = document.getElementById('search-content');
    el.setAttribute('style', 'display: none');
  }

  prepareRemovalImages() {
    this.fileArr.forEach(file => {
      if (file['item'] === undefined) {
        // remove image url that are pulled from the backend
        this.removeUrls.push(file['destination']);
      }
    });
  }

  updateImages(partId: number) {
    this.removeUrls = [];
    this.fileObj = [];
    this.fileArr.forEach(file => {
      if (file['remove'] === true && file['item'] === undefined) {
        // remove image url that are pulled from the backend
        this.removeUrls.push(file['destination']);
      } else if (file['item'] && file['remove'] === false) {
        // if file exists and is not removable, it means it is dragged and ready to upload
        // otherwise it means it is removable
        console.log('Ima');
        this.fileObj.push(file['item']);
      }
    });

    console.log(this.removeUrls);

    this.imgForm.patchValue({
      avatar: this.fileObj
    });

    if (this.removeUrls.length !== 0) {
      this.carService.removeImages(this.removeUrls).subscribe(
        res => {
          this.toast.success('Slike su uklonjene');
        },
        err => {
          this.toast.error('Slike nisu uklonjene');
        }
      );
    }

    if (this.fileObj.length !== 0) {
      this.carService.addFiles(this.imgForm.value.avatar, this.part.id).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            this.toast.success('Slike su dodate');
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              // Mozes da uklonis ovo, samo je prikaz slika ponovo
              this.carService.getImagesById(this.part.id).subscribe(images => {
                images.forEach(img => {
                  this.fileArr.push({ item: undefined, url: img['url'], remove: false, destination: img['destination'] });
                });
              });
              this.msg = 'File uploaded successfully!';
            }, 3000);
        }
      });
    }
  }

  removeImage(i) {
    this.fileArr[i]['remove'] = !this.fileArr[i]['remove'];
  }
}
