import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/services/restaurant.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit{
  restaurants: Restaurant[] = [];
  loading = false;
  error: string | null = null;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
      this.loading = true;
      this.restaurantService.getRestaurants().subscribe({
        next: (data) => {
          this.restaurants = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load restaurants!';
          this.loading = false;
          console.error(err);
        }
      });
  }

}
