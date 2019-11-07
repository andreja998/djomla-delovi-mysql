import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  public selectedCategory: string = null;
  public selectedModel: string = null;
  public selectedMark: string = null;
  public selectedSubCategory: string = null;

  constructor() { }
}
