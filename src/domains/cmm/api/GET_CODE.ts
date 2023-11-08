export interface IResponse {
	data: IResponseData;
	status: number;
	statusText: string;	
}

export interface IResponseData {
	hdr: IResponseHeader;
	bdy: IResponseBody;
}


export interface IResponseHeader {
	rsCd: string;
	rsMsg: string;
	svrDt: string;
}


export interface IResponseBody {
	list?: ICode[];
	data?: IData;
}

export interface IData {
	rowsPerPage: string;
	currentPageNo: string;
	totalListCount: string;
	pageGroup: string;
	endPage: string;
	startPage: string;
	lastPage: string;
}


//================================================
// =====>> 해당 업무에서는 아래 타입을 구현하여 사용. <<====
//================================================
export interface IResponseCodeList extends IResponse {};
export interface ICode {
	codeId: string;
	code: string;
	codeNm: string;
	codeDc: string;
	useAt: 'Y' | 'N';
	frstRegisterId?: string;
	frstRegistPnttm?: string;
	lastUpdusrId?: string;
	lastUpdtPnttm?: string;
}
