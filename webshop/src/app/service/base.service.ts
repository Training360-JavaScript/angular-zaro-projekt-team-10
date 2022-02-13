import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseService<Model extends { id: number }> {
  constructor(
    private httpClient: HttpClient,
    protected readonly entityUrl: string
  ) { 
    this.url = environment.backendUrl + entityUrl;
  }

  protected readonly url: string = '';

  getAll(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(this.url);
  }

  get(id: number): Observable<Model> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Model>(url);
  }

  add(item: Model): Observable<Model> {
    const url = `${this.url}`;
    item.id = 0;
    return this.httpClient.post<Model>(url, item);
  }

  update(item: Model): Observable<Model> {
    const url = `${this.url}/${item.id}`;
    return this.httpClient.put<Model>(url, item);
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete(url);
  }

}
