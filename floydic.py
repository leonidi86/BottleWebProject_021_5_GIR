def run_floyd_algorithm():
    n = int(input("Введите число вершин графа: "))

    if n < 2 or n > 20:
        print("Введите число от 2 до 20!")
        return

    inputs = []

    for i in range(n):
        row = []
        for j in range(n):
            input_value = input(f"Введите вес ребра ({i}, {j}): ").strip()

            if input_value == '∞' or input_value.lower() == 'inf':
                row.append(float('inf'))
            else:
                try:
                    numeric_value = int(input_value)
                    row.append(numeric_value)
                except ValueError:
                    print("Введите числовые значения в матрицу весов!")
                    return

        inputs.append(row)

    distances = [[0 if i == j else float('inf') for j in range(n)] for i in range(n)]
    paths = [[i if i != j else -1 for j in range(n)] for i in range(n)]

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if distances[i][k] + distances[k][j] < distances[i][j]:
                    distances[i][j] = distances[i][k] + distances[k][j]
                    paths[i][j] = paths[i][k]

    print("Матрица кратчайших расстояний:")
    for row in distances:
        print(row)

    print("Матрица путей:")
    for row in paths:
        print(row)
