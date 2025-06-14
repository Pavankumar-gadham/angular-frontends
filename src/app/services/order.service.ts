import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = 'http://localhost:8000/api/orders/';

  private orderUrl = `${environment.apiUrl}/orders/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    console.log('Token being used:', localStorage.getItem('access_token'));

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.orderUrl, orderData, { headers: this.getAuthHeaders() });
  }

  getOrders(): Observable<any> {
    return this.http.get(this.orderUrl, { headers: this.getAuthHeaders() });
  }
}
