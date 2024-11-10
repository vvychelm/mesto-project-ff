// Функция открытия попапа
function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('mousedown', handleCloseModalOverlay);
    document.addEventListener('keydown', handleCloseModalEsc);
    console.log('opened')
}

// Функция закрытия попапа
function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('mousedown', handleCloseModalOverlay);
    document.removeEventListener('keydown', handleCloseModalEsc);
    console.log('closed')
}

// Функция закрытия попапа при клике на оверлей
function handleCloseModalOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

// Функция закрытия попапа при нажатии на Esc
function handleCloseModalEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

export { openModal, closeModal }