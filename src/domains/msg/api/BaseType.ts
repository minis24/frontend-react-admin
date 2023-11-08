

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
	//list?: IFieldGroup[];
	//data?: IData;
}


export interface IPagingData {
	currentPageNo: string;
	endPage: string;
	lastPage: string;
	pageGroup: string;
	rowsPerPage: string;
	startPage: string;
	totalListCount: string;
}