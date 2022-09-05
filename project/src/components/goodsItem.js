import { service } from "../service.js"
import {BASE_URL, GET_GOODS_ITEMS, GET_BASKET_GOODS} from "../constants.js"

export const goodsItem = Vue.component('goods-item', {
  props: [
     'item'
  ],
  template: `
    <div class="goods-item">
       <h3>{{ item.product_name }}</h3>
       <p>{{ item.price }}</p>
       <custom-button @click="addGood">добавить</custom-button>
    </div>
  `,
  methods: {
    addGood() {
      service(GET_BASKET_GOODS, 'PUT', {
        id: this.item.id
      })
    }
  }
})