// msg registration list API Request type==========
export interface IRequestRegList {
	msgId: string;
	msgName: string;
	msgDesc: string;
	reqHeaderGroup: string;
	reqBodyGroup: string;
	resHeaderGroup: string;
	resBodyGroup: string;
	useAt: 'Y' | 'N';
}

// msg registration list API Response type=========
export type IResponseRegList = void;
