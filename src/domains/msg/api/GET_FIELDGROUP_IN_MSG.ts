// msg fieldgroup in msg list API Request type==========
export type TRequestFieldGroupInMsgList = void;

// msg fieldgroup in msg list API Response type=========
export type IResponseFieldGroupInMsgList = IFieldGroupInMsgListObj;

export interface IFieldGroupInMsgListObj {
	data: IData;
	list: IFieldGroupInMsgList[];
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

export interface IFieldGroupInMsgList {
	fieldGroupId: string;
	fieldDesc: string;
	fieldGroupName: string;
	fieldGroupOrder: string;
	fieldGroupType: string;
	fieldId: string;
	fieldLength: string;
	fieldName: string;
	fieldType: string;
	level: string;
	msgId: string;
	parentId: string;
	targetFieldId: string;
	useAt: string;
}
