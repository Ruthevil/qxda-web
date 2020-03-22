import ColorUtil from "./ColorUtil"

/**
 * 生成动画css字符串，生成的动画字符串只兼容Chrome浏览器
 * @containerName{string} 动画所在的容器，必须值
 * @frameNumber{number} 动画的帧数，必须值
 * @animateKey{string} 应用动画的属性key，必须值
 * @animateValueList{Array<string>} 应用动画的属性value，可选值，默认随机生成的颜色值
 * @name{string} 动画名称，可选值，默认为run
 * @times{string} 动画一个周期的时间，可选值，默认3s
 * @animateFun{string} 动画执行函数，可选值，默认steps(20, start)
 * @isInfinite{string} 是否无限循环动画，可选值，默认infinite
 */
class AnimateUtil {
    constructor(containerName, frameNumber, animateKey, animateValueList, name = "run",
                times = "3s", animateFun = "steps(20, start)", isInfinite = "infinite") {
        this.containerName = containerName;
        this.frameNumber = frameNumber;
        this.animateKey = animateKey;
        this.animateValueList = animateValueList || this.getColorList();
        this.name = name;
        this.times = times;
        this.animateFun = animateFun;
        this.isInfinite = isInfinite;
        this._timelines = [];
        this._innerString = "";
    }

    /**
     * 生成animateValueList
     * @return {[]}
     */
    getColorList() {
        let list = [];
        for (let j = 1; j <= this.frameNumber; j++) {
            list.push(ColorUtil.getRandomColor());
        }
        return list;
    }

    /**
     * 生成@keyframs时间轴
     */
    getTimeLines() {
        let base = 100 / this.frameNumber;
        for (let i = 1; i <= this.frameNumber; i++) {
            this._timelines.push(i * base);
        }
    }

    /**
     * 生成@keyframes内部字符串
     */
    getInnerString() {
        this.getTimeLines();
        this._timelines.forEach((item, index) => {
            this._innerString = this._innerString + `${item}%{${this.animateKey}:${this.animateValueList[index]};}`;
        });
    }

    /**
     * 生成动画css字符串
     * @return {string|null}
     */
    generateAnimationCss() {
        if (!this.containerName || !this.frameNumber) {
            console.log("动画容器或动画帧为空！");
            return null;
        }
        this.getInnerString();
        let string = `@keyframes ${this.name}{${this._innerString}}`;
        string = string + `@-webkit-keyframes ${this.name}{${this._innerString}}`;
        string = string + `${this.containerName}{animation: ${this.name} ${this.times} ${this.animateFun} ${this.isInfinite};`;
        string = string + `-webkit-animation: ${this.name} ${this.times} ${this.animateFun} ${this.isInfinite};}`;
        return string;
    }

    appendAnimation() {
        let headTag = document.getElementsByTagName("head")[0];
        let styleTag = document.getElementsByTagName("style")[0];
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.type = "text/css";
        }
        styleTag.appendChild(document.createTextNode(this.generateAnimationCss()));
        headTag.appendChild(styleTag);
    }
}

export default AnimateUtil