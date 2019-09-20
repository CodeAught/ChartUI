import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './api-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chartUI';
  users: User[];
  readonly totalUsers: number = 100;
  percent: number;
  geoLocation: Geo;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        if(this.users) {
          this.percent = this.calculatePercentage(this.users.length);
        }
        this.geoLocation = this.calculateGeoLocation(this.users);
      }
    );
  }

  calculateGeoLocation(users: User[]) {
    let negLat: number = 0;
    let posLat: number = 0;
    let negLng: number = 0;
    let posLng: number = 0;

    if(users) {
      users.forEach(user => {
        if(user && user.address && user.address.geo) {
          if(+user.address.geo.lat < 0) { negLat++; }
          if(+user.address.geo.lat > 0) { posLat++; }
          if(+user.address.geo.lng < 0) { negLng++; }
          if(+user.address.geo.lng > 0) { posLng++; }
        }
      });
    }

    return {
      negLat: negLat,
      posLat: posLat,
      negLng: negLng,
      posLng: posLng
    };
  }

  calculatePercentage(users: number) {
    if(users) {
      return ((users * 100) / this.totalUsers);
    }
    return 0;
  }
}

interface Geo {
  negLat: number;
  posLat: number;
  negLng: number;
  posLng: number;
}
