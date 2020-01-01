import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SearchItem } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {
  chooseMark: FormGroup;
  addModelF: FormGroup;
  removeModelF: FormGroup;
  updateModelF: FormGroup;
  models: SearchItem[];
  marks: SearchItem[];

  constructor(private formBuilder: FormBuilder, private carService: CarService, private toast: ToastrService) {}

  ngOnInit() {
    this.chooseMark = this.formBuilder.group({
      mark: [null, [Validators.required]]
    });
    this.addModelF = this.formBuilder.group({
      modelName: [null, [Validators.required]]
    });
    this.removeModelF = this.formBuilder.group({
      model: [null, [Validators.required]]
    });
    this.updateModelF = this.formBuilder.group({
      model: [null, [Validators.required]],
      modelName: [null, [Validators.required]]
    });
    this.carService.getMarks().subscribe(res => {
      this.marks = res;
    });

    this.onMarkChange();
  }

  onMarkChange(): void {
    this.chooseMark.get('mark').valueChanges.subscribe(res => {
      if (this.chooseMark.get('mark').value) {
        this.carService.getModels(res.id).subscribe(models => {
          this.models = models;
          this.removeModelF.reset();
          this.updateModelF.reset();
          console.log(models);
        });
      }
    });
  }

  removeModel() {
    this.carService.removeModel(this.removeModelF.value.model.id, this.chooseMark.value.mark.id).subscribe(
      res => {
        this.models = this.models.filter(value => {
          return value.id !== this.removeModelF.value.model.id;
        });
        this.removeModelF.reset();
        this.updateModelF.reset();

        this.toast.success('Model uspešno uklonjen');
      },
      err => {
        this.toast.error('Greška, model nije uklonjen');
      }
    );
  }

  updateModel() {
    const exist = this.models.filter(value => {
      return value.name === this.updateModelF.value.modelName;
    });
    console.log(exist);
    if (exist.length === 0) {
      this.carService.updateModel(this.chooseMark.value.mark as SearchItem, this.updateModelF.value.modelName).subscribe(
        res => {
          const updated = this.models.filter(value => {
            return value.name !== this.updateModelF.value.model.name;
          });
          this.models = [...updated, new SearchItem(this.updateModelF.value.modelName, this.updateModelF.value.model.id)];
          this.updateModelF.reset();
          this.removeModelF.reset();
          this.toast.success('Naziv modela promenjen');
        },
        err => {
          this.toast.error('Greška, model nije promenjen');
        }
      );
    } else {
      this.toast.error('Model sa unetim nazivom postoji');
    }
  }

  addModel() {
    const exist = this.models.filter(value => {
      return value.name === this.addModelF.value.modelName;
    });
    if (exist.length === 0) {
      this.carService.createModel(this.addModelF.value.modelName, this.chooseMark.value.mark as SearchItem).subscribe(
        res => {
          this.removeModelF.reset();
          this.updateModelF.reset();
          this.models = [...this.models, res];
          this.toast.success('Model uspešno dodat');
        },
        err => {
          this.toast.error('Greška, model nije dodat');
        }
      );
    } else {
      this.toast.error('Model sa unetim nazivom postoji');
    }
  }
}
