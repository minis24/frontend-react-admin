export type TUrl = (typeof url)[keyof typeof url];

const url = {
	
	//전문개별부 목록 트리
	//MsgEachTree 컴포넌트에서 호출 하는 API
	GET_MSG_EACH_TREE: '/adm/msg/each/tree',
	GET_MSG_EACH_TREE_CHILDREN: '/adm/msg/each/children',



	//---------------------------------------------------------------------
	// 전문 개별부 관리 화면 
	//---------------------------------------------------------------------
	GET_MSG_EACH_LIST: '/adm/msg/each/list',  //전문 개별부 목록조회
	GET_MSG_EACH_FIELD_GROUP: '/adm/msg/each/fieldGroup',//필드그룹정보 조회
	GET_MSG_EACH_FIELD_LIST: '/adm/msg/each/fieldList', //필드목록 조회
	
	DELETE_MSG_EACH_MESSAGE: '/adm/msg/each/message',//개별부 전문 삭제
	DELETE_MSG_EACH_FIELD: '/adm/msg/each/field',//필드 매핑 삭제

	PATCH_MSG_EACH_TARGET_FIELD: '/adm/msg/each/targetField', //대상필드 설정 or 수정
	PATCH_MSG_EACH_FIELD_ORDER: '/adm/msg/each/fieldOrder',  // 필드 순서 변경 

	POST_MSG_EACH_MESSAGE: '/adm/msg/each/message', //전문개별부 등록



	//---------------------------------------------------------------------
	// 전문 공통부 관리 화면 
	//---------------------------------------------------------------------
	GET_MSG_COMMON_LIST: '/adm/msg/common/list', //전문공통부 목록 조회 API
	DELETE_MSG_COMMON: '/adm/msg/common/fieldGroup', //전문공통부 삭제
	POST_MSG_COMMON_MESSAGE: '/adm/msg/common/fieldGroup', //전문공통부 필드그룹 등록

	




	//---------------------------------------------------------------------
	// 전문 필드 관리 화면 
	//---------------------------------------------------------------------
	GET_MSG_FIELD_MAPPING_FIELD_CNT: '/adm/msg/field/mappingCnt',
	GET_MSG_FIELD_LIST: '/adm/msg/field/list',  //전체 필드 목록 조회 

	DELETE_MSG_FIELD_FIELD: '/adm/msg/field/field',  //필드 삭제



	
	//GET_MSG_FIELD_MAPPING_FIELD_CNT: '/adm/msg/mappingField/cnt/field/:fieldId',
	//POST_LIST: '/adm/msg/list',
	//DELETE_LIST: '/adm/msg/list/:msgId?delete',
	//PATCH_LIST: '/adm/msg/list/:msgId?patch',



	//GET_FIELD: '/adm/msg/field?get',
	POST_FIELD: '/adm/msg/field',
	GET_FIELD_INDIVIDUAL: '/adm/msg/field/:fieldId',
	
	PATCH_FIELD: '/adm/msg/field/:fieldId?patch',


	//GET_FIELDGROUP_PARENT: '/adm/msg/fieldgroup/parent/:fieldGroupType',
	//GET_FIELDGROUP_IN_MSG: '/adm/msg/fieldgroup/:msgId/:fieldGroup/:fieldGroupType',

	// ---------------------- LSH ----------------------
	//GET_FIELDGROUP_LIST: '/adm/msg/fieldgroup',
	//GET_REALTED_INFO_BY_FILED: '/adm/msg/msgRelatedInfo/field/:fieldId',
	//GET_MAPPING_CNT_BY_FILED: '/adm/msg/mappingField/cnt/field/:fieldId',
	//GET_ALL_FIELDGROUP_PARENT: '/adm/msg/fieldgroup/parent',
	//POST_FIELDGROUP: '/adm/msg/fieldgroup',
	//PATCH_FIELDGROUP: '/adm/msg/fieldgroup/:fieldgroupId?patch',
	//DELETE_FIELDGROUP: '/adm/msg/fieldgroup/:fieldgroupId?delete',
	//GET_PARENT_FIELDGROUP_LIST: '/adm/msg/fieldgroup/parent',
	GET_MAPPING_FILED_LIST: '/adm/msg/mappingField/fieldgroup/:fieldgroupId',
	GET_MAPPING_FILED_LIST_TEST: '/adm/msg/mappingField/fieldgroup/',
	DELETE_MAPPING_FIELD_BY_SEQ: '/adm/msg/mappingField/seq/:seq',

	POST_MAPPING_FIELD: '/adm/msg/mappingField',
} as const;

export default url;
