const heroes  = JSON.parse(json);

//создается div с карточкой супергероя
function renderHeroCard(index) {
    return `<div class='superhero' id="superhero_${index}"'>
        <h2>${heroes[index].name}</h2>
        <div style="background-image: url(clip.png)" class="btn btn_${index}" data-index="${index}" data-state="maininfo">
        Click</div>
        <div class='superhero_info_${index}'>
        ${renderHeroInfo(index)}
        </div>
        </div>`;
}

//основная информация про супергероя
function renderHeroInfo(index) {
    return `<div><b class="q_title">Вселенная:</b> <span class="font">${heroes[index].universe}</span></div>
        <div><b class="q_title">Альтер эго:</b> ${heroes[index].alterego}</div>
        <div><b class="q_title">Род деятельности:</b> ${heroes[index].occupation}</div>
        <div><b class="q_title">Друзья:</b> ${heroes[index].friends}</div>
        <div><b class="q_title">Суперсилы:</b> ${heroes[index].superpowers}</div>
        <div style="background-image: url(${heroes[index].url})" class="superhero__pic"></div> `
}

function rating(index) {
    return `<div class="rating-area">
            <input type="radio" id="star-5_${index}" name="rating_${index}" value="5">
            <label for="star-5_${index}" title="Оценка «5»"></label>	
            <input type="radio" id="star-4_${index}" name="rating_${index}" value="4">
            <label for="star-4_${index}" title="Оценка «4»"></label>    
            <input type="radio" id="star-3_${index}" name="rating_${index}" value="3">
            <label for="star-3_${index}" title="Оценка «3»"></label>  
            <input type="radio" id="star-2_${index}" name="rating_${index}" value="2">
            <label for="star-2_${index}" title="Оценка «2»"></label>    
            <input type="radio" id="star-1_${index}" name="rating_${index}" value="1">
            <label for="star-1_${index}" title="Оценка «1»"></label>
        </div>`;
}

function initStorage(selector) {
    //сохранение в localStorage
    function save(data) {
        localStorage.setItem(selector, JSON.stringify(data));
    }

    //изменение данных из localStorage
    function onChange(event) {
        const element = event.target;
        const name = element.name;
        const value = element.value;
        data[name] = value;
        save(data);
    }

    //сохраняем в массив все input[type=radio]
    const elements = document.querySelectorAll(selector);
    
    //берем из localStorage
    let data = localStorage.getItem(selector);

    if(data) { // если в сторадже что-то есть
        // то можем и распарсить
        data = JSON.parse(data);
    } else {
        // иначе парсить нельзя, будет ошибка
        // присвоим дефолтное значение и сохраним
        save(data = {});
    }
    
    for (const element of elements) {
        const name = element.name;
        const value = element.value;
        if(data[name] === value) { // если текущий элемент отмечен в сторадже
            // то отметим и на странице
            element.checked = true;
        }
        // навесим созданый вне цикла хандлер на событие
        element.addEventListener("change", onChange); 
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    let heroContent = "";
    let index = 0;
    for (const hero of heroes) {
        heroContent += `<div class="info__card">${renderHeroCard(index)}
        ${rating(index)}</div> `;
        index++;
    }
    document.querySelector(".info").innerHTML = heroContent;
    index = 0;
    for (const hero of heroes) {
        document.querySelector(`.btn_${index}`).addEventListener('click', (element) => {
            const i = element.currentTarget.dataset.index;
            if (element.currentTarget.dataset.state == "maininfo"){
                document.querySelector(`.superhero_info_${i}`).innerHTML = `<div>${heroes[i].info}</div>`;
                element.currentTarget.dataset.state = "addinfo";
            }
            else {
                document.querySelector(`.superhero_info_${i}`).innerHTML = renderHeroInfo(i);
                element.currentTarget.dataset.state = "maininfo";
            }
        });
        index++;
    };

    initStorage("input[type=radio]");
});

