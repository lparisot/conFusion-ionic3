import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,
         ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})

export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    public platform: Platform,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private favoriteService: FavoriteProvider,
    private socialSharing: SocialSharing,
    @Inject('BaseURL') private baseURL) {

    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    if (!this.favorite) {
      console.log('Adding to favorites ', this.dish.id);
      this.favorite = this.favoriteService.addFavorite(this.dish);
      if (this.favorite) {
        this.toastController
          .create({
            message: 'Dish ' + this.dish.name + ' added as a favorite successfully',
            position: 'middle',
            duration: 3000})
          .present();
      }
    }
  }

  openActionSheet() {
    let toast = this.toastController
      .create({message: 'Message', duration: 3000});

    let actionSheet = this.actionSheetController.create({
      title: 'Select Actions',
      buttons: [
          {
            text: 'Add to Favorites',
            icon: !this.platform.is('ios') ? 'heart-outline' : null,
            handler: () => {
              this.addToFavorites();
            }
          },
          {
            text: 'Add a Comment',
            icon: !this.platform.is('ios') ? 'paper' : null,
            handler: () => {
              let modal = this.modalController.create(CommentPage);
              modal.onDidDismiss(comment => {
                if(comment != null) {
                  this.dish.comments.push(comment);
                }
              })
              modal.present();
            }
          },
          {
            text: 'Share via Facebook',
            handler: () => {
              this.socialSharing.shareViaFacebook(
                this.dish.name + ' -- ' + this.dish.description,
                this.baseURL + this.dish.image,
                ''
              ).then(() => {
                toast.setMessage('Posted successfully to Facebook'),
                toast.present();
              })
              .catch(() => {
                toast.setMessage('Failed to post to Facebook')
                toast.present();
              });
            }
          },
          {
            text: 'Share via Twitter',
            handler: () => {
              this.socialSharing.shareViaTwitter(
                this.dish.name + ' -- ' + this.dish.description,
                this.baseURL + this.dish.image,
                ''
              ).then(() => {
                toast.setMessage('Posted successfully to Twitter'),
                toast.present();
              })
              .catch(() => {
                toast.setMessage('Failed to post to Twitter')
                toast.present();
              });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            icon: !this.platform.is('ios') ? 'close' : null
          }
      ]
    });

    actionSheet.present();
  }
}
