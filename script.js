 // 1. Анимация появления блоков при скролле (Scroll Reveal)
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });
});

// 2. Логика интерактивной карты с плавной анимацией карточки
const pointData = {
    1: {
        title: "Эвакуированный завод им. Кирова",
        coords: "43.2671° N, 76.9123° E",
        stamp: "ОБЪЕКТ №011 · ПРЕДПРИЯТИЕ",
        desc: "Сюда было перебазировано оборудование машиностроительного завода с западных рубежей. Выпускал продукцию для фронта круглосуточно силами женщин и подростков.",
        today: "Сейчас на этом месте промышленный комплекс и современные жилые кварталы.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
    },
    2: {
        title: "Эвакогоспиталь №1235",
        coords: "43.2450° N, 76.9450° E",
        stamp: "ОБЪЕКТ №024 · ГОСПИТАЛЬ",
        desc: "Размещался в здании одной из центральных школ Алматы. Тысячи раненых бойцов прошли через хирургическую реабилитацию в этом месте.",
        today: "Сегодня здесь функционирует общеобразовательная школа города.",
        img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
    },
    3: {
        title: "Квартал эвакуированной интеллигенции",
        coords: "43.2550° N, 76.9300° E",
        stamp: "ОБЪЕКТ №042 · ЛЮДИ",
        desc: "Здесь проживали эвакуированные ученые, писатели, художники и кинематографисты (включая Сергея Эйзенштейна и академика Вернадского).",
        today: "Исторический центр старого Алматы, памятники архитектуры.",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
    },
    4: {
        title: "Мемориал тыловому Алматы",
        coords: "43.2300° N, 76.9500° E",
        stamp: "ОБЪЕКТ №099 · ПАМЯТЬ",
        desc: "Памятное место, посвященное подвигу алматинцев, которые ковали Победу в глубоком тылу, отдавая все силы фронту.",
        today: "Мемориальный парк и аллея памяти.",
        img: "https://images.unsplash.com/photo-1569000155364-e22c2b3e8e7a?auto=format&fit=crop&w=600&q=80"
    },
    5: {
        title: "Эвакуированная фабрика текстиля",
        coords: "43.2750° N, 76.9600° E",
        stamp: "ОБЪЕКТ №055 · ПРЕДПРИЯТИЕ",
        desc: "Выпуск тканей для обмундирования советских солдат. Работали в три смены без выходных.",
        today: "Современный бизнес-центр и складские терминалы.",
        img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
    },
    6: {
        title: "Республиканский эвакуационный пункт",
        coords: "43.2200° N, 76.9100° E",
        stamp: "ОБЪЕКТ №078 · ГОСПИТАЛЬ",
        desc: "Сортировочный медицинский пункт, распределявший прибывающих раненых по госпиталям столицы советского Казахстана.",
        today: "Жилой микрорайон.",
        img: "https://images.unsplash.com/photo-1519494026892-80e9034610b0?auto=format&fit=crop&w=600&q=80"
    }
};

function showPointInfo(id) {
    const item = pointData[id];
    if (!item) return;
    
    const card = document.getElementById('infoCard');
    card.classList.remove('fade-content');
    void card.offsetWidth;
    card.classList.add('fade-content');

    document.getElementById('cardTitle').innerText = item.title;
    document.getElementById('cardCoords').innerText = item.coords;
    document.getElementById('cardStamp').innerText = item.stamp;
    document.getElementById('cardDesc').innerText = item.desc;
    document.getElementById('cardToday').innerHTML = `<strong>Сегодня на этом месте:</strong> ${item.today}`;
    document.getElementById('cardImg').src = item.img;
}

function filterMap(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    const points = document.querySelectorAll('.map-point');
    points.forEach(point => {
        if (category === 'all' || point.getAttribute('data-category') === category) {
            point.style.display = 'block';
        } else {
            point.style.display = 'none';
        }
    });
}

// 3. Логика таймлайна «Алматы по годам» с анимацией
const yearData = {
    1941: {
        stamp: "ХРОНИКА 1941 ГОДА",
        title: "Первые эшелоны с Запада",
        desc: "В Алматы прибывают первые эвакуированные заводы, фабрики и тысячи специалистов. Город принимает эвакуированных ленинградцев, москвичей и украинцев. Разворачиваются первые госпитали."
    },
    1942: {
        stamp: "ХРОНИКА 1942 ГОДА",
        title: "Пик эвакуации и перестройки тыла",
        desc: "Массовый запуск эвакуированных заводов на полную мощность. Открытие десятков новых госпиталей. Алматы становится одним из ключевых культурных и научно-производственных центров страны."
    },
    1943: {
        stamp: "ХРОНИКА 1943 ГОДА",
        title: "Всё для фронта, всё для победы",
        desc: "Бесперебойный выпуск военной продукции, боеприпасов, обмундирования. Научные институты под руководством Академии наук СССР разрабатывают новые технологии для фронта."
    },
    1944: {
        stamp: "ХРОНИКА 1944 ГОДА",
        title: "Наращивание мощностей",
        desc: "Наряду с военной продукцией начинается постепенное восстановление и выпуск товаров народного потребления. Укрепление тыловой базы."
    },
    1945: {
        stamp: "ХРОНИКА 1945 ГОДА",
        title: "Долгожданная Победа",
        desc: "Подведение итогов тылового подвига Алматы. Встреча героев-победителей, возвращение эвакуированных коллективов на родину и увековечение памяти павших."
    }
};

function setYear(year, element) {
    document.querySelectorAll('.year-node').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
    
    const data = yearData[year];
    const content = document.getElementById('yearContent');
    
    content.classList.remove('fade-content');
    void content.offsetWidth;
    content.classList.add('fade-content');

    content.innerHTML = `
        <span class="archive-stamp">${data.stamp}</span>
        <h3 style="color: var(--color-cream); margin-bottom: 0.5rem;">${data.title}</h3>
        <p style="color: var(--color-gray);">${data.desc}</p>
    `;
}

// 4. Интерактивный маршрут с плавным переключением
const routeSteps = [
    {
        stamp: "ОСТАНОВКА №1 · ПРИБЫТИЕ",
        title: "Железнодорожный вокзал Алма-Ата 2",
        desc: "Сюда непрерывно прибывали эшелоны с эвакуированными заводами, ранеными бойцами и беженцами со всего западного фронта. На перроне круглосуточно дежурили волонтеры и врачи."
    },
    {
        stamp: "ОСТАНОВКА №2 · ЛЕЧЕНИЕ",
        title: "Эвакуационный госпиталь №1235",
        desc: "Следующая точка маршрута — здания школ и общественных учреждений, переоборудованные под госпитали для возвращения раненых солдат в строй."
    },
    {
        stamp: "ОСТАНОВКА №3 · ПРОИЗВОДСТВО",
        title: "Эвакуированное предприятие",
        desc: "Заводы, развернутые в стенах алматинских артелей и новых цехов, выпускающие снаряды, обмундирование и детали для фронта."
    },
    {
        stamp: "ОСТАНОВКА №4 · БЫТ И ЖИЗНЬ",
        title: "Жилые кварталы и уплотнение",
        desc: "Как жили алматинцы: прием эвакуированных семей в каждый дом, карточная система снабжения и работа в тылу на износ."
    },
    {
        stamp: "ОСТАНОВКА №5 · ПАМЯТЬ",
        title: "Мемориальные места памяти",
        desc: "Памятники и обелиски, сохранившие память о героизме тылового Алматы и подвиге его жителей в 1941–1945 годах."
    }
];

let currentRouteIndex = 0;

function nextRouteStep() {
    currentRouteIndex = (currentRouteIndex + 1) % routeSteps.length;
    updateRouteView();
}

function prevRouteStep() {
    currentRouteIndex = (currentRouteIndex - 1 + routeSteps.length) % routeSteps.length;
    updateRouteView();
}

function updateRouteView() {
    const step = routeSteps[currentRouteIndex];
    const block = document.getElementById('routeContentBlock');

    block.classList.remove('fade-content');
    void block.offsetWidth;
    block.classList.add('fade-content');

    document.getElementById('routeStamp').innerText = step.stamp;
    document.getElementById('routeTitle').innerText = step.title;
    document.getElementById('routeDesc').innerText = step.desc;

    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`st${i}`);
        if (i <= currentRouteIndex + 1) {
            el.classList.add('active-step');
        } else {
            el.classList.remove('active-step');
        }
    }
}

// 5. Слайдер Тогда / Сейчас
function slideCompare(val) {
    document.getElementById('nowLayer').style.width = val + '%';
    document.getElementById('sliderLine').style.left = val + '%';
}