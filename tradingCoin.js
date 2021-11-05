//   important !!!
var status_binance = 'buy'; //buy  sell pending

let cryptocurrency = ''; // Ten cua tien ao
var max_price = 11.5;
let arrayPrice = [0.1605, 0.1607];
//end

// show price
let show_price = document.querySelector('.showPrice');
console.log(show_price.innerHTML);
var run = true;
//form buy
let autoFormBUY = document.getElementById('autoFormBUY');
let inputBuyPrice = document.querySelector('#autoFormBUY #FormRow-BUY-price');
let inputBuyQuantity = document.querySelector(
  '#autoFormBUY #FormRow-BUY-quantity'
);
let btnAutoBuy = document.querySelector('#autoFormBUY .buySellButton');

//form sell
let autoFormSELL = document.getElementById('autoFormSELL');
let inputSellPrice = document.querySelector(
  '#autoFormSELL #FormRow-SELL-price'
);
let inputSellQuantity = document.querySelector(
  '#autoFormSELL #FormRow-SELL-quantity'
);
let btnAutoSell = document.querySelector('#autoFormSELL .buySellButton');
//end form sell
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let save_buy_price; //when buy
let save_buy_quantity;
// detect Buy And Sell
async function detectBuyAndSell() {
  let price = Number(show_price.innerHTML);
  let row_tradeInfoTable = document.querySelectorAll('.list-grid>div>div');
  // mua
  if (
    status_binance == 'buy' &&
    row_tradeInfoTable.length == 0 &&
    Number(price) >= arrayPrice[0] &&
    Number(price) <= arrayPrice[1]
  ) {
    status_binance = 'sell';
    inputBuyPrice.value = price;
    inputBuyQuantity.value = (max_price / price).toFixed(0);
    console.log(` \n ----------buy với giá ${price}!--------- \n `);
    //change status

    save_buy_price = price + (price * 8) / 100; // gia tien ban ra

    save_buy_quantity = inputBuyQuantity.value;
    await btnAutoBuy.click();
    await delay(2000);

    //ban
  } else if (status_binance == 'sell' && row_tradeInfoTable.length == 0) {
    status_binance = 'pending';
    //change status
    console.log(
      ` \n --------- Sell với giá ${Number(
        save_buy_price.toFixed(1)
      )}!--------- \n  `
    );

    inputSellPrice.value = Number(save_buy_price.toFixed(1));
    inputSellQuantity.value = save_buy_quantity;

    await btnAutoSell.click();
    await delay(1000);

    //pending chờ bán
  } else if (status_binance == 'pending' && row_tradeInfoTable.length == 0) {
    //change status
    status_binance = 'buy';
    await delay(1000);
  } else {
    console.info(`
    ----------${status_binance}!---------
    Giá hiện tại              :${show_price.innerHTML}
    Giá muốn mua trong khoảng : ${arrayPrice[0]} - ${arrayPrice[1]}
    Dòng mua bán :${row_tradeInfoTable?.length}.
    `);
  }
}

async function runBuy() {
  while (true) {
    if (run == true) {
      await detectBuyAndSell();
      await delay(200);
    } else if (run == false) {
      run = false;
      break;
    }
  }
}
function tat() {
  run = false;
}
function bat() {
  let pathname = window.location.pathname.split('/');
  let nameCoin = pathname[pathname.length - 1];
  if (cryptocurrency == nameCoin) {
    run = true;
    runBuy();
  }else{
    console.log('Tên coin không trùng với mã coin trang web !')
  }
}
