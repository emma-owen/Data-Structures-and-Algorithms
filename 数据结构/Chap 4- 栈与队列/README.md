## 栈
### 栈的定义
> 栈是限定在表尾进行插入和删除操作的的线性表。

我们把允许插入和删除的一端称为栈顶，另一端称为栈底。栈又称后进先出线性表，LIFO结构。

### 栈的顺序存储结构及其实现
栈的结构定义
```
typedef int SElemType /*SEe=lmType类型根据实际情况而定，这里暂定为int*/
typedef struct
{
    SElemType data[MAXSIZE];
    int top; /*用于栈顶指针*/
}SqStack
```
我们一般用`top=-1`判断空栈
> 时间复杂度O（1）
### 进栈操作
```
/*插入元素e为新的栈顶元素*/
Status Push(SqStack *S,SElemType e)
{
    if(S->top === MAXSIZE){
        return ERROR;
    }
    S->top ++;  /*栈顶指针增加1*/
    S->data[S->top]=e; /*将新插入元素赋值给栈顶空间*/
    return OK;
}

```
### 出栈操作
> 时间复杂度O（1）
```
/*若栈不空，则删除S的栈顶元素，用e返回其值，并返回OK,否则返回ERROR*/
Status Pop (SqStack *S, SElemType *e)
{
    if(S->top===-1){
        return ERROR;
    }
    *e=data[S->top]; /*将要删除的栈顶元素赋值给e*/
    S->top--; /*栈顶指针减一*/
    return OK;
}
```
## 两栈共享空间
栈的顺序存储还是很方便的，因为只准栈顶进出元素，所以不存在线性表插入和删除时需要移动元素的问题。但是它有一个很大的缺陷，就是必须事先确定数组存储空间大小，万一不够用，就需要编程后端来扩展数组的容量。对于一个栈，我们也只能尽量考虑周全，设计出合适大小的数组来处理，但对于两个相同类型的栈，我们却可以做到最大限度地利用其事先开辟的存储空间来进行操作。

做法如下：数组有两个端点，两个栈有两个栈底，让一个栈的栈底为数组的始端，即下标为0处，另一个栈的栈底为数组的末端，即下标为n-1处。这样，两个栈如果增加元素，就是两端向中间延伸。
**关键思路是：**它们是在数组的两端，向中间靠拢。top1和top2是栈1和栈2的栈顶指针。可以想象，只要它俩不见面，两个栈就可以一直使用。

可以分析出来，栈1为空时，就是top1等于-1时；而当top2等于n时，即是栈2为空时。栈满的情况有3中，第一二种是极端情况，第一，若栈2为空，top1=n-1时就是栈1满了。第二，若栈1为空，top2=0时就是栈2满了。第三种也是普通情况，两个栈见面之时，就是两个指针相差1时，即top1+1=top2为栈满。

两栈共享空间的结构的代码如下：
```
/*两栈共享空间结构*/
typedef struct
{
    SElemType data[MAXSIZE];
    int top1; /* 栈1 栈顶指针 */
    int top2; /* 栈2  栈顶指针 */
}SqDoubleStack;
```
### 两栈共享空间插入元素
```
/*插入元素e为新的栈顶元素*/
Status Push(SqDoubleStack *S,SElemType e, int stackNumber)
{
    if(S->top1+1===S->top2){ /*栈已满，不能再Push新元素了*/
        return ERROR;
    }
    
    if(stackNumber===1){ /*栈1有元素进栈*/
        S->data[++S->top1]=e; /*先给top1+1然后赋值*/
    }else if(stackNumber===2){ /*栈2有元素进栈*/
        S->data[--S->top2]=e;   /*先给top2-1然后赋值*/
    }
    return OK;
}
```
### 两栈共享空间弹出元素
```
/*若栈不空，则删除S的栈顶元素，用e返回值，并返回OK,否则返回ERROR*/
Status Pop (SqDoubleStack *S,SElemType *e, int stackNumber){
    if(stackNumber===1){
        if(S->top1===-1)
            return ERROR;
        *e=S->data[S->top1--];
    }else if(stackNumber===2){
        if(S->top2===MAXSIZE)
            return ERROR;
        *e=S->data[S->top2++]
    }
    return OK;
}
```

事实上，使用这样的数据结构，通常都是当两个栈的需求有相反关系时，也就是一个栈在增长时另一个栈在减少的情况。
### 总结
适合使用共享空间栈的情况需要满足以下两个条件：
- 1、两个栈具有相同的数据结构
- 2、两个栈的需求有相反关系，一个增长时另一个减少。
