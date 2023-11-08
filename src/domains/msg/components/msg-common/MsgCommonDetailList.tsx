import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Badge } from 'reactstrap';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/msg/api/url';
import loadable from '@loadable/component';

import { 
	IMsgCommonListResponse, 
	IMsgCommonListResponseData,
	IMsgCommonListResponseBody,
	IMsgCommon,
} from '@/domains/msg/api/msg-common/MsgCommonListType';



const AddCommonMsgModal = loadable(() => import('@/domains/msg/components/msg-common/AddCommonMsgModal'));
const FieldListOffcanvas = loadable(() => import('@/domains/msg/components/msg-common/FieldListOffcanvas'));




const MsgCommonDetailList = () => {

	const tableRef = useRef(null);
		const [list, setList] = useState<IMsgCommon[]>([]);


	//전문 공통부 목록 조회 (공통부 전문은 FieldGroup과 같은 테이블을 사용하므로, IFieldGroup상속 관계)
	const { data: msgCommonListFetchData, fetch: msgCommonListFetch } = useAPI<TUrl>(url.GET_MSG_COMMON_LIST);
	//전문 공통부 삭제
	const { fetch: deleteMsgCommonFetch } = useAPI<TUrl>(url.DELETE_MSG_COMMON);




	
	useEffect(() => {
		callListFetchAPI();
	}, []);




	useEffect(() => {
		if (!msgCommonListFetchData) {
			return;
		}
		let res = msgCommonListFetchData as IMsgCommonListResponse;
		let data = res.data as IMsgCommonListResponseData;
		let bdy = data.bdy as IMsgCommonListResponseBody;
		let list = bdy.list as IMsgCommon[];

		setList(list);
	}, [msgCommonListFetchData]);




	useEffect(() => {

	
		if (!tableRef.current) {
			return;
		}
		if (!list || list.length === 0) {
			return;
		}

		createDataTables(tableRef.current, list);

	}, [list]);


	const callListFetchAPI = async () => {
		let res = await msgCommonListFetch(
			{
				option: { method: 'get' }
			});

		return res;
	};





	const showFieldListInOffCanvas = useCallback((event: React.MouseEvent, rowData: IMsgCommon) => {
		event.preventDefault();
		const sTitle = `[${rowData.fieldGroupId}:${rowData.fieldGroupName}] 필드 목록`;
		$ui.offcanvas({
			title: sTitle,
			element: <FieldListOffcanvas props={rowData} />,
			//background: '#f2f7f8', //offcanvas를 $ui 사용할 떈 못쓰는 props들이 있음
			//height: 'auto',
			height:'700px',
			bodyClassName: 'mt-0 pt-0',
		});
	}, []); 






	const onDeleteMsgCommon = useCallback(async (rowData: IMsgCommon)=>{
		const confirmMsg = `<b>[${rowData.fieldGroupId}]</b> 필드그룹을 삭제 하시겠습니까?`;
		//----------------------------------------------------
		//1. 컨펌창 오픈헤서 취소 눌르면 바로 종료시킴.
		//----------------------------------------------------
		let confirm = await $ui.confirm(confirmMsg, { type: 'info', confirmButton: '확인', cancelButton: '취소', });
		if (!confirm) {
			return;
		}






		try{

		//----------------------------------------------------
		//2. 삭제처리 
		//----------------------------------------------------
			let fetchParam = Object.assign({}, {
					option: { method: 'delete' }
				},
				{
					fieldGroupId: rowData.fieldGroupId
				}
			);
			await deleteMsgCommonFetch(fetchParam);

			let sMsg = "<h4>삭제하였습니다.</h4>";
			await $ui.alert(sMsg, { title: '알림확인' });

			
			//----------------------------------------------------
			//3. 리스트 재조회
			//----------------------------------------------------
			callListFetchAPI();

		}catch(error){
			let sMsg = `<h4>삭제하였습니다.${error}</h4>`;
			$ui.alert(sMsg, { title: '오류확인' });
		}
		

	},[]);




	const createDataTables = (tableElement: HTMLTableElement, tableListData: IMsgCommon[] )  =>{
		if (!tableElement){
			return new DataTable();
		}

		$(tableElement).dataTable(
			{
				data: tableListData,

				destroy: true,

				/* ---------------------------------------------------------------
				* ### 기본 기능 설정 ###
				* ---------------------------------------------------------------
				*/
				searching: true, // 검색(기본값 true),filter와 같은 듯?
				ordering: true, //정렬(기본값 true)
				info: true,// 정보 표시(기본값 true) [현재 1 - 3 / 3건]				
				paging: true,// 페이징(기본값 true)
				lengthChange: false, // 표시 건수(기본값 true)
				pageLength: 20, //한 페이지에 보여줄 row 개수, 처음 화면
				lengthMenu: [20, 50, 100, 150, 200],
				autoWidth: true,//자동으로 width 변경(기본값 true)
				responsive: true,

		
				order: [[0, "asc"]],

				//select: true,
				select: {
					//style: 'os',
					style: 'single',
					items: 'cell', 
					//items: 'row', 
				},

	

				/*
				* 헤더 콜백 (모든 그리기 이벤트 마다 호출됨)
				*/
				headerCallback: (thead, data, start, end, display)=>{
					$(thead).find('th').css('text-align','center');
				},


				columns: [
					{ title: '필드그룹ID', data: 'fieldGroupId' },
					{ title: '필드그룹이름', data: 'fieldGroupName' },
					{ title: '그룹유형', data: 'groupType' },//요청,응답
					{ title: '전문유형', data: 'msgTypeNm' }, //공통부, 개별부
					{ title: '변경일시', data: 'lastUpdtPnttm', },
					{ title: '변경자', data: 'lastUpdusrId', },
					{ title: '상태', data: 'useAt', },
					{ title: '관리', defaultContent: ''},
				],

				
				columnDefs: [
					{ 
						target: 0 , /* width: '15%', */
						createdCell
					},
					{ 
						target: 1, /* width: '15%' , */
						className: 'click-cell' ,
						createdCell
					},
					{ 
						target: 2, /* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},
					{
						target: 3, /* width: '10%' , */
						className: 'dt-body-center',
						render: (data, type, row) => {
							return `${data} [${row.msgType}]`
						}
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
						className:'dt-body-center' ,
						
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									<Badge 
										color={rowData.useAt === 'Y' ? 'info' : 'warning'}>
										{rowData.useAt === 'Y' ? '사용중' : '미사용'}
									</Badge>
								</>,
							);
						},
					},
					{
						target: 7 , 
						className: 'dt-body-center',
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
										<UI.Button
											color="primary"
											className="btn-sm mx-1"
											onClick={ (e) => showFieldListInOffCanvas(e,rowData)}
										>
											필드관리
										</UI.Button>
											<UI.Button
												color="danger"
												className="btn-sm"
												onClick={() => onDeleteMsgCommon(rowData)}
											>
											삭제
										</UI.Button>
									
								</>
							);
							
						
						},
					},
				],

				/*
				* Row created callback
				*/
				createdRow: (row,data,dataIndex,full)=>{
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
				/* 	select: {
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
		//console.log('setIsShownTooltip event======> ', isShow, data, id, rowData);
		$ui.tooltip(data, { isOpen: isShow, target: id });
	}, []);



	const openAddCommonMsgModal = useCallback(async () => {


		let infoProps = {};

		let res = await $ui.dialog(
			{
				title: '전문 공통부[필드그룹] 추가',
				element: <AddCommonMsgModal props={infoProps} />,
				dialogSize: 'md',
			});


		if (res === 'RELOAD') {
			/* 리스트 호출 */
			callListFetchAPI();


		}

	}, []);




	return (
		<>
			<div className="card">
				<div className="card-header" style={{height:'44px'}}>
					
						<span style={{ fontWeight: 700 }}>전문공통부 기본정보 입력</span>
					
					
					
				</div>
				<div className="card-body" style={{ minHeight: '700px' }}>
					<div className="border p-2" style={{position: 'relative'}}>
						<table
							className="table table-striped table-bordered dt-head-center g-table-custom-sm display"
							style={{ width: '100%' }}
							ref={tableRef}
							
						>
							<colgroup>
								<col width="15%"></col>
								<col width="*"></col>
								<col width="10%"></col>
								<col width="10%"></col>
								<col width="10%"></col>
								<col width="10%"></col>
								<col width="8%"></col>
								<col width="11%"></col>
							</colgroup>
						</table>

						<div 
							style={{
								position: 'absolute',
								left: '10px',
								top: '5px',
							}}
						>
							<UI.Button
								className="btn-sm"
								color="success"
								onClick={openAddCommonMsgModal}
							>
								<UI.RFIcon
									icon="PlusSquare"
									className="feather-sm fill-white me-2"
								/>
								<span >전문 공통부 추가</span>
							</UI.Button>
						</div>
					</div>

				</div>
			</div>
		</>
	)
};







export default MsgCommonDetailList;