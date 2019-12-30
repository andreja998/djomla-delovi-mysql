import { Component, OnInit, OnChanges, AfterViewInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { ActivatedRoute } from "@angular/router";
import { Part } from "src/app/utils";
import Swiper from 'swiper';

@Component({
  selector: "app-deo",
  templateUrl: "./deo.component.html",
  styleUrls: ["./deo.component.scss"]
})
export class DeoComponent implements OnInit, OnChanges, AfterViewInit {
  private part: Part;
  private images: string[];

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.carService.getPart(params["partId"]).subscribe(part => {
        this.part = part;
        this.carService.getImagesById(part.id).subscribe(images => {
          this.images = images;
          
          console.log(images);
        });
      });
    });
  }

  ngOnChanges() {
    // this.swiperInit();
  }

  ngAfterViewInit() {
    this.swiperInit();
  }

  swiperInit() {
    let galleryTop = new Swiper(".gallery-top", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      observer: true,
      observeParents: true
    });
    let galleryThumbs = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: "auto",
      touchRatio: 0.2,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
  }
  
}
