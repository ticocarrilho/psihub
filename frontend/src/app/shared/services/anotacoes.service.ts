import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnotacoesService {

  constructor(private http: HttpClient) { }

  getAnotacoes(page: number, userId: number): Observable<any> {
    return this.http
      .get<any>(`anotacao`, {
        headers: {
          'page': `${page}`,
          'pacienteid': `${userId}`
        }
      });
  }

  postAnotacao(body: any): Observable<any> {
    return this.http
      .post<any>(`anotacao`, body);
  }

  deleteAnotacao(anotacaoId: number): Observable<any> {
    return this.http
      .delete<any>(`anotacao/${anotacaoId}`);
  }

}
