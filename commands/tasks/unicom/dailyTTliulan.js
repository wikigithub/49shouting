var dailyTTliulan = {
  doTask: async (axios, options) => {
    await require('./rewardVideo').doTask(axios, {
      ...options,
      acid: 'AC20200814162815',
      taskId: '8e3c9e037c9a5418b0d789aa0200208b',
      codeId: 945535616,
      reward_name: '手厅浏览有礼发积分'
    })
  }
}
module.exports = dailyTTliulan
