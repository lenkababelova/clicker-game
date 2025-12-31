let points = 0;
let level = 1;
let playerName = '';

const $form = document.querySelector('.player_name');
const $pointsNumber = document.querySelector('.points');
const $levelNumber = document.querySelector('.level');
const $fairy = document.querySelector('.fairy');
const $info = document.querySelector('.info');
const $owl = document.querySelector('.owl');
const $fog = document.querySelector('.fog');


const fairyPositions = [
    { left: '6rem', bottom: '7rem' },
    { left: '24rem', bottom: '7.5rem' },
    { left: '41rem', bottom: '3.5rem' },
    { left: '56rem', bottom: '8.5rem' },
    { left: '80rem', bottom: '9.5rem' }
];

const levelMessages = [
    "welcome to your journey!",
    "the forest deepens around you...",
    "you feel the air change as you go on.",
    "you're getting closer to the Magic tree!",
    "congratulations! You've reached the Magic tree!"
];

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    playerName = event.target.playerName.value;
    $form.style.display = 'none';
    init();
});

const showInfo = (message) => {
    $info.textContent = `${playerName}, ${message}`;
};

const updateOwlPosition = (level) => {
    if (level === 3) {
        $owl.style.top = '9.5rem';
    } else if (level === 4) {
        $owl.style.top = '6.8rem';
        $owl.style.left = '27.3rem';
    } else if (level === 5) {
        $owl.style.top = '1.7rem';
    } else {
        $owl.style.top = '6rem';
    }
};

const updatePoints = () => {
    $pointsNumber.textContent = `Points: ${points}`;
    localStorage.setItem('points', points);

    if (points >= level * 50) {
        level++;
        $levelNumber.textContent = `Level: ${level}`;
        localStorage.setItem('level', level);
        updateBackground(level);
        moveFairy()
        updateOwlPosition(level);
        showInfo(levelMessages[level - 1]);

    } else if (points < (level - 1) * 50) {
        level--;
        if (level < 1) level = 1;
        $levelNumber.textContent = `Level: ${level}`;
        updateBackground(level);
        moveFairy();
        updateOwlPosition(level);
        showInfo(levelMessages[level - 1]);
    }

    if (level === 5 && points >= 200) {
        $info.style.color = 'green';
        $info.style.fontWeight = 'bold';
    }
};


const moveFairy = () => {
    const currentStone = fairyPositions[level - 1];
    if (currentStone) {
        $fairy.style.left = currentStone.left;
        $fairy.style.bottom = currentStone.bottom;
    }
};

const updateBackground = (level) => {
    const body = document.querySelector('body');

    switch (level) {
        case 1:
            body.style.backgroundImage = 'url(assets/forest_layer1.png)';
            break;
        case 2:
            body.style.backgroundImage = 'url(assets/forest_layer8.png)';
            break;
        case 3:
            body.style.backgroundImage = 'url(assets/forest_layer3.png)';
            break;
        case 4:
            body.style.backgroundImage = 'url(assets/forest_layer7.png)';
            break;
        case 5:
            body.style.backgroundImage = 'url(assets/forest_layer9.png)';
            break;
    }
};

setInterval(() => {
    $fog.style.display = 'block';
    $fog.classList.add('active');
    setTimeout(() => {
        $fog.classList.remove('active');
    }, 5000);
}, 15000);

$fog.addEventListener('click', () => {
    points -= 20;
    if (points < 0) points = 0;
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
    $fog.style.display = 'none';
});

document.querySelector('.mushroom').addEventListener('click', () => {
    switch (level) {
        case 1:
            points += 1;
            break;
        case 2:
            points += 2;
            break;
        case 3:
            points -= 1;
            break;
        case 4:
            points += 3;
            break;
        case 5:
            points -= 2;
    }
    console.log('Mushroom clicked! Points:', points);
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
});


document.querySelector('.squirrel').addEventListener('click', () => {
    switch (level) {
        case 1:
            points += 2;
            break;
        case 2:
            points -= 2;
            break;
        case 3:
            points += 3;
            break;
        case 4:
            points -= 2;
            break;
        case 5:
            points += 1;
    }
    console.log('squirrel clicked! Points:', points);
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
});


document.querySelector('.owl').addEventListener('click', () => {
    switch (level) {
        case 1:
            points += 3;
            break;
        case 2:
            points -= 1;
            break;
        case 3:
            points += 2;
            break;
        case 4:
            points -= 1;
            break;
        case 5:
            points += 2;
    }
    console.log('Owl clicked! Points:', points);
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
});


document.querySelector('.rat').addEventListener('click', () => {
    switch (level) {
        case 1:
            points -= 2;
            break;
        case 2:
            points += 1;
            break;
        case 3:
            points -= 2;
            break;
        case 4:
            points += 1;
            break;
        case 5:
            points += 3;
    }
    console.log('Rat clicked! Points:', points);
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
});


document.querySelector('.plant').addEventListener('click', () => {
    switch (level) {
        case 1:
            points -= 1;
            break;
        case 2:
            points += 3;
            break;
        case 3:
            points += 1;
            break;
        case 4:
            points += 2;
            break;
        case 5:
            points -= 1;
    }
    console.log('Plant clicked! Points:', points);
    $pointsNumber.textContent = `Points: ${points}`;
    updatePoints();
});

document.querySelector('.reset').addEventListener('click', () => {
    localStorage.removeItem('points');
    localStorage.removeItem('level');
    location.reload();
});


const init = () => {
    if (localStorage.getItem('points')) {
        points = parseInt(localStorage.getItem('points'));
    }
    if (localStorage.getItem('level')) {
        level = parseInt(localStorage.getItem('level'));
    }
    $pointsNumber.textContent = `Points: ${points}`;
    $levelNumber.textContent = `Level: ${level}`;
    updateBackground(level);
    moveFairy();
    showInfo(levelMessages[level - 1]);
};
init();