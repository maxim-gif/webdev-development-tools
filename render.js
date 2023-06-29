import { arrCards } from "./storagedata.js";
import { getRandomCards} from "./function.js";
export function renderStartPage (element) {
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
    const complexityElement1 = document.getElementById("complexity_1")
    const complexityElement2 = document.getElementById("complexity_2")
    const complexityElement3 = document.getElementById("complexity_3")

    complexityElement1.addEventListener("click", () => {
        complexityElement1.classList.add("item_active")
        complexityElement2.classList.remove("item_active")
        complexityElement3.classList.remove("item_active")
        localStorage.setItem("complexity", 6)
    })
    complexityElement2.addEventListener("click", () => {
        complexityElement2.classList.add("item_active")
        complexityElement1.classList.remove("item_active")
        complexityElement3.classList.remove("item_active")
        localStorage.setItem("complexity", 12)
    })
    complexityElement3.addEventListener("click", () => {
        complexityElement3.classList.add("item_active")
        complexityElement2.classList.remove("item_active")
        complexityElement1.classList.remove("item_active")
        localStorage.setItem("complexity", 18)
    })
    
    
    document.getElementById("startGameButton").addEventListener("click", () => {
        let complexity = localStorage.getItem("complexity")
        console.log(!complexity);
        !complexity ? alert("Выберите уровень сложности") : renderGamePage(element, Number(complexity))

        delete localStorage.complexity
    })

}

export function renderGamePage(element, complexity ) {
    let cards = ``
    for (let index = 0; index < complexity; index++) {
        cards += 
        `<div class="card" data-index="${index}">
        <img src="./assets/image/shirt.svg" alt="">
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
                <div class="timer_body">00.00</div>
            </div>
            <button class="game_button button">Начать заново</button>
        </header>
        <div class="game_body" id="game_body">
            ${cards}
        </div>
    </div>
    `
    const size = document.getElementById("game_body");
    if (complexity === 6) {
        size.style.gridTemplateColumns = "repeat(3, 95px)"
        size.style.gridTemplateRows = "repeat(2, 133px)"
    } else {
        if (complexity === 12) {
            size.style.gridTemplateColumns = "repeat(4, 95px)"
            size.style.gridTemplateRows = "repeat(3, 133px)"
        } else {
            size.style.gridTemplateColumns = "repeat(6, 95px)"
            size.style.gridTemplateRows = "repeat(3, 133px)"
        }
    }

    let currentGameCards = getRandomCards(arrCards, complexity);


    for (let card of document.querySelectorAll(".card")) {
        card.addEventListener("click", () => {
          let index = card.dataset.index
          const nameCard = currentGameCards[index];
          card.innerHTML = `<img src="./assets/image/cards/${nameCard}.svg" alt="">`
    
        });
      }
}