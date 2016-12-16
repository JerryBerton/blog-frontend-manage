import { observable, computed, action } from 'mobx';
import httpFetch from 'http-fetch'

export default class Carousel {
  @observable list = [];
  @observable completed = false;
  
  @action getList(task) {
    httpFetch.get('http://127.0.0.1:3000/authority/carousel')
    .then(response => console.log(response))
    this.carouselList.push({ completed: 1 });
  }
}
