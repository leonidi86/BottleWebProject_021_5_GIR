// ������� ��� �������� ������� ����� ������� ����������
function createMatrixTable(numVertices) {
    var matrixTable = document.getElementById("matrix-table");

    // ������� �������
    matrixTable.innerHTML = "";

    // ������� ��������� �������
    var headerRow = document.createElement("tr");
    var headerCell = document.createElement("th");
    headerCell.innerText = "������� ����������";
    headerCell.colSpan = numVertices;
    headerRow.appendChild(headerCell);
    matrixTable.appendChild(headerRow);

    // ������� ������ � ������ �������
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

// ���������� ������� �������� �����
document.getElementById("dijkstra-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // �������� �������� �����
    var numVertices = parseInt(document.getElementById("num-vertices").value);
    var sourceVertex = document.getElementById("source-vertex").value;

    // �������� �������� ����� ������� ����������
    var distanceMatrix = [];

    for (var i = 0; i < numVertices; i++) {
        var row = [];

        for (var j = 0; j < numVertices; j++) {
            var input = document.getElementsByName("distance-cell-" + i + "-" + j)[0];
            row.push(parseFloat(input.value));
        }

        distanceMatrix.push(row);
    }

    // �������� ������� ������� ��������� ��������
    var shortestPaths = dijkstra(distanceMatrix, sourceVertex);

    // ���������� ���������
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

// ���������� ��������� �������� ���� "���������� ������"
document.getElementById("num-vertices").addEventListener("change", function () {
    var numVertices = parseInt(this.value);
    createMatrixTable(numVertices);
});

// �������������� ������� � ����� �������
createMatrixTable(1);