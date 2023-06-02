% rebase('layout.tpl', title=title, year=year)
<div class="row">
    <div class="jumbotron">
    <h1 style="text-align:center;">Алгоритм Прима</h1>
        <p class="lead">
            Алгоритм Прима — алгоритм построения минимального остовного дерева взвешенного связного неориентированного графа. Алгоритм впервые был открыт в 1930 году чешским математиком Войцехом Ярником, позже переоткрыт Робертом Примом в 1957 году, и, независимо от них, Э. Дейкстрой в 1959 году.

        </p>
        <p class="lead">На вход алгоритма подаётся связный неориентированный граф. Для каждого ребра задаётся его стоимость.
Сначала берётся произвольная вершина и находится ребро, инцидентное данной вершине и обладающее наименьшей стоимостью. Найденное ребро и соединяемые им две вершины образуют дерево. Затем, рассматриваются рёбра графа, один конец которых — уже принадлежащая дереву вершина, а другой — нет; из этих рёбер выбирается ребро наименьшей стоимости. Выбираемое на каждом шаге ребро присоединяется к дереву. Рост дерева происходит до тех пор, пока не будут исчерпаны все вершины исходного графа.
Результатом работы алгоритма является остовное дерево минимальной стоимости.</p>
    </div>
</div>
<div class="col-md-4">
<p class="lead1">Enter your values:</p>
</div>
<div class = "locationtable">
<form action="/task1" method="post">
    <table id="myTable"  class="table">
    <thead>
    <tr> 
    <th align="center">x</th> 
    <th align="center">f(x)</th> 
    </tr> 
    <tr> 
    <td><input type="text" size="50" name="1_1"></td>
    <td><input type="text" size="50" name="1_2"></td>
    </tr>
    </tr> 
    <tr> 
    <td><input type="text" size="50" name="2_1"></td>
    <td><input type="text" size="50" name="2_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="3_1"></td>
    <td><input type="text" size="50" name="3_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="4_1"></td>
    <td><input type="text" size="50" name="4_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="5_1"></td>
    <td><input type="text" size="50" name="5_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="6_1"></td>
    <td><input type="text" size="50" name="6_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="7_1"></td>
    <td><input type="text" size="50" name="7_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="8_1"></td>
    <td><input type="text" size="50" name="8_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="9_1"></td>
    <td><input type="text" size="50" name="9_2"></td>
    </tr>
    <tr> 
    <td><input type="text" size="50" name="10_1"></td>
    <td><input type="text" size="50" name="10_2"></td>
    </tr>
    </thead>
    </table>
</div>
<p><input type="submit" value="Send" class="locationbutton"></p>

<div style="clear:both"></div>