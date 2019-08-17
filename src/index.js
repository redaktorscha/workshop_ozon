//работа с товаром
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('#cart-empty');
const goodsCounter = document.querySelector('.counter');
let sorted = false;
let cat;



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
        //let price = parseFloat(cardPrice.textContent);
        sum += parseFloat(cardPrice.textContent);
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
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
};



//фильтр страницы
const actionPage = () => {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        searchBtn = document.querySelector('.search-btn');


    //фильтр по поиску
    const filterSearch = () => {
        const search = document.querySelector('.search-wrapper_input'),
            searchText = new RegExp(search.value.trim(), 'i');

        cards.forEach((card) => {
            const title = card.querySelector('.card-title');

            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            };
            search.value = '';
        });
    }

    //фильтр по цене
    // const filterPrice = () => {
    //     cards.forEach((card) => {
    //         const cardPrice = card.querySelector('.card-price');
    //         const price = parseFloat(cardPrice.textContent);


    //         if ((min.value && price < min.value) || (max.value && price > max.value)) {
    //             card.parentNode.style.display = 'none';
    //         } else {
    //             card.parentNode.style.display = '';
    //         }
    //     });
    // }

    //фильтр по акции
    // const filterAction = () => {
    //     cards.forEach((card) => {
    //         if (discountCheckbox.checked) {
    //             if (!card.querySelector('.card-sale')) {
    //                 card.parentNode.style.display = 'none';
    //             }
    //         } else {
    //             card.parentNode.style.display = '';
    //         }
    //     })
    // }

    //фильтр по цене и акции
    // const filterContent = () => {
    //     cards.forEach((card) => {
    //         const cardPrice = card.querySelector('.card-price');
    //         const price = parseFloat(cardPrice.textContent);

    //         if (discountCheckbox.checked) {                
    //             if (!card.querySelector('.card-sale')) {
    //                 card.parentNode.style.display = 'none';
    //             }
    //             if ((min.value && price < min.value) || (max.value && price > max.value)) {
    //                 card.parentNode.style.display = 'none';
    //             }
    //         } else if ((min.value && price < min.value) || (max.value && price > max.value)) {
    //             card.parentNode.style.display = 'none';
    //         } else {
    //             card.parentNode.style.display = '';
    //         };
    //     });
    // };

    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else if (sorted && card.dataset.category !== cat) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        })
    };


    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
    searchBtn.addEventListener('click', filterSearch);
}


//получение данных с сервера
function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены, ошибка: ' + response.status)
            }
        })
        .then((data) => {
            return data;
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = "<div style='color: red; font-size: 30px'>Упс, что-то пошло не так!</div>"

        });


};

//выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        // console.log(good);
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `                
                <div class="card" data-category="${good.category}">
                ${good.sale ? ' <div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                    <div class="card-img-wrapper">
                        <span class="card-img-top"
                            style="background-image: url('${good.img}')"></span>
                    </div>
                    <div class="card-body justify-content-between">
                        <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                        <h5 class="card-title">${good.title}</h5>
                        <button class="btn btn-primary">В корзину</button>
                    </div>
                </div>
            `;
        goodsWrapper.appendChild(card);

    });
};

function renderCatalogue() {
    const cards = document.querySelectorAll('.goods .card');    
    const catalogueList = document.querySelector('.catalog-list');
    const catalogueWrapper = document.querySelector('.catalog');
    const catalogueBtn = document.querySelector('.catalog-button');
    const categories = new Set();
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });
    //console.log(categories);
    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogueList.appendChild(li);
    });

    catalogueBtn.addEventListener('click', (event) => {
        if (catalogueWrapper.style.display) {
            catalogueWrapper.style.display = '';
        } else {
            catalogueWrapper.style.display = 'block';
        }
        
        if (event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                    sorted = true;
                    cat = card.dataset.category;
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        };
        
    });
};

getData().then((data) => {
    renderCards(data);
    toggleCheckbox(document.querySelectorAll('.filter-check_checkbox'));
    toggleCart(document.getElementById('cart'), document.querySelector('.cart'), document.querySelector('.cart-close'));
    addToCart();
    actionPage();
    renderCatalogue();
});