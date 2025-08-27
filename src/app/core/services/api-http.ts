import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie, Page } from "../models/movie";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  filter(name?: string, page: number = 1, size: number = 10): Observable<Page<Movie[]>> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.set('name', name || '');
    params = params.set('page', page || '');
    params = params.set('size', size || '');

   return this.http.get<Page<Movie[]>>(`${this.baseUrl}/videos`, {params, headers});
  }
}
