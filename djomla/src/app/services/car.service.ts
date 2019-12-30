import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchItem, Part } from "../utils";

@Injectable({
  providedIn: "root"
})
export class CarService {
  public currentPage: Observable<number>;
  public name: string;
  constructor(private http: HttpClient) {}

  getMarks(): Observable<SearchItem[]> {
    return this.http.get("http://localhost:3000/api/maker", {}).pipe(
      map((res: Array<any>) => {
        console.log(res);

        const marks: SearchItem[] = [];
        marks.push(new SearchItem("Opel", 1));
        marks.push(new SearchItem("BMW", 2));

        return marks;
      })
    );
  }

  getModels(markId: number): Observable<SearchItem[]> {
    const obj = {};
    obj["maker_id"] = markId;
    return this.http.get("https://reqres.in/api/users?page=1", {}).pipe(
      map((res: Response) => {
        const models: SearchItem[] = [];
        if (markId === 1) {
          models.push(new SearchItem("Astra", 1));
          models.push(new SearchItem("Corsa", 2));
        } else {
          models.push(new SearchItem("320 D", 3));
          models.push(new SearchItem("318 D", 4));
        }

        return models;
      })
    );
  }

  getPartsByCategory(category: string, subCat: string) {
    let jsonToSend = { category, subCat };
    console.log(jsonToSend);
    return this.http
      .post("https://reqres.in/api/users?page=2", jsonToSend)
      .pipe(
        map((res: Response) => {
          const parts: Part[] = [];
          for (let i = 11; i < 30; i++) {
            parts.push(
              new Part(
                i,
                i.toString(),
                "Podnaslov - Stavka, Nesto, Svasta, Primer, Teksta Koji Moze Da Stoji Ovde",
                "hbxcmvxmcbvxcv",
                "4299 din",
                "Opel",
                "Corsa",
                "Kat1",
                "Sub" + i.toString()
              )
            );
          }

          return parts;
        })
      );
  }

  getPartsByModel(
    modelId: number,
    markId: number,
    categoryId?: number,
    subCatId?: number,
    fromNumber?: number,
    sizeNumber?: number
  ): Observable<Part[]> {
    let jsonToSend = {};
    let queryToCall = 0;
    if (markId != undefined) {
      jsonToSend["maker_id"] = markId;
      queryToCall++;
    }
    if (modelId != undefined) {
      jsonToSend["model_id"] = modelId;
      queryToCall++;
    }
    if (categoryId != undefined) {
      jsonToSend["category_id"] = categoryId;
      queryToCall++;
    }
    if (subCatId != undefined) {
      jsonToSend["subcategory_id"] = subCatId;
      queryToCall++;
    }

    console.log(jsonToSend);
    return this.http
      .post("https://reqres.in/api/users?page=2", jsonToSend)
      .pipe(
        map((res: Response) => {
          const parts: Part[] = [];
          for (let i = 0; i < 5000; i++) {
            parts.push(
              new Part(
                i,
                "Delovi za BMW Serija 3" + i.toString(),
                "Podnaslov - Stavka, Nesto, Svasta, Primer, Teksta Koji Moze Da Stoji Ovde",
                "asdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfs",
                "1550 din",
                "Opel",
                "Astra",
                "Kat1",
                "Sub" + i.toString()
              )
            );
          }

          return parts;
        })
      );
  }

  getPart(partId: number): Observable<Part> {
    return this.http
      .post("https://reqres.in/api/users?page=2", { part_id: partId })
      .pipe(
        map((res: Response) => {
          let part = new Part(
            1,
            "Moj Deo Ovde Naslov",
            "Podnaslov - Stavka, Nesto, Svasta, Primer, Teksta Koji Moze Da Stoji Ovde",
            "asdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfs",
            "1550 din",
            "Opel",
            "Astra",
            "Kat1",
            "Sub"
          );
          return part;
        })
      );
  }

  getCategories(): Observable<SearchItem[]> {
    return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        const categories: SearchItem[] = [];
        for (let i = 0; i < 20; i++) {
          categories.push(new SearchItem("Kategorija " + i, i));
        }

        return categories;
      })
    );
  }

  updateCategory(category: SearchItem) {
    return this.http
      .post("https://reqres.in/api/users?page=2", {
        category_id: category.id,
        new_name: category.name
      })
      .pipe(map(res => {}));
  }

  removeCategory(id: number): Observable<string> {
    return this.http
      .post("https://reqres.in/api/users?page=2", { category_id: id })
      .pipe(
        map(
          res => {
            res = "Uspesno dodato";
            return res.toString();
          },
          err => {}
        )
      );
  }

  getSubCategories(categoryId: number): Observable<SearchItem[]> {
    return this.http
      .post("https://reqres.in/api/users?page=2", { category_id: categoryId })
      .pipe(
        map((res: Response) => {
          const categories: SearchItem[] = [];
          for (let i = 16; i < 31; i++) {
            categories.push(new SearchItem("Potkategorija " + i, i));
          }

          return categories;
        })
      );
  }

  updateSubCategory(
    category: SearchItem,
    subCategory: SearchItem
  ): Observable<any> {
    return this.http
      .post("https://reqres.in/api/users?page=2", {
        category_id: category.id,
        subcategory_id: subCategory.id,
        subcategory_name: subCategory.name
      })
      .pipe(map((res: Response) => {}));
  }

  createSubCategory(subCategoryName: string, category: SearchItem): Observable<SearchItem> {
    return this.http.post("https://reqres.in/api/users?page=2", { subcategory_name: subCategoryName, category_id: category.id }).
    pipe(map((res: Response) => {
      console.log(res);
      
      const subCategory = new SearchItem('ime', 213);
      return subCategory;
    }));
  }

  getImagesById(partId: number): Observable<string[]> {
    return this.http
      .post("https://reqres.in/api/users?page=2", { part_id: partId })
      .pipe(
        map((res: Response) => {
          const images = [];
          for (let i = 0; i < 5; i++) {
            images.push("assets/images/Pocetna.png");
          }

          return images;
        })
      );
  }

  createPart(part: Object): Observable<any> {
    return of(undefined);
  }

  removePart(partId: number): Observable<any> {
    return of(undefined);
  }

  updatePart(part: Object): Observable<any> {
    return of(part);
  }

  createModel(modelId: number): Observable<any> {
    return of(undefined);
  }

  removeModel(modelId: number, markId: number): Observable<any> {
    return of(undefined);
  }

  createMark(name: string): Observable<any> {
    return of(undefined);
  }

  createCategory(name: string): Observable<any> {
    return of(undefined);
  }
}
