import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(public navCtrl: NavController,
              private dishService: DishProvider,
              private promotionService: PromotionProvider,
              private leaderService: LeaderProvider,
              @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService
      .getFeaturedDish()
      .subscribe(dish => this.dish = dish,
                 errmess => this.dishErrMess = <any>errmess );
    this.promotionService
      .getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
                 errmess => this.promoErrMess = <any>errmess );
    this.leaderService
      .getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
                 errmess => this.leaderErrMess = <any>errmess );
  }
}
