## 基本用法

### 模板
```
<IPCTable
    :pColsData="colsData"
    :pRowsData="rowsData">
</IPCTable>
```
### 数据
```
data(){
return {
    colsData: [
    {
        prop: "userName",
        label: "用户名",
      
    },
    {
        prop: "age",
        label: "年龄",
        classNameFuc: (val,row,column,rowIndex,columnIndex) => {
            return val > 20 ? "classRed" : "classBlue";
        }
    },
    {
        prop: "address",
        label: "地址"
    },
    ],
    rowsData: [
    {
        rowId:1 ,
        userName: "John Brown",
        age:18,
        address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
    },
    {
        rowId:  2 ,
        userName: "Jim Green" ,
        age: 19,
        address:"中华人民共和国北京市大兴区科创十一街京东集团总部C座一层."
        }
    ]
}
} 
```

### 要点

#### 设置列数据

- prop 和 label 是固定写法
- rowId 非常重要，它是行主键。
#### 特性
- 列宽可调整
- 单元格内容自动截取
- 显示/隐藏列
- 调整列的顺序

### 设置单元格样式 classNameFuc
####  第一步：1. 设置classNameFuc属性
```
{
        prop: "age",
        label: "年龄",
        classNameFuc: (val,row,column,rowIndex,columnIndex) => {
            return val > 20 ? "classRed" : "classBlue";
          }
    },
```
说明

`classNameFuc` 的值是一个函数，它的入参如下：

- val :当前单元格的值
- row :当前行
- column ：当前列
- rowIndex：当前行序号
- columnIndex：当前列序号

返回值是类名。
####  第二步：2 添加对应的类
```
<style>
.classRed{
  color:red;
}
.classBlue{
  color:blue;
}
</style>
```
