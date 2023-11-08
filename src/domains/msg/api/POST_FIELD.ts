// msg list API Request type==========
export interface IRequestField {
	fieldId: string;
	fieldName: string;
	fieldDesc: string;
	fieldType: string;
	fieldLength: string;
	useAt: 'Y' | 'N';
}

// msg list API Response type=========
export type IResponseField = void;
