const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url)
  .then((res) => res.json())
}

function init() {

    const CustomButton = Vue.component('custom-button', {
        template: `
            <button class="cart-button" type="button" v-on:click="$emit('click')">
                <slot></slot>
            </button>
        `
    })

    Vue.component('search-component', {
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: String
        },
        template: `
            <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)"/>
        `
    })

    const goodsItem = Vue.component('goods-item', {
        props: [
            'item'
        ],
        template: `
            <div class="goods-item">
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }}</p>
            </div>
        `
    })

    const basketGoods = Vue.component('basket-goods', {
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
               content
            </div>
         </div>
      </div>
    `,
    mounted() {

    }
  })

    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            searchLine: '',
            cardIsVision: false
        },
        methods: {
            setVisionCard() {
                this.cardIsVision = !this.cardIsVision
            },
            fetchGoods() {
                service(GET_GOODS_ITEMS).then((data) => {
                    this.items = data;
                });
            },
            onSearchComponentChange(value) {
                this.searchLine = value
            }
        },
        computed: {
            filteredItems() {
                return this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.searchLine, 'gui'))
                })
            },
            calculatePrice() {
                return this.items.reduce((prev, { price }) => {
                    return prev + price;
                }, 0)
            }
        },
        mounted() {
            this.fetchGoods();
        }
    })
}

window.onload = init
