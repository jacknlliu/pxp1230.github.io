# 条件数 Condition Number

条件数是线性方程组 $Ax=b$ 的解对b中的误差或不确定度的敏感性的度量。数学定义为矩阵A的条件数等于A的范数与A的逆的范数的乘积，即 $cond(A) = \left\| A \right\| \cdot \left\| A的逆 \right\|$，对应矩阵的3种范数，相应地可以定义3种条件数（1范数、2范数、无穷范数）。
```
//条件数
M.Random(4,4).ConditionNumber(); // e.g. 14.829
var m = M.DenseOfArray(new[,] {{ 1.0,  2.0, 1.0},
                               {-2.0, -3.0, 1.0},
                               { 3.0,  5.0, 0.0}});
```


