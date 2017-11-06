var base_url="http://218.66.157.230:9110";

var menu_url="js/nav.json";//菜单路径

//用户模块
var user_url=base_url+"/user/userList";
var user_update_url=base_url+"/user/updateUser";

//权限模块
var auth_add_url=base_url+"/authenticationService/authRole/insertAuthRole";

//角色模块
var role_url=base_url+"/authenticationService/role/queryRolesByPage"; 
var role_add_url=base_url+"/authenticationService/role/insertRole";
var role_delete_url=base_url+"/authenticationService/role/deleteRole"; 
var role_query_url=base_url+"/authenticationService/role/queryRoleById";

//机构部门模块
//机构
var organization_query_url = base_url+"/organization/list";
//有传id则修改，未传id则新建
var organization_update_url = base_url+"/organization/save";
var organization_delete_url = base_url+"/organization/delete/";
//部门
var department_query_url = base_url+"/department/list";
//有传id则修改，未传id则新建
var department_update_url = base_url+"/department/save";
var department_delete_url = base_url+"/department/delete/";

//登录模块
var login_url = base_url+"/login";
var accessToken_url = base_url+"/accessToken";

