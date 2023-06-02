function runFloydAlgorithm() {
    var input = document.getElementById("inputNumber");
    var n = parseInt(input.value);

    if (isNaN(n) || n < 2 || n > 20) {
        alert("Введите число от 2 до 20!");
        return;
    }

    var tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Очищаем содержимое контейнера

    var table = document.createElement("table");
    table.style.border = "1px solid pink"; // Set table border color to pink

    var inputs = []; // Массив для хранения полей ввода

    for (var i = 0; i < n; i++) {
        var row = document.createElement("tr");

        inputs[i] = []; // Создаем вложенный массив для каждой строки

        for (var j = 0; j < n; j++) {
            var cell = document.createElement("td");
            cell.style.color = "white"; // Set text color to white

            var inputField = document.createElement("input");
            inputField.type = "text";
            inputField.setAttribute("data-row", i); // Устанавливаем атрибут data-row
            inputField.setAttribute("data-col", j); // Устанавливаем атрибут data-col
            cell.appendChild(inputField);

            inputs[i][j] = inputField; // Сохраняем поле ввода в массив

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    tableContainer.appendChild(table);

    var button = document.createElement("button");
    button.textContent = "Выполнить алгоритм Флойда";
    button.onclick = performFloydAlgorithm;
    button.style.marginTop = "20px"; 
    tableContainer.appendChild(button);

    function performFloydAlgorithm() {
        var weights = []; // Массив для хранения весов ребер

        // Заполнение матрицы весов из полей ввода
        for (var i = 0; i < n; i++) {
            weights[i] = [];

            for (var j = 0; j < n; j++) {
                var inputValue = parseInt(inputs[i][j].value);
                if (isNaN(inputValue)) {
                    alert("Введите числовые значения в матрицу весов!");
                    return;
                }
                weights[i][j] = inputValue;
            }
        }

        // Алгоритм Флойда
        var distances = [];
        var paths = [];

        // Инициализация матриц расстояний и путей
        for (var i = 0; i < n; i++) {
            distances[i] = [];
            paths[i] = [];

            for (var j = 0; j < n; j++) {
                if (i === j) {
                    distances[i][j] = 0;
                    paths[i][j] = i;
                } else if (weights[i][j] !== undefined) {
                    distances[i][j] = weights[i][j];
                    paths[i][j] = i;
                } else {
                    distances[i][j] = Infinity;
                    paths[i][j] = -1;
                }
            }
        }

        // Выполнение алгоритма Флойда
        for (var k = 0; k < n; k++) {
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (distances[i][k] + distances[k][j] < distances[i][j]) {
                        distances[i][j] = distances[i][k] + distances[k][j];
                        paths[i][j] = paths[k][j];
                    }
                }
            }
        }

        // Вывод результатов
        var resultContainer = document.createElement("div");
        resultContainer.classList.add("result-container");


        var distanceMatrixHeading = document.createElement("h2");
        distanceMatrixHeading.textContent = "Матрица кратчайших расстояний:";

        resultContainer.appendChild(distanceMatrixHeading);

        var distanceMatrixTable = document.createElement("table");
        distanceMatrixTable.style.border = "3px solid pink"; // Set table border color to pink
        for (var i = 0; i < n; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < n; j++) {
                var cell = document.createElement("td");
                cell.style.border = "3px solid pink";
                cell.style.color = "white"; // Set text color to white
                cell.textContent = distances[i][j];
                row.appendChild(cell);
            }

            distanceMatrixTable.appendChild(row);
        }
        resultContainer.appendChild(distanceMatrixTable);

        var pathMatrixHeading = document.createElement("h2");
        pathMatrixHeading.textContent = "Матрица путей:";
        resultContainer.appendChild(pathMatrixHeading);

        var pathMatrixTable = document.createElement("table");
        pathMatrixTable.style.border = "3px solid pink"; // Set table border color to pink
        for (var i = 0; i < n; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < n; j++) {
                var cell = document.createElement("td");
                cell.style.color = "white"; // Set text color to white
                cell.style.border = "3px solid pink";
                cell.textContent = paths[i][j];
                row.appendChild(cell);
            }

            pathMatrixTable.appendChild(row);
        }
        resultContainer.appendChild(pathMatrixTable);

        tableContainer.appendChild(resultContainer);
    }
}
