var crypto = require("crypto");
var sign = (data) => {
    let str = "integralofficial&";
    let params = [];
    data.forEach((v, i) => {
        if (v) {
            params.push("arguments" + (i + 1) + v);
        }
    });
    return crypto
        .createHash("md5")
        .update(str + params.join("&"))
        .digest("hex");
};
let params = {
                arguments1: "AC20200814162815", // acid
                arguments2: "GGPD", // yhChannel
                arguments3: "6c54032f662c4d2bb576872ed408232c", // yhTaskId menuId
                arguments4: new Date().getTime(), // time
                arguments6: "517050707",
                arguments7: "517050707",
                arguments8: "123456",
                arguments9: "4640b530b3f7481bb5821c6871854ce5",
                orderId: crypto
                    .createHash("md5")
                    .update(new Date().getTime() + "")
                    .digest("hex"),
                netWay: "Wifi",
                remark: "章节视频得积分",
                version: `android@8.0102`,
                //orderId: "0923fca6d5ffb8ec017fc6b3cbc5c9c0",
            };
            params["sign"] = sign([
                params.arguments1,
                params.arguments2,
                params.arguments3,
                params.arguments4,
            ]);
var dailyTTliulan = {
  doTask: async (axios, options) => {
    await require('./rewardVideo').doTask(axios, {
      ...options,
      params,
      acid: 'AC20200814162815',
      taskId: '6c54032f662c4d2bb576872ed408232c',
      codeId: 517050707,
      reward_name: '手厅浏览有礼发积分'
    })
  }
}
module.exports = dailyTTliulan
