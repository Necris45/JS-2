import { service } from "../service.js";
import {BASE_URL, GET_GOODS_ITEMS, GET_BASKET_GOODS} from "../constants.js"

export const basketGoods = Vue.component('basket-goods', {
  data() {
    return {
       basketGoodsItems: []
    }
  },

  template: `
    <div class="fixed-area">
       <div class="basket-card">
          <div class="basket-card__header">
             <h1 class="basket-card__header__title">basket card</h1>
             <div class="basket-card__header__delete-icon"
                v-on:click="$emit('closeclick')"
             ></div>
          </div>
          <div class="basket-card__content">
             <basket-goods-item v-for="item in basketGoodsItems" :item="item" @delete="deleteBasketGood" @add="addGood"></basket-goods-item>
          </div>
       </div>
    </div>
  `,
  mounted() {
    service(GET_BASKET_GOODS).then((data) => {
      this.basketGoodsItems = data
    })
  },
  methods: {
    deleteBasketGood(id) {
      service(GET_BASKET_GOODS, "DELETE", {
        id
      }).then((data) => {
        this.basketGoodsItems = data
      })
    },
    addGood(id) {
      service(GET_BASKET_GOODS, 'PUT', {
        id
      }).then((data) => {
        this.basketGoodsItems = data
      })
    }
  }
})

Vue.component('basket-goods-item', {
  props: [
    'item'
  ],
  template: `
    <div class="basket-card__content___item">
       <h3>{{item?.data?.product_name}}</h3>
       <div>count: {{item?.count}}</div>
       <div>total: {{item?.total}}</div>
       <custom-button @click="$emit('add', item.data.id)">добавить</custom-button>
       <custom-button @click="$emit('delete', item.data.id)">удалить</custom-button>
    </div>
  `
})
