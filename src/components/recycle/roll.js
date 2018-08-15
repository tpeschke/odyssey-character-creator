module.exports = {
    rollScore: function (num, sides) {
        let tempArr = []
        for (let i = 0; i < num; i++) {
            tempArr.push(Math.floor(Math.random() * Math.floor(sides))+1)
        }
        return tempArr
    },
    rollPercent: function () {
        return Math.floor(Math.random() * Math.floor(100))+1
    }
}