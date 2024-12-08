import './pages/index.css';
import { createCardElement, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { getUserData, getInitialCards, updateUserData, addCard, updateUserAvatar } from './scripts/api';

// Настройки валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
const profileImage = document.querySelector('.profile__image');

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

const avatarEditButton = document.querySelector('.profile__image_edit-button');
const avatarModal = document.querySelector('.popup_type_new-avatar');
const avatarEditForm = document.forms['edit-avatar'];
const avatarFormInput = avatarEditForm.elements.avatar;

const saveButton = profileEditForm.querySelector('.popup__button');

let myID = '';


// Получение карточек и информации о пользователе
Promise.all([getUserData(), getInitialCards()]).then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    myID = userData._id;

    renderCards(cards);
})
    .catch((err) => {
        console.log(err);
    });

// Функция вывода карточек на страницу
function renderCards(cards) {
    cards.forEach(card => {
        const element = createCardElement(card, myID, deleteCard, cardTemplate, likeCard, openImageModal);
        cardList.append(element);
    });
}

modals.forEach(modal => {
    modal.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileEditForm, validationConfig);
    openModal(profileEditModal);
});

cardAddButton.addEventListener('click', () => {
    clearValidation(cardAddForm, validationConfig);
    openModal(cardAddModal);
});

modalCloseButtons.forEach(button => {
    const modal = button.closest('.popup');
    button.addEventListener('click', () => {
        closeModal(modal);
    });
});

// Функция для изменения состояния кнопки
function renderLoading(button, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
    button.textContent = isLoading ? loadingText : defaultText;
}

// Функция закрытия попапа просле отправки формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    renderLoading(saveButton, true);

    updateUserData(nameInput.value, jobInput.value).then(UserData => {
        profileTitle.textContent = UserData.name;
        profileDescription.textContent = UserData.about;
        closeModal(profileEditModal);
    })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(saveButton, false);
        })


};

// Функция добавления карточки
function handleAddCard(evt) {
    evt.preventDefault();

    renderLoading(saveButton, true);

    addCard(cardNameInput.value, cardLinkInput.value).then(cardData => {
        const element = createCardElement(cardData, myID, deleteCard, cardTemplate, likeCard, openImageModal);
        cardList.prepend(element);
        cardAddForm.reset();
        closeModal(cardAddModal);
    })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(saveButton, false);
        })
};

// Функция обновления аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault()

    renderLoading(saveButton, true);

    updateUserAvatar(avatarFormInput.value).then(userData => {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        avatarEditForm.reset();
        closeModal(avatarModal);
    })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(saveButton, false);
        })
}

// Функция открытия попапа с картинкой
function openImageModal(card) {
    cardModalTitle.textContent = card.name;
    cardModalImage.src = card.link;
    cardModalImage.alt = card.name;
    openModal(cardModal);
};

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarEditForm, validationConfig);
    openModal(avatarModal);
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

cardAddForm.addEventListener('submit', handleAddCard);

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);
