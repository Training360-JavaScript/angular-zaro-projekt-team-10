import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories$: Observable<Category[]> = this.categoryService.getAll();
  columns: string[] = [];
  listName: string = 'category';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private categoryService: CategoryService,
  ) {
    const temp = new Category();
    this.columns =  Object.getOwnPropertyNames(temp);

  }

  ngOnInit(): void {
  }

  onDeleteOne(category: Category): void {
    if (window.confirm('Biztosan törli ezt a kategóriát?')) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories$ = this.categoryService.getAll()
      )
    }
  }

}
