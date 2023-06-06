import heapq

def dijkstra_algorithm(graph, start):
    # Проверяем, существует ли стартовая вершина в графе.
    if start not in graph:
        raise ValueError("Выбранная вершина не существует в графе.")
    
    # Получаем количество вершин в графе.
    n = len(graph)
    
    # Создаем список dist для хранения текущих расстояний от стартовой вершины до каждой вершины графа.
    # Инициализируем его значением бесконечности для каждой вершины.
    dist = [float('inf')] * (n + 1)
    
    # Устанавливаем расстояние от стартовой вершины до самой себя равным 0.
    dist[start] = 0
    
    # Создаем кучу heap для хранения пар (расстояние, вершина).
    # Изначально в куче находится только пара (0, start).
    heap = [(0, start)]

    # Запускаем основной цикл, пока куча не станет пустой.
    while heap:
        # Извлекаем из кучи пару (d, u), где d - текущее расстояние, u - вершина.
        d, u = heapq.heappop(heap)
        
        # Проверяем, не является ли текущее расстояние уже устаревшим.
        # Если да, пропускаем текущую итерацию цикла и переходим к следующей.
        if d > dist[u]:
            continue
        
        # Обходим все соседние вершины v и их веса w для текущей вершины u.
        for v, w in graph[u]:
            # Проверяем, не содержит ли граф отрицательные числа.
            if w < 0:
                raise ValueError("Граф содержит отрицательные числа.")
            
            # Вычисляем новое расстояние от стартовой вершины до вершины v через текущую вершину u.
            new_dist = dist[u] + w
            
            # Если новое расстояние меньше текущего расстояния до вершины v, обновляем его.
            # Добавляем пару (new_dist, v) в кучу для дальнейшей обработки.
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(heap, (new_dist, v))
    return dist


graph = {
    1: [(2, 1), (3, 3)],
    2: [(3, 1), (4, 1)],
    3: [(4, 2)],
    4: []
}

start_vertex = 1
try:
    result = dijkstra_algorithm(graph, start_vertex)
    output_result = ""
    for i in range(1, len(result)):
        path = []
        current_vertex = i
        while current_vertex != start_vertex:
            path.append(str(current_vertex))
            current_vertex = result[current_vertex][1] if current_vertex < len(result) and isinstance(result[current_vertex], list) else start_vertex
        output_result += f"Кратчайший путь от {start_vertex} до {i}: {' -> '.join(path)}\n"
        output_result += f"Общее расстояние: {result[i]}\n\n"
    print(output_result)
except ValueError as e:
    print(str(e))
