//работа с товаром
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('#cart-empty');
const goodsCounter = document.querySelector('.counter');



//открытие-закрытие корзины
const toggleCart = (btnCart, modalCart, closeBtn) => {

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });


    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}


//счетчик товаров в корзине
const showCartData = () => {
    const cardsPrice = cartWrapper.querySelectorAll('.card-price');
    const cartTotal = document.querySelector('.cart-total span');
    const shoppedGoods = cartWrapper.querySelectorAll('.card');
    goodsCounter.textContent = shoppedGoods.length;

    let sum = 0;
    cardsPrice.forEach((cardPrice) => {
        let price = parseFloat(cardPrice.textContent);
        sum += price;
    });

    cartTotal.textContent = sum;

    if (shoppedGoods.length === 0) {
        cartWrapper.appendChild(cartEmpty);
    } else {
        cartEmpty.remove();
    }



};

//добавление и удаление товаров из корзины
const addToCart = () => {
    const addedCards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.querySelector('#cart-empty');
    const goodsCounter = document.querySelector('.counter');

    addedCards.forEach((card) => {
        const btn = card.querySelector('button');
    
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            cartEmpty.remove();
            showCartData();
    
            const removeBtn = cardClone.querySelector('.btn'); //изменение текста кнопки в добавленной карточке
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showCartData();
            });
        });
    });
}



//анимация чекбоксов
const toggleCheckbox = (checkbox) => {
    checkbox.forEach((elem) => {
        elem.addEventListener('change', function () {
            if (this.checked) {
                console.log('checked');
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
};

//фильтр акции
const actionFilter = () => {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max');

        discountCheckbox.addEventListener('click', () => {
            cards.forEach((card) => {
                if (discountCheckbox.checked) {
                    if (!card.querySelector('.card-sale')) {
                        card.parentNode.style.display = 'none';
                    }
                    card.parentNode.style.display = '';
                }
                }
                

            )
        })

}

toggleCheckbox(document.querySelectorAll('.filter-check_checkbox'));
toggleCart(document.getElementById('cart'), document.querySelector('.cart'), document.querySelector('.cart-close'));
addToCart();
actionFilter();
