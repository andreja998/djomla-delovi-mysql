export class SearchItem {
  constructor(public name?: string, public id?: number) {}
}

export class Part {
  constructor(
    public id: number,
    public name: string,
    public subTitle: string,
    public description: string,
    public price: string,
    public mark: string,
    public model: string,
    public category: string,
    public subCategory: string,
    public imgUrl?: string
  ) {}
}

export enum SearchMode {
  SIMPLE = 'simple',
  DETAILED = 'detailed'
}
