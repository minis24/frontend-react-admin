// 공통코드 현황
export interface ICodeStatusList {
	codeCtgy: string;
	ctgyCnt: string;
	lastSeq: string;
	nextSeq: string;
}

// 공통코드유형 등록
export interface ICodeCtgyRegist {
	codeId: string;
	codeIdDc: string;
	codeIdNm: string;
	//useAt: 'Y' | 'N';
	useAt: string;
	userId: string | null;
}

// 공통코드유형 수정
export interface ICodeCtgyPatch {
	codeIdNm: string;
	codeIdDc: string;
	useAt: string;
	//useAt: 'Y' | 'N';
}

// 공통코드유형 조회결과
export interface ICodeCtgyRowData {
	codeId: string;
	codeIdDc: string;
	codeIdNm: string;
	useAt: string;
	frstRegisterId: string;
	frstRegistPnttm: string;
	lastUpdusrId: string;
	lastUpdtPnttm: string;
}

// 공통코드 등록
export interface ICodeRegist {
	code: string;
	codeId: string;
	codeDc: string;
	codeNm: string;
	useAt: string;
	userId: string | null;
}

// 공통코드 수정
export interface ICodePatch {
	codeDc: string;
	codeNm: string;
	useAt: string;
	userId: string | null;
}
