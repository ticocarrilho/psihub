import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  constructor(private http: HttpClient) { }

  getFeedbacks(page: number): Observable<any> {
    return this.http
      .get<any>(`feedback`, {
        headers: {
          'page': `${page}`,
        }
      });
  }

  postFeedback(body: any): Observable<any> {
    return this.http
      .post<any>(`feedback`, body);
  }
}
