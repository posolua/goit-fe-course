'use strict';

const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
};

function Cashier(name = 'name of cashier', productDatabase = 'object') {
    this.name = name;
    this.productDatabase = productDatabase;
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
    this.greet = function () {
        console.log(`Здравствуйте, Вас обслуживает ${this.name}`);
    };
    this.onSuccess = function () {
        return this.changeAmount > 0 ? console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`) : console.log(`Спасибо за покупку`)
    };
    this.onError = function () {
        console.log(`Очень жаль, вам не хватает денег на покупки`);
    };
    this.countTotalPrice = function (order) {
        for (let key in order) {
            if (order.hasOwnProperty(key)) {
                this.totalPrice += order[key] * this.productDatabase[key];
            }
        }

        };


    this.getCustomerMoney = function (value) {
        return this.customerMoney = value;
    };
    this.countChange = function () {
        if (this.customerMoney >= this.totalPrice) {
            return this.changeAmount = this.customerMoney - this.totalPrice;
        } else {
            return this.changeAmount = null;
        }
    };
    this.reset = function () {
        return this.totalPrice = 0, this.customerMoney =0, this.changeAmount = 0;
    };

}

const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1,
};

const nameS = new Cashier('Serg', products);

console.log(nameS.name);
console.log(nameS.productDatabase);
console.log(nameS.totalPrice);
console.log(nameS.customerMoney);
console.log(nameS.changeAmount);


nameS.greet();
nameS.countTotalPrice(order);
console.log(nameS.totalPrice);
nameS.getCustomerMoney(300);
console.log(nameS.customerMoney);

const result = nameS.countChange();
console.log(result);

if(result !== null){
    nameS.onSuccess();
}else{
    nameS.onError();
}

nameS.reset();

console.log(nameS.totalPrice);
console.log(nameS.customerMoney);
console.log(nameS.changeAmount);