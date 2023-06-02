// ������� ��� �������� ������� ����� ������� ����������
function createMatrixTable() {
    // �������� �������� �����
    var numVertices = parseInt(document.getElementById("num-vertices").value);
    var matrixTable = document.getElementById("matrix-table");

    // ������� �������
    matrixTable.innerHTML = "";

    // ������� ��������� �������
    var headerRow = document.createElement("tr");
    var headerCell = document.createElement("th");
    headerCell.innerText = "������� ����������";
    headerCell.colSpan = numVertices + 1;
    headerRow.appendChild(headerCell);
    matrixTable.appendChild(headerRow);

    // ������� ������ � ������ �������
    for (var i = 0; i < numVertices; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= numVertices; j++) {
            var cell = document.createElement("td");

            if (j === 0) {
                // ������� ������ � ������� �������
                var vertexNumber = i + 1;
                cell.innerText = "V" + vertexNumber;
            } else {
                // ������� ������ � ����� ����� ����������
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

    // ��������� ����� "pink-table" � �������
    matrixTable.classList.add("pink-table");

    // ��������� ������� � ���������
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.appendChild(matrixTable);
}
