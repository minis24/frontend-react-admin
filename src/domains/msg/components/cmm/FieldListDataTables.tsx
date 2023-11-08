import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useAPI } from "@/app/store";
import url, { TUrl } from '@/domains/msg/api/url';
import dayjs from 'dayjs';
import {
	Card, 
	CardBody,
} from 'reactstrap';
import { 
	IFieldListResponse,
	IFieldListResponseData,
	IFieldListResponseBody,
	IField 
} from '@/domains/msg/api/msg-each/MsgEachListType';
import loadable from '@loadable/component';
const RegistrationField = loadable(() => import('@/domains/msg/components/msg-each/RegistrationField'));



export interface IFieldListDataTablestHandleRef {
	filedListRefresh: (param: IFieldListDataTablestHandleParam) => void;
}
export interface IFieldListDataTablestHandleParam {
	fieldGroupId: string;
}



export interface IFieldListDataTablesProps {}



//const BodyFieldGroupDataTables: React.FC<IProps> = (props) => {
const FieldListDataTables = forwardRef<IFieldListDataTablestHandleRef, IFieldListDataTablesProps>((props, ref) => {
	
	const [fieldGroupIdState, setFieldGroupIdState] = useState('');
	const [list, setList] = useState<any[]>([]);
	//대상필드 설정 버튼을 클릭시 상태값 [초기 수정가능상태 : true , 수정진행중상태 : false]
	const [isTargetFieldEditeEnable,setIsTargetFieldEditEnable] = useState<boolean>(true);
	const [isOrderEditEnableState, setIsOrderEditEnableState] = useState(true); // 순서편집모드

	
	const tableRef = useRef(null);
	const gridTableRef = useRef<any>(null);


	//개별부 필드목록 조회
	const { fetch: fieldListFetch } = useAPI<TUrl>(url.GET_MSG_EACH_FIELD_LIST);
	//필드 삭제
	const { fetch: delFetch } = useAPI<TUrl>(url.DELETE_MSG_EACH_FIELD);
	//개별부 대상필드 설정
	const { fetch: patchFetch } = useAPI<TUrl>(url.PATCH_MSG_EACH_TARGET_FIELD);
	//필드 목록 변경 API 
	const { fetch: patchOrderFetch } = useAPI<TUrl>(url.PATCH_MSG_EACH_FIELD_ORDER);


	//--------------------------------------------------------------
	// 부모노드에서 호출하는 함수처리 (ForwardRef 처리에 필요한 설정)
	//--------------------------------------------------------------
	// 부모 컴포넌트에서 사용할 수 있는 함수들을 내부에 표기
	useImperativeHandle(ref, () => (
		{
			filedListRefresh
		})
	);



	const filedListRefresh = async (req: IFieldListDataTablestHandleParam) => {
		setFieldGroupIdState(req.fieldGroupId);
	}




	useEffect(()=>{
		if(!fieldGroupIdState){
			return;
		}


		let fetchParam = {
			fieldGroupId: fieldGroupIdState
		}

		const asyncExcuteList = async () =>{
			callListFetchAPI(fetchParam);
		}

		
		asyncExcuteList();
		

	},[fieldGroupIdState])




	interface IParams {
		fieldGroupId : string;
	}

	const callListFetchAPI = async (fetchParam :IParams ) => {
		let apiParam = Object.assign({}, { option: { method: 'get' } }, { fieldGroupId: fetchParam.fieldGroupId })
		let res = await fieldListFetch(apiParam) as IFieldListResponse;
		let data = res.data as IFieldListResponseData;
		let bdy = data.bdy as IFieldListResponseBody;
		let list = bdy.list;

		setList(list);

		return res;
	};





	useEffect(() => {
		if (!tableRef.current) {
			return;
		}

		if (!list ) {
			return;
		}

		createDataTables(tableRef.current, list,true,'0');

	}, [list]);









	/**
	 * 
	 * @param tableElement : HTML Table 태그 엘리먼트 
	 * @param tableListData : dataTable을 구성하게될 데이터 목록 
	 * @param isInitial : 초기설정값[초기렌더링 : true , 재렌더링 : false]
	 * @param targetFieldRowIndex : 재렌더링시, 대상필드(targetField)를 선택가능한 필드를 구분하기 위한 rowIndex 값. 
	 * 대상필드는 rowIndex 아래로만 설정이 가능함.
	 * @returns 
	 */
	const createDataTables =(tableElement: HTMLTableElement,
								tableListData: IField[],
								isInitial : boolean,
								targetFieldRowIndex:string
							) => {


		if (!tableElement) {
			return false;
		}

	
		gridTableRef.current = $(tableElement).dataTable(

			{
				data: tableListData,				
				// ====> 그리드 옵션 설정 <====
				destroy: true,

				/* ---------------------------------------------------------------
				* ### 기본 기능 설정 ###
				* ---------------------------------------------------------------
				*/
				scrollY: '20rem',
				lengthChange: false, // 표시 건수(기본값 true)
				searching: false, // 검색(기본값 true),filter와 같은 듯?
				ordering: true, //정렬(기본값 true)
				info: false,// 정보 표시(기본값 true) [현재 1 - 3 / 3건]				
				paging: false,// 페이징(기본값 true)
				pageLength: 10, //한 페이지에 보여줄 row 개수, 처음 화면
				autoWidth: true,//자동으로 width 변경(기본값 true)
				// 반응형 화면이 작을때 너무 많은 내용이면 몇개의 컬럼만 남기고 안보이게함 (+버튼을 누르면 보이게됨)
				//    --> responsive: false,
				responsive: true,
				
				order: [[0, "asc"]],


				/*
					* --------------------------------------------------------------
					* ### 스크롤바 설정(scrollX, scrollY) ###
					* --------------------------------------------------------------
					* 가로 스크롤바를 표시 : scrollX: true,
					* 세로 스크롤바를 표시 : scrollY: 200 (설정 값은 px단위)
					*    --> 값을 설정하면 설정한 px 값 아래에 info,paging 이 표시됨.
					* --------------------------------------------------------------
				*/
				//scrollX: true,
				//scrollY: '300', 

				/*
				* 헤더 콜백 (모든 그리기 이벤트 마다 호출됨)
				*/
				headerCallback: (thead, data, start, end, display) => {
					$(thead).find('th').css('text-align', 'center');
				},



				//Drag&Drop 이용한 순서변경하기 위한 옵션
				rowReorder: {
					enable: false,
					selector: 'tr',
					dataSrc: 'rowNum',
					//dataSrc: 'fieldOrder',
					snapX: true,
					update: true,
				},

	
				columns: [
					{ title: '순서', data: 'rowNum' },
					{
						title: '필드ID', data: 'fieldId',
						createdCell: (td, cellData, rowData, _row, _col) => {
							
							return $util.renderReactDOM(
								td as Element,
								<>
									<b>{cellData}</b>
									<span className="font-14"> (seq:{rowData.seq})</span>
								</>,
							);
						},
					},
					{ title: '필드명', data: 'fieldName' ,},
					{ title: '설명', data: 'fieldDesc' },
					{ title: '대상필드', data: 'targetFieldId', 
						createdCell: (td, cellData, rowData, row, _col) => {	
							//초기 렌더링시 대상필드 설정 
							if(isInitial){
								return $util.renderReactDOM(
									td as Element,
									<>
										{cellData && cellData.trim().length > 0 && rowData.fieldType == '03' && (
										<>
											<b>{cellData}</b>
											<span className="font-14"> (seq:{rowData.targetFieldSeq})</span>
										</>
									)}
										{rowData.fieldType == '03' && (
											<UI.Button
												color="success"
												className="btn-sm ms-2"
												onClick={(event) => editTargetFieldHandler(event, td)}
											>
												{!cellData ? '대상필드 설정' : '대상필드 수정' }
											</UI.Button>
										)}
									</>,
								);
							}


							//재렌더링시, 대상필드 설정 ==> 수정 버튼 클릭에 대한 처리
							//row : 렌더링 하려는 ROW
							//targetFieldRowIndex : 목록타입 필드의 로우 인덱스 값
							else{
								if (Number(row) < Number(targetFieldRowIndex)) {
									return $util.renderReactDOM(
										td as Element,
										<>
											<UI.Button 
												color="danger"
												className="btn-sm ms-2"
											>선택불가</UI.Button>
											
										</>,
									);
								} else if (Number(row) == Number(targetFieldRowIndex)) {
									return $util.renderReactDOM(
										td as Element,
										<>
											<UI.Button
												color="secondary"
												className="btn-sm ms-2"
												onClick={() => cancelEditHandler()}
											>
												설정 취소
											</UI.Button>
										</>,
									);
								} else {
									
									return $util.renderReactDOM(
										td as Element,
										<>
											<UI.Button
												color="primary"
												className="btn-sm ms-2"
												onClick={() => {
													if (targetFieldRowIndex) {
														selectTargetField(targetFieldRowIndex, rowData);
													}
												}}
											>
												선택가능
											</UI.Button>
										</>,
									);
									
								}
							}
							
						}
					},
					{ title: '타입', data: 'fieldType', 
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									{rowData.fieldType === '01' && rowData.fieldType + ':문자'}
									{rowData.fieldType === '02' && rowData.fieldType + ':숫자'}
									{rowData.fieldType === '03' && rowData.fieldType + ':리스트'}
									{rowData.fieldType === '04' && rowData.fieldType + ':반복횟수(숫자)'}
								</>,
							);
						}
					},
					{ title: '길이', data: 'fieldLength', },
					{ title: '순서', data: 'fieldOrder', },
					{ title: '관리', data: 'seq',
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									<UI.Button
										color="danger"
										className="btn-sm"
										onClick={(event) => {deleteBtnOnclickHandler(event ,rowData)}}
										//대상필드(targetField) 설정중에는 버튼 Disabled 
										disabled={isInitial == false ? true : false}
									>
										제거
									</UI.Button>
								</>,
							);
						},
					},
				],


				columnDefs: [
					{ targets: '_all', defaultContent: '-', className: 'dt-head-center', orderable: false },
					{
						target: 0, /* width: '15%', */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 1, /* width: '15%' , */
						createdCell
					},
					{
						target: 2, /* width: '10%' , */
						createdCell
					},
					{
						target: 3, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 4, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 5, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 6, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 7, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 8, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},

				],



				/*
				* Row created callback
				*/
				createdRow: (row, data, dataIndex, full) => {
					$(row).children('td:nth-child(1)').css('border-left', '2px solid blue');
				},




				language: {
					emptyTable: '데이터가 없습니다.',
					lengthMenu: '페이지당 _MENU_ 개씩 보기',
					info: '현재 _START_ - _END_ / _TOTAL_건 ',
					infoEmpty: '데이터 없음',
					infoFiltered: '( _MAX_건의 데이터에서 필터링 되었습니다. )',
					infoPostFix: '',
					search: '검색: ',
					zeroRecords: '일치하는 데이터가 없습니다.',
					loadingRecords: '로딩중...',
					processing: '잠시만 기다려 주세요...',
					paginate: {
						next: '다음',
						previous: '이전',
					},
					/* 
						// Datatables Type 누락으로 오류 발생함
						// 타입 상속으로 구현한 후 select 타입 추가할 필요 있음.
						// (by jkkim, 20230919)
						select: {
							rows: {
								_: '    선택함 %d 개',
								1: '    하나만 선택 1 개',
							},
							cells: {
								_: '    선택함 %d 개',
								1: '    하나만 선택 1 개',
							}
						}  */
				},

				//select: true,
				select: {
					//style: 'os',
					style: 'single',
					items: 'cell',
				},

			});


		
			gridTableRef.current.api().off('row-reorder').on('row-reorder', (e: any, details: any, edit: any) => {
				e.preventDefault();



			
				details.map((item: any, idx: number) => {
					
					let oldRowIdx = edit.nodes[idx]._DT_RowIndex; 

					//--------------------------------------------------------------------------
					// OLD DATA 구하기
					//--------------------------------------------------------------------------
					//let oldFieldId = gridTableRef.current.api().row(oldRowIdx).data().fieldId;
					//let oldRowNum = gridTableRef.current.api().row(oldRowIdx).data().rowNum;
					//let oldFieldOrder = gridTableRef.current.api().row(oldRowIdx).data().fieldOrder;
					

					//--------------------------------------------------------------------------
					// NEW DATA 구하기
					//--------------------------------------------------------------------------
					let newRowIndex = item.newPosition;
					//let newFieldId = gridTableRef.current.api().row(newRowIndex).data().fieldId;
					//let newRowNum = gridTableRef.current.api().row(newRowIndex).data().rowNum;
					let newFieldOrder = gridTableRef.current.api().row(newRowIndex).data().fieldOrder;
					
					gridTableRef.current.api().row(oldRowIdx).data().changeOrder = newFieldOrder;
					
				});
			});
	}







	const createdCell = (td: any, cellData: any, rowData: any, row: any, cell: any) => {
		const ms = dayjs().get('ms');

		return $util.renderReactDOM(
			td as Element,
			<>
				<div
					id={`ui-datatable_${ms}_${row}_${cell}`}
					style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
					onMouseEnter={() => setIsShownTooltip(true, cellData, `ui-datatable_${ms}_${row}_${cell}`, rowData)}
					onMouseLeave={() => setIsShownTooltip(false, cellData, `ui-datatable_${ms}_${row}_${cell}`, rowData)}
				>
					<div style={{ width: '100%', display: 'table-cell' }}>
						<span
							className={cell > 3 ? 'fw-bold' : ''}
							style={{
								float: 'left',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								width: '100%',
								cursor: cell > 3 ? 'pointer' : '',
							}}
						>
							{cellData}
						</span>
					</div>
				</div>
			</>,
		);
	};

	const setIsShownTooltip = useCallback((isShow: boolean, data: any, id: string, rowData: any) => {
		$ui.tooltip(data, { isOpen: isShow, target: id });
	}, []);


	// 매핑테이블 필드제거(대상필드로 지정된경우도 제거) API
	const deleteBtnOnclickHandler = useCallback(async (event:any,rowData:any) => {
		try {
			const confirmMsg = `<b>[${rowData.fieldId}]</b> 필드를 삭제 하시겠습니까?
					<br /><span class="font-16 text-danger">* 해당 필드가 대상필드로 지정된 경우 
					<br/><b>대상필드에서 제거</b>됩니다.</span>`;
			//----------------------------------------------------
			//1. 컨펌창 오픈헤서 취소 눌르면 바로 종료시킴.
			//----------------------------------------------------
			let confirm = await $ui.confirm(confirmMsg, {type: 'info',confirmButton: '확인', cancelButton: '취소',});
			if (!confirm) {
				return;
			}
		
	

			//----------------------------------------------------
			//2. 삭제처리 
			//----------------------------------------------------
			//백엔드에서 처리되는 로직 
			// (1) 삭제하려는 Field 가 대상필드(targetField)로 설정되었는지 확인.
			// (2) 대상필드로 설정되어 있는 경우 대상필드에서 제외하는 업데이트 처리.
			// (3) 필드 삭제 
			let data = { seq: rowData.seq ,
						fieldGroupId : rowData.fieldGroupId	,
						fieldId : rowData.fieldId
						}
			let delFetchParam = Object.assign({ option: { method: 'delete' } }, data);

			await delFetch(delFetchParam);
			await $ui.alert(`[${rowData.fieldId}] <br/>삭제 완료 하였습니다.`);
				



			//----------------------------------------------------
			//3. 그리드 테이블 데이터 재조회
			//----------------------------------------------------
			let fetchParam = {
				fieldGroupId: rowData.fieldGroupId
			}
			callListFetchAPI(fetchParam);
		} catch (error) {
			$ui.alert(`[${rowData.fieldId}] <br/>삭제 처리 중 오류가 발생하였습니다.
					<br />Error: ${error}`
			);
		}
	},[]);



	/**
	 * 그리드 테이블(dataTables)의 대상필드 컬럼 -> [수정] 버튼 클릭 처리 
	 * ('03'타입만 대상필드 컬럼에 [수정] 버튼 노출됨)
	 * @param event 
	 * @param td 
	 * @returns 
	 */
	const editTargetFieldHandler = (event:any,td: any) => {
		if (!tableRef.current){
			return;
		}
		const rowIdx = td.parentElement._DT_RowIndex;
		//상태값 토글 
		//대상필드 수정 시 버튼 클릭 불가 (제거 버튼,필드추가 버튼, 순서편집)
		setIsTargetFieldEditEnable(!isTargetFieldEditeEnable); 

		//그리드 재렌더링 [rowIdx :  리스트 타입 필드의 인덱스 값]
		createDataTables(tableRef.current, list, false, rowIdx);

	};

	/** 
	 * 대상필드 취소버튼
	 */
	const cancelEditHandler = () => {
		if (!tableRef.current) {
			return;
		}
		//상태값 토글 
		//버튼 클릭 가능하도록 상태값 변경  (제거 버튼,필드추가 버튼, 순서편집 버튼)
		setIsTargetFieldEditEnable(!isTargetFieldEditeEnable);
		
		//그리드 재렌더링 
		createDataTables(tableRef.current, list, true, '0');
	};
	

	/**
	 * 대상필드 수정상태에서 변경할 대상필드 선택 시 업데이트 API
	 * @param targetIdx 
	 * @param rowData 
	 */
	const selectTargetField = async (targetIdx: string, rowData: any) => {

		try{
			let confirm: boolean = await $ui
				.confirm(`대상필드를 <b>[${rowData.fieldId}]</b>로 변경하시겠습니까?`, {
					type: 'info',
					confirmButton: '확인',
					cancelButton: '취소',
			});

			if (confirm){
				const targetSeq = gridTableRef.current.api().row(targetIdx).data().seq;
				const updateFetchOpt = {
					option: { method: 'patch', params: { seq: targetSeq } },
				};


				const updateRowData = {
					seq: targetSeq,
					targetFieldId: rowData.fieldId,
					targetFieldSeq: rowData.seq,
				};
				
				await patchFetch(Object.assign({},updateFetchOpt, updateRowData));

				await $ui.alert(`[${rowData.fieldId}] <br/>수정 완료 되었습니다.`);

				let fetchParam = {
					fieldGroupId: fieldGroupIdState
				}
				callListFetchAPI(fetchParam);

			}

			
		}catch(error){
			$ui.alert(`수정 중 오류가 발생하였습니다.<br />Error: ${error}`);
		}


	};












	//[편집취소] 버튼 클릭 시 
	const restoreEditOrder = useCallback(async () => {
		// 컨펌창 오픈
		let confirm = await $ui.confirm(`취소하시면 변경된 내역이 저장되지 않습니다. <br/>취소하시겠습니까?`, {
			type: 'info',
			confirmButton: '확인',
			cancelButton: '취소',
		});


		//confirm 결과 처리 [true : 원복, false : 계속 진행]
		if (confirm) {

			//1.드래그&드랍 비활성화
			gridTableRef.current.api().rowReorder.disable();
			/* if (!fieldGroupInfoRef.current) {
				return;
			} */

			//2.상태 변경 [isEditEnalbeState ==> true 로 설정]
			setIsOrderEditEnableState(!isOrderEditEnableState);

			//3.편집전 상태로 그리드데이터 원복.
			let fetchParam = {
				fieldGroupId: fieldGroupIdState
			}
			callListFetchAPI(fetchParam);

		}

	}, [isOrderEditEnableState]);




	//[순서편집] 버튼 클릭 시 
	const changeEditOrder = useCallback(async () => {

		//1. 상태 변경
		setIsOrderEditEnableState(!isOrderEditEnableState);

		// 2. 드래그&드랍 활성화
		gridTableRef.current.api().rowReorder.enable();
		return;

	}, [isOrderEditEnableState]);




	// [필드추가] 버튼 클릭 시
	const addFieldList = useCallback(() => {

		onRegistrationField();

	}, [fieldGroupIdState]);




	// [필드추가] 버튼 클릭 시 필드추가 모달 오픈
	const onRegistrationField = async () => {

		//console.log('fieldGroupIdState:: ',fieldGroupIdState)
		let res = await $ui.dialog({
			title: '전체 필드 목록',
			element: <RegistrationField paramData={fieldGroupIdState} />,
			dialogSize: 'xl',
			zIndex: '1070', //오프캔버스위에서 열리는 상황이라 z-index 조정
			keyboard: false,
			backdrop: 'static',
		});

		if (res === 'success') {
			await $ui.alert('필드 추가 완료');
			let fetchParam = {
				fieldGroupId: fieldGroupIdState
			}
			callListFetchAPI(fetchParam);

		}
	};


	


	// 순서편집 완료 후 [순서저장] 버튼 클릭
	const saveOrder = useCallback(async () => {
		let confirm = await $ui
			.confirm(`순서편집 결과를 저장하시겠습니까?`, {
				type: 'info',
				confirmButton: '확인',
				cancelButton: '취소',
			});

		if (!confirm) {
			return;
		}

		//변경된 목록 선별 
		let gridData = gridTableRef.current.api().data();
		//console.log('gridData :: ', gridData);

		let fieldOrderList: any = [];
		gridData.filter((item: any) => {

			if (item.hasOwnProperty('changeOrder')) {
				// 변경 전후 순서가 같지않은경우 업데이트 목록에 추가
				if (item.changeOrder.toString() !== item.fieldOrder) {
					let chagneInfo: any = {
						seq: item.seq,
						fieldOrder: item.changeOrder.toString(),
					};
					fieldOrderList.push(chagneInfo);
				}
			}
		});

		
		// 업데이트 요청 세팅 ('updateList' key값은 해당 List<VO> 같도록 설정)
		// 필드매핑목록 순서변경 API
		let option = { option: { method: 'patch' } };
		let data = { fieldOrderList: fieldOrderList };
		console.log(Object.assign({}, option, data))
		await patchOrderFetch(Object.assign({}, option, data));




		//그리드데이터 새로 고침.
		let fetchParam = {
			fieldGroupId: fieldGroupIdState
		}
		callListFetchAPI(fetchParam);


		//상태 변경
		setIsOrderEditEnableState(true);


	}, [fieldGroupIdState]);
	return (
		<>

			<Card
				color="secondary "
				className="border border-top-1"
				outline
			>
				<CardBody>
					<div className="d-flex mb-1 align-items-center">
						<div>
							<ul className="mb-0">
								<li>
									<b className="text-info">'03:목록'</b> 필드를 추가한 후에는 반드시 바로 아래의 필드에 {' '}
									<b className="text-info">'04:반복횟수'</b>
									타입의 필드가 지정되어야 합니다.
								</li>
								<li>
									<b className="text-info">'03:목록'</b> 타입의 필드를 설정하면, {' '}
									<b className="text-info">'대상필드 '</b>
									컬럼에 <b className="text-info">'TargetField '</b> 정보가 반드시 지정되어야 합니다.
								</li>
								<li>
									필드순서는 우측 <b className="text-info">'순서편집'</b> 클릭 후 변경할 열을{' '}
									<b className="text-info">클릭&드래그</b>하여 설정 변경할 수 있습니다.
								</li>
							</ul>
						</div>
						<div className="ms-auto flex-shrink-0">
							<UI.Button
								/* isEditEnableState [true : 초기값(순서편집가능상태) , false : 순서편집 진행중]	 */
								onClick={isOrderEditEnableState ? changeEditOrder : restoreEditOrder}
								color={isOrderEditEnableState ? 'success' : 'secondary'}
								className="me-1"
							>
								<UI.RFIcon
									icon={isOrderEditEnableState ? 'Plus' : 'X'}
									className="fill-white feather-sm mb-1 me-1"
								/>
								{isOrderEditEnableState ? '순서편집' : '편집취소'}
							</UI.Button>
							<UI.Button
								onClick={addFieldList}
								color="primary"
								className={isOrderEditEnableState ? '' : 'hide'}
							>
								<UI.RFIcon
									icon="Plus"
									className="fill-white feather-sm mb-1 me-1"
								/>
								필드추가
							</UI.Button>
							<UI.Button
								onClick={saveOrder}
								color="info"
								className={isOrderEditEnableState ? 'hide' : ''}
							>
								<UI.RFIcon
									icon="Check"
									className="fill-white feather-sm mb-1 me-1"
								/>
								순서저장
							</UI.Button>
						</div>
					</div>


					<table className="table table-bordered g-table-custom-sm mb-0"
						ref={tableRef}
					>
						<colgroup>
							<col width="6%" />
							<col width="13%" />
							<col width="15%" />
							<col width="*" />
							<col width="10%" />
							<col width="10%" />
							<col width="5%" />
							<col width="5%" />
							<col width="10%" />
						</colgroup>
					</table>

				</CardBody>
			</Card>
		</>
	)
	});


export default FieldListDataTables;