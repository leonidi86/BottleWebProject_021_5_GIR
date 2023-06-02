% rebase('layout.tpl', title=title, year=year)
<!DOCTYPE html>
<html>
<head>
    <title>Алгоритм Дейкстры</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="container2">
    <h1>Алгоритм Дейкстры</h1>


        <h5>Алгоритм Дейкстры - это алгоритм поиска кратчайшего пути во взвешенном графе от одной начальной вершины ко всем остальным вершинам. Он использует жадный подход, чтобы находить оптимальное решение на каждом шаге.</h5>

        <h5>Основная цель алгоритма Дейкстры - найти кратчайшие пути от начальной вершины ко всем остальным вершинам графа. Результатом работы алгоритма является набор кратчайших путей и соответствующих расстояний от начальной вершины до каждой другой вершины.</h5>

        <h5>Алгоритм Дейкстры находит кратчайшие пути, используя следующую логику: начиная с начальной вершины, он просматривает все смежные вершины и обновляет их расстояния до начальной вершины, если найден более короткий путь. Затем он выбирает вершину с наименьшим расстоянием и повторяет процесс до тех пор, пока все вершины не будут посещены.</h5>

    
    <form id="dijkstra-form">
        <label for="num-vertices">Количество вершин:</label>
        <br>
        <input type="number" id="num-vertices" name="num-vertices" class="small-input2" min="2" max="20" required>
        <br>
        
        <label for="distance-matrix">Матрица расстояний:</label>
        <br>
        <table class="table2" id="matrix-table"></table>
        <br>
        
        <label for="source-vertex">Исходная вершина:</label>
        <br>
        <input type="text" id="source-vertex" class="smaller-input2" name="source-vertex" required>
        <br><br>
        
        <input type="submit" value="Найти кратчайшие пути" class="custom-button2">
           
    </form>
     </div>
    <div id="result"></div>
   
    <script src="alg_dijkstra2.js"></script>
    <script src="alg_dijkstra2.js"></script>
</body>
</html>