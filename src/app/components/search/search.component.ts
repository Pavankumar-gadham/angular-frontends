import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  results: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private menuService: MenuService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.performSearch();
    });
  }

  performSearch() {
    this.menuService.getAllItems().subscribe(items => {
      this.results = items.filter(item =>
        item.name.toLowerCase().includes(this.query.toLowerCase()) ||
        item.description?.toLowerCase().includes(this.query.toLowerCase())
      );
      console.log("Search term:", this.query);
      console.log("Items received:", items);

    });
  }
}
