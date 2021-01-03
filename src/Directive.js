/**
 * Created by baidm in 2021/1/3 on 13:14
 */
const waterMarker = {
    bind(el, bind) {
        function addWaterMarker(text, parentNode, {width = 200, height = 200, font = 40, color = "rgba(180,180,180,0.2)", textAlign = "right"}) {
            let canvas = document.createElement("canvas");
            parentNode.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            canvas.style.display = "none";
            let ctx = canvas.getContext("2d");
            ctx.rotate(-20 * Math.PI / 180);
            ctx.font = `${font}px 微软雅黑`;
            ctx.textBaseline = "middle";
            ctx.fillStyle = `${color}`;
            ctx.textAlign = `${textAlign}`;
            ctx.fillText(text, width / 2, height / 2);
            parentNode.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
        }

        addWaterMarker(bind.value.text, el, {
            font: bind.value.font,
            color: bind.value.color
        })
    }
};

export default {
    waterMarker
}
