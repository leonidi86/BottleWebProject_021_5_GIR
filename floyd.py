from bottle import Bottle, request, template

app = Bottle()

@app.route('/')
def index():
    return template('task3.tpl', result='')

def floyd_warshall(graph):
    n = len(graph)
    dist = [[float('inf')] * n for _ in range(n)]
    next_node = [[None] * n for _ in range(n)]

    for u in range(n):
        for v in range(n):
            dist[u][v] = graph[u][v]
            if u != v and graph[u][v] != float('inf'):
                next_node[u][v] = v

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_node[i][j] = next_node[i][k]

    return dist, next_node
