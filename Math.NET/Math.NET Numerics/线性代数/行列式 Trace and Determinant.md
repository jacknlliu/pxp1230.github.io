# 行列式 Trace and Determinant

For a square matrix, the trace of a matrix is the sum of the elements on the main diagonal, which is equal to the sum of all its eigenvalues with multiplicities. Similarly, the determinant of a square matrix is the product of all its eigenvalues with multiplicities. A matrix is said to be singular if its determinant is zero and non-singular otherwise. In the latter case the matrix is invertible and the linear equation system it represents has a single unique solution.
```
var m = M.DenseOfArray(new[,] {{ 1.0,  2.0, 1.0},
                               {-2.0, -3.0, 1.0},
                               { 3.0,  5.0, 0.0}});
                               
//主对角线各元素之和
m.Trace();       // -2

//行列式
m.Determinant(); // ~0 hence not invertible, either none or multiple solutions
```











