const { scheduler } = require('../../../utils/scheduler')
const { getCookies, saveCookies } = require('../../../utils/util')
const _request = require('../../../utils/request')

var start = async (params) => {
  const { cookies, options } = params

  let init = async (request, savedCookies) => {
    await require('./init')(request, {
      ...params,
      cookies: savedCookies || cookies
    })
    return {
      request
    }
  }
  let taskOption = {
    init
  }
// 首页-游戏-娱乐中心-每日打卡
  await scheduler.regTask('producGameSignin', async (request) => {
    await require('./producGame').gameBox(request, options)
    await require('./producGame').gameSignin(request, options)
  }, taskOption)


// 首页-游戏-娱乐中心-每日打卡-完成今日任务(200m)
  await scheduler.regTask('todayDailyTask', async (request) => {
    await require('./producGame').gameBox(request, options)
    await require('./producGame').doTodayDailyTask(request, options)
  }, {
    ...taskOption,
    startTime: 22 * 3600
  })


	// 首页-积分查询-游戏任务IOS
  await scheduler.regTask('dailygameIntegral', async (request) => {
    await require('./producGameIOS').doGameIntegralTask(request, options)
  }, taskOption)
  
  // 首页-积分查询-游戏任务Android
  await scheduler.regTask('dailygameIntegral', async (request) => {
    await require('./producGame').doGameIntegralTask(request, options)
  }, taskOption)
  
  // 定时检测流量兑换
  // 可使用 --exchangeDFlowCircle-intervalTime 1800 选项指定流量检查间隔时间，单位秒
  // 可使用 --exchangeDFlowCircle-minFlow 200 选项指定流量检查最小值
  // 可使用 --exchangeDFlowCircle-productId 21010621565413402 选项指定兑换流量包ID
  let { 'exchangeDFlowCircle-intervalTime': intervalTime = 1800 } = options
  if (typeof intervalTime !== 'number') {
    intervalTime = 1800
  }
  await scheduler.regTask('exchangeDFlowCircle', async (request) => {
    await require('./exchangeDFlow').doCircleCheck(request, options)
  }, {
    ...taskOption,
    isCircle: true,
    intervalTime: intervalTime,
    startTime: 5 * 60,
    ignoreRelay: true
  })

  // 每日奖励信息结果推送
  if (!('asm_func' in process.env) || process.env.asm_func === 'false') {
    await scheduler.regTask('dailyNotifyReward', async (request) => {
      await require('./dailyNotifyReward').doNotify(request, options)
    }, {
      ...taskOption,
      startTime: 22 * 3600,
      ignoreRelay: true
    })
  }

}
module.exports = {
  start
}
