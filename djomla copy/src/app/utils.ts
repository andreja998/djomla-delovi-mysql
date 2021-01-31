export class SearchItem {
  constructor(public name?: string, public id?: number) {}
}

export class Part {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: string,
    public mark?: SearchItem,
    public model?: SearchItem,
    public category?: SearchItem,
    public subCategory?: SearchItem,
    public imgUrl?: string
  ) {}
}

export enum SearchMode {
  SIMPLE = 'simple',
  DETAILED = 'detailed'
}
