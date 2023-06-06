
% rebase('layout.tpl', title=title, year=year)
<!DOCTYPE html>
<html>
<body>
<title>Алгоритм Дейкстры</title>
  <link rel="stylesheet" type="text/css" href="/static/content/styles.css" />
<div class="row">
    <div class="jumbotron">
    <h1 style="text-align:center;">Алгоритм Дейкстры</h1>
        <p class="lead">
            Алгоритм Дейкстры - это алгоритм поиска кратчайшего пути во взвешенном графе от одной начальной вершины ко всем остальным вершинам. Он использует жадный подход, чтобы находить оптимальное решение на каждом шаге.
        </p>

    <div class="container2">

        <h4>Основная цель алгоритма Дейкстры - найти кратчайшие пути от начальной вершины ко всем остальным вершинам графа. Результатом работы алгоритма является набор кратчайших путей и соответствующих расстояний от начальной вершины до каждой другой вершины.</h4>

        <h4>Алгоритм Дейкстры находит кратчайшие пути, используя следующую логику: начиная с начальной вершины, он просматривает все смежные вершины и обновляет их расстояния до начальной вершины, если найден более короткий путь. Затем он выбирает вершину с наименьшим расстоянием и повторяет процесс до тех пор, пока все вершины не будут посещены.</h4>
    </div> 
        </div> 
    <form id="dijkstra-form" class="lead2">
 <h4>Введите матрицу смежности в поле ниже и выберите вершину для нахождения кратчайших расстояний до остальных вершин. Затем нажмите кнопку "Выполнить алгоритм Дейкстры".
 Если вдруг вершины не имеют общих ребер, нужно поставить число, приближенное к бесконечности(например, 10000) </h4>
<br>
    <label for="num-vertices">Количество вершин:</label>
   <select id="num-vertices" name="num-vertices" class="small-input2" required>
    <option value="2" selected>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>

<label for="startVertex">Стартовая вершина:</label>
<input type="number" class="small-input2" id="startVertex" min="1" max="10" step="1">
<br><br>
<textarea id="inputMatrix"></textarea>
<br><br>
<button id="fillMatrixButton" type="button" class="custom-button2">Пример заполнения матрицы</button>
<button onclick="runDijkstraAlgorithm()" class="custom-button2">Выполнить алгоритм Дейкстры</button>
<h2 style="text-align:center;" > Результат:</h2>
<pre style=" border-color: rgb(255, 20, 147);" id="outputResult" class="container2"></pre>
    </form>
    </div> 
    <script src="/static/scripts/alg_dijkstra1.js"></script>
</body>
</html>