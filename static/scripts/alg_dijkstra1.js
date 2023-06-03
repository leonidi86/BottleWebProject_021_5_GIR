var shortestPathPredecessors = [];

// Функция для создания таблицы ввода матрицы расстояний
function createMatrixTable(numVertices) {
    var matrixTable = document.getElementById("matrix-table");

    // Очищаем таблицу
    matrixTable.innerHTML = "";

    // Создаем заголовок таблицы
    var headerRow = document.createElement("tr");
    var headerCell = document.createElement("th");
    headerCell.innerText = "Матрица расстояний";
    headerCell.colSpan = numVertices + 1;
    headerRow.appendChild(headerCell);
    matrixTable.appendChild(headerRow);

    // Создаем строки и ячейки таблицы
    for (var i = 0; i < numVertices; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= numVertices; j++) {
            var cell = document.createElement("td");

            if (j === 0) {
                // Создаем ячейку с номером вершины
                var vertexNumber = i + 1;
                cell.innerText = vertexNumber;
            } else {
                // Создаем ячейку с полем ввода расстояния
                var input = document.createElement("input");
                input.type = "number";
                input.name = "distance-cell-" + i + "-" + (j - 1);
                input.required = true;
                cell.appendChild(input);
            }

            row.appendChild(cell);
        }

        matrixTable.appendChild(row);
    }

    // Добавляем класс "pink-table" к таблице
    matrixTable.classList.add("pink-table");
}

// Обработчик события отправки формы
document.getElementById("dijkstra-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем значения формы
    var numVertices = parseInt(document.getElementById("num-vertices").value);
    var sourceVertex = parseInt(document.getElementById("source-vertex").value);

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

    // Обновляем результат
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Кратчайшие пути:</h3>";

    for (var i = 0; i < numVertices; i++) {
        if (i !== sourceVertex) {
            resultDiv.innerHTML += "<p>Кратчайший путь от " + sourceVertex + " до " + i + ": " +
                shortestPaths[i].path.join(" -> ") + "<br>" +
                "Общее расстояние: " + shortestPaths[i].distance + "</p>";
        }
    }
});

// Обработчик изменения значения поля "Количество вершин"
document.getElementById("num-vertices").addEventListener("change", function () {
    var numVertices = parseInt(this.value);
    createMatrixTable(numVertices);
});

// Функция для решения алгоритма Дейкстры
function dijkstra(graph, source) {
    var numVertices = graph.length;
    var visited = new Array(numVertices).fill(false);
    var distances = new Array(numVertices).fill(Number.MAX_VALUE);
    var shortestPaths = new Array(numVertices);

    distances[source] = 0;

    for (var i = 0; i < numVertices; i++) {
        var minDistance = Number.MAX_VALUE;
        var minIndex = -1;

        // Находим вершину с минимальным расстоянием
        for (var v = 0; v < numVertices; v++) {
            if (!visited[v] && distances[v] < minDistance) {
                minDistance = distances[v];
                minIndex = v;
            }
        }

        if (minIndex === -1) {
            break;
        }

        visited[minIndex] = true;

        // Обновляем расстояния до смежных вершин
        for (var j = 0; j < numVertices; j++) {
            if (!visited[j] && graph[minIndex][j] > 0 && distances[minIndex] + graph[minIndex][j] < distances[j]) {
                distances[j] = distances[minIndex] + graph[minIndex][j];
                shortestPathPredecessors[j] = minIndex;
            }
        }
    }

    // Создаем массив кратчайших путей и расстояний
    for (var k = 0; k < numVertices; k++) {
        shortestPaths[k] = {
            path: getPath(source, k),
            distance: distances[k]
        };
    }

    return shortestPaths;
}

// Функция для получения кратчайшего пути от начальной вершины до конечной
function getPath(source, destination) {
    var path = [];
    var currentVertex = destination;

    while (currentVertex !== source) {
        path.unshift(currentVertex);
        currentVertex = shortestPathPredecessors[currentVertex];
    }

    path.unshift(source);

    return path;
}
