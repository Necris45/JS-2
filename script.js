const goods = [
    {title: 'Tzaangors', price: 1800, id: 1,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/gw-as/as-054-400x350.png'},
    {title: 'Tzaangor Enlightened', price: 1700, id: 2,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/wr./wr-871-400x350.png'},
    {title: 'Smaug', price: 16360, id: 3,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/forgeworld/monster/fwm-003-400x350.jpg'},
    {title: 'Blood Warriors', price: 1200, id: 4,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/gw-as/as-009-400x350.jpg'},
];

class GoodsItem {
    constructor({title = 'Товар', price = 5000, stock = 'в наличии', image}) {
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.image_url = "\"background-image:url(\'" + image + "\')\""
    }
    render() {
        return `
    <div class="goods-item" style=${this.image_url}>
      <h3>${this.title}</h3>
      <h4>${this.price}</h4>
      <p>${this.stock}</p>
    </div>
  `;
    }
}

class GoodsList {
    items = [];

    fetchGoods() {
        this.items = goods;
    }

    render() {
    const goods = this.items.map(item => {
            const goodItem = new GoodsItem(item);
            return goodItem.render()
        }).join('');

        document.querySelector('.goods-list').innerHTML = goods;
    }

    calculateTotalPrice() {
        return this.items.reduce((prev, item) => {return prev + item.price;}, 0)
    }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
const res = goodsList.calculateTotalPrice()
debugger