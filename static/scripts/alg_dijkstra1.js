var shortestPathPredecessors = [];

function createMatrixTable(numVertices) {
    var matrixTable = document.getElementById("matrix-table");

    // Clear the table
    matrixTable.innerHTML = "";

    // Create the table header
    var headerRow = document.createElement("tr");
    var headerCell = document.createElement("th");
    headerCell.innerText = "Матрица расстояний";
    headerCell.colSpan = numVertices + 1;
    headerRow.appendChild(headerCell);
    matrixTable.appendChild(headerRow);

    // Create the column headers
    var columnHeaderRow = document.createElement("tr");
    var emptyCell = document.createElement("td");
    columnHeaderRow.appendChild(emptyCell);

    for (var i = 1; i <= numVertices; i++) {
        var columnHeaderCell = document.createElement("th");
        columnHeaderCell.innerText = i;
        columnHeaderRow.appendChild(columnHeaderCell);
    }

    matrixTable.appendChild(columnHeaderRow);

    // Create the rows and cells of the table
    for (var i = 0; i < numVertices; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= numVertices; j++) {
            var cell = document.createElement("td");

            if (j === 0) {
                // Create a cell with the vertex number
                var vertexNumber = i + 1;
                cell.innerText = vertexNumber;
            } else {
                // Create a cell with the distance input field
                var input = document.createElement("input");
                input.type = "number";
                input.name = "distance-cell-" + i + "-" + (j - 1);
                input.required = true;
                input.min = "0"; // Added restriction for non-negative values

                // Add a value of zero on the diagonal
                if (i === j - 1) {
                    input.value = "0";
                }

                // Add an event listener to mirror the input value
                input.addEventListener("input", function () {
                    var row = parseInt(this.name.split("-")[2]);
                    var column = parseInt(this.name.split("-")[3]);

                    var mirroredInput = document.querySelector(
                        'input[name="distance-cell-' + column + '-' + row + '"]'
                    );

                    mirroredInput.value = this.value;
                });

                cell.appendChild(input);
            }

            row.appendChild(cell);
        }

        matrixTable.appendChild(row);
    }

    // Add the "pink-table" class to the table
    matrixTable.classList.add("pink-table");
}

// Обработчик события отправки формы
document.getElementById("dijkstra-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем значения формы
    var numVertices = parseInt(document.getElementById("num-vertices").value);
    var sourceVertex = parseInt(document.getElementById("source-vertex").value);

    // Проверяем, что введенная вершина больше 1
    if (numVertices < 2) {
        alert("Количество вершин должно быть больше 1.");
        return;
    }

    // Получаем значения ячеек матрицы расстояний
    var distanceMatrix = [];

    for (var i = 0; i < numVertices; i++) {
        var row = [];

        for (var j = 0; j < numVertices; j++) {
            var input = document.getElementsByName("distance-cell-" + i + "-" + j)[0];
            var distance = parseFloat(input.value);

            // Проверяем на пустое значение поля и присваиваем значение бесконечности
            if (input.value === "") {
                if (i === j) {
                    distance = 0;
                    input.value = "0";
                } else {
                    distance = Infinity;
                    input.value = "∞";
                }
            } else {
                // Добавлена проверка на неотрицательные значения
                if (distance < 0 || isNaN(distance)) {
                    alert("Введите неотрицательное числовое значение для расстояния.");
                    return;
                }
            }

            row.push(distance);
        }

        distanceMatrix.push(row);
    }

    // Проверяем существование введенной вершины
    if (sourceVertex < 1 || sourceVertex > numVertices) {
        alert("Введите существующую вершину.");
        return;
    }

    // Заполняем отсутствующие ячейки значением бесконечности
    for (var i = 0; i < numVertices; i++) {
        for (var j = 0; j < numVertices; j++) {
            if (i !== j && distanceMatrix[i][j] === 0) {
                distanceMatrix[i][j] = Infinity;
            }
        }
    }

    // Вызываем функцию решения алгоритма Дейкстры
    var shortestPaths = dijkstra(distanceMatrix, sourceVertex);

    // Обновляем результат
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Результат:</h2><br>";

    for (var i = 0; i < numVertices; i++) {
        if (i !== sourceVertex - 1) {
            // Исправлено сравнение с учетом смещения номеров вершин
            resultDiv.innerHTML +=
                "<p>Кратчайший путь от " +
                sourceVertex +
                " до " +
                (i + 1) +
                ": " +
                shortestPaths[i].path.join(" -> ") +
                "<br>" +
                "Общее расстояние: " +
                shortestPaths[i].distance +
                "</p>";
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

    distances[source - 1] = 0; // Исправлено смещение номеров вершин

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
            if (
                !visited[j] &&
                graph[minIndex][j] > 0 &&
                distances[minIndex] + graph[minIndex][j] < distances[j]
            ) {
                distances[j] = distances[minIndex] + graph[minIndex][j];
                shortestPathPredecessors[j] = minIndex;
            }
        }
    }

    // Создаем массив кратчайших путей и расстояний
    for (var k = 0; k < numVertices; k++) {
        shortestPaths[k] = {
            path: getPath(source - 1, k), // Исправлено смещение номеров вершин
            distance: distances[k],
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
