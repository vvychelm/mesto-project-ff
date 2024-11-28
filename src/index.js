import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCardElement, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');

const cardAddForm = document.forms['new-place'];
const cardNameInput = cardAddForm.elements['place-name'];
const cardLinkInput = cardAddForm.elements.link;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');

const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.elements.name;
const jobInput = profileEditForm.elements.description;

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddModal = document.querySelector('.popup_type_new-card');

const modalCloseButtons = document.querySelectorAll('.popup__close');

const cardModal = document.querySelector('.popup_type_image');
const cardModalImage = document.querySelector('.popup__image');
const cardModalTitle = document.querySelector('.popup__caption');


// Функция вывода карточек на страницу
function renderCards(cards) {
    cards.forEach(card => {
        const element = createCardElement(card, deleteCard, cardTemplate, likeCard, openImageModal);
        cardList.append(element);
    });
}

renderCards(initialCards);

modals.forEach(modal => {
    modal.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});

cardAddButton.addEventListener('click', () => {
    openModal(cardAddModal);
});

modalCloseButtons.forEach(button => {
    const modal = button.closest('.popup');
    button.addEventListener('click', () => {
        closeModal(modal);
    });
});


// Функция закрытия попапа просле отправки формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profileEditModal);
};

// Функция добавления карточки через форму
function handleAddCard(evt) {
    evt.preventDefault();
    const addedCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }
    const element = createCardElement(addedCard, deleteCard, cardTemplate, likeCard, openImageModal);
    cardList.prepend(element);
    cardAddForm.reset();
    closeModal(cardAddModal);
};

// Функция открытия попапа с картинкой
function openImageModal(card) {
    cardModalTitle.textContent = card.name;
    cardModalImage.src = card.link;
    cardModalImage.alt = card.name;
    openModal(cardModal);
};

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

cardAddForm.addEventListener('submit', handleAddCard);