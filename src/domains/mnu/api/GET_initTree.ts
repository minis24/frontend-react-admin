// msg list API Request type==========
export type TRequestField = void;

// msg list API Response type=========
export type IResponseField = IFieldObj;

export interface IFieldObj {
	data: IData;
	list: IFieldList[];
}

export interface IData {
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
