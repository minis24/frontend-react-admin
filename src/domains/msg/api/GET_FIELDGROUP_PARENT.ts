// msg parent fieldgroup list API Request type==========
export interface TRequestMsgParentFieldGroupList {
	fieldGroupType: string;
}

// msg parent fieldgroup list API Response type=========
export type IResponseMsgParentFieldGroupList = IMsgParentFieldGroupListObj;

export interface IMsgParentFieldGroupListObj {
	data: IData;
	list: IMsgParentFieldGroupList[];
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

export interface IMsgParentFieldGroupList {
	fieldGroupType: string;
	nextOrder: string;
	fieldGroupId: string;
	useAt: string;
	nowOrder: string;
	fieldGroupName: string;
}
