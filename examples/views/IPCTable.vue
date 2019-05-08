<template>
  <div>
    <h2>IPCTable的基本使用</h2>
    <button @click="isMulSelect = !isMulSelect">all select</button>
    <button @click="hReloadData">reload</button>
    <button @click="hSelectALL">selectALL</button>
    <button @click="hSetColWidth">set col1 width</button>
    <button @click="hDisableSelect">hDisableSelect</button>
    <button @click="hEnableSelect">enableSelect</button>
    <button @click="hGetHidenCols">hGetHidenCols</button>

    <div style="background-color:#fff" v-fullScreen>
      <IPCTable
        width="800"
        ref="ipcTable"
        :pIsMulSelect="isMulSelect"
        pEditStyle="click-cell-input"
        :pPageSizeOpts="[10, 20, 22]"
        :pColsData="colsData"
        :pRowsData="rowsData"
        :pTotalRowNumber="1"
        pFixedHeight="300"
        @mulSelectChange="hMulSelectChange"
        @pageIndexChange="hPageIndexChange"
        @pageSizeChange="hPageSizeChange"
        @header-dragend="hheaderDragend"
        @modifyCellValueSuccess="hModifyCellValueSuccess"
      >
        <button slot="btn">abc</button>
      </IPCTable>
    </div>
    <hr />
    <div class="markdown-body">
      <markdown />
    </div>
  </div>
</template>
<style>
.classRed {
  color: red;
}
.classBlue {
  color: blue;
}
</style>
<script>
import tableData from "./tableData.js";
import IPCTable from "@/components/IPCTable/IPCTable";
import markdown from "./IPCTable.md";
export default {
  data() {
    return {
      isMulSelect: true,
      colsData: tableData.colsData,
      rowsData: tableData.rowsData
    };
  },

  components: {
    markdown,
    IPCTable
  },
  methods: {
    hheaderDragend(e) {
      console.info(e);
    },
    hGetHidenCols() {
      alert(this.$refs.ipcTable._getHidenCols());
    },
    hEnableSelect() {
      this.$refs.ipcTable._enableSelect();
    },
    hDisableSelect() {
      this.$refs.ipcTable._disableSelect();
    },
    hSetColWidth() {
      debugger;
      this.$refs.ipcTable.colsData[0].width = 200;
    },
    hSelectALL() {
      this.$refs.ipcTable._selectAll();
    },
    hSelectRowByIndex(rowIndex) {
      // toggleRowSelection
      this.$refs.ipcTable._selectRowsByIndex(rowIndex);
    },
    hReloadData() {
      this.colsData = [...tableData.colsData];
      this.rowsData = [...tableData.rowsData];
    },
    hMulSelectChange(val) {
      console.info("你的多选结果是", val);
      // setTimeout(() => {
      //   this.isMulSelect = false;
      //   console.info("hidden mul select", this, this.isMulSelect);
      // }, 2000);
    },
    hPageSizeChange(pageSize) {
      console.info(pageSize);
    },
    hPageIndexChange(pageIndex) {
      console.info(pageIndex);
    },
    hModifyCellValueSuccess({
      oldVal,
      newVal,
      editRowId,
      editColKey,
      rowIndex,
      colIndex
    }) {
      console.info({
        oldVal,
        newVal,
        editRowId,
        editColKey,
        rowIndex,
        colIndex
      });
    }
  }
};
</script>