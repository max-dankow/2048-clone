function newGameButton() {
//    window.alert("New Game");
    var canvas = document.getElementById("draw-area"),
        context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function keyPressAnaliser(key) {
//   window.alert(key); 
}

var interval = window.prompt("Enter timer interval in miliseconds", 100);
window.setInterval(function () {
    "use strict";
    var canvas = document.getElementById("draw-area"),
        canvasSize = {
            height : canvas.height,
            width : canvas.width
        },
        select = {
            column : Math.floor(Math.random() * 10),
            row : Math.floor(Math.random() * 10)
        },
        scale = {
            column : canvasSize.width / 10,
            row : canvasSize.height / 10
        },
        color = Math.floor(Math.random() * 0xFFFFFF).toString(16),
        context = canvas.getContext("2d"),
        column,
        row;
    context.fillStyle = '#' + color;
    context.fillRect(select.column * scale.column, select.row * scale.row, scale.column, scale.row);
}, interval);