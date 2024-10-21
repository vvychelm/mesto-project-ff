// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(card, removeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// Функция вывода карточек на страницу
function renderCards(cards) {
    cards.forEach(card => {
        const element = createCard(card, deleteCard);
        cardList.append(element);
    });
}

renderCards(initialCards);
