// msg list API Request type==========
export interface IRequestFieldGroup {
	fieldGroupId: string;
	fieldGroupName: string;
	fieldGroupType?: string;
	parentId?: string;
	fieldGroupOrder?: string;
	useAt: 'Y' | 'N';
}
export interface IRequestPatchFieldGroup {
	//fieldGroupId: string;
	fieldGroupName: string;
	fieldGroupType?: string;
	parentId?: string;
	fieldGroupOrder?: string;
	useAt: 'Y' | 'N';
}
