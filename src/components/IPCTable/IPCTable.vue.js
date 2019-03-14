const PER_PIX_FOR_NUMBER = 8

const markDiffPointCounter = function(arr, startIdx, endIdx) {
  let tmp = {}
  let rs = []
  for (let i = startIdx; i < endIdx; i++) {
    if (tmp.name === '') {
      tmp.name = arr[i]
      tmp.rowSpan = 1
      tmp.rowIndex = 0
      rs.push(tmp)
    } else {
      if (tmp.name === arr[i]) {
        tmp.rowSpan = tmp.rowSpan + 1
      } else {
        tmp = {}
        tmp.name = arr[i]
        tmp.rowSpan = 1
        tmp.rowIndex = i
        rs.push(tmp)
      }
    }
  }
  return rs
}

export default {
  validatorTableData(originRowDatas, valKey) {

    return true;

    let rs = []
    let arr = []
    if (valKey === '') {
      arr = originRowDatas.map((rowData, rowIndex) => {
        let keys = Object.keys(rowData)
        return keys
          .map(key => {
            if (typeof rowData[key] !== 'object') {
              return true
            } else {
              rs.push(`${valKey}  -  ${JSON.stringify({ rowIndex, ...rowData[key] })}`)
              return false
            }
          })
          .every(item => item)
      })
    } else {
      arr = originRowDatas.map((rowData, rowIndex) => {
        let keys = Object.keys(rowData)
        return keys
          .map(key => {
            if (typeof rowData[key] === 'object' && valKey in rowData[key]) {
              return true
            } else {
              rs.push(`${valKey}  -  ${JSON.stringify({ rowIndex, ...rowData[key] })}`)
              return false
            }
          })
          .every(item => item)
      })
    }

    return arr.every(item => item) ? true : rs
  },
  exportToJson() {
    let tableHeader = {}
    let cols = this.cColsData
    cols.forEach(col => {
      tableHeader[col.prop] = col.label
    })
    let json = []
    if (this.rowsData) {
      json = this.rowsData.map(row => {
        let obj = {}
        cols.forEach(col => {
          obj[col.prop] = row[col.prop]
        })
        return obj
      })
    }
    json.unshift(tableHeader)
    return json
  },
  creatCellMerginFunc(data, mergeCols, allCols, dir = 'both') {
    let resultCol = []
    let resultRow = []
    if (mergeCols.length === 0 || allCols.length === 0) {
      return ({ row, column, rowIndex, columnIndex }) => ({
        rowspan: 1,
        colspan: 1
      })
    }

    let mergeColsIndex = mergeCols.map(item => {
      return allCols.findIndex(it => it.prop === item)
    })

    try {
      if ('both' === dir || 'column' === dir) {
        let rowsValue = data.map(it => {
          return mergeCols.map(item => {
            return it[item]
          })
        })

        resultCol = rowsValue.map(arr => {
          let rs = [],
            tmp = {}
          for (let i = 0; i < arr.length; i++) {
            if (tmp.name === '') {
              tmp.name = arr[i]
              tmp.colSpan = 1
              tmp.colIndex = mergeColsIndex[0]
              rs.push(tmp)
            } else {
              if (tmp.name === arr[i]) {
                tmp.colSpan = tmp.colSpan + 1
              } else {
                tmp = {}
                tmp.name = arr[i]
                tmp.colSpan = 1
                tmp.colIndex = mergeColsIndex[i]
                rs.push(tmp)
              }
            }
          }
          return rs
        })
      }

      if ('both' === dir || 'row' === dir) {
        let colsValue = mergeCols.map(it => {
          return data.map((item, index) => {
            return item[it]
          })
        })
        colsValue.forEach((arr, index) => {
          if (index === 0) {
            resultRow[index] = markDiffPointCounter(arr, 0, arr.length)
          } else {
            let tempArr = []
            resultRow[index - 1].forEach(obj => {
              let spliceArr = markDiffPointCounter(arr, obj.rowIndex, obj.rowIndex + obj.rowSpan)
              tempArr = [...tempArr, ...spliceArr]
            })
            resultRow[index] = tempArr
          }
        })
      }
    } catch (e) {
      console.info(e)
    }
    console.info(resultCol, resultRow)
    return ({ row, column, rowIndex, columnIndex }) => {
      // debugger
      let colspan = 1
      let rowspan = 1
      let i = mergeCols.findIndex(item => item === column.property.toLocaleLowerCase())

      // 对每一列,如果当前列处于要做合并处理的列，进一步确定这个单元格的colspan
      if (-1 !== i) {
        if ('both' === dir || 'column' === dir) {
          let itemCol = resultCol[rowIndex].find(item => item.colIndex === columnIndex)
          colspan = itemCol ? itemCol.colSpan : 0
        }
        //  是否需要设置rowSpan（即是否要合并）
        if ('both' === dir || 'row' === dir) {
          let itemRow = resultRow[i].find(item => item.rowIndex === rowIndex)
          rowspan = itemRow ? itemRow.rowSpan : 0
        }
      }
      return {
        rowspan,
        colspan
      }
    }
  },
  setColWidth(colArr, rowArr, totalWidth, minxWidth = 60) {
    const PER_PIX_FOR_NUMBER = 8
    let curTotalWidth = 0
    let cols = colArr.map(col => {
      let title = col.label || col.prop
      let rows = rowArr.map(row => row[col.prop])
      // 把表头设置进来
      rows.push(title)

      let maxWidth = Math.max(
        ...rows.map(it => {
          if (it) {
            return it.toString().length * PER_PIX_FOR_NUMBER + minxWidth
          } else {
            return minxWidth
          }
        })
      )

      col.width = maxWidth
      curTotalWidth += maxWidth
      return col
    })
    if (curTotalWidth < totalWidth) {
      cols.forEach(col => {
        col.width = Math.floor((col.width * totalWidth) / curTotalWidth)
      })
    }
    return cols
  }
}
