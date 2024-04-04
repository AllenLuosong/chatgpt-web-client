/*
 * @Author: mjjh
 * @LastEditTime: 2023-04-15 22:40:18
 * @FilePath: \chatgpt-shuowen\src\locales\zh-CN.ts
 * @Description: 简体中文配置文件
 */
export default {
  common: {
    add: '添加',
    addSuccess: '添加成功',
    edit: '编辑',
    editSuccess: '编辑成功',
    delete: '删除',
    deleteSuccess: '删除成功',
    save: '保存',
    saveSuccess: '保存成功',
    reset: '重置',
    action: '操作',
    export: '导出',
    exportSuccess: '导出成功',
    import: '导入',
    importSuccess: '导入成功',
    clear: '清空',
    clearSuccess: '清空成功',
    yes: '是',
    no: '否',
    confirm: '确定',
    download: '下载',
    noData: '暂无数据',
    wrong: '好像出错了，请稍后再试。',
    success: '操作成功',
    failed: '操作失败',
    verify: '验证',
    unauthorizedTips: '未经授权，请先验证。',
    email: '邮箱',
    passWord: '密码',
    newPassword: '新的密码',
    restPassWord: '重置密码',
    emailVerficationCode: '邮箱验证码',
    captcha: '验证码',
    addEmailTips1: '请输入邮箱',
    addEmailTips2: '请输出正确邮箱格式',
    addPassWordTips: '请输入密码',
    addTips: '请正确填写输入框中的内容',
  },
  chat: {
    defaultName: 'Chat',
    newChatButton: '新建聊天',
    placeholder: '来说点什么吧...也可贴截图或拖拽文件(Shift + Enter = 换行，"/" 触发提示词)',
    placeholderMobile: '来说点什么吧...("/"有惊喜)',
    copy: '复制',
    copied: '复制成功',
    copyCode: '复制代码',
    clearChat: '清空会话',
    clearChatConfirm: '是否清空会话?',
    exportImage: '保存会话到图片',
    exportImageConfirm: '是否将会话保存为图片?',
    exportSuccess: '保存成功',
    exportFailed: '保存失败',
    usingContext: '上下文模式',
    turnOnContext: '当前模式下, 发送消息会携带5条之前的聊天记录',
    turnOffContext: '当前模式下, 发送消息不会携带之前的聊天记录',
    deleteMessage: '删除消息',
    deleteMessageConfirm: '是否删除此消息?',
    deleteHistoryConfirm: '确定删除此记录?',
    clearHistoryConfirm: '确定清空聊天记录?',
    preview: '预览',
    showRawText: '显示原文',
  },
  draw: {
    placeholder: '输入生成图片的提示词，如：一只小猫...(Shift + Enter = 换行)',
    placeholderMobile: '来说点什么吧...("/"有惊喜)',
  },
  setting: {
    setting: '设置',
    logout: '登出',
    operate: '操作',
    general: '总览',
    advanced: '对话配置',
    config: '基础配置',
    quota: '额度',
    avatarLink: '头像链接',
    name: '名称',
    description: '描述',
    role: '角色设定',
    temperature: 'Temperature',
    top_p: 'Top_p',
    resetUserInfo: '重置用户信息',
    chatHistory: '聊天记录',
    theme: '主题',
    language: '语言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '超时',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
    balance: 'API余额',
    monthlyUsage: '本月使用量',
  },
  store: {
    siderButton: '提示词商店',
    CalendarButton: '签到',
    local: '本地',
    online: '在线',
    title: '标题',
    description: '描述',
    clearStoreConfirm: '是否清空数据？',
    importPlaceholder: '请粘贴 JSON 数据到此处',
    addRepeatTitleTips: '标题重复，请重新输入',
    addRepeatContentTips: '内容重复：{msg}，请重新输入',
    editRepeatTitleTips: '标题冲突，请重新修改',
    editRepeatContentTips: '内容冲突{msg} ，请重新修改',
    importError: '键值不匹配',
    importRepeatTitle: '标题重复跳过：{msg}',
    importRepeatContent: '内容重复跳过：{msg}',
    onlineImportWarning: '注意：请检查 JSON 文件来源！',
    downloadError: '请检查网络状态与 JSON 文件有效性',
  },

  mj:{
    setOpen:'OpenAI 相关',
    setOpenPlaceholder:'必须包含 http(s)://'
    ,setOpenUrl:'OpenAI接口地址'
    ,setOpenKeyPlaceholder:'使用自定义 OpenAI Key 绕过密码访问限制'
    ,setMj:'Midjourney 相关'
    ,setMjUrl:'Midjourney接口地址:'
    ,setMjKeyPlaceholder:'使用自定义 Api Secret 绕过密码访问限制'
    ,setUploader:'上传相关'
    ,setUploaderUrl:'上传地址:'
    ,setBtSave:'保存'
    ,setBtBack:'恢复默认'

    ,
    redraw:'局部重绘'
    ,fail1:'客官不要太急嘛，正在加载呢'
    ,success1:'图片刷新成功！'
    ,high_variation:'强变化'
    ,low_variation:'弱变化'
    ,p15:'变焦1.5倍'
    ,p20:'变焦2倍'
    ,p100:'方正'

    ,retry:'重分析'
    ,pan_left:'向左'
    ,pan_right:'向右'
    ,pan_up:'向上'
    ,pan_down:'向下'
    ,up2:'高清2倍'
    ,up4:'高清4倍',

    thinking:'思考中...'
    ,noReUpload:'不能重复上传'
    ,uploading:'上传中...'
    ,uploadSuccess:'上传成功'
    ,uploadFail:'上传失败:'
    ,upPdf:'<span>上传图片、附件<br/>能上传图片、PDF、EXCEL等文档</span><p>支持拖拽</p>'
    ,upImg:'<span><b>上传图片</b><br/>会自动调用 gpt-4-vision-preview 模型<br>注意：会有额外的图片费用<br/>格式: jpeg jpg png gif</span><p>支持拖拽</p> <p class="pt-2"><b>上传MP3 MP4</b> <br>会自动直接调用 whisper-1 模型<br>格式有：mp3 mp4 mpeg mpga m4a wav webm</p>'
    ,clearAll:'清参数'
    ,czoom:'自定义'
    ,customTitle:'自定义变焦'
    ,zoominfo:'修改zoom值,范围在 1.0~2.0 默认设置为1.8',

    modleSuccess:'模型加载成功'
    ,setingSuccess:'设置成功'

    ,tokenInfo1:'剩余Tokens = 模型长度 - 角色设定 - 上下文(会话历史) - 回复数 - 当前输入'
    ,tokenInfo2:'角色设定留空，系统会给一个默认的'
    ,noSuppertModel:'刷新，暂不支持此模型！'
    ,failOcr:'识别失败'
    ,remain:'剩:'

    ,totalUsage:'订阅总额'
    ,disableGpt4:'已禁用GPT4'
    ,setTextInfo:'OpenAi Api Key 错误，点击这里重新'

    ,attr1:'附'
    ,ulink:'原图链接'
    ,copyFail:'复制失败'
    ,tts:'TTS 文本转语音'
    ,fail:'发生错误'
    ,noSupperChrom:'浏览器不支持！'
    ,lang:'语音'
    ,ttsLoading:'语音转化...'
    ,ttsSuccess:'转化成功'
    ,micIng:'正在录音，说点什么...'
    ,mStart:'开始'
    ,mPause:'暂停'
    ,mGoon:'继续'
    ,mRecord:'重录'
    ,mPlay:'播放'
    ,mCanel:'取消'
    ,mSent:'发送'

    ,findVersion:'发现更新版本'
    ,yesLastVersion:'已是最新版本'
    ,infoStar:'此项目开源于 <a  class="text-blue-600 dark:text-blue-500" href="https://github.com/Dooy/chatgpt-web-midjourney-proxy" target="_blank"> GitHub </a>，免费且基于 MIT 协议，没有任何形式的付费行为！ </p><p>如果你觉得此项目对你有帮助，请在 GitHub 帮我点个 Star，谢谢！'
    ,setBtSaveChat:'仅保存会话'
    ,setBtSaveSys: '保存至系统'

    ,wsrvClose:'关闭 wsrv'
    ,wsrvOpen:'开启 wsrv'

    ,temperature:'随机性'
    ,temperatureInfo:'(temperature)值越大，回复越随机'
    ,top_p:'核采样'
    ,top_pInfo:'(top_p)与随机性类似，但不要和随机性一起更改 '
    ,presence_penalty:'话题新鲜度  '
    ,presence_penaltyInfo:'(presence_penalty)值越大，越有可能扩展到新话题'
    ,frequency_penalty:'频率惩罚度'
    ,frequency_penaltyInfo:' (frequency_penalty)值越大，越有可能降低重复字词'

    ,tts_voice:'TTS 语音人物'
    ,typing:'正在输入'

    ,authErro:'授权失败'
    ,authBt:'请重新输入授权访问密码'

    ,micWhisper:'Whisper语音识别'
    ,micAsr:'即时识别'
    ,micRec:'开始录音,请说话！2秒内无声音将自动关闭'
    ,micRecEnd:'录音已结束'

  }
}
