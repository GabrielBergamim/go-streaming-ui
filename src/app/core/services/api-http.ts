import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://go.streaming/api';

  filter(name?:  string): Observable<Movie[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.set('name', name || '');

    return this.http.get<Movie[]>(`${this.baseUrl}/videos`, {params, headers});
  }
}
