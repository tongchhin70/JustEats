import { defaultValues } from "./defaultValues.js"

function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Element not found: ${selector}`);
    }
    return element;
}

function createUpgrade() {
    const upgradesContainer = document.getElementById('upgrade-container');
    const template = document.getElementById('upgrade-template').textContent;
    let htmlContent = '';

    if (!Array.isArray(defaultValues) || defaultValues.length === 0) {
        console.error('defaultValues is not properly defined.');
        return;
    }

    // Build the upgrades HTML content
    defaultValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key]);
        });

        htmlContent += html;
    });

    upgradesContainer.innerHTML = htmlContent;
}

createUpgrade();

export const upgrades = [
    {
        name: 'clicker',
        cost: safeQuerySelector('.clicker-cost'),
        parseCost: parseFloat(safeQuerySelector('.clicker-cost')?.innerHTML || 0),
        increase: safeQuerySelector('.clicker-increase'),
        parseIncrease: parseFloat(safeQuerySelector('.clicker-increase')?.innerHTML || 0),
        level: safeQuerySelector('.clicker-level'),
        gemMultiplier: 1.01,
        costMultiplier: 1.12,
    },
    {
        name: 'pickaxe',
        cost: safeQuerySelector('.pickaxe-cost'),
        parseCost: parseFloat(safeQuerySelector('.pickaxe-cost')?.innerHTML || 0),
        increase: safeQuerySelector('.pickaxe-increase'),
        parseIncrease: parseFloat(safeQuerySelector('.pickaxe-increase')?.innerHTML || 0),
        level: safeQuerySelector('.pickaxe-level'),
        gemMultiplier: 1.025,
        costMultiplier: 1.25,
    },
    {
        name: 'miner',
        cost: safeQuerySelector('.miner-cost'),
        parseCost: parseFloat(safeQuerySelector('.miner-cost')?.innerHTML || 0),
        increase: safeQuerySelector('.miner-increase'),
        parseIncrease: parseFloat(safeQuerySelector('.miner-increase')?.innerHTML || 0),
        level: safeQuerySelector('.miner-level'),
        gemMultiplier: 1.015,
        costMultiplier: 1.5,
    },
    {
        name: 'factory',
        cost: safeQuerySelector('.factory-cost'),
        parseCost: parseFloat(safeQuerySelector('.factory-cost')?.innerHTML || 0),
        increase: safeQuerySelector('.factory-increase'),
        parseIncrease: parseFloat(safeQuerySelector('.factory-increase')?.innerHTML || 0),
        level: safeQuerySelector('.factory-level'),
        gemMultiplier: 1.01,
        costMultiplier: 2,
    },
];