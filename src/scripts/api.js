const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
        authorization: '099bb2a8-308f-448c-8651-9c42be8ea3a8',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse);
}

const updateUserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(checkResponse);
}

const updateUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(checkResponse);
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse);
}

const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkResponse);
}

const apiDeleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

const apiLikeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: config.headers
    })
        .then(checkResponse);
}

export { getUserData, updateUserData, updateUserAvatar, getInitialCards, addCard, apiDeleteCard, apiLikeCard }