// Функция для создания таблицы ввода матрицы расстояний
function createMatrixTable(numVertices) {
    var matrixTable = document.getElementById("matrix-table");

    // Очищаем таблицу
    matrixTable.innerHTML = "";

    // Создаем заголовок таблицы
    var headerRow = document.createElement("tr");
    var headerCell = document.createElement("th");
    headerCell.innerText = "Матрица расстояний";
    headerCell.colSpan = numVertices;
    headerRow.appendChild(headerCell);
    matrixTable.appendChild(headerRow);

    // Создаем строки и ячейки таблицы
    for (var i = 0; i < numVertices; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < numVertices; j++) {
            var cell = document.createElement("td");
            var input = document.createElement("input");
            input.type = "number";
            input.name = "distance-cell-" + i + "-" + j;
            input.required = true;
            cell.appendChild(input);
            row.appendChild(cell);
        }

        matrixTable.appendChild(row);
    }
}

// Обработчик события отправки формы
document.getElementById("dijkstra-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем значения формы
    var numVertices = parseInt(document.getElementById("num-vertices").value);
    var sourceVertex = document.getElementById("source-vertex").value;

    // Получаем значения ячеек матрицы расстояний
    var distanceMatrix = [];

    for (var i = 0; i < numVertices; i++) {
        var row = [];

        for (var j = 0; j < numVertices; j++) {
            var input = document.getElementsByName("distance-cell-" + i + "-" + j)[0];
            row.push(parseFloat(input.value));
        }

        distanceMatrix.push(row);
    }

    // Вызываем функцию решения алгоритма Дейкстры
    var shortestPaths = dijkstra(distanceMatrix, sourceVertex);

    // Отображаем результат
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Shortest Paths:</h3>";

    for (var i = 0; i < numVertices; i++) {
        if (i !== sourceVertex) {
            resultDiv.innerHTML += "<p>Shortest path from " + sourceVertex + " to " + i + ": " +
                shortestPaths[i].path.join(" -> ") + "<br>" +
                "Total distance: " + shortestPaths[i].distance + "</p>";
        }
    }
});

// Обработчик изменения значения поля "Количество вершин"
document.getElementById("num-vertices").addEventListener("change", function () {
    var numVertices = parseInt(this.value);
    createMatrixTable(numVertices);
});

// Инициализируем таблицу с одной ячейкой
createMatrixTable(1);