import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  category$: Observable<Category> = this.activatedRoute.params.pipe(
    switchMap( params => this.CategoryService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private CategoryService: CategoryService,
  ) { }

  ngOnInit(): void {
  }

}
