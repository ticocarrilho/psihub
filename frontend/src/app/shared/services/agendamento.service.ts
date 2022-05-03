import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  getConsultaById(id: string | number): Observable<any> {
    return this.http
      .get<any>(`consulta/${id}`);
  }

  getConsultas(page: number, userType: string, historico: boolean, orderBy: string): Observable<any> {
    return this.http
      .get<any>(`consulta`, {
        headers: {
          'page': `${page}`,
          'usertype': userType,
          'historico': `${historico}`,
          'orderby': orderBy
        }
      });
  }

  getConsultasPsicologo(psicologoId: number, confirmada: boolean): Observable<any> {
    return this.http
      .get<any>(`consulta`, {
        headers: {
          'confirmada': `${confirmada}`,
          'psicologoid': `${psicologoId}`,
          'historico': 'false',
          'orderby': 'startDate'
        }
      });
  }

  deleteConsulta(id: number): Observable<any> {
    return this.http
      .delete<any>(`consulta/${id}`);
  }

  updateConsulta(psicologoId: number, body: any): Observable<any> {
    return this.http
      .patch<any>(`consulta/${psicologoId}`, body);
  }

  postConsulta(psicologoId: number, date: Moment): Observable<any> {
    return this.http
      .post<any>(`consulta`, {
        psicologoId,
        startDate: date,
        endDate: moment(date).add(1, 'hours'),
      });
  }

  postContrato(pacienteId: number, inicioContrato: Moment, finalContrato: Moment, precoSessao: number): Observable<any> {
    return this.http
      .post<any>(`contrato`, {
        pacienteId,
        inicioContrato,
        finalContrato,
        precoSessao
      });
  }
}
