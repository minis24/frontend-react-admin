export type TCmmUrl = (typeof url)[keyof typeof url];

const url = {
	// 공통코드 조회
	GET_CODE: '/adm/cmm/code/:codeId',

} as const;

export default url;
