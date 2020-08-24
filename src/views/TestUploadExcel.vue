<template>
    <div class="upload-excel">
        这里用来测试elementUI的upload上传文件，并获取文件流和json格式的header和body数据
        <el-upload
            class="file-upload"
            ref="fileUpload"
            action=""
            :http-request="handleRequest"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :before-remove="handleBeforeRemove"
            :on-change="handleChange"
            :file-list="fileList"
            :multiple="false"
            :auto-upload="false"
            accept=".xls,.xlsx"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button type="primary" size="mini" @click="sendFile">发送文件</el-button>
    </div>
</template>

<script>
    import XLSX from "xlsx"

    export default {
        name: "TestUploadExcel",
        data() {
            return {
                fileList: [],
            }
        },
        methods: {
            /**
             * 上传的文件个数超出限制时触发的钩子
             * @param files
             * @param fileList
             */
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            sendFile() {
                this.$refs.fileUpload.submit();
            },
            /**
             * 覆盖默认的上传文件，自定义实现文件上传
             */
            handleRequest(params) {
                console.log("request", params);
                let formData = new FormData();
                formData.append("file", params.file);
                // ArchiveImportHttpService.uploadFile({
                //     userId: window.$config.userId,
                //     appId: window.$config.appId,
                //     req: formData
                // }).then(({data}) => {
                //     console.log(data);
                // }).catch(err => {
                //     console.log(err);
                // })
            },
            /**
             * 文件列表移除文件时的钩子
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                console.log("remove", file, fileList);
            },
            /**
             * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
             * @param file
             */
            handleChange(file) {
                this.file2JSON(file).then(data => {
                    // data对象的每个元素就是excel文件的每个sheet页的数据
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                })
            },
            /**
             * 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
             * @param file
             * @param fileList
             * @return {Promise<MessageBoxData> | *}
             */
            handleBeforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            /**
             * 使用xlsx将excel文件对象转换成json格式
             * @param file
             * @return {Promise<unknown>}
             */
            file2JSON(file) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();

                    reader.onload = function (event) {

                        let resSheet = XLSX.read(event.target.result, {
                            type: "binary"
                        });

                        let resJSON = [];
                        resSheet.SheetNames.forEach(sheetName => {
                            resJSON.push({
                                sheetName: sheetName,
                                sheet: XLSX.utils.sheet_to_json(resSheet.Sheets[sheetName])
                            });
                        });

                        resolve(resJSON);
                    };

                    reader.readAsBinaryString(file.raw);
                });
            }
        }
    }
</script>

<style scoped lang="stylus">
    .upload-excel
        width 100%
        height 100%

        >>> .el-upload__input
            display none
</style>
