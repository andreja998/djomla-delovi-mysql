export class SearchItem {
  constructor(public name?: string) {}
}

export class Part {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private price: string,
    private mark: string,
    private model: string,
    private category: string,
    private subCategories: string[]
  ) {}
}

export enum SearchMode {
  SIMPLE = 'simple',
  DETAILED = 'detailed'
}
