


<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style> 
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
        <Sider>
          <Menu active-name="1-2" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>IPCTable
              </template>
              <MenuItem name="1-1"><router-link to="/IPCTable">基础</router-link></MenuItem>
              <MenuItem name="1-2"><router-link to="/IPCTableMulCol">多级表头</router-link></MenuItem>
              <MenuItem name="1-3"><router-link to="/IPCTable_merge">合并单元格</router-link></MenuItem>
              <MenuItem name="1-4"><router-link to="/IPCTableImport">从excel导入</router-link></MenuItem>
              <MenuItem name="1-5"><router-link to="/IPCTableExport">导出为 excel</router-link></MenuItem>
              <MenuItem name="1-6"><router-link to="/IPCTableFixedHeight">固定高度</router-link></MenuItem> 
              <!--
              
              <MenuItem name="1-2"><router-link to="/IPCTable_merge">合并单元格</router-link></MenuItem>
              <MenuItem name="1-2"><router-link to="/IPCTable_merge">合并单元格</router-link></MenuItem> -->
            </Submenu>
        </Menu>
        </Sider>
        <Layout :style="{paddingLeft:'50px'}">
            <Content>
                <router-view/>
            </Content>
        </Layout>
    </Layout>
  </div>
</template>
<script>
    export default {
    }
</script>


