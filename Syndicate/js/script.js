let menu_list = document.getElementById("menu-list");
let orders_list = document.getElementById("orders-list");
let sum = document.getElementById("sum");
let items_count = document.getElementById("items-count");

const renderMenuItem = (product) => {
  return `
    <div class="food-card" data-product='${JSON.stringify(
    product
  )}' onclick="onClickCard(event)">
        <img class="food-img" src="${product.img}"  />
        <div>${product.title}</div>
        <div>${product.price}som</div>
    </div>
    `;
};

const renderOrderItem = (orderItem) => {
  return `
  <li class="order-item">
    <div>${orderItem.title}</div>
    <span>count:${orderItem.count}</span>
    <span>price:${orderItem.price}</span>
    <span>X</span>
  </li>
  `;
};

// " '' " ' "" '
const renderOrderList = (list) => {
  let items = [];

  list.map((item, id) => {
    items.push(renderOrderItem(item));
  });
  orders_list.innerHTML = items.join("");
};

const renderMenuList = (list) => {
  let items = [];

  list.map((item, id) => {
    items.push(renderMenuItem(item));
  });
  menu_list.innerHTML = items.join("");
};

const onClickCard = (event) => {
  // console.log(event.target.getAttribute("product"))
  let card = JSON.parse(event.currentTarget.dataset.product);
  let currentIndex = orders_basket.findIndex((el) => el.id == card.id);

  if (currentIndex == -1) {
    orders_basket.push({ ...card, count: 1 });
  } else {
    orders_basket[currentIndex].count++;
    orders_basket[currentIndex].price += card.price;
  }

  solveSum();
  renderOrderList(orders_basket)
  getCount()
};

const onDelete = () => { };

const solveSum = () => {
  sum = orders_basket.reduce((it, { price }) => it + price, 0);
  console.log(sum);
};

const getCount = () => {
  items_count.innerHTML = orders_basket.reduce((it, { count }) => it + count, 0);
};

renderMenuList(menu_items);