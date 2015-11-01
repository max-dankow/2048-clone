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

function isValidCell(field, col, row) {
    "use strict";
    if (col > 0
            && col <= gameSize
            && row > 0
            && row <= gameSize) {
        return true;
    } else {
        return false;
    }
}

function canMove(field, col, row, offsetCol, offsetRow) {
    "use strict";
    if (isValidCell(field, col + offsetCol, row + offsetRow)
            && field[getIndex(col + offsetCol, row + offsetRow)] === 0) {
        return true;
    } else {
        return false;
    }
}

function canMerge(field, col, row, offsetCol, offsetRow) {
    "use strict";
    if (isValidCell(field, col + offsetCol, row + offsetRow)
            && field[getIndex(col + offsetCol, row + offsetRow)] === field[getIndex(col, row)]) {
        return true;
    } else {
        return false;
    }
}

function moveTile(field, col, row, offsetCol, offsetRow) {
    "use strict";
    var swap = 0, action = false;
    while (canMove(field, col, row, offsetCol, offsetRow)) {
        swap = field[getIndex(col, row)];
        field[getIndex(col, row)] = field[getIndex(col + offsetCol, row + offsetRow)];
        field[getIndex(col + offsetCol, row + offsetRow)] = swap;
        col = col + offsetCol;
        row = row + offsetRow;
        gameUpdate(field, table);
        action = true;
    }
    if (canMerge(field, col, row, offsetCol, offsetRow)) {
        field[getIndex(col + offsetCol, row + offsetRow)] = field[getIndex(col, row)] + 1;
        field[getIndex(col, row)] = 0;
        action = true;
    }
    return action;
}

function fieldMoveUp(field) {
    "use strict";
    var col, row;
    for (col = 1; col <= gameSize; col += 1) {
        for (row = 1; row <= gameSize; row += 1) {
            if (field[getIndex(col, row)] !== 0) {
                moveTile(field, col, row, 0, -1);
            }
        }
    }
}

function fieldMoveDown(field) {
    "use strict";
    var col, row;
    for (col = 1; col <= gameSize; col += 1) {
        for (row = gameSize; row > 0; row -= 1) {
            if (field[getIndex(col, row)] !== 0) {
                moveTile(field, col, row, 0, 1);
            }
        }
    }
}

function fieldMoveLeft(fieldf) {
    "use strict";
    var col, row;
    for (row = 1; row <= gameSize; row += 1) {
        for (col = 1; col <= gameSize; col += 1) {
            if (field[getIndex(col, row)] !== 0) {
                moveTile(field, col, row, -1, 0);
            }
        }
    }
}

function fieldMoveRight(fieldf) {
    "use strict";
    var col, row;
    for (row = 1; row <= gameSize; row += 1) {
        for (col = gameSize; col > 0; col -= 1) {
            if (field[getIndex(col, row)] !== 0) {
                moveTile(field, col, row, 1, 0);
            }
        }
    }
}

function keyPressHandler(event) {
    "use strict";
    var key = event.keyCode;
    
    switch (key) {
    // Left
    case 37:
        fieldMoveLeft(field);
        addCells(field, 1, 1);
        gameUpdate(field, table);
        break;
    // Up
    case 38:
        fieldMoveUp(field);
        addCells(field, 1, 1);
        gameUpdate(field, table);
        break;
    // Right
    case 39:
        fieldMoveRight(field);
        addCells(field, 1, 1);
        gameUpdate(field, table);
        break;
    // Down
    case 40:
        fieldMoveDown(field);
        addCells(field, 1, 1);
        gameUpdate(field, table);
        break;
    default:
        return;
    }
    event.preventDefault();
}

initField(field);
gameUpdate(field, table);