import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<Model> {
  constructor(
    private http: HttpClient
  ) { }

  protected entityUrl: string = environment.backendUrl;

  getAll(): Observable<Model[]> {
    return this.http.get<Model[]>(this.entityUrl);
  }

  get(id: number): Observable<Model> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.get<Model>(url);
  }
}
