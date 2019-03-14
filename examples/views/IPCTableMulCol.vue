<template>
<div>
  <h2>IPCTable</h2>
<IPCTable
      :pColsData="colsData"
      :pRowsData="rowsData">
    </IPCTable>
  <div class="markdown-body">
    <markdown/>
  </div>
</div>
</template>
<script>
import IPCTable from  "@/components/IPCTable/IPCTable"
import markdown  from './IPCTableMulCol.md'
export default {
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
  },
  components: {
    markdown,
    IPCTable
  },
}
</script>