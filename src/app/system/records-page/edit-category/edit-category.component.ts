import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'hmy-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy   {

  sub1: Subscription;
  sub2: Subscription;

  @Input() categories: Category[] = [];
  @Input() canDel: boolean;


  @Output() categoryEdit = new EventEmitter<Category>();
  @Output() categoryDeleted = new EventEmitter<Category>();


  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;


  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    if ( this.currentCategoryId ) {
      this.currentCategoryId = this.categories[0].id;
      this.categoryChange();
    }

  }


  categoryChange() {
      this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  submit(form: NgForm, event) {
    let { name} = form.value;
  //  if (capacity < 0) {capacity *= -1; }
    const category = new Category(name, +this.currentCategoryId);

    if ( event === 'edit' ) {              // ________________________________EDIT
      this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.categoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 2000);
      });

    } else {                            // ________________________________DELETE
      if ( this.categories.length !== 0 ) {
        this.categoryDeleted.emit(category);
        this.currentCategory.name = '';
        this.sub2 = this.categoriesService.deleteCategory(category)
          .subscribe(() => {
          //  if( this.currentCategoryId ) { this.currentCategoryId = this.categories[0].id; }
            this.currentCategoryId = this.categories[0].id;

            this.categoryChange();

            this.message.text = 'Категория успешно удалена.';
            window.setTimeout(() => this.message.text = '', 2000);
        });
      }
    }

  }

    ngOnDestroy() {
      if (this.sub1) { this.sub1.unsubscribe(); }
      if (this.sub2) { this.sub2.unsubscribe(); }
    }


}
