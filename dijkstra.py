shortestPathPredecessors = []

def createMatrixTable(numVertices):
    matrixTable = document.getElementById("matrix-table")
    matrixTable.innerHTML = ""

    headerRow = document.createElement("tr")
    headerCell = document.createElement("th")
    headerCell.innerText = "Матрица расстояний"
    headerCell.colSpan = numVertices + 1
    headerRow.appendChild(headerCell)
    matrixTable.appendChild(headerRow)

    columnHeaderRow = document.createElement("tr")
    emptyCell = document.createElement("td")
    columnHeaderRow.appendChild(emptyCell)

    for i in range(1, numVertices + 1):
        columnHeaderCell = document.createElement("th")
        columnHeaderCell.innerText = str(i)
        columnHeaderRow.appendChild(columnHeaderCell)

    matrixTable.appendChild(columnHeaderRow)

    for i in range(numVertices):
        row = document.createElement("tr")

        for j in range(numVertices + 1):
            cell = document.createElement("td")

            if j == 0:
                vertexNumber = i + 1
                cell.innerText = str(vertexNumber)
            else:
                input = document.createElement("input")
                input.type = "number"
                input.name = "distance-cell-" + str(i) + "-" + str(j - 1)
                input.required = True
                input.min = "0"

                if i == j - 1:
                    input.value = "0"

                input.addEventListener("input", lambda event: mirrorInputValue(event))

                cell.appendChild(input)

            row.appendChild(cell)

        matrixTable.appendChild(row)

    matrixTable.classList.add("pink-table")

def mirrorInputValue(event):
    row = int(event.target.name.split("-")[2])
    column = int(event.target.name.split("-")[3])

    mirroredInput = document.querySelector('input[name="distance-cell-' + str(column) + '-' + str(row) + '"]')
    mirroredInput.value = event.target.value

createMatrixTable(2)

fillEmptyCellsButton = document.createElement("button")
fillEmptyCellsButton.setAttribute("type", "button")
fillEmptyCellsButton.setAttribute("id", "fill-empty-cells")
fillEmptyCellsButton.setAttribute("class", "custom-button2")
fillEmptyCellsButton.innerText = "Заполнить пустые ячейки"

matrixTable = document.getElementById("matrix-table")
matrixTable.parentNode.insertBefore(fillEmptyCellsButton, matrixTable.nextSibling)

emptyRows = document.querySelectorAll("br")
emptyRows.forEach(lambda row: matrixTable.parentNode.removeChild(row))

def fillEmptyCells():
    inputCells = document.querySelectorAll('input[type="number"]')

    for inputCell in inputCells:
        if inputCell.value.trim() == "":
            inputCell.value = "10000"

document.getElementById("fill-empty-cells").addEventListener("click", lambda: fillEmptyCells())

def fillMatrixWithExampleValues(numVertices):
    inputCells = document.querySelectorAll('input[name^="distance-cell-"]')
    exampleMatrix = getExampleMatrix(numVertices)

    for i, inputCell in enumerate(inputCells):
        row = int(inputCell.name.split("-")[2])
        column = int(inputCell.name.split("-")[3])

        inputCell.value = exampleMatrix[row][column]

def getExampleMatrix(numVertices):
    exampleMatrix = []

    for i in range(numVertices):
        row = []

        for j in range(numVertices):
            if i == j:
                row.append(0)
            elif i < j:
                row.append(i + j - 1)
            else:
                row.append(j + i + 1)

        exampleMatrix.append(row)

    return exampleMatrix

document.getElementById("example-button").addEventListener("click", lambda: fillMatrixWithExampleValues())

def solveDijkstra(event):
    event.preventDefault()

    numVertices = int(document.getElementById("num-vertices").value)
    sourceVertex = int(document.getElementById("source-vertex").value)

    if numVertices < 2:
        alert("Количество вершин должно быть больше 1.")
        return

    distanceMatrix = []

    for i in range(numVertices):
        row = []

        for j in range(numVertices):
            input = document.getElementsByName("distance-cell-" + str(i) + "-" + str(j))[0]
            distance = float(input.value.strip())

            if input.value.strip() == "":
                distance = 9999
            else:
                distance = int(input.value.strip(), 10)

            row.append(distance)

        distanceMatrix.append(row)

    if sourceVertex < 1 or sourceVertex > numVertices:
        alert("Введите существующую вершину.")
        return

    shortestPaths = dijkstra(distanceMatrix, sourceVertex)

    resultDiv = document.getElementById("result")
    resultDiv.innerHTML = "<h2>Результат:</h2><br>"

    for i in range(numVertices):
        if i != sourceVertex - 1:
            path = list(map(lambda vertex: vertex + 1, shortestPaths[i].path))

            resultDiv.innerHTML += "<p>Кратчайший путь от " + str(sourceVertex) + " до " + str(i + 1) + ": " + " -> ".join(map(str, path)) + "<br>" + "Общее расстояние: " + str(shortestPaths[i].distance) + "</p>"

document.getElementById("dijkstra-form").addEventListener("submit", lambda event: solveDijkstra(event))

def handleNumVerticesChange():
    numVertices = int(document.getElementById("num-vertices").value)
    createMatrixTable(numVertices)

document.getElementById("num-vertices").addEventListener("change", lambda: handleNumVerticesChange())

def dijkstra(graph, source):
    numVertices = len(graph)
    visited = [False] * numVertices
    distances = [float("inf")] * numVertices
    shortestPaths = [None] * numVertices

    distances[source - 1] = 0

    for _ in range(numVertices):
        minDistance = float("inf")
        minIndex = -1

        for v in range(numVertices):
            if not visited[v] and distances[v] < minDistance:
                minDistance = distances[v]
                minIndex = v

        if minIndex == -1:
            break

        visited[minIndex] = True

        for j in range(numVertices):
            if not visited[j] and graph[minIndex][j] > 0 and distances[minIndex] + graph[minIndex][j] < distances[j]:
                distances[j] = distances[minIndex] + graph[minIndex][j]
                shortestPathPredecessors[j] = minIndex

    for k in range(numVertices):
        shortestPaths[k] = {
            "path": getPath(source - 1, k),
            "distance": distances[k]
        }

    return shortestPaths

def getPath(source, destination):
    path = []
    currentVertex = destination

    while currentVertex != source:
        path.insert(0, currentVertex)
        currentVertex = shortestPathPredecessors[currentVertex]

    path.insert(0, source)

    return path
