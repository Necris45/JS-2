const goods = [
    {title: 'Tzaangors', price: 1800, id: 1,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/gw-as/as-054-400x350.png'},
    {title: 'Tzaangor Enlightened', price: 1700, id: 2,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/wr./wr-871-400x350.png'},
    {title: 'Smaug', price: 16360, id: 3,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/forgeworld/monster/fwm-003-400x350.jpg'},
    {title: 'Blood Warriors', price: 1200, id: 4,
    image: 'https://darkminiatures.com/image/cache/catalog/tovary/g-w/gw-as/as-009-400x350.jpg'},
    {},
];

const renderGoodsItem = (title = 'Товар', price = '5000', matter = 'в наличии') => {
    return `
    <div class="goods-item">
      <h3>${title}</h3>
      <h4>${matter}</h4>
      <p>${price}</p>
    </div>
  `;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => {
        let {title, price} = item;
        return renderGoodsItem(title, price)
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);