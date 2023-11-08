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
export interface IFieldListResponse extends IResponse {}
export interface IFieldResponse extends IResponse {}

export interface IFieldListResponseData extends IResponseData {}
export interface IFieldListResponseBody extends IResponseBody {
	list:IField[];
};
export interface IFieldResponseBody extends IResponseBody {
	data:IField;
};



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