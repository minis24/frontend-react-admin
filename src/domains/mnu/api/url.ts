export type TUrl = (typeof url)[keyof typeof url];

const url = {
	GET_initTree: '/adm/mnu/initTree',
	GET_subTree: '/adm/mnu/subTree',
	GET_menuTypeSelect: '/adm/mnu/menuType',
	GET_checkMenuId: '/adm/mnu/checkMenuId',
	
	//메뉴등록
	POST_menuIdReg: '/adm/mnu/menuIdReg',
	//메뉴상세정보 조회
	GET_menuInfo: '/adm/mnu/menuInfo',


	//메뉴정보 업데이트
	PATCH_menuInfo: '/adm/mnu/menuInfo',

	//메뉴삭제 DELETE
	DELETE_menuInfo: '/adm/mnu/menuInfo',
}
export default url;
