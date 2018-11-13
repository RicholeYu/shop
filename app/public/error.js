exports.ALREADY_LOGIN_IN = 10001 // 已经登录了
exports.SIGN_UP_PARAMS_IS_WRONG = 10002 // 输入的注册信息有误
exports.ALREADY_HAS_THIS_EMAIL = 10003 // 已经存在该邮箱
exports.SIGN_UP_FAILED = 10004 // 注册失败
exports.SIGN_IN_FAILED = 10005 // 登录信息不正确
exports.SIGN_IN_VERIFY_FAILED = 10006 // 登录信息不正确
exports.GET_USER_INFO_FAILED = 10007 // 获取账号信息失败
exports.USER_TOKEN_EXPIRED = 10008 // 登录信息失效，需要重新登录
exports.ERROR_UPLOAD_IMG = 10009 // 上传头像错误
exports.ERROR_UPLOAD_IMG_TYPE = 10010 // 上传头像图片类型错误
exports.NO_THIS_ACCOUNT = 10011 // 不存在该账户
exports.ERROR_UPDATE_IMG = 10012 // 更新头像失败
exports.ERROR_UPLOAD_IMG_PARAMS = 10013 // 上传图片参数错误
exports.ERROR_UPLOAD_NO_IMG = 10014 // 请求不包含上传图片
exports.GET_USERS_LIST = 10015 // 获取用户列表失败


exports.WS_NOT_VERIFY_ACCOUNT = 20001 // Websocket链接尚未验证身份
exports.WS_JSON_FOTMATE_ERROR = 20002 // JSON格式错误，请输入正确的JSON格式
exports.WS_JSON_ERROR = 20003 // JSON解析错误，请输入正确的JSON字符串
exports.WS_LOGIN_FAILED = 20004 // 登录失败, 账号密码错误
exports.WS_LACK_OF_USERID = 20005 // 缺少user_id
exports.WS_LACK_OF_MESSAGE = 20006 // 缺少message
exports.WS_FOOLISH = 20007 // 不能给自己发消息
exports.WS_SEND_ERROR = 20008 // 消息发送失败
