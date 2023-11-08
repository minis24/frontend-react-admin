import { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from 'reactstrap';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-plugins/dataRender/ellipsis';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/msg/api/url';

import loadable from '@loadable/component';

import ModifyFieldModal from '@/domains/msg/components/msg-field/ModifyFieldModal';
import RegistrationFieldModal from '@/domains/msg/components/msg-field/RegistrationFieldModal';


import {
	IField,
	IFieldListResponseBody,
} from '@/domains/msg/api/msg-field/MsgFieldType';


const FieldListInUseModal = loadable(() => import('@/domains/msg/components/msg-field/FieldListInUse'));






const MsgField = () => {



	const { data, fetch } = useAPI<TUrl>(url.GET_MSG_FIELD_LIST);
	const delField = useAPI<TUrl>(url.DELETE_MSG_FIELD_FIELD);
	const { fetch: beforeDelFetch } = useAPI<TUrl>(url.GET_MSG_FIELD_MAPPING_FIELD_CNT);

	const tableRef = useRef(null);
	const table = useRef<any>(null);

	const [list, setList] = useState<IField[]>([]);



	const callFieldAPI = () => {
		fetch({ option: { method: 'get' } }).then((res: any) => {
			//console.log('/adm/field데이타::', res);
		});
	};




	const onRegistrationMsg = useCallback(() => {
		$ui
			.dialog({
				title: '전문 필드 등록',
				element: <RegistrationFieldModal />,
				dialogSize: 'lg',
				keyboard: false,
				backdrop: 'static',
			})
			.then((res) => {
				if (res === 'success') {
					$ui.alert('전문 필드를 등록 하였습니다.').then(() => {
						callFieldAPI();
					});
				} else {
					console.log(`전문 필드 등록 실패 하였습니다 : ${res}`);
				}
			});
	}, []);




	// 전문 필드 수정 버튼 클릭
	const onModify = useCallback((rowData: IField) => {
		//console.log('rowData=========', rowData);
		//individualField.fetch({ option: { method: 'get', isSetParams: true, params: { fieldId: rowData.fieldId } } });
		$ui
			.dialog({
				title: `전문[${rowData.fieldName}] 필드 수정`,
				element: <ModifyFieldModal data={rowData} />,
				dialogSize: 'lg',
				keyboard: false,
				backdrop: 'static',
			})
			.then((res) => {
				if (res === 'success') {
					$ui.alert('전문 필드를 수정 하였습니다.').then(() => {
						callFieldAPI();
					});
				} else {
					console.log(`전문 필드 수정 실패 하였습니다 : ${res}`);
				}
			});
	}, []);







	// 전문 필드 삭제 버튼 클릭
	const onDeleteField = useCallback( async (rowData: IField) => {
		// 필드 삭제 시 필드그룹에 매핑된 필드도 같이 삭제처리(확인 메세지)
		// 필드를 삭제하면, 모든 필드그룹에서 해제되므로, 주의를 요함.


		const confirmMsg1 = `<b>[${rowData.fieldId}]</b> 필드를 정말 삭제 하시겠습니까?
					<br /><span class="font-16 text-danger">* 해당 필드가 전문에 매핑된 필드일 경우 
					<br/><b>매핑된 필드에서 전부 해제</b>됩니다.</span>`;
		
		const confirmMsg2 = `<span class="font-16 text-danger">* 필드를 삭제하면, <b>모든 필드그룹에서 해제</b>되므로, 주의를 요함 </span>`;
		//----------------------------------------------------
		//1. 컨펌창 오픈헤서 취소 눌르면 바로 종료시킴.
		//----------------------------------------------------

/* 		$ui.confirm(confirmMsg1, { type: 'info', confirmButton: '확인', cancelButton: '취소', }).then((confirm) => {
			console.log('1. confirm :: ' ,confirm)
			if (!confirm) {
				return;
			}
		});

		$ui.confirm(confirmMsg2, { type: 'info', confirmButton: '확인', cancelButton: '취소', }).then((confirm) => {
			console.log('2. confirm :: ', confirm)
			if (!confirm) {
				return;
			}
		}); */

		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$')
		// App.ts 에서 widnow.$ui = setUiJS() 설정
		// $ui 프로퍼티에 alert,confirm.....하고, dialogStatus 등 설정.
		console.log($ui)
		/*[출력]
		{dialogStatus: {…},
		dialogComponentStatus: {…}, 
		tooltipComponentStatus: {…}, 
		offcanvasComponentStatus: {…}, 
		alert: ƒ, 
		confirm ,
		dialog ,
		…}
		*/
		//==> $ui.confirm 은 @/app/common/ui/ui-confirm.ts
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$')



		try{
			let confirm1 = await $ui.confirm(confirmMsg1, { type: 'info', confirmButton: '확인', cancelButton: '취소', });

			if (!confirm1) {
				return;
			}
		}catch(error){
			console.log(error)
		} finally {
			
		}
		
		try{
			let confirm2 = await $ui.confirm(confirmMsg2, { type: 'info', confirmButton: '확인', cancelButton: '취소', });
			if (!confirm2) {
				return;
			}

		}catch(error){
			console.log(error)
		}finally{

		}
		



/*
(by jkkim - 2023-10.31) $ui.confirm 수정 중 ============>> 여기부터. 

		try{

			// ### 삭제 처리 
			//  (1) 매핑되어 있는 전문목록을 오픈한다.
			const fetchOption = {option: { method: 'delete'} }
			let fetchParam = Object.assign(fetchOption, { fieldId: rowData.fieldId });
			await delField.fetch(fetchParam);



			await $ui.alert(`선택한 [${rowData.fieldId}] 전문 필드를 삭제 하였습니다.`);



			callFieldAPI();



		}catch(error){
			await $ui.alert(`삭제중 오류가 발생하였습니다.<br/>${error}<br/>`)
		}





		beforeDelFetch({
			option: { method: 'get', params: { fieldId: rowData.fieldId }, isSetParams: true },
		}).then((result) => {
			let alertMsg = '';
			if (result.data.bdy.data.length > 0) {
				result.data.bdy.data.map((item: any, idx: any) => {
					if (idx > 0) {
						alertMsg += `, `;
					}
					alertMsg += `[${item.cntFlag === 'TG' ? '대상필드' : '필드그룹'} - ${item.cnt}건]`;
				});
				alertMsg += `<br/>현재 사용 중인 필드 입니다.<br/>삭제 시 모든 필드그룹에서 해당 필드가 삭제됩니다.<br/>`;
			}

			



			alertMsg += `선택한 [${rowData.fieldId}] 전문 필드를 삭제 하시겠습니까?`;
			$ui.confirm(alertMsg).then((res) => {
				//$ui.confirm(`선택한 [${rowData.fieldId}] 전문 필드를 삭제 하시겠습니까?`).then((res) => {
				if (res) {
					delField
						.fetch({ option: { method: 'delete', params: { fieldId: rowData.fieldId } } })
						.then(() => {
							$ui.alert(`선택한 [${rowData.fieldId}] 전문 필드를 삭제 하였습니다.`).then(() => {
								callFieldAPI();
							});
						})
						.catch((res) => {
							$ui.alert(`선택한 [${rowData.fieldId}] 전문 필드 삭제 실패 햐였습니다.<br />Error: ${res.message}`);
						});
				}
			});
		});

(by jkkim - 2023-10.31) $ui.confirm 수정 중 <<========= 여기까지.. 
*/


	}, []);







	// LSH - 테이블>관리>리스트 버튼 클릭
	const onList = (fieldId: string) => {
		$ui.dialog({
			title: '전문 연관 정보',
			element: <FieldListInUseModal fieldId={fieldId} />,
			dialogSize: 'xl',
			keyboard: false,
			backdrop: 'static',
		});
	};

	useEffect(() => {
		if (data) {
			const listData = data.data.bdy as IFieldListResponseBody;
			//const newArray = listData.list.map((item) => {
			//	return Object.values(item);
			//});
			setList(listData.list);
		}
	}, [data]);

	useEffect(() => {
		if (list) {
			console.log('=======> list::', list);
			if (tableRef.current) {
				//let table: Api<any> | null = null;
				new DataTable(tableRef.current, {
					data: list,
					columns: [
						{ title: '필드 ID', data: 'fieldId' },
						{ title: '필드명', data: 'fieldName' },
						{ title: '설명', data: 'fieldDesc' },
						{ title: '타입', data: 'fieldType' },
						{ title: '상태', data: 'useAt' },
						{ title: '길이', data: 'fieldLength' },
						{ title: '관리' },
					],
					columnDefs: [
						{ width: '10%', targets: 0 },
						{ width: '20%', targets: 1 },
						{ width: '20%', targets: 2 },
						{
							width: '15%',
							targets: 3,
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
							},
						},
						{
							width: '10%',
							targets: 4,
							createdCell: (td, _cellData, rowData, _row, _col) => {
								return $util.renderReactDOM(
									td as Element,
									<>
										<Badge color={rowData.useAt === 'Y' ? 'info' : 'warning'}>
											{rowData.useAt === 'Y' ? '사용중' : '미사용'}
										</Badge>
									</>,
								);
							},
						},
						{ width: '10%', targets: 5 },
						{ width: '15%', targets: '_all', defaultContent: '-' },
						{ targets: [0] },
						{ className: 'dt-body-left', targets: [1, 2, 3, 5] },
						{ className: 'dt-body-center', targets: [4, 6] },
						{
							targets: 6,
							orderable: false,
							createdCell: (td, _cellData, rowData, _row, _col) => {
								//console.log(td, cellData, rowData, row, col);
								return $util.renderReactDOM(
									td as Element,
									<>
										<UI.Button
											color="primary"
											className="btn-sm mx-1"
											onClick={() => onModify(rowData)}
										>
											수정
										</UI.Button>
										<UI.Button
											color="danger"
											className="btn-sm"
											onClick={() => onDeleteField(rowData)}
										>
											삭제
										</UI.Button>
										<UI.Button
											color="info"
											className="btn-sm mx-1"
											onClick={() => onList(rowData.fieldId)}
										>
											리스트
										</UI.Button>
									</>,
								);
							},
						},
					],
					destroy: true,
					ordering: true,
					order: [0, 'desc'],
					autoWidth: false,

					// 한글언어 설정 - LSH
					language: {
						emptyTable: '데이터가 없습니다.',
						lengthMenu: '페이지당 _MENU_ 개씩 보기',
						info: '현재 _START_ - _END_ / _TOTAL_건',
						infoEmpty: '데이터 없음',
						infoFiltered: '( _MAX_건의 데이터에서 필터링 되었습니다. )',
						search: '검색: ',
						zeroRecords: '일치하는 데이터가 없습니다.',
						loadingRecords: '로딩중...',
						processing: '잠시만 기다려 주세요...',
						paginate: {
							next: '다음',
							previous: '이전',
						},
					},
				});
			}
		}
	}, [list]);

	useEffect(() => {
		if (tableRef.current) {
			//let table: Api<any> | null = null;
			table.current = new DataTable(tableRef.current, {
				data: [],
				columns: [
					{
						title: '필드 ID',
						render: DataTable.render.ellipsis(4),
					},
					{ title: '필드명' },
					{ title: '설명' },
					{ title: '타입' },
					{ title: '사용' },
					{ title: '길이' },
					{ title: '관리' },
				],
				columnDefs: [
					{ width: '10%', targets: 0, className: 'dt-center' },
					{ width: '10%', targets: 1, className: 'dt-center' },
					{ width: '10%', targets: 2, className: 'dt-center' },
					{ width: '20%', targets: 3, className: 'dt-center' },
					{ width: '10%', targets: 4, className: 'dt-center' },
					{ width: '10%', targets: 5, className: 'dt-center' },
					{ width: '30%', targets: 6, className: 'dt-center' },
				],
				//responsive: true,
				destroy: true,
				ordering: true,
				autoWidth: false,
			});
		}

		callFieldAPI();
	}, []);

	return (
		<>
			<div
				className="
              d-flex
              border-bottom
              title-part-padding
              px-0
              mb-3
              align-items-center
            "
			>
				<div>
					<h4 className="mb-0">
						전문 필드 정보 수정 시 변경되는 '필드그룹' 목록을 확인 하시려면 '리스트' 버튼을 사용하세요.
						<br />
						필드 타입 - [01:문자, 02:숫자, 03:리스트, 04:리스트 반복횟수(숫자)]
					</h4>
				</div>
				<div className="ms-auto flex-shrink-0">
					<UI.Button
						color="info"
						className="m-2"
						onClick={onRegistrationMsg}
					>
						<UI.RFIcon
							icon="Plus"
							className="fill-white feather-sm mb-1"
						/>
						<span style={{ display: 'inline-block', marginLeft: '4px' }}>전문 필드 등록</span>
					</UI.Button>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title">Message Field</h4>
						</div>
						<div className="card-body">
							<table
								id="msgFieldTable01"
								className="table table-hover table-bordered dt-head-center g-table-custom-sm"
								style={{ width: '100%' }}
								ref={tableRef}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MsgField;
