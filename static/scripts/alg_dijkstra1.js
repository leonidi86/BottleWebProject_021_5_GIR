function fillMatrix() {
    setMatrixInputSize(); // Изменяем размер матрицы на 3
    var numVertices = 3; // Устанавливаем количество вершин равным 3
    document.getElementById("num-vertices").value = numVertices;
    var matrix = document.getElementById("inputMatrix");
    matrix.value = "0 2 10000\n2 0 7\n10000 7 0";

    // Проверка на пустые поля
    if (!matrix.value.trim()) {
        alert("Матрица не может быть пустой!");
        return;
    }
}
document.getElementById("fillMatrixButton").addEventListener("click", fillMatrix);
function runDijkstraAlgorithm() {
    event.preventDefault();
    var inputMatrix = document.getElementById("inputMatrix").value;

    // Проверка на пустые поля
    if (!inputMatrix.trim()) {
        alert("Матрица не может быть пустой!");
        return;
    };
    var matrixRows = inputMatrix.trim().split("\n");
    var matrix = [];
    var numberRegex = /^\d+$/; // Регулярное выражение для положительных целых чисел

    for (var i = 0; i < matrixRows.length; i++) {
        var row = matrixRows[i].trim().split(/\s+/);
        if (row.length !== matrixRows.length) {
            alert("Количество значений в строке " + (i + 1) + " не соответствует размеру матрицы!");
            return;
        }
        for (var j = 0; j < row.length; j++) {
            if (!numberRegex.test(row[j])) {
                alert("Матрица должна содержать только положительные числа!");
                return;
            }
            row[j] = parseInt(row[j]);
            if (row[j] < 0) {
                alert("Матрица должна содержать только положительные числа!");
                return;
            }
        }
        matrix.push(row);
    }
    var n = matrix.length;

    // Проверка на указание стартовой вершины
    var startVertex = parseInt(document.getElementById("startVertex").value);
    if (isNaN(startVertex)) {
        alert("Не указана стартовая вершина!");
        return;
    }
    startVertex -= 1; // Преобразуем внутреннее представление вершины (от 0 до n-1)

    if (startVertex < 0 || startVertex >= n) {
        alert("Выбранная вершина находится за пределами доступных вершин!");
        return;
    }

    // Check if there are zeros on the diagonal
    var hasZerosOnDiagonal = checkZerosOnDiagonal(matrix);
    if (!hasZerosOnDiagonal) {
        alert("В матрице должны быть нули на диагонали!");
        return;
    }
    var isMirrored = checkMatrixMirrored(matrix);
    if (!isMirrored) {
        alert("Матрица должна быть заполнена симметрично!");
        return;
    }
    var n = matrix.length;
    var dist = Array(n).fill(Number.MAX_SAFE_INTEGER);
    var visited = Array(n).fill(false);
    var path = Array(n);

    dist[startVertex] = 0;

    for (var count = 0; count < n - 1; count++) {
        var minDist = Number.MAX_SAFE_INTEGER;
        var minVertex = -1;

        for (var v = 0; v < n; v++) {
            if (!visited[v] && dist[v] <= minDist) {
                minDist = dist[v];
                minVertex = v;
            }
        }

        visited[minVertex] = true;

        for (var v = 0; v < n; v++) {
            if (
                !visited[v] &&
                matrix[minVertex][v] !== 0 &&
                dist[minVertex] !== Number.MAX_SAFE_INTEGER &&
                dist[minVertex] + matrix[minVertex][v] < dist[v]
            ) {
                dist[v] = dist[minVertex] + matrix[minVertex][v];
                path[v] = minVertex;
            }
        }
    }

    var outputResult = document.getElementById("outputResult");
    outputResult.innerHTML = "";

    for (var i = 0; i < dist.length; i++) {
        if (i !== startVertex && dist[i] !== Number.MAX_SAFE_INTEGER) {
            var resultText = document.createElement("p");
            var shortestPath = [];
            var currentVertex = i;
            while (currentVertex !== startVertex) {
                shortestPath.push(String(currentVertex + 1));
                currentVertex = path[currentVertex];
            }
            shortestPath.push(String(startVertex + 1));
            resultText.textContent =
                "Кратчайший путь от " +
                (startVertex + 1) +
                " до " +
                (i + 1) +
                ": " +
                shortestPath.reverse().join(" -> ");
            outputResult.appendChild(resultText);
            resultText = document.createElement("p");
            resultText.textContent = "Общее расстояние: " + dist[i];
            outputResult.appendChild(resultText);
            var lineBreak = document.createElement("br");
            outputResult.appendChild(lineBreak);
        }
    }
}

function checkZerosOnDiagonal(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][i] !== 0) {
            return false;
        }
    }
    return true;
}

function setMatrixInputSize() {
    var numVertices = parseInt(
        document.getElementById("num-vertices").value
    );
    var height = 102 + (numVertices - 3) * 20;
    var inputMatrix = document.getElementById("inputMatrix");
    inputMatrix.style.width = height + 50 + "px";
    inputMatrix.style.height = height + "px";

    inputMatrix.value = ""; // Очищаем значение матрицы
}

document
    .getElementById("num-vertices")
    .addEventListener("change", setMatrixInputSize);
setMatrixInputSize();

function checkMatrixMirrored(matrix) {
    var n = matrix.length;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < i; j++) {
            if (matrix[i][j] !== matrix[j][i]) {
                return false;
            }
        }
    }
    return true;
}

