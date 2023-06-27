export function renderStartPage (element) {
    element.innerHTML = `
    <div class="main">
        <h1 class="main_tittle" >Выбери сложность</h1>
        <div class="main_complexity">
            <div class="complexity_item">1</div>
            <div class="complexity_item">2</div>
            <div class="complexity_item">3</div>
        </div>
        <button class="main_button" >Старт</button>
    </div>
    `
}