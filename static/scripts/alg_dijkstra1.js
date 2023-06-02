// ������� ��� ������� ��������� ��������
function dijkstra(matrix, sourceVertex) {
    var numVertices = matrix.length;

    // �������������� ������ ���������� �����
    var shortestPaths = [];

    for (var i = 0; i < numVertices; i++) {
        shortestPaths[i] = {
            distance: Infinity,
            path: []
        };
    }

    // ������ ��� ������������ ���������� ������
    var visited = [];

    // ������������� ��������� �������
    shortestPaths[sourceVertex].distance = 0;

    // ���� �� ���� ��������
    for (var i = 0; i < numVertices; i++) {
        // ������� ������� � ����������� �����������
        var currentVertex = findMinDistanceVertex(shortestPaths, visited);

        // �������� ������� ��� ����������
        visited[currentVertex] = true;

        // ��������� ���������� �� ������� ������
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

// ������� ��� ������ ������� � ����������� �����������
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