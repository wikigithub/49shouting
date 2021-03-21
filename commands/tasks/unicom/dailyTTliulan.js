let params = {
                arguments1: "AC20200521222721", // acid
                arguments2: account.yhChannel, // yhChannel
                arguments3: account.yhTaskId, // yhTaskId menuId
                arguments4: new Date().getTime(), // time
                arguments6: "",
                arguments7: "woyuedu",
                arguments8: "a123456",
                arguments9: "",
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
      acid: 'AC20200814162815',
      taskId: '6c54032f662c4d2bb576872ed408232c',
      codeId: 517050707,
      reward_name: '手厅浏览有礼发积分'
    })
  }
}
module.exports = dailyTTliulan
