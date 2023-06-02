import numpy as np

# Получение количества вершин графа от пользователя
num_vertices = int(input("Введите количество вершин графа от 2 до 20: "))

# Проверка на допустимое количество вершин
if num_vertices < 2 or num_vertices > 20:
    print("Неверное количество вершин. Пожалуйста, введите число от 2 до 20.")
    exit()

# Инициализация матрицы расстояний
distances = np.zeros((num_vertices, num_vertices))

# Получение матрицы расстояний от пользователя
print("Введите матрицу расстояний (весов):")
for i in range(num_vertices):
    for j in range(num_vertices):
        distances[i][j] = int(input(f"Введите вес ребра ({i}, {j}): "))

# Применение алгоритма Флойда
for k in range(num_vertices):
    for i in range(num_vertices):
        for j in range(num_vertices):
            distances[i][j] = min(distances[i][j], distances[i][k] + distances[k][j])

# Вывод матрицы путей
print("Матрица путей:")
for i in range(num_vertices):
    for j in range(num_vertices):
        print(distances[i][j], end="\t")
    print()

# Вывод кратчайших путей
print("Кратчайшие пути:")
for i in range(num_vertices):
    for j in range(num_vertices):
        if distances[i][j] == float("inf"):
            print(f"Между вершинами {i} и {j} нет пути")
        else:
            print(f"Кратчайший путь между вершинами {i} и {j}: {distances[i][j]}")

