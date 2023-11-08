import { 
		IResponse, 
		IResponseData,
		IResponseHeader,
		IResponseBody,
		IPagingData,
	} from '@/domains/msg/api/BaseType';

import { 
		IFieldGroup, 	
	} from '@/domains/msg/api/msg-each/MsgEachListType';



//================================================
// =====>> 해당 업무에서는 아래 타입을 구현하여 사용. <<====
//================================================
export interface IMsgCommonListResponse extends IResponse {}
export interface IMsgCommonListResponseData extends IResponseData {}
export interface IMsgCommonListResponseBody extends IResponseBody {
	list:IMsgCommon[];
};



export interface IMsgCommon extends IFieldGroup {
	groupType: string;
	msgTypeNm: string;
	lastUpdtPnttm: string;
	lastUpdusrId: string;
}
