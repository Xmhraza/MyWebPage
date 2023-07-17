import { CalculatePoints } from "./TaskManager.js";

let ShopItems = JSON.parse(localStorage.getItem('Shop')) || [];

RenderShop();

function RenderShop() {
    console.log(ShopItems);
    let ItemList = '';


    if (ShopItems === null) return
    ShopItems.forEach((Item) => {
        const { ShopTask, ShopPoints } = Item;
        const html = `
        <div class="item">${ShopTask}</div>
        <div class="item">${ShopPoints}</div>
        <button class="item buy-button js-buy-button">Buy</button> 
        <button class="item delete-shop-button js-delete-shop-button">Delete</button> 
      `;
        ItemList += html;
    });

    if (document.querySelector('.shop-grid-show'))
        document.querySelector('.shop-grid-show')
            .innerHTML = ItemList;

    document.querySelectorAll('.js-delete-shop-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                ShopItems.splice(index, 1);
                localStorage.setItem('Shop', JSON.stringify(ShopItems));
                RenderShop();
            });
        });

    document.querySelectorAll('.js-buy-button')
        .forEach((CompleteButton, index) => {
            CompleteButton.addEventListener('click', () => {
                CalculatePoints(parseInt(ShopItems[index].ShopPoints));
            });
        });

}



if (document.querySelector('.shop-add'))
    document.querySelector('.shop-add')
        .addEventListener('click', () => {
            AddToShop();
        });




function AddToShop() {
    const inputElement = document.querySelector('.shop-task');
    const ShopTask = inputElement.value;
    const inputElement2 = document.querySelector('.shop-points');
    const ShopPoints = inputElement2.value;
    console.log(ShopTask, ShopPoints);
    ShopItems.push({ ShopTask, ShopPoints })
    inputElement.value = "";
    inputElement2.value = 1;
    localStorage.setItem('Shop', JSON.stringify(ShopItems));
    RenderShop();
}

