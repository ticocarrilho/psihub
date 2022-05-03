import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  getTarefas(page: number): Observable<any> {
    return this.http
      .get<any>(`tarefa`, {
        headers: {
          'page': `${page}`
        }
      });
  }

  postTarefa(body: any): Observable<any> {
    return this.http
      .post<any>(`tarefa`, body);
  }

  updateTarefa(tarefaId: number, body: any): Observable<any> {
    return this.http
      .patch<any>(`tarefa/${tarefaId}`, body);
  }

  deleteTarefa(tarefaId: number): Observable<any> {
    return this.http
      .delete<any>(`tarefa/${tarefaId}`);
  }

}
