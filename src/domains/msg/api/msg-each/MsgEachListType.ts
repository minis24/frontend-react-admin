import { 
		IResponse, 
		IResponseData,
		IResponseHeader,
		IResponseBody,
		IPagingData,
	} from '@/domains/msg/api/BaseType';




//================================================
// =====>> 해당 업무에서는 아래 타입을 구현하여 사용. <<====
//================================================
export interface IMsgEachListResponse extends IResponse {}
export interface IFieldListResponse extends IResponse {}
export interface IFieldGroupResponse extends IResponse {}



export interface IFieldListResponseData extends IResponseData {}
export interface IFieldGroupResponseData extends IResponseData {}


export interface IMsgEachListResponseBody extends IResponseBody {
	list:IMsgEach[];
};
export interface IFieldGroupResponseBody extends IResponseBody {
	data:IFieldGroup;
};
export interface IFieldListResponseBody extends IResponseBody {
	list:IField[];
};





export interface IMsgEach {
	msgId: string;
	msgName: string;
	msgDesc: string;
	useAt: 'Y' | 'N';
	lastUpdtPnttm: string;
	lastUpdusrId: string;
	reqHeaderGroup: string;
	reqBodyGroup: string;
	resHeaderGroup: string;
	resBodyGroup: string;
}



export interface IFieldGroup {
	fieldGroupId: string;
	fieldGroupName: string;
	fieldGroupType: string;
	fieldGroupOrder: string;
	parentId: string;
	useAt: string;
}


export interface IField {
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