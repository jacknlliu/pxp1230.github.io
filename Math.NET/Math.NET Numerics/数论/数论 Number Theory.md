# 数论 Number Theory

在静态类Enclid中，提供了一些有关数论（整数）的方法。


## 求余数
```
Euclid.Remainder( 5,  3); // =  2, such that 5 = 1*3 + 2
Euclid.Remainder(-5,  3); // = -2, such that -5 = -1*3 - 2
Euclid.Remainder( 5, -3); // =  2, such that 5 = -1*-3 + 2
Euclid.Remainder(-5, -3); // = -2, such that -5 = 1*-3 - 2
```

## 求模
应用场景比如整队报数 0 1 2 0 1 2 0 1 2
```
Euclid.Modulus( 5,  3); // =  2, congruent modulo 3 by 5 - 1*3
Euclid.Modulus(-5,  3); // =  1, congruent modulo 3 by -5 + 2*3
Euclid.Modulus( 5, -3); // = -1, congruent modulo -3 by 5 + 2*-3
Euclid.Modulus(-5, -3); // = -2, congruent modulo -3 by -5 - 1*-3
```

## 判断奇偶
```
IsEven(number)
IsOdd(number)
```

## $2^k$ 和 $k^2$
CeilingToPowerOfTwo：寻找最接近$2^k$的数
IsPowerOfTwo：
PowerOfTwo：
IsPerfectSquare：判断是否是某个整数的平方




# 欧几里得算法

## 最大公约数 GCD,Greatest Common Divisor
```
Euclid.GreatestCommonDivisor(10, 15, 45); // 5

long x, y;
Euclid.ExtendedGreatestCommonDivisor(45, 18, out x, out y) // 9
// -> x=1, y=-2, hence 9 == 1*45 + -2*18
```


## 最小公倍数 LCM,Least Common Multiple
```
Euclid.LeastCommonMultiple(3, 5, 6); // 30
```
















