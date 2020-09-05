<template>
    <div class="test-el-dialog">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDailog">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "TestElDialog",
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        closeDailog() {

            this.dialogVisible = false
        }

    }
}
</script>

<style scoped lang="stylus">
.test-el-dialog
    width 100%
    height 100%
</style>
