declare namespace User {
  interface Profile {
    avatar?: string
    name?: string
    description?: string
  }

  interface Config {
    secretKey?: string
    proxyAdress?: string
    chatModel?: string
    chatModelList?: Array
    drawvalue?: string
  }
  interface Usage {
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
    mothly_user_usage?: number
    today_user_usage?: number
    today_user_image_usage?: number
    mothly_user_image_usage?: number
    left_tokens?: number
    left_dalle?: number
  }
  interface Signin {
    secretKey?: string
    proxyAdress?: string
    chatModel?: string
    chatModelList?: Array
    drawvalue?: string
  }
}
