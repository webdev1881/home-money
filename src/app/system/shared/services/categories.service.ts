import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Category } from '../models/category.model';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';


@Injectable()

export class CategoriesService extends BaseApi {
   constructor(public http: HttpClient) {
     super(http);
   }


   addCategory( category: Category ): Observable<Category> {
      return this.post( `categories`, category);
   }

   getCategories(): Observable<Category[]> {
      return this.get( `categories`);
   }

   updateCategory(category: Category): Observable<Category> {
      return this.put(`categories/${category.id}`, category);
   }

   deleteCategory(category: any): Observable<any> {
      return this.delete(`categories/${category.id}`);
   }



}
