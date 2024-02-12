declare namespace User {
    interface Profile {
        avatar?: string
        name?: string
        description?: string
      }

    interface Config{
        secretKey?: string
        proxyAdress?: strting
        contextEnable?: boolean
        contextMsgPairNum?: number
        quotaByTokenDaily?: number
        quotaByTokenMonthly?: number
        quotaByRequestDaily?: number
        quotaByRequestMonthly?: number
        quotaByImageDaily?: number
        quotaByImageMonthly?: number
        todayTokenCost?: number
        todayRequestTimes?: number
        todayGeneratedImageNumber?: number
        currMonthTokenCost?: number
        currMonthRequestTimes?: number
        currMonthGeneratedImageNumber?: number
        total_used?: number
    }
    interface Usage{
      contextEnable?: boolean
      contextMsgPairNum?: number
      quotaByTokenDaily?: number
      quotaByTokenMonthly?: number
      quotaByRequestDaily?: number
      quotaByRequestMonthly?: number
      quotaByImageDaily?: number
      quotaByImageMonthly?: number
      todayTokenCost?: number
      todayRequestTimes?: number
      todayGeneratedImageNumber?: number
      currMonthTokenCost?: number
      currMonthRequestTimes?: number
      currMonthGeneratedImageNumber?: number
      total_used?: number
      total_tokens?: number
  }
}
