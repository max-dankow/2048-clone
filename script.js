var gameSize = 4,
    // Отражает состояние игрового поля. Хранит показатель степени 2. 
    field = [],
    colors = ["white", "coral", "yellow", "springgreen", "dodgerblue"],
    table = document.getElementById("game-table");

function countCellsOfValue(field, value) {
    "use strict";
    var i, number = 0;
    for (i = 0; i < field.length; i += 1) {
        if (field[i] === value) {
            number += 1;
        }
    }
    return number;
}

function addCells(field, value, amount) {
    "use strict";
    var i = 0, index;
    if (countCellsOfValue(field, 0) < amount) {
        return undefined;
    }
    do {
        index = Math.floor(Math.random() * (gameSize * gameSize));
        if (field[index] === 0) {
            field[index] = value;
            i += 1;
        }
    } while (i < amount);
    return true;
}

// Изменяет рамеры поля в соответствии с размерами игры.
// В несколько произвольных клеток помещает ненулевые фишки.
function initField(field) {
    "use strict";
    var i = 0, nonZeroIndex = 0;
    field.length = gameSize * gameSize;
    for (i = 0; i < field.length; i += 1) {
        field[i] = 0;
    }
    addCells(field, 1, 3);
    addCells(field, 10, 1);
    addCells(field, 2, 1);
    addCells(field, 3, 1);
    addCells(field, 4, 1);
}

function getIndex(col, row) {
    "use strict";
    var index = (row - 1) * gameSize + (col - 1);
    return index;
}

function gameUpdate(field, table) {
    "use strict";
    var col, row, id, value, element;
    for (row = 1; row <= gameSize; row += 1) {
        for (col = 1; col <= gameSize; col += 1) {
            // Возможно это будет медленно, тк обращение к дом медленно.
            id = row + " " + col;
            value = field[getIndex(col, row)];
            element = document.getElementById(id);
            if (value !== 0) {
                element.innerHTML = Math.pow(2, value);
            } else {
                element.innerHTML = "";
            }
            if (colors[value] !== undefined) {
                element.style.backgroundColor = colors[value];
            } else {
                element.style.backgroundColor = "white";
            }
            
        }
    }
}

function newGameButton() {
    "use strict";
    initField(field);
    gameUpdate(field, table);
}

initField(field);
gameUpdate(field, table);