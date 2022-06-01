const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // token
  name: (state) => state.user.userInfo.username, // 用户名
  userId: (state) => state.user.userInfo.userId, // 用户id
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 头像
  companyId: (state) => state.user.userInfo.companyId, // 公司ID
};
export default getters;
