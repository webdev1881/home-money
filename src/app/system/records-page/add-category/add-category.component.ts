import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hmy-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent  {



  @Output() categoryAdd = new EventEmitter<Category>();


  constructor(private categoriesService: CategoriesService) {}


  onSubmit(form: NgForm) {
    if (form.value.capacity < 0) { form.value.capacity *= -1; }

    const category = new Category(form.value.name, form.value.capacity);

    this.categoriesService.addCategory(category)
      .subscribe((data: Category ) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.categoryAdd.emit(data);
      });
  }



}

