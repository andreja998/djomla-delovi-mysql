import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchItem, Part } from "../utils";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(private http: HttpClient) {}

  getMarks(): Observable<SearchItem[]> {
    return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        console.log(res["data"].length);
        const marks: SearchItem[] = [];
        marks.push(new SearchItem("Opel"));
        marks.push(new SearchItem("BMW"));

        return marks;
      })
    );
  }

  getModels(mark: string): Observable<SearchItem[]> {
    return this.http.get("https://reqres.in/api/users?page=1", {}).pipe(
      map((res: Response) => {
        const models: SearchItem[] = [];
        if (mark === "Opel") {
          models.push(new SearchItem("Astra"));
          models.push(new SearchItem("Corsa"));
        } else {
          models.push(new SearchItem("320 D"));
          models.push(new SearchItem("318 D"));
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
                i.toString(),
                i.toString(),
                "hbxcmvxmcbvxcv",
                "4299 din",
                "Opel",
                "Corsa",
                "Kat1",
                ["sub1", "sub2"]
              )
            );
          }

          return parts;
        })
      );
  }

  getPartsByModel(
    model: string,
    mark: string,
    category?: string,
    subCat?: string
  ): Observable<Part[]> {
    let jsonToSend = { mark, model, category, subCat };
    console.log(jsonToSend);
    return this.http
      .post("https://reqres.in/api/users?page=2", jsonToSend)
      .pipe(
        map((res: Response) => {
          const parts: Part[] = [];
          for (let i = 0; i < 5000; i++) {
            parts.push(
              new Part(
                i.toString(),
                i.toString(),
                "asdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfsasdasdssdsdfsdfs",
                "1550 din",
                "Opel",
                "Astra",
                "Kat1",
                ["sub1", "sub2"]
              )
            );
          }

          return parts;
        })
      );
  }

  getPart(partId: number): Observable<Object> {
    let part = {};

    return of(part);
  }

  getCategories(model?: string, mark?: string): Observable<SearchItem[]> {
    return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        const categories: SearchItem[] = [];
        for (let i = 0; i < 20; i++) {
          categories.push(new SearchItem("Kategorija " + i));
        }

        return categories;
      })
    );
  }

  getSubCategories(category?: string): Observable<SearchItem[]> {
    return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        const categories: SearchItem[] = [];
        for (let i = 16; i < 31; i++) {
          categories.push(new SearchItem("Potkategorija " + i));
        }

        return categories;
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
}
