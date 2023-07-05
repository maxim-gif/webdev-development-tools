import { arrCards } from './storagedata.js'
import { getRandomCards } from './function.js'

export function renderModalWindow(status, time) {
    let html = ``
    if (status === 'win') {
        html = `    
        <div class="modal-content">
        <div><img src="./assets/image/win.svg" alt=""></div>
        <h1 class="modal-titele">Вы выиграли!</h1>
        <h2 class="modal-subtitele">Затраченное время:</h2>
        <h3 class="modal-time">${time}</h3>
        <button class="button" id="modalButton">Играть снова</button>
        </div>`
    } else {
        html = `    
        <div class="modal-content">
        <div><img src="./assets/image/dead.svg" alt=""></div>
        <h1 class="modal-titele">Вы проиграли!</h1>
        <h2 class="modal-subtitele">Затраченное время:</h2>
        <h3 class="modal-time">${time}</h3>
        <button class="button" id="modalButton">Играть снова</button>
        </div>`
    }
    return html
}

export function renderStartPage(element) {
    element.innerHTML = `
    <div class="main">
        <h1 class="main_tittle" >Выбери сложность</h1>
        <div class="main_complexity">
            <div class="complexity_item" id="complexity_1">1</div>
            <div class="complexity_item" id="complexity_2">2</div>
            <div class="complexity_item" id="complexity_3">3</div>
        </div>
        <button class="main_button button" id="startGameButton" >Старт</button>
    </div>
    `
    const complexityElement1 = document.getElementById('complexity_1')
    const complexityElement2 = document.getElementById('complexity_2')
    const complexityElement3 = document.getElementById('complexity_3')

    complexityElement1.addEventListener('click', () => {
        complexityElement1.classList.add('item_active')
        complexityElement2.classList.remove('item_active')
        complexityElement3.classList.remove('item_active')
        localStorage.setItem('complexity', 6)
    })
    complexityElement2.addEventListener('click', () => {
        complexityElement2.classList.add('item_active')
        complexityElement1.classList.remove('item_active')
        complexityElement3.classList.remove('item_active')
        localStorage.setItem('complexity', 12)
    })
    complexityElement3.addEventListener('click', () => {
        complexityElement3.classList.add('item_active')
        complexityElement2.classList.remove('item_active')
        complexityElement1.classList.remove('item_active')
        localStorage.setItem('complexity', 18)
    })

    document.getElementById('startGameButton').addEventListener('click', () => {
        let complexity = localStorage.getItem('complexity')
        !complexity
            ? alert('Выберите уровень сложности')
            : renderGamePage(element, Number(complexity))

        delete localStorage.complexity
    })
}

export function renderGamePage(element, complexity) {
    let currentGameCards = getRandomCards(arrCards, complexity)

    let cards = ``
    for (let index = 0; index < complexity; index++) {
        cards += `<div class="card" data-index="${index}">
        <img src="./assets/image/cards/${currentGameCards[index].name}.svg" alt="">
        </div>`
    }

    element.innerHTML = `
    <div class="game">
        <header class="game_header" >
            <div class="game_timer">
                <div class="timer_tittle">
                    <div>min</div>
                    <div>sec</div>
                </div>
                <div class="timer_body" id="timer">00.00</div>
            </div>
            <button class="game_button button" id="gameBodyButton">Начать заново</button>
        </header>
        <div class="game_body" id="game_body">
            ${cards}
        </div>
    </div>
    <div class="modal-container" id="modal"> 
    </div>
    `
    document
        .getElementById('gameBodyButton')
        .addEventListener('click', () => renderStartPage(element))

    let timerElement = document.getElementById('timer')
    let mls = 0
    let idStopwatch
    setTimeout(() => {
        idStopwatch = setInterval(() => {
            timerElement.innerHTML = `${
                ~~(mls / 60) < 10 ? '0' + ~~(mls / 60) : ~~(mls / 60)
            }.${mls % 60 < 10 ? '0' + (mls % 60) : mls % 60}`
            mls++
        }, 1000)
    }, 5000)

    const size = document.getElementById('game_body')

    if (complexity === 6) {
        size.style.gridTemplateColumns = 'repeat(3, 95px)'
        size.style.gridTemplateRows = 'repeat(2, 133px)'
    } else {
        if (complexity === 12) {
            size.style.gridTemplateColumns = 'repeat(4, 95px)'
            size.style.gridTemplateRows = 'repeat(3, 133px)'
        } else {
            size.style.gridTemplateColumns = 'repeat(6, 95px)'
            size.style.gridTemplateRows = 'repeat(3, 133px)'
        }
    }

    let arrCardsElement = document.querySelectorAll('.card')

    setTimeout(() => {
        for (let index = 0; index < arrCardsElement.length; index++) {
            arrCardsElement[
                index
            ].innerHTML = `<img src="./assets/image/shirt.svg" alt="">`
        }
    }, 5000)

    let firstCard = ''
    let secondCard = ''
    let counterCards = 0

    for (let card of document.querySelectorAll('.card')) {
        card.addEventListener('click', () => {
            let modalElement = document.getElementById('modal')
            let index = card.dataset.index
            const nameCard = currentGameCards[index].name
            if (firstCard === '') {
                firstCard = nameCard
                card.style.pointerEvents = 'none'
            } else {
                secondCard = nameCard
                card.style.pointerEvents = 'none'
                if (firstCard === secondCard) {
                    firstCard = ''
                    secondCard = ''
                    counterCards += 2
                    if (counterCards === complexity) {
                        modalElement.innerHTML = renderModalWindow(
                            'win',
                            timerElement.innerHTML
                        )
                        clearInterval(idStopwatch)
                        setTimeout(() => {
                            modalElement.style.opacity = 1
                            modalElement.style.pointerEvents = 'all'
                        }, 500)
                        document
                            .getElementById('modalButton')
                            .addEventListener('click', () =>
                                renderStartPage(element)
                            )
                    }
                } else {
                    modalElement.innerHTML = renderModalWindow(
                        'dead',
                        timerElement.innerHTML
                    )
                    clearInterval(idStopwatch)
                    setTimeout(() => {
                        modalElement.style.opacity = 1
                        modalElement.style.pointerEvents = 'all'
                    }, 500)
                    document
                        .getElementById('modalButton')
                        .addEventListener('click', () =>
                            renderStartPage(element)
                        )
                }
            }
            card.innerHTML = `<img src="./assets/image/cards/${nameCard}.svg" alt="">`
        })
    }
}
