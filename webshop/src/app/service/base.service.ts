import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseService<Model> {
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
}
