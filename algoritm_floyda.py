import numpy as np

# ��������� ���������� ������ ����� �� ������������
num_vertices = int(input("������� ���������� ������ ����� �� 2 �� 20: "))

# �������� �� ���������� ���������� ������
if num_vertices < 2 or num_vertices > 20:
    print("�������� ���������� ������. ����������, ������� ����� �� 2 �� 20.")
    exit()

# ������������� ������� ����������
distances = np.zeros((num_vertices, num_vertices))

# ��������� ������� ���������� �� ������������
print("������� ������� ���������� (�����):")
for i in range(num_vertices):
    for j in range(num_vertices):
        distances[i][j] = int(input(f"������� ��� ����� ({i}, {j}): "))

# ���������� ��������� ������
for k in range(num_vertices):
    for i in range(num_vertices):
        for j in range(num_vertices):
            distances[i][j] = min(distances[i][j], distances[i][k] + distances[k][j])

# ����� ������� �����
print("������� �����:")
for i in range(num_vertices):
    for j in range(num_vertices):
        print(distances[i][j], end="\t")
    print()

# ����� ���������� �����
print("���������� ����:")
for i in range(num_vertices):
    for j in range(num_vertices):
        if distances[i][j] == float("inf"):
            print(f"����� ��������� {i} � {j} ��� ����")
        else:
            print(f"���������� ���� ����� ��������� {i} � {j}: {distances[i][j]}")

