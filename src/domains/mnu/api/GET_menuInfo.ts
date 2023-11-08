// msg list API Request type==========
export type TRequestField = void;

// msg list API Response type=========
export type IMenuInfoFetchData = IMnuParentFieldGroupListObj;

export interface IMnuParentFieldGroupListObj {
	data: IData;
}


export interface IData {
	hdr: IHdr;
	bdy: IBdy;
}

export interface IHdr {
	rsCd:string;
	rsMsg:string;
	svrDt:string;
}

export interface IBdy {	
	data: IBdyData;
} 

export interface IBdyData{
	menuId:string;
	menuNm:string;
	menuLevel:string;
	menuType:string;
	upperMenuId: string;
	requestUrl:string;
	menuTypeNm: string;
	status: string;
	menuDc:string;
}


/* export interface IData {
	currentPageNo: string;
	endPage: string;
	lastPage: string;
	pageGroup: string;
	rowsPerPage: string;
	startPage: string;
	totalListCount: string;
}

export interface IFieldList {
	fieldId: string;
	fieldName: string;
	fieldType: string;
	useAt: 'Y' | 'N';
	fieldDesc: string;
	fieldLength: string;
}
 */