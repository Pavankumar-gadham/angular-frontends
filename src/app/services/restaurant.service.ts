import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Restaurant {
  id: number;
  owner: number;
  name: string;
  address: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api/restaurants/';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> { 
    return this.http.get<Restaurant[]>(this.apiUrl)
  }
}
