import { apiDeleteCard, apiLikeCard } from "./api";

// Функция создания карточки
function createCardElement(card, userID, removeCard, cardTemplate, like, modalOpen) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.addEventListener('click', () => {
        modalOpen(card);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    const isCardLiked = card.likes.find(elem => elem['_id'] === userID);
    likeButton.addEventListener('click', () => like(likeButton, card._id, cardLikeCounter));

    if (isCardLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardLikeCounter.textContent = card.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (userID !== card.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', (evt) => removeCard(evt, card._id, cardLikeCounter));
    }

    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt, id) {
    apiDeleteCard(id)
        .then(() => {
            evt.target.closest('.places__item').remove();
        })
        .catch((err) => {
            console.log(err);
        });
};

// Функция лайка карточки
function likeCard(button, id, countElem) {
    const isLiked = button.classList.contains('card__like-button_is-active');

    apiLikeCard(id, isLiked).then(cardData => {
        button.classList.toggle('card__like-button_is-active');
        countElem.textContent = cardData.likes.length;
    })
        .catch((err) => {
            console.log(err);
        });

};

export { createCardElement, deleteCard, likeCard }