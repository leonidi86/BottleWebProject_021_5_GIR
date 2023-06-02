// Функция для создания таблицы ввода матрицы расстояний
function createMatrixTable() {
    // Получаем значения формы
    var numVertices = parseInt(document.getElementById("num-vertices").value);
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
                cell.innerText = "V" + vertexNumber;
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

    // Добавляем таблицу в контейнер
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.appendChild(matrixTable);
}
