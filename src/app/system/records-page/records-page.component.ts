import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'hmy-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categories: Category[] = [];
  isLoaded = false;


  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe( (data: any ) => {
        this.categories = data;
        this.isLoaded = true;
      } );
  }



  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

  categoryWasDeleted(category: Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
  }

}
