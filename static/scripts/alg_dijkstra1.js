// Функция для решения алгоритма Дейкстры
function dijkstra(matrix, sourceVertex) {
    var numVertices = matrix.length;

    // Инициализируем массив кратчайших путей
    var shortestPaths = [];

    for (var i = 0; i < numVertices; i++) {
        shortestPaths[i] = {
            distance: Infinity,
            path: []
        };
    }

    // Массив для отслеживания посещенных вершин
    var visited = [];

    // Устанавливаем начальную вершину
    shortestPaths[sourceVertex].distance = 0;

    // Цикл по всем вершинам
    for (var i = 0; i < numVertices; i++) {
        // Находим вершину с минимальным расстоянием
        var currentVertex = findMinDistanceVertex(shortestPaths, visited);

        // Помечаем вершину как посещенную
        visited[currentVertex] = true;

        // Обновляем расстояния до смежных вершин
        for (var j = 0; j < numVertices; j++) {
            if (!visited[j] && matrix[currentVertex][j] > 0) {
                var newDistance = shortestPaths[currentVertex].distance + matrix[currentVertex][j];
                if (newDistance < shortestPaths[j].distance) {
                    shortestPaths[j].distance = newDistance;
                    shortestPaths[j].path = shortestPaths[currentVertex].path.concat(j);
                }
            }
        }
    }

    return shortestPaths;
}

// Функция для поиска вершины с минимальным расстоянием
function findMinDistanceVertex(shortestPaths, visited) {
    var minDistance = Infinity;
    var minDistanceVertex = -1;

    for (var i = 0; i < shortestPaths.length; i++) {
        if (!visited[i] && shortestPaths[i].distance < minDistance) {
            minDistance = shortestPaths[i].distance;
            minDistanceVertex = i;
        }
    }

    return minDistanceVertex;
}