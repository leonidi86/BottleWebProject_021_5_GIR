import unittest
from dijkstra import dijkstra_algorithm

class DijkstraAlgorithmTestCase(unittest.TestCase):
    def test_dijkstra_algorithm(self):
        graph = {
            1: [(2, 1), (3, 3)],
            2: [(3, 1), (4, 1)],
            3: [(4, 2)],
            4: []
        }
  # 0  1  2  3  4
  # 1  0  1  3  0
  # 2  1  0  1  1
  # 3  3  1  0  2
  # 4  0  1  2  0

        start_vertex = 1
        expected_result = [float('inf'), 0, 1, 2, 2]
        result = dijkstra_algorithm(graph, start_vertex)
        self.assertEqual(result, expected_result)

    def test_dijkstra_algorithm_negative_weights(self):
        graph = {
            1: [(2, 1), (3, -3)],
            2: [(3, -1), (4, 1)],
            3: [(4, -2)],
            4: []
        }

        start_vertex = 1
        with self.assertRaises(ValueError):
            dijkstra_algorithm(graph, start_vertex)

    def test_dijkstra_algorithm_no_start_vertex(self):
        graph = {
            1: [(2, 1), (3, 3)],
            2: [(3, 1), (4, 1)],
            3: [(4, 2)],
            4: []
        }

        start_vertex = 5  
        with self.assertRaises(ValueError):
            dijkstra_algorithm(graph, start_vertex)


if __name__ == '__main__':
    unittest.main()