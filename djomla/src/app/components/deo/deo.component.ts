import { Component, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Part } from 'src/app/utils';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, INgxGalleryOptions, NgxGalleryComponent, INgxGalleryImage } from 'ngx-gallery';
import Swiper from 'swiper';

@Component({
  selector: 'app-deo',
  templateUrl: './deo.component.html',
  styleUrls: ['./deo.component.scss']
})
export class DeoComponent implements OnInit, OnChanges, AfterViewInit {
  private part: Part = new Part(null, null, null, null, null, null, null, null, null);
  private images: string[] = [];
  private ngxImages = [];
  @ViewChild('ngxgallery', { static: true }) gallery: NgxGalleryComponent;
  public galleryOptions: INgxGalleryOptions[] = [
    {
      image: false,
      thumbnails: false,
      width: '100%',
      height: '0px',
      previewCloseOnClick: true,
      previewCloseOnEsc: true,
      previewDownload: true,
      previewFullscreen: true,
      previewKeyboardNavigation: true,
      previewSwipe: true,
      previewZoom: true
    }
  ];

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.carService.getPart(params['partId']).subscribe(part => {
        this.part = part;

        this.carService.getImagesById(part.id).subscribe(images => {
          images.forEach(img => {
            this.images.push(img['url']);

            this.ngxImages.push({ big: img['url'], small: img['url'] });
          });

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

  imageClick(index: number) {
    this.gallery.openPreview(index);
  }

  swiperInit() {
    let galleryTop = new Swiper('.gallery-top', {
      zoom: true,

      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      observer: true,
      observeParents: true
    });
    let galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
  }
}
