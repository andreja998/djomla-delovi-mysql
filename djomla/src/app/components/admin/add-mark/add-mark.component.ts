import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SearchItem } from 'src/app/utils';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrls: ['./add-mark.component.scss']
})
export class AddMarkComponent implements OnInit {
  addMarkF: FormGroup;
  removeMarkF: FormGroup;
  updateMarkF: FormGroup;
  marks: SearchItem[];

  constructor(private formBuilder: FormBuilder, private carService: CarService, private toast: ToastrService) {}

  ngOnInit() {
    this.addMarkF = this.formBuilder.group({
      markName: [null, [Validators.required]]
    });
    this.removeMarkF = this.formBuilder.group({
      mark: [null, [Validators.required]]
    });
    this.updateMarkF = this.formBuilder.group({
      mark: [null, [Validators.required]],
      markName: [null, [Validators.required]]
    });
    this.carService.getMarks().subscribe(res => {
      this.marks = res;
    });
  }

  removeMark() {
    this.carService.removeMark(this.removeMarkF.value.mark.id).subscribe(
      res => {
        this.marks = this.marks.filter(value => {
          return value.id !== this.removeMarkF.value.mark.id;
        });
        this.removeMarkF.reset();
        this.updateMarkF.reset();

        this.toast.success('Marka uspešno uklonjena');
      },
      err => {
        this.toast.error('Greška, marka nije uklonjena');
      }
    );
  }

  updateMark() {
    const exist = this.marks.filter(value => {
      return value.name === this.updateMarkF.value.markName;
    });
    console.log(exist);
    if (exist.length === 0) {
      this.carService.updateMark(this.updateMarkF.value.mark.id, this.updateMarkF.value.markName).subscribe(
        res => {
          const updated = this.marks.filter(value => {
            return value.name !== this.updateMarkF.value.mark.name;
          });
          this.marks = [...updated, res];
          this.updateMarkF.reset();
          this.removeMarkF.reset();
          this.toast.success('Naziv marke promenjen');
        },
        err => {
          this.toast.error('Greška, naziv marke nije promenjen');
        }
      );
    } else {
      this.toast.error('Marka sa unetim nazivom postoji');
    }
  }

  addMark() {
    const exist = this.marks.filter(value => {
      return value.name === this.addMarkF.value.markName;
    });
    if (exist.length === 0) {
      this.carService.createMark(this.addMarkF.value.markName).subscribe(
        res => {
          this.removeMarkF.reset();
          this.updateMarkF.reset();
          this.marks = [...this.marks, res];
        },
        err => {
          this.toast.error('Greška, marka nije dodata');
        }
      );
    } else {
      this.toast.error('Marka sa unetim nazivom postoji');
    }
  }
}
