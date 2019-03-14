## 多级表头

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
    },
    {
        label: "地址",
        prop: "info",
        children: [{ label: "省", prop: "province" },{ label: "市", prop: "city" }]
    },
    ],
    rowsData: [
    {
        rowId:1 ,
        userName: "John Brown",
        age:18,
        province:"河北",
        city:"廊坊"
    },
    {
        rowId:  2 ,
        userName: "Jim Green" ,
        age: 19,
        province:"山东",
        city:"青岛"
    }
    ]
}
} 
```

### 要点

#### 对于列，设置children字段即可

#### 对于行数据，并不需要额外处理