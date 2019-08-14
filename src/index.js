//работа с товаром
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('#cart-empty');
const goodsCounter = document.querySelector('.counter');

//корзина
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');
const body = document.body;

//открытие корзины в модальном окне
btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    body.style.overflow = 'hidden';
});

//закрытие модального окна с корзиной
closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    body.style.overflow = '';
});


//счетчик товаров в корзине
const showData = () => {
    const shoppedGoods = cartWrapper.querySelectorAll('.card');
    goodsCounter.textContent = shoppedGoods.length;
};

//добавление товаров в корзину
cards.forEach((card) => {
    const btn = card.querySelector('button');

    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});


//анимация чекбоксов
const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach((elem) => {
    elem.addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked')
        } else {
            this.nextElementSibling.classList.remove('checked')
        }
    });
});