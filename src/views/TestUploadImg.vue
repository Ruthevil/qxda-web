<template>
    <div class="upload-img">
        <el-upload v-show="!imageUrl.length"
                   class="avatar-uploader"
                   :action="serverUrl"
                   :show-file-list="false"
                   :before-upload="beforeUpload"
                   :on-success="handleSuccess"
                   :on-progress="uploadProcess">
            <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
            <el-progress v-show="imgFlag" type="circle" :percentage="percent"
                         style="margin-top: 20px"></el-progress>
        </el-upload>

        <div class="image-preview" v-show="imageUrl.length">
            <div class="image-preview-wrapper">
                <img :src="imageUrl">
                <div class="image-preview-action">
                    <i @click="handleRemove">删除</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TestUploadImg",
        data() {
            return {
                serverUrl: "https://jsonplaceholder.typicode.com/posts/", // 后台上传接口
                imgFlag: false,
                percent: 0,
                imageUrl: '',
            };
        },
        methods: {
            handleRemove(file, fileList) {
                this.imageUrl = '';
            },
            beforeUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (
                    ['image/jpeg',
                        'image/gif',
                        'image/png',
                        'image/bmp'
                    ].indexOf(file.type) === -1) {
                    this.$message.error('请上传正确的图片格式');
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error('上传图片不能超过10MB哦!');
                    return false;
                }
            },
            handleSuccess(res, file) {
                this.imgFlag = false;
                this.percent = 0;
                if (res) {
                    this.imageUrl = URL.createObjectURL(file.raw); // 项目中用后台返回的真实地址
                } else {
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },
            uploadProcess(event, file, fileList) {
                this.imgFlag = true;
                console.log(event.percent);
                this.percent = Math.floor(event.percent);
            },
        }
    }
</script>

<style scoped lang="stylus">
    .upload-img
        width 100%
        height 100%
    >>>.el-upload__input
        display none
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .image-preview {
        width: 178px;
        height: 178px;
        position: relative;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        float: left;
    }

    .image-preview .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .image-preview .image-preview-wrapper img {
        width: 100%;
        height: 100%;
    }

    .image-preview .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
    }

    .image-preview .image-preview-action .el-icon-delete {
        font-size: 32px;
    }

    .image-preview:hover .image-preview-action {
        opacity: 1;
    }
</style>