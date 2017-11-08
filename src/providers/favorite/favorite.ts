import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;

  constructor(
    public http: Http,
    private storage: Storage,
    private dishService: DishProvider,
    private localNotifications: LocalNotifications) {

    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
    this.storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites.push(...favorites);
        console.log(this.favorites);
      }
      else {
        console.log('favorites not defined');
      }
    });
  }

  addFavorite(dish: Dish): boolean {
    if (!this.isFavorite(dish.id)) {
      this.favorites.push(dish.id);
      this.storage.set('favorites', this.favorites);
      this.localNotifications.schedule({
        text: 'Dish ' + dish.name + ' added as favorite successfully'
      });
    }
    return true;
  }

  deleteFavorite(dish: Dish): Observable<Dish[]> {
    let index = this.favorites.indexOf(dish.id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', dish.id);
      return Observable.throw('Deleting non-existant favorite ' + dish.id);
    }
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService
      .getDishes()
      .map(dishes => dishes.filter(dish => this.isFavorite(dish.id)));
  }

  isFavorite(id: string): boolean {
    return this.favorites.some(el => el === id);
  }
}
