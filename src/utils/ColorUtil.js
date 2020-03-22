const getRandomColor = function () {
    return "#" + (function (color) {
        let rand = Math.floor(Math.random() * 0XFFFFFF).toString(16);
        return rand.length === 6 ? rand : color;
    })('');
};
export default {
    getRandomColor
}