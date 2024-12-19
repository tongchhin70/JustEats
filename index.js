import { upgrades } from "./constants/upgrades.js"
//import { defaultValues } from "./constants/defaultValues.js"

let gem=document.querySelector('.gem-cost');
let parseGem = parseFloat(gem.innerHTML);

let gpcText = document.getElementById('gpc-text');
let gpsText = document.getElementById('gps-text');

let gemImgContainer = document.querySelector('.gem-img-container');

let gpc = 1;
let gps = 0;

const clickingSound = new Audio('/assets/audio/click1.ogg');

const UpgradeSound = new Audio('/assets/audio/upgrade.ogg');

function save (){
    localStorage.clear();
    upgrades.map((upgrade) => {
        const obj = JSON.stringify({
            parseLevel: parseFloat(upgrade.level.innerHTML),
            parseCost: upgrade.parseIncrease,
            parseIncrease: upgrade.parseIncrease
        
        })
        localStorage.setItem(upgrade.name, obj);
    })

    localStorage.setItem('gpc', JSON.stringify(gpc));
    localStorage.setItem('gps', JSON.stringify(gps));
    localStorage.setItem('gem', JSON.stringify(parseGem));

    console.log(localStorage);
}

function load () {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

        upgrade.parseCost = savedValues.parseCost;
        upgrade.parseIncrease = savedValues.parseIncrease;
        upgrade.level.innerHTML = savedValues.parseLevel;
        upgrade.cost.innerHTML = Math.round(savedValues.parseCost);
        upgrade.increase.innerHTML = upgrade.parseIncrease;
    })
    gpc = JSON.parse(localStorage.getItem('gpc'));
    gps = JSON.parse(localStorage.getItem('gps'));
    parseGem = JSON.parse(localStorage.getItem('gem'));

    gem.innerHTML = Math.round(parseGem);
}

function incrementGem(event) {
    const clickingSound = new Audio('/assets/audio/click1.ogg');
    clickingSound.volume = 0.05
    clickingSound.play()

    parseGem += gpc;
    gem.innerHTML = Math.round(parseGem);

    const x = event.offsetX;
    const y = event.offsetY;

    const div = document.createElement('div');
    div.innerHTML = (`+${Math.round(gpc)}`);
    div.style.cssText = (`color:white; position: absolute; top: ${y}px;  left: ${x}px; font-weight: 600; font-size:20px; pointer-events: none;`)
    gemImgContainer.appendChild(div);

    div.classList.add('fade-up');

    console.log(div);
    timeout(div);
}

function buyUpgrade(upgradeName) {

    const matchUpgrade = upgrades.find((u) => u.name === upgradeName);

    if (!matchUpgrade) {
        console.error(`Upgrade with name "${upgradeName}" not found.`);
        return;
    }

    if (parseGem >= matchUpgrade.parseCost) {

        const UpgradeSound = new Audio('/assets/audio/upgrade.ogg');
        UpgradeSound.volume = 0.1
        UpgradeSound.play()
        
        // Deduct cost and update gems
        parseGem -= matchUpgrade.parseCost;
        gem.innerHTML = Math.round(parseGem);

        // Dynamically requery the level element
        const levelElement = document.querySelector(`.${matchUpgrade.name}-level`);
        const currentLevel = parseInt(levelElement.innerHTML, 10) || 0;
        levelElement.innerHTML = currentLevel + 1;

        // Update cost and increase values
        matchUpgrade.parseIncrease = parseFloat((matchUpgrade.parseIncrease * matchUpgrade.gemMultiplier).toFixed(2));
        document.querySelector(`.${matchUpgrade.name}-increase`).innerHTML = matchUpgrade.parseIncrease;

        matchUpgrade.parseCost *= matchUpgrade.costMultiplier;
        document.querySelector(`.${matchUpgrade.name}-cost`).innerHTML = Math.round(matchUpgrade.parseCost);

        // Update gpc or gps
        if (matchUpgrade.name === 'clicker') {
            gpc += matchUpgrade.parseIncrease;
        } else {
            gps += matchUpgrade.parseIncrease;
        }
    } else {
        console.warn('Not enough gems to buy this upgrade.');
    }
}


const timeout = (div) => {
    setTimeout(() => {
        div.remove();
    }, 800);
}
setInterval (() => {
    parseGem += gps/10;
    gem.innerHTML = Math.round(parseGem);
    gpcText.innerHTML = Math.round(gpc);
    gpsText.innerHTML = Math.round(gps);
}, 100);


window.incrementGem = incrementGem;
window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;