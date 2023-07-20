import http from "../utils/request";

/* 定义接口 */
// 返回用户列表
export const getUser = (params) => {

  // return http.get("/user/getUser", params);
  return http.get("/expert/rend", params);
};
// 新增
export const addUser = (data) => {
  // return http.post("/user/add", data);
  return http.post("/expert/insert", data);
};
// 编辑
export const editUser = (data) => {
  // return http.post("/user/edit", data);
  return http.post("/expert/update", data);
};
// 删除
export const delUser = (data) => {
  // return http.post("/user/del", data);
  return http.post("/expert/delete", data);
};
// 页面一提交项目表单
export const commitData = (data) => {
  return http.post("/Team/insertTeam", data);
};