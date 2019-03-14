## 合并单元格

`isMerge:true`

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
          prop: "categroy1",
          label: "一级品类",
          isMerge:true
        },
        {
          prop: "categroy2",
          label: "二级品类",
          isMerge:true
        },
        {
          prop: "categroy3",
          label: "三级品类",
          
        },
      ],
      rowsData: [
        {
          rowId:1,
          categroy1:"电器",
          categroy2:"冰箱",
          categroy3:"冰箱1"
        },
        {
          rowId:2,
          categroy1:"电器",
          categroy2:"冰箱",
          categroy3:"冰箱2"
        },
        {
          rowId:3,
          categroy1:"电器",
          categroy2:"电视",
          categroy3:"电视1"
        },
        {
          rowId:4,
          categroy1:"电器",
          categroy2:"电视",
          categroy3:"电视2"
        },
        ]
    }
}
} 
```

### 要点

在要合并的列上添加`isMerge:true`
