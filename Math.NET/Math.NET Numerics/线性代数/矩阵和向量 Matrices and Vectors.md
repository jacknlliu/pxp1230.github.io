# 矩阵和向量 Matrices and Vectors

矩阵左上角的下标为(0,0)，第一个下标对应行，第二个下标对应列。
不支持空矩阵或空向量，矩阵和向量每一维的长度至少为1。
$$
\mathbf\{A\}=
\begin\{bmatrix\}
a\_\{0,0\} &amp; a\_\{0,1\} &amp; \cdots &amp; a\_\{0,(n\-1)\} \\\\
a\_\{1,0\} &amp; a\_\{1,1\} &amp; \cdots &amp; a\_\{1,(n\-1)\} \\\\
\vdots &amp; \vdots &amp; \ddots &amp; \vdots \\\\
a\_\{(m\-1),0\} &amp; a\_\{(m\-1),1\} &amp; \cdots &amp; a\_\{(m\-1),(n\-1)\}
\end\{bmatrix\},\quad
\mathbf\{v\}=\begin\{bmatrix\}v\_0\\\\v\_1\\\\ \vdots \\\\v\_\{n\-1\}\end\{bmatrix\}
$$





# 数据结构

**向量：**
* 稠密向量：用一个数组保存同样长度的向量，最常用
* 稀疏向量：用两个数组保存向量，一个数组用于保存向量中的非零元素，另一个数组用于保存非零元素的下标（升序排列），当含有大量零元素时使用。

**矩阵：**
* 稠密矩阵：用一个数组保存同样长度的矩阵（列主序），最常用
* 对角线矩阵：只保存对角线到一个数组
* 稀疏矩阵：用三个数组保存矩阵，第一个数组用于保存矩阵中的非零元素，第二个数组用于保存非零元素的下标，第三个数组用于保存每一行的起始位置下标和所有非零元素的数量，当含有大量零元素时使用。





# 创建矩阵和向量

`Matrix<T>` 和 `Vector<T>` 类型定义在 `MathNet.Numerics.LinearAlgebra` 命名空间中。
矩阵和向量的建造器能自动创建出固定格式的矩阵和向量：
```
//创建一个3行4列的稠密矩阵，使用随机数填充
Matrix<double> m = Matrix<double>.Build.Random(3, 4);

//创建一个10维零向量（稠密向量）
Vector<double> v = Vector<double>.Build.Dense(10);
```
定义建造器的快捷方式：
```
var M = Matrix<double>.Build;
var V = Vector<double>.Build;

// build the same as above
var m = M.Random(3, 4);
var v = V.Dense(10);
```
建造器创建矩阵和向量：
```
// 3x4 dense matrix filled with zeros
M.Dense(3, 4);

// 3x4 dense matrix filled with 1.0.
M.Dense(3, 4, 1.0);

// 3x4 dense matrix where each field is initialized using a function
M.Dense(3, 4, (i,j) => 100*i + j);

// 3x4 square dense matrix with each diagonal value set to 2.0
// 对角线
M.DenseDiagonal(3, 4, 2.0);

// 3x3 dense identity matrix
M.DenseIdentity(3);

// 3x4 dense random matrix sampled from a Gamma distribution
// 伽玛分布
M.Random(3, 4, new Gamma(1.0, 5.0));
```
```
// Standard-distributed random vector of length 10
V.Random(10);

// All-zero vector of length 10
V.Dense(10);

// Each field is initialized using a function
V.Dense(10, i => i*i);

// From an enumerable of values and their index
Tuple<int,double>[] x = {Tuple.Create(3,2.0), Tuple.Create(1,-3.0)};
V.DenseOfIndexed(x);

// Directly bind to an existing array without copying (note: no "Of")
// 注意：数组长度必须一致
double[] x = existing...
V.Dense(x);
```
使用已有的数据创建矩阵和向量（注意方法名中的"Of"）：
```
// Copy of an existing matrix (can also be sparse or diagonal)
Matrix<double> x = ...
M.DenseOfMatrix(x);

// Directly bind to an existing column-major array without copying (note: no "Of")
// 列主序，不复制数组，注意：数组长度必须一致
double[] x = existing...
M.Dense(3, 4, x);

// From a 2D-array
// 行主序
double[,] x = {{ 1.0, 2.0 },
               { 3.0, 4.0 }};
M.DenseOfArray(x);

// From an enumerable of values and their coordinates
Tuple<int,int,double>[] x = {Tuple.Create(0,0,2.0), Tuple.Create(0,1,-3.0)};
M.DenseOfIndexed(3,4,x);

// From an enumerable in column major order (column by column)
// 列主序，复制数组，注意：数组长度必须一致
double[] x = {1.0, 2.0, 3.0, 4.0};
M.DenseOfColumnMajor(2, 2, x);

// From an enumerable of enumerable-columns (optional with explicit size)
IEnumerable<IEnumerable<double>> x = ...
M.DenseOfColumns(x);

// From a params-array of array-columns (or an enumerable of them)
// 列主序
M.DenseOfColumnArrays(new[] {2.0, 3.0}, new[] {4.0, 5.0});

// From a params-array of column vectors (or an enumerable of them)
// 列主序
M.DenseOfColumnVectors(V.Random(3), V.Random(3));

// Equivalent variants also for rows or diagonals:
// 行主序
M.DenseOfRowArrays(new[] {2.0, 3.0}, new[] {4.0, 5.0});
// 对角线
M.DenseOfDiagonalArray(new[] {2.0, 3.0, 4.0});

// if you already have existing matrices and want to concatenate them
// 行主序
Matrix<double>[,] x = ...
M.DenseOfMatrixArray(x);
```







# 算术运算符

运算符 `+`, `-`, `*`, `/`, `%` 可用于矩阵、向量、标量之间的运算。

示例：$\mathbf\{X\}^T\mathbf y = \mathbf\{X\}^T\mathbf X \mathbf p$，$\mathbf p = (\mathbf\{X\}^T\mathbf X)^\{\-1\}(\mathbf\{X\}^T\mathbf y)$

	(X.Transpose() * X).Inverse() * (X.Transpose() * y)

更加便捷的方式：

	X.TransposeThisAndMultiply(X).Inverse() * X.TransposeThisAndMultiply(y)







# 规范化约定

**向量支持的规范化约定：**
* L1Norm（Manhattan规则，p=1）：各元素绝对值之和
* L2Norm（Euclidean规则，p=2）：各元素平方和的平方根，默认约定
* InfinityNorm（p=infinity）：各元素绝对值中的最大值
* Norm(p)（自定义p）：各元素绝对值的p次平方和的p次方根，该约定可用于 `Normalize` 方法

**矩阵支持的规范化约定：**
* L1Norm：各列元素之和的绝对值中的最大值
* L2Norm：元素中的最大值（昂贵的）
* InfinityNorm：各行元素之和的绝对值中的最大值
* FrobeniusNorm：各元素平方和的平方根
* RowNorms(p)（自定义p）：对每一行应用Norm(p)，该约定可用于 `NormalizeRows` 方法
* ColumnNorms(p)（自定义p）：对每一列应用Norm(p)，该约定可用于 `NormalizeColumns` 方法



# 元素级求和

**向量：**
Sum方法：各元素之和
SumMagnitudes方法：应用L1Norm

**矩阵：**
RowSums方法：各行元素之和（返回向量）
ColumnSums方法：各列元素之和（返回向量）
RowAbsoluteSums方法：各行元素绝对值之和（返回向量）
ColumnAbsoluteSums方法：各列元素绝对值之和（返回向量）






# 操纵矩阵和向量

访问矩阵和向量的元素可以使用[]索引器，也可以使用At()方法，At()方法会稍微快一些，因为它不检查数组边界。
访问行或列或子矩阵：
```
var m = M.Dense(6,4,(i,j) => 10*i + j);
m.Column(2);          // [2,12,22,32,42,52]
m.Row(3);             // [30,31,32,33]
m.SubMatrix(1,2,1,2); // [11,12; 21,22]
```
对于上述方法，前面加个Set前缀可以设置元素值：
```
m.SetRow(3, V.Random(4));
```
全部变成0或接近0：
```
m.Clear(); // set all elements to 0
m.ClearColumn(2); // set the 3rd column to 0 (0-based indexing)
m.ClearColumns(1,3); // set the 2nd and 4th columns to 0 (params-array)
m.ClearSubMatrix(1,2,1,2); // set the 2x2 submatrix with offset 1,1 to zero
m.CoerceZero(1e-14); // set all elements smaller than 1e-14 to 0
m.CoerceZero(x => x < 1e-14); // set all elements that match a predicate function to 0.
```

矩阵和向量一旦创建就无法改变它们的尺寸，但我们可以插入移除行或列来创建出一个新矩阵：
```
var m2 = m.RemoveRow(2); // remove the 3rd rows
var m3 = m2.RemoveColumn(3); // remove the 4th column

var m4 = m.Stack(m2); // new matrix with m on top and m2 on the bottom
var m5 = m2.Append(m3); // new matrix with m2 on the left and m3 on the right
var m6 = m.DiagonalStack(m3); // m on the top left and m3 on the bottom right
```






# 矩阵和向量的枚举器

这些枚举器可以自定义是否跳过0元素，对于稀疏矩阵这能提高效率。

Enumerate方法返回IEnumerable<T>迭代器：
* Enumerate: returns a straight forward enumerator over all values.
* EnumerateIndexed: returns an enumerable with index-value-tuples.

矩阵专用IEnumerable<T>迭代器：
* EnumerateColumns: returns an enumerable with all or a range of the column vectors.
* EnumerateColumnsIndexed: like EnumerateColumns buth returns index-column tuples.
* EnumerateRows: returns an enumerable with all or a range of the row vectors.
* EnumerateRowsIndexed: like EnumerateRows buth returns index-row tuples.

将复数向量转换成实数向量：
```
Vector<Complex> u = Vector<Complex>.Build.Random(10);
Vector<Double> v = u.Map(c => c.Real);
```
更多Map方法：
* MapInplace(f,zeros): map in-place with a function on the element's value
* MapIndexedInplace(f,zeros): map in-place with a function on the element's index and value.
* Map(f,result,zeros): map into a result structure provided as argument.
* MapIndexed(f,result,zeros): indexed variant of Map.
* MapConvert(f,result,zeros): variant where the function can return a different type
* MapIndexedConvert(f,result,zeros): indexed variant of MapConvert.
* Map(f,zeros): like MapConvert but returns a new structure instead of the result argument.
* MapIndexed(f,zeros): indexed variant of Map.

**Fold and Reduce**
Matrices also provide column/row fold and reduce routines:
* FoldByRow(f,state,zeros): fold through the values of each row, returns an column-array.
* FoldRows(f,state): fold over all row vectors, returns a row vector.
* ReduceRows(f): reduce all row vectors, returns a row vector.



# 打印输出

使用ToString()函数，如果想获取更精确的结构化的输出，那么请使用 MathNet.Numerics.Data packages

Vector会打印成一列，如果一列排版不下，会自动生成多列

自定义显示多少行多少列：
```
// var m = Matrix<double>.Build.Random(5,100,42); // 42 = random seed

// m.ToString()
DenseMatrix 5x100-Double
 0.408388  -0.847291  -0.320552   0.162242    2.46434  ..   0.180466   -0.278793
 -1.06988   0.063008  -0.527378    1.40716    -0.5962  ..  -0.622447   -0.488186
-0.734176  -0.703003    1.33158   0.286498    1.44158  ..  -0.834335  -0.0756724
  1.78532   0.020217    1.94275  -0.742821  -0.790251  ..    1.52823     2.49427
-0.660645    1.28166   -1.71351   -1.33282  -0.328162  ..   0.110989    0.252272

// m.ToString("G2", CultureInfo.GetCultureInfo("de-DE"))
DenseMatrix 5x100-Double
 0,41  -0,85  -0,32   0,16    2,5     -0,77   0,12   0,58  ..   0,18   -0,28
 -1,1  0,063  -0,53    1,4   -0,6      -2,8  -0,35    0,3  ..  -0,62   -0,49
-0,73   -0,7    1,3   0,29    1,4  -0,00022   -0,3   0,51  ..  -0,83  -0,076
  1,8   0,02    1,9  -0,74  -0,79     0,088   0,78  -0,94  ..    1,5     2,5
-0,66    1,3   -1,7   -1,3  -0,33     -0,69  -0,27  -0,68  ..   0,11    0,25

// m.ToString(3,5) // max 3 rows, 5 columns
DenseMatrix 5x100-Double
 0.408388  -0.847291  -0.320552  ..   0.180466   -0.278793
 -1.06988   0.063008  -0.527378  ..  -0.622447   -0.488186
-0.734176  -0.703003    1.33158  ..  -0.834335  -0.0756724
       ..         ..         ..  ..         ..          ..

// Matrix<double>.Build.Random(100,100,42)
// .ToMatrixString(2,4,3,4,"=","||",@"\\"," ",Environment.NewLine,x=>x.ToString("G2"))
 0.41   0.36  0.29  =  0.43 0.56   -0.56  0.98
 -1.1  -0.64   0.9  =  0.49 -0.3       2  -0.5
   ||     ||    || \\    ||   ||      ||    ||
-0.87   -2.2  0.79  =  0.96  1.8     1.4 0.067
-0.14 -0.016 -0.55  = -0.36 0.33    0.24  0.52
 -1.3     -1 -0.81  =   1.3    1    -1.1 -0.28
-0.21   -1.7   2.6  =  -1.5 -1.2 -0.0014   3.4
```


