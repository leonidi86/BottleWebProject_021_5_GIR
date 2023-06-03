% rebase('layout.tpl', title=title, year=year)
<!DOCTYPE html>
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

<form id="dijkstra-form" class="lead2">
    <label for="num-vertices">Количество вершин:</label>
   <select id="num-vertices" name="num-vertices" class="small-input2" required>
    <option value="2" selected>2</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
    </select>
         <label for="source-vertex">Исходная вершина:</label>
        <input type="text" id="source-vertex" name="source-vertex" class="small-input2" required>
        <button type="button" id="example-button" class="custom-button2">Пример заполнения</button>
        <br>
        <br>
        <table class="table" id="matrix-table"></table>
        <input type="submit" value="Найти кратчайшие пути" class="custom-button2">
        <div class="color_rez" id="result"></div>
    </form>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/static/scripts/alg_dijkstra1.js"></script>

</div>
</body>
</html>
