// Функция создания карточки
function createCardElement(card, removeCard, cardTemplate, like, modalOpen) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.addEventListener('click', () => {
        modalOpen(card);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', like);

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// Функция лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};


export { createCardElement, deleteCard, likeCard }