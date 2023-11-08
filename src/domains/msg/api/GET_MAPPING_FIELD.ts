export interface IMappingFieldListObj {
	data: IData;
	list: IMappingFieldList[];
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

export interface IMappingFieldList {
	fieldGroupId: string;
	fieldId: string;
	fieldLength: string;
	fieldDesc: string;
	fieldName: string;
	fieldOrder: string;
	fieldType: string;
	fieldUseAt: string;
	seq: string;
	targetFieldId?: string;
	targetFieldSeq?: string;
	rowNum: string;
}
