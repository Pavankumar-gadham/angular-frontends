import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface MenuItem {
  id: number;
  restaurant: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})


export class MenuService {
  // private apiUrl = 'http://127.0.0.1:8000/api/menu-items/';

  private menuUrl = `${environment.apiUrl}/menu-items/`;

  constructor(private http: HttpClient) { }

  getMenusByRestaurantId(restaurantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.menuUrl}?restaurant=${restaurantId}`);
  }

  getAllMenus(): Observable<any[]> {
  return this.http.get<any[]>(this.menuUrl);
}

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/menu-items/');
  }




}
