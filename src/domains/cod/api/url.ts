export type TUrl = (typeof url)[keyof typeof url];

const url = {
	// 공통코드 등록현황
	GET_CODE_STATUS: '/adm/cmm/codeStatus',

	//공통코드유형
	GET_ALL_CODE_CTGY: '/adm/cmm/codeCategory',
	POST_CODE_CTGY: '/adm/cmm/codeCategory?p',
	GET_CODE_CTGY: '/adm/cmm/codeCategory/:codeId',
	DEL_CODE_CTGY: '/adm/cmm/codeCategory/:codeId',
	PATCH_CODE_CTGY: '/adm/cmm/codeCategory/:codeId',

	// 공통코드 by 코드유형
	GET_CODE_BY_CTGY: '/adm/cmm/code/:codeId',

	// 공통코드
	POST_CODE: '/adm/cmm/code',
	PATCH_CODE: '/adm/cmm/code/:codeId/:code',
	DEL_CODE: '/adm/cmm/code/:codeId/:code',
} as const;

export default url;
