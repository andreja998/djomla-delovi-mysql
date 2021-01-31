import { Injectable } from '@angular/core';
import { SearchItem } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  public selectedCategory: number;
  public selectedModel: number;
  public selectedMark: number;
  public selectedSubCategory: number;

  constructor() { }
}
