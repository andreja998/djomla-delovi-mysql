import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SearchItem, Part } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public currentPage: Observable<number>;
  public name: string;
  private baseUrl = 'https://prodajaautodelova.rs/services/';

  constructor(private http: HttpClient) {}

  getMarks(): Observable<SearchItem[]> {
    return this.http.get(this.baseUrl + 'api/maker', {}).pipe(
      map((res: any) => {
        console.log(res);
        const marks: SearchItem[] = [];
        res.forEach(element => {
          marks.push(new SearchItem(element['MAKER_NAME'], element['MAKER_ID']));
        });

        return marks;
      })
    );
  }

  getModels(markId: number): Observable<SearchItem[]> {
    return this.http.post(this.baseUrl + 'api/model/getAllModels', { maker_id: markId }).pipe(
      map((res: any) => {
        const models: SearchItem[] = [];
        console.log(res);
        res.forEach(element => {
          models.push(new SearchItem(element['MODEL_NAME'], element['MODEL_ID']));
        });

        return models;
      })
    );
  }

  getPartsByModel(modelId: number, markId: number, categoryId?: number, subCatId?: number, pageNumber?: number): Observable<Object> {
    let queryToCall = 0;
    if (markId !== undefined && modelId !== undefined && categoryId !== undefined && subCatId !== undefined) {
      queryToCall = 3;
    } else if (markId !== undefined && modelId !== undefined && categoryId !== undefined && subCatId === undefined) {
      queryToCall = 2;
    } else if (markId !== undefined && modelId !== undefined && categoryId === undefined && subCatId === undefined) {
      queryToCall = 1;
    } else {
      queryToCall = 4;
    }
    const json = {
      category_id: categoryId,
      subcategory_id: subCatId,
      maker_id: markId,
      model_id: modelId,
      option: queryToCall
    };
    console.log(queryToCall);
    console.log(json);
    return this.http.post(this.baseUrl + 'api/other/getAllPArts?page=' + pageNumber, json).pipe(
      map(res => {
        console.log(res);

        const newParts: Part[] = [];
        res['pageOfItems'].forEach(element => {
          const part = new Part(
            element['PART_ID'],
            element['PART_NAME'],
            element['PART_DESC'],
            element['PART_PRICE'],
            new SearchItem(element['MAKER_NAME'], element['MAKER_ID']),
            new SearchItem(element['MODEL_NAME'], element['MODEL_ID']),
            new SearchItem(element['CATEGORY_NAME'], element['CATEGORY_ID']),
            new SearchItem(element['SUBCATEGORY_NAME'], element['SUBCATEGORY_ID']),
            this.baseUrl + element['PICTURE_NAME']
          );
          newParts.push(part);
        });

        return { pager: res['pager'], parts: newParts };
      })
    );
  }

  getPartsByName(searchName: string, pageNumber: number): Observable<Object> {
    console.log({ search_name: searchName, page: pageNumber });
    return this.http.post(this.baseUrl + 'api/other/getPartsByName', { search_name: searchName, page: pageNumber }).pipe(
      map(res => {
        const newParts: Part[] = [];
        if (res['pageOfItems']) {
          res['pageOfItems'].forEach(element => {
            const part = new Part(
              element['PART_ID'],
              element['PART_NAME'],
              element['PART_DESC'],
              element['PART_PRICE'],
              new SearchItem(element['MAKER_NAME'], element['MAKER_ID']),
              new SearchItem(element['MODEL_NAME'], element['MODEL_ID']),
              new SearchItem(element['CATEGORY_NAME'], element['CATEGORY_ID']),
              new SearchItem(element['SUBCATEGORY_NAME'], element['SUBCATEGORY_ID'])
            );
            newParts.push(part);
          });
        }
        console.log(res['pager']);
        console.log(res['pageOfItems']);
        return { pager: res['pager'], parts: newParts };
      })
    );
  }

  getPart(partId: number): Observable<Part> {
    return this.http.post(this.baseUrl + 'api/other/getOnePart', { part_id: partId }).pipe(
      map(res => {
        console.log(res);
        const part = new Part(
          res[0]['PART_ID'],
          res[0]['PART_NAME'],
          res[0]['PART_DESC'],
          res[0]['PART_PRICE'],
          new SearchItem(res[0]['MAKER_NAME'], res[0]['MAKER_ID']),
          new SearchItem(res[0]['MODEL_NAME'], res[0]['MODEL_ID']),
          new SearchItem(res[0]['CATEGORY_NAME'], res[0]['CATEGORY_ID']),
          new SearchItem(res[0]['SUBCATEGORY_NAME'], res[0]['SUBCATEGORY_ID'])
        );

        console.log(part);
        return part;
      })
    );
  }

  getCategories(): Observable<SearchItem[]> {
    return this.http.get(this.baseUrl + 'api/category', {}).pipe(
      map((res: any) => {
        console.log(res);
        const categories: SearchItem[] = [];
        res.forEach(element => {
          categories.push(new SearchItem(element['CATEGORY_NAME'], element['CATEGORY_ID']));
        });

        return categories;
      })
    );
  }

  updateCategory(category: SearchItem): Observable<any> {
    return this.http.put(this.baseUrl + 'api/category', { category_id: category.id, category_name: category.name }).pipe(
      map(res => {
        console.log(res);
        return;
      })
    );
  }

  removeCategory(id: number): Observable<any> {
    return this.http.post(this.baseUrl + 'api/category/remove', { category_id: id }).pipe(
      map(res => {
        return;
      })
    );
  }

  getSubCategories(categoryId: number): Observable<SearchItem[]> {
    return this.http.post(this.baseUrl + 'api/subcategory/getAllSubcategories', { category_id: categoryId }).pipe(
      map((res: any) => {
        const categories: SearchItem[] = [];
        console.log(res);
        res.forEach(element => {
          categories.push(new SearchItem(element['SUBCATEGORY_NAME'], element['SUBCATEGORY_ID']));
        });

        return categories;
      })
    );
  }

  updateSubCategory(category: SearchItem, subCategory: SearchItem): Observable<any> {
    console.log(subCategory);
    return this.http
      .put(this.baseUrl + 'api/subcategory', {
        category_id: category.id,
        subcategory_id: subCategory.id,
        subcategory_name: subCategory.name
      })
      .pipe(map((res: Response) => {}));
  }

  removeSubCategory(id: number): Observable<any> {
    return this.http.post(this.baseUrl + 'subcategory/remove', { subcategory_id: id }).pipe(
      map(res => {
        return;
      })
    );
  }

  createSubCategory(subCategoryName: string, category: SearchItem): Observable<SearchItem> {
    return this.http.post(this.baseUrl + 'api/subcategory', { subcategory_name: subCategoryName, category_id: category.id }).pipe(
      map(res => {
        const subCategory = new SearchItem(subCategoryName, res['subcategory_id']);
        return subCategory;
      })
    );
  }

  getImagesById(partId: number): Observable<Object[]> {
    return this.http.post(this.baseUrl + 'api/images/getPhotos', { part_id: partId }).pipe(
      map((res: any) => {
        const images: object[] = [];
        console.log(res);
        res['result'].forEach(item => {
          images.push({ url: this.baseUrl + item['PICTURE_NAME'], destination: item['PICTURE_DEST'] });
        });

        return images;
      })
    );
  }

  createPart(part: Part): Observable<Part> {
    const jsonPart = {
      part_name: part.name,
      part_price: part.price,
      part_desc: part.description,
      category_id: part.category.id,
      subcategory_id: part.subCategory.id,
      maker_id: part.mark.id,
      model_id: part.model.id
    };
    console.log(jsonPart);
    return this.http.post(this.baseUrl + 'api/part', jsonPart).pipe(
      map(res => {
        console.log(res);
        part.id = res['part_id'];
        const newPart = part;

        return newPart;
      })
    );
  }

  removePart(partId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'part/remove', { part_id: partId }).pipe(
      map(res => {
        return;
      })
    );
  }

  updatePart(part: Part): Observable<Part> {
    const jsonPart = {
      part_id: part.id,
      part_name: part.name,
      part_price: part.price,
      part_desc: part.description,
      category_id: part.category.id,
      subcategory_id: part.subCategory.id,
      maker_id: part.mark.id,
      model_id: part.model.id
    };
    console.log(jsonPart);
    return this.http.put(this.baseUrl + 'api/part', jsonPart).pipe(
      map(res => {
        return part;
      })
    );
  }

  createModel(modelName: string, mark: SearchItem): Observable<any> {
    return this.http.post(this.baseUrl + 'api/model', { model_name: modelName, maker_id: mark.id }).pipe(
      map((res: any) => {
        const model = new SearchItem(modelName, res['model_id']);
        return model;
      })
    );
  }

  removeModel(modelId: number, markId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'api/model/remove', { maker_id: markId, model_id: modelId }).pipe(
      map((res: any) => {
        return;
      })
    );
  }

  updateModel(modelId: number, modelName: string): Observable<any> {
    console.log(modelId);
    console.log(modelName);
    return this.http.put(this.baseUrl + 'api/model', { model_name: modelName, model_id: modelId }).pipe(
      map((res: any) => {
        return;
      })
    );
  }

  createMark(name: string): Observable<SearchItem> {
    return this.http.post(this.baseUrl + 'api/maker', { maker_name: name }).pipe(
      map((res: any) => {
        const mark = new SearchItem(name, res.maker_id);
        return mark;
      })
    );
  }

  updateMark(markId: number, markName: string): Observable<SearchItem> {
    return this.http.put(this.baseUrl + 'api/maker', { maker_name: markName, maker_id: markId }).pipe(
      map((res: any) => {
        const mark = new SearchItem(markName, markId);

        return mark;
      })
    );
  }

  removeMark(markId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'api/maker/remove', { maker_id: markId }).pipe(
      map((res: any) => {
        return;
      })
    );
  }

  createCategory(name: string): Observable<SearchItem> {
    return this.http.post(this.baseUrl + 'api/category', { category_name: name }).pipe(
      map((res: any) => {
        const category = new SearchItem(name, res['category_id']);
        return category;
      })
    );
  }

  addFiles(images: File, partId: number) {
    var arr = [];
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item, i) => {
      formData.append('multi-files', arr[0][i]);
    });

    return this.http
      .post(this.baseUrl + 'api/images/uploadImages?part_id=' + partId, formData, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(catchError(this.errorMgmt));
  }

  removeImages(urls: string[]): Observable<any> {
    console.log('Before urls');
    console.log(urls);
    return this.http.post(this.baseUrl + 'api/images/deleteImages', { images: urls }).pipe(
      map(res => {
        console.log(res);
        return;
      })
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
