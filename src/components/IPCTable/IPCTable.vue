<template>
  <div class="ipcTable">
    <div class="flexa">
      <div v-if="pIsShowEditSwitch" style="margin-right:auto;">
        编辑<i-switch v-model="isEdit" />
        <Button
          @click.stop="hSaveTableData"
          size="small"
          :disabled="!isDirty"
          type="default"
          >保存</Button
        >
      </div>
      <Poptip
        v-if="pIsShowImport"
        v-model="isShowImportPop"
        style="text-align:center"
        title="从excel中导入"
        trigger="click"
        placement="bottom-end"
      >
        <Button type="text" :loading="isImportExcel">导入</Button>
        <div slot="content">
          <form enctype="multipart/form-data" novalidate>
            <input
              type="file"
              name="file"
              id="xFile"
              @change="hFilesChange($event.target.files)"
            />
            <Button type="primary" @click="hImportFromExcel">确定</Button>
          </form>
        </div>
      </Poptip>
      <Button
        v-if="pIsShowExport"
        type="text"
        :loading="downloadExcel"
        @click="hExportToExcel"
        >导出</Button
      >
      <Poptip
        v-model="isShowColsPop"
        style="text-align:center"
        trigger="click"
        placement="bottom-end"
      >
        <div class="pointer" :class="{ colsettingIcon: isShowColsPop }">
          <slot name="btn"
            ><Icon
              style="font-size:1.5em;"
              title="列设置"
              type="ios-arrow-forward"/></slot
          >{{ cColTitle }}
        </div>

        <div slot="content">
          <ul style="text-align:left">
            <!-- v-drag="handleDrag"
              title="按下拖动可排序" -->
            <li
              class="item item-hover"
              v-for="(item, index) in colsForCheckList"
              :key="`li_${index}`"
              :data-order="index"
            >
              {{ index + 1 }}.
              <input
                type="checkbox"
                @click="hChechboxChange"
                :value="item.prop"
                v-model="item.check"
              />
              <!-- style="cursor:pointer" -->
              {{ item.label }}
            </li>
          </ul>
        </div>
      </Poptip>
    </div>
    <!--  -->
    <el-table
      v-fixedTableHeader
      v-loading="isLoadTable"
      ref="table"
      stripe
      header-row-class-name="blod"
      header-cell-class-name="align_center"
      :span-method="cSpanMethod"
      :height="pFixedHeight"
      :data="rowsData"
      :cell-style="cellStyle"
      :cell-class-name="cellClassName"
      @header-dragend="hHeaderDragend"
      @selection-change="handleSelectionChange"
      @cell-click="hCellClick"
      border
    >
      <!-- <el-table-column width="40" fixed="left">
        <template slot="header" slot-scope="scope">
          <Checkbox />
        </template>
        <template slot-scope="scope">
          <Checkbox />
        </template>

         v-if="pIsMulSelect"
         
      </el-table-column> -->
      <slot> </slot>

      <el-table-column fixed="left" type="selection" width="40">
      </el-table-column>
      <my-column
        v-for="item in cColsData"
        :key="item.prop"
        :col="item"
        :pIsEditing="isEditing"
        :pEditRowId="editRowId"
        :pEditColKey="editColKey"
        :pEditValidator="editValidator"
        :pEditStyle="pEditStyle"
        @modifyValSuccess="hModifyValSuccess"
        @modifyValFailure="hModifyValFailure"
      ></my-column>
    </el-table>

    <a style="display:none;" id="aid">导出excel时使用的钩子</a>

    <TableEditCell
      v-if="editStyle == 'cell-dialog'"
      ref="refTableEditCell"
      :pEditRow="editRow"
      :pEditColKey="editColKey"
      @ok="hEditCellOk"
      @cancel="hEditCellCancel"
    >
    </TableEditCell>
    <div class="m5" v-show="cShowPageArea">
      <Page
        :total="pTotalRowNumber"
        show-total
        show-elevator
        show-sizer
        :page-size-opts="pPageSizeOpts"
        size="small"
        @on-change="hPageChange"
        @on-page-size-change="hPageSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.m5 {
  margin: 5px;
  overflow: hidden;
}
.canEdit {
  position: relative;
  cursor: text;
}
.canEdit::after {
  content: "";
  border: 10px solid transparent;
  border-top-color: #ccc;
  border-left-color: #ccc;
  top: 0;
  left: 0;
  position: absolute;
}
.bold {
  font-weight: bold;
}
.colsettingIcon {
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
.ivu-icon {
  transition: all 0.5s;
}
.colsettingIcon .ivu-icon {
  transform: rotate(90deg);
}

.fixTopTable .el-table__empty-block {
  display: none;
}
.ipcTable .el-table__row .cell {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.ipcTable .el-table__row .cell span {
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.align_right {
  text-align: right !important;
}
.align_center {
  text-align: center !important;
}
.align_left {
  text-align: left !important;
}

.item {
  padding: 0.2em;
  display: flex;
  align-items: center;
}
.item-hover:hover {
  margin: 1px;
  outline: 1px dotted #ccc;
  cursor: move;
}

.dragging {
  margin: 1px;
  opacity: 0.8;
  color: #6894d1;
}
.drag-over {
  margin: 1px;
  outline: 1px solid #2d8cf0;
}
.loader {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0 auto;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
<script>
import EXECL from "./IPCTable.vue.unit";
import _methods from "./IPCTable.vue.js";
import TableEditCell from "./IPCTableEditCell.vue";
import myColumn from "./IPCTable-column";
export default {
  data() {
    return {
      fixedHeaderStyle: { position: "fixed", top: 0 },
      importExcelFileName: "",
      isShowImportPop: false,
      isShowColsPop: false,
      isImportExcel: false,
      isLoadTable: false,
      rowsData: [],
      colsData: [],
      colsForCheckList: [],
      tableWidth: 500,
      isEdit: this.pIsEdit,
      editStyle: this.pEditStyle,
      downloadExcel: false,

      isDirty: false,

      isEditing: false, // 是否正编辑

      editRow: {},
      editRowId: -1,
      editColKey: "",

      editValidator: () => ture,

      flag: true
    };
  },
  components: {
    TableEditCell,
    myColumn
  },
  props: {
    // 是否显示多选
    pIsMulSelect: {
      type: Boolean,
      default: false
    },
    pTotalRowNumber: {
      type: Number,
      default: 0
    },
    pTotal: { type: Number, default: 0 },
    pPageSizeOpts: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50];
      }
    },
    pEditStyle: {
      type: String,
      default: "",
      validator: item => {
        return true;
      }
    },
    pIsShowEditSwitch: {
      type: Boolean,
      default: false
    },
    // 是否可以开启编辑
    pIsEdit: {
      type: Boolean,
      default: false
    },
    pIsShowExport: {
      type: Boolean,
      default: false
    },
    pIsShowImport: {
      type: Boolean,
      default: false
    },
    // 导入数据到excel时，自定义事件名
    pUpdateTableFromExcelEventName: {
      type: String,
      default: ""
    },
    // 固定高度值
    pFixedHeight: {
      type: [Number, String],
      default: undefined
    },
    // 要显示出来内容在单元格对象中的字段名
    pValKey: {
      type: String,
      required: false,
      default: "val"
    },
    // 数据行
    pRowsData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * 设置给表格的全部列
     * */
    pColsData: {
      type: Array,
      default: () => {
        return [];
      },
      validator: fixedCols => {
        if (fixedCols.length > 0) {
          return fixedCols.every(col => {
            return col.hasOwnProperty("prop") && col.hasOwnProperty("label");
          });
        } else {
          return true;
        }
      }
    }
  },
  computed: {
    cShowPageArea() {
      return this.pTotalRowNumber > 0;
    },
    cColTitle() {
      return [
        "显示/隐藏列[",
        this.colsForCheckList.filter(item => item.check).length,
        "/",
        this.colsForCheckList.length,
        "]"
      ].join("");
    },
    cSpanMethod() {
      let data = [];
      this.rowsData.forEach(row => {
        let obj = {};
        let keys = Object.keys(row);
        keys.forEach(key => {
          obj[key] =
            row[key] + (this.editableObject[key + row.rowId] ? "--" : "");
        });
        data.push(obj);
      });

      return this.creatCellMerginFunc(
        data,
        this.cMergeCols,
        this.cColsData,
        "both"
      );
    },
    cMergeCols() {
      let rs = [];
      this.cColsData.forEach(item => {
        if (item.isMerge) {
          rs.push(item.prop);
        }
      });
      return rs;
    },
    cFlatCols() {
      let rs = this.flatCols(this.pColsData);
      console.info("cFlatCols", rs);
      return ts;
    },
    cCurShowCol() {
      // 要处理嵌套的情况 不能同步顺序

      let currentColsStatus = {};
      this.colsForCheckList.forEach(col => {
        currentColsStatus[col.prop] = col.check;
      });
      return this.colsData.filter(col => {
        return currentColsStatus[col.prop] !== false;
      });
    },

    cColsData() {
      // this.flag = false;
      let rs = this.cCurShowCol;

      // setTimeout(() => {
      //   // TODO: 这个flag加的不知何故, 如果不加，则调整列之后，表格不能重新刷新
      //   this.flag = true;
      // }, 10);
      this.setColWidth(rs, this.rowsData, this.tableWidth);
      return rs;
    }
  },

  mounted() {
    this.tableWidth = 500;
    try {
      this.tableWidth = this.$refs.table.$el.getBoundingClientRect().width;
    } catch (e) {
      // console.info(e);
    }
  },
  methods: {
    ..._methods,
    hPageChange(curPageIndex) {
      this.$emit("pageIndexChange", curPageIndex);
    },
    hPageSizeChange(curPageSize) {
      this.$emit("pageSizeChange", curPageSize);
    },

    hModifyValSuccess({ oldVal, newVal, editRowId, editColKey }) {
      console.info(oldVal, newVal, editRowId, editColKey);
      if (this.updateCellVal(editRowId, editColKey, newVal)) {
        this.isEditing = false;
        let rowIndex = this.rowsData.findIndex(row => row.rowId === editRowId);
        let colIndex = this.cColsData.findIndex(col => col.prop === editColKey);
        this.$emit("modifyCellValueSuccess", {
          oldVal,
          newVal,
          editRowId,
          editColKey,
          rowIndex,
          colIndex
        });
      }
    },
    hModifyValFailure({ msg, oldVal, newVal, editRowId, editColKey }) {
      console.info(msg, oldVal, newVal, editRowId, editColKey);
      // this.updateCellVal(editRowId,editColKey, oldVal );
      this.isEditing = false;
      let rowIndex = this.rowsData.findIndex(row => row.rowId === editRowId);
      let colIndex = this.cColsData.findIndex(col => col.prop === editColKey);
      this.$emit("modifyCellValueFailure", {
        msg,
        oldVal,
        newVal,
        editRowId,
        editColKey,
        rowIndex,
        colIndex
      });
    },
    hFilesChange(file) {
      this.importExcelFileName = file[0];
      this.isShowImportPop = true;
    },
    hImportFromExcel() {
      if (this.importExcelFileName === "") {
        return false;
      }
      this.isShowImportPop = false;
      this.isImportExcel = true;
      setTimeout(() => {
        this.isImportExcel = false;
        EXECL.import(this.importExcelFileName, this.cColsData).then(
          jsonArr => {
            this.updateTableRowWithJsonArr(jsonArr);
          },
          d => {
            this._error(d);
            return;
          }
        );
      }, 2000);
    },
    hExportToExcel() {
      let data = this.exportToJson();
      this.downloadExcel = true;
      try {
        EXECL.download(document.getElementById("aid"), data, "aaaa");
      } catch (e) {
      } finally {
        this.downloadExcel = false;
      }
    },
    handleDrag: function(aindex, bindex) {
      var b = this.colsForCheckList[aindex];
      var a = this.colsForCheckList[bindex];

      console.info(aindex, bindex);

      this.$set(this.colsForCheckList, aindex, a);
      this.$set(this.colsForCheckList, bindex, b);
    },
    hEditCellOk(val) {
      let row = this.rowsData.find(row => {
        return row.rowId === this.editRow.rowId;
      });
      if (row) {
        row[this.editColKey] = val;
        this.isDirty = true;
      } else {
        console.error(`修改错误,没有找到行`);
        console.info(this.rowsData, this.editRow, this.editColKey);
        console.error(`修改错误,没有找到行`);
      }
      this.hEditCellCancel();
    },
    hEditCellCancel() {
      this.editColKey = "";
    },
    hChechboxChange(e) {
      this.$nextTick(() => {
        // debugger;
        this.$emit("checkListChange", {
          curProp: e.target.value,
          allStatus: this.colsForCheckList.map(item => {
            return { ...item };
          })
        });
        // console.info(e.target.vlaue, this.colsForCheckList);
      });
    },
    hSaveTableData() {
      this.$emit("changeData", this.rowsData);
    },
    handleSelectionChange(val) {
      if (this.pIsMulSelect) {
        this.$emit("mulSelectChange", val.map(item => item.rowId));
      }
    },
    hHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", { newWidth, oldWidth, column, event });
    },
    hCellClick(row, column, cell, event) {
      if (this.editableObject[column.property + row.rowId]) {
        this.isEditing = true;
        this.editRowId = row.rowId;

        this.editColKey = column.property;
        this.editRow = row;
        this.editValidator = this.getValidteFunc(row.rowId, column.property);
      } else {
        return;
      }
    },
    updateCellVal(rowId, colKey, newVal) {
      let row = this.rowsData.find(row => row.rowId === rowId);
      if (row) {
        let obj = row[colKey];
        if (typeof obj === "object") {
          obj.val = newVal;
        } else {
          row[colKey] = newVal;
        }
        return true;
      } else {
        return false;
      }
    },
    getValidteFunc(rowId, colKey) {
      let row = this.pRowsData.find(row => row.rowId === rowId);
      if (row) {
        if (row[colKey].validator) {
          return row[colKey].validator;
        } else {
          return v => true;
        }
      } else {
        return v => true;
      }
    },
    flatCols(newVal) {
      let rs = [];
      for (var i = 0; i < newVal.length; i++) {
        let col = newVal[i];
        if (col.children) {
          let children = this.flatCols(col.children);
          rs = rs.concat(children);
        } else {
          rs.push(col);
        }
      }
      return rs;
    },

    // 要处理嵌套的情况
    // buildColsWithCheckList(pColsData, colsForCheckList) {
    //   let rs = [];

    //   for (var i = 0; i < colsForCheckList.length; i++) {
    //     let obj = colsForCheckList[i];
    //     if (obj.check) {
    //       let col = pColsData.find(it => it.prop === obj.prop);
    //       if (col) {
    //         if (col.children) {
    //           let children = this.buildColsWithCheckList(
    //             col.children,
    //             colsForCheckList
    //           );
    //           rs.push({
    //             ...col,
    //             children
    //           });
    //         } else {
    //           rs.push({ ...col });
    //         }
    //       }
    //     }
    //   }
    //   return rs;
    // },

    fIsEdit(row, column, index) {
      // console.info(column.prop, row.rowId, index, this.editableObject);
      return this.isEdit && !!this.editableObject[column.prop + row.rowId];
    },

    updateTableRowWithJsonArr(jsonArr) {
      // 从excel中导入数据
      // 默认使用覆盖规则：导入的数据行会覆盖表格中现有的数据行，对超出的数据行不做处理,
      // 如果给定事件名，则抛出数据
      if (this.pUpdateTableFromExcelEventName === "") {
        jsonArr.forEach((item, index) => {
          let keys = this.cColsData.map(it => it.prop);
          let targetData = this.rowsData[index];
          if (!targetData) {
            return;
          }
          keys.forEach(key => {
            if (typeof targetData[key] === "object" && this.pValKey) {
              targetData[key][this.pValKey] = item[key];
            } else {
              targetData[key] = item[key];
            }
          });
        });
      } else {
        this.$emit(this.pUpdateTableFromExcelEventName, jsonArr);
      }
    },

    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (this.pIsMulSelect) {
        if (columnIndex === 0) {
          return;
        }
        columnIndex = columnIndex - 1;
      }
      let classNameList = [];
      try {
        console.info(row, column, rowIndex, columnIndex);
        let align = this.cColsData[columnIndex].align;

        if (align) {
          classNameList.push("align_" + align);
        } else {
          classNameList.push("align_" + "center");
        }
        let classNameFuc = this.cColsData[columnIndex].classNameFuc;
        if (classNameFuc) {
          if (typeof classNameFuc === "function") {
            let colName = column.property;
            let colVal = row[colName];
            let cls = classNameFuc(colVal, row, column, rowIndex, columnIndex);
            classNameList.push(cls);
          }
        }
        if (this.isEdit && this.editableObject[column.property + row.rowId]) {
          classNameList.push("canEdit");
        }
      } catch (e) {
        console.warn(e);
      }

      return classNameList.join(" ");
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (this.pIsMulSelect) {
        if (columnIndex === 0) {
          return {};
        }
        columnIndex = columnIndex - 1;
      }
      let classNameList = [];
      try {
        console.info(row, column, rowIndex, columnIndex);
        let align = this.cColsData[columnIndex].align;

        if (align === "left") {
          return { textAlign: "left" };
        } else if (align === "right") {
          return { textAlign: "right" };
        }
        return {};
      } catch (e) {
        console.warn(e);
        return {};
      }

      return classNameList.join(" ");
    },
    getCellValueToShow(obj) {
      return typeof obj === "object" ? obj["val"] : obj;
    },
    createRows(rowsOriginData = []) {
      if (!rowsOriginData) return [];
      if (rowsOriginData.length === 0) return [];
      let rs = this.validatorTableData(rowsOriginData, this.pValKey);

      if (rs !== true) {
        console.warn(rs.join("\n"));
        return [];
      }
      let rowsData = rowsOriginData.map(item => {
        let obj = {};
        for (let key in item) {
          // obj[key] =  this.pValKey === "" ? item[key] : item[key][this.pValKey];
          obj[key] = this.getCellValueToShow(item[key]);
        }
        return obj;
      });
      console.info("表格中的行......", rowsData);
      return rowsData;
    },
    createEditableObject(newVal) {
      let obj = {};
      newVal.forEach(item => {
        let rowId = item["rowId"];
        let keys = Object.keys(item);
        keys.forEach(key => {
          let colName = key;
          if (!!item[key].editable) {
            obj[colName + rowId] = true;
          }
        });
      });
      return obj;
    },

    // 要处理嵌套的情况
    createCols(newVal) {
      let rs = [];
      for (var i = 0; i < newVal.length; i++) {
        let col = newVal[i];
        if (col.children) {
          rs = rs.concat(this.createCols(col.children));
        } else {
          // if (!col.isHidden) {
          rs.push({ ...col, check: !col.isHidden });
          // }
        }
      }
      return rs;
    },
    _selectAll() {
      this.$refs.table.clearSelection();
      this.$refs.table.toggleAllSelection();
    },
    _selectRowsByIndex(index) {
      this.$refs.table._selectRowsByIndex(rowIndex);
    },
    _disableSelect() {
      // this.$refs.table.clearSelection();
      this.$nextTick(() => {
        try {
          let spanSelector =
            ".el-table__fixed-body-wrapper tr.el-table__row td.el-table-column--selection .el-checkbox span.el-checkbox__input";
          let inputSelector =
            " .el-table__fixed-body-wrapper tr.el-table__row td.el-table-column--selection .el-checkbox span.el-checkbox__input input";

          let spans = this.$refs.table.$el.querySelectorAll(spanSelector);
          let inputs = this.$refs.table.$el.querySelectorAll(inputSelector);
          Array.from(spans).forEach(span => span.classList.add("is-disabled"));

          Array.from(inputs).forEach(input =>
            input.setAttribute("disabled", "disabled")
          );

          let spanSelectorHeader =
            ".el-table__fixed-header-wrapper th.el-table-column--selection .el-checkbox span.el-checkbox__input";
          let spanSelectorHeaderInput =
            ".el-table__fixed-header-wrapper th.el-table-column--selection .el-checkbox span.el-checkbox__input input";

          let span = this.$refs.table.$el.querySelector(spanSelectorHeader);
          if (span) {
            span.style.display = "none";
          }
          // span.classList.add("is-disabled");
          // let input = this.$refs.table.$el.querySelector(spanSelectorHeaderInput);
          // input.setAttribute("disabled", "disabled");
        } catch (e) {
          console.error(" error with _disableSelect");
        }
      });
    },
    _enableSelect() {
      try {
        let spanSelector =
          ".el-table__fixed-body-wrapper tr.el-table__row td.el-table-column--selection .el-checkbox span.el-checkbox__input";
        let inputSelector =
          " .el-table__fixed-body-wrapper tr.el-table__row td.el-table-column--selection .el-checkbox span.el-checkbox__input input";

        let spans = this.$refs.table.$el.querySelectorAll(spanSelector);
        let inputs = this.$refs.table.$el.querySelectorAll(inputSelector);
        Array.from(spans).forEach(span => span.classList.remove("is-disabled"));

        Array.from(inputs).forEach(input => input.removeAttribute("disabled"));

        let spanSelectorHeader =
          ".el-table__fixed-header-wrapper th.el-table-column--selection .el-checkbox span.el-checkbox__input";
        let spanSelectorHeaderInput =
          ".el-table__fixed-header-wrapper th.el-table-column--selection .el-checkbox span.el-checkbox__input input";

        let span = this.$refs.table.$el.querySelector(spanSelectorHeader);

        if (span) {
          span.style.display = "inline-block";
        }
      } catch (e) {
        console.error(" error with _enableSelect");
      }
      // let input = this.$refs.table.$el.querySelector(spanSelectorHeaderInput);
      // span.classList.remove("is-disabled");

      // input.removeAttribute("disabled");
    },
    _getHidenCols() {
      return this.colsForCheckList
        .filter(item => !item.check)
        .map(item => item.prop);
    }
  },
  watch: {
    pColsData: {
      handler: function(newVal, oldVal) {
        debugger;
        if (newVal) {
          this.colsData = this.createCols(newVal);
          this.colsForCheckList = this.colsData
            .filter(col => {
              if (col.canHide === false) {
                return false;
              } else {
                return true;
              }
            })
            .map(col => {
              return {
                label: col.label,
                prop: col.prop,
                check: col.check
              };
            });
        }
      },
      immediate: true
    },
    pRowsData: {
      handler: function(newVal, oldVal) {
        this.rowsData = this.createRows(newVal);
        // console.info("rowData.....", this.rowsData);
        this.editableObject = this.createEditableObject(newVal);
      },
      immediate: true
    }
  }
};
</script>
