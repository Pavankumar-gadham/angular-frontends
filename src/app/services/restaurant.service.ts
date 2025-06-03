import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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
  // private apiUrl = 'http://127.0.0.1:8000/api/restaurants/';

  private resUrl = `${environment.apiUrl}/restaurants/`;

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> { 
    return this.http.get<Restaurant[]>(this.resUrl)
  }
}
