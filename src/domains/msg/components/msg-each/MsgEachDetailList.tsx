import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useAPI } from "@/app/store";
import url, { TUrl } from '@/domains/msg/api/url';
import dayjs from 'dayjs';
import { Badge } from 'reactstrap';
import loadable from '@loadable/component';
const AddMessageModal = loadable(() => import('@/domains/msg/components/msg-each/AddMessageModal'));
const NavTabOffcanvas = loadable(() => import('@/domains/msg/components/msg-each/NavTabOffcanvas'));


import { IMsgEachListResponseBody, IMsgEach } from '@/domains/msg/api/msg-each/MsgEachListType';




//-------------------------------------------
//forwardRef 실행 참조 인터페이스 
//-------------------------------------------
export interface IMsgEachDetailListHandleRef {
	excuteMsgEachDetailListRefresh: (param: IMsgEachDetailListHandleParam) => void;
}


//-------------------------------------------
//forwardRef 실행 참조 파라미터 인터페이스 
//-------------------------------------------
export interface IMsgEachDetailListHandleParam {
	bizCode: string;
	bizDtlCode: string;
	biz3DepthCode: string;
}


//-------------------------------------------
// 컴포넌트 Props 인터페이스 
//-------------------------------------------
export interface IMsgEachDetailListProps {

}



const MsgEachDetailList = forwardRef<IMsgEachDetailListHandleRef, IMsgEachDetailListProps>((props,ref) => {

	const [list, setList] = useState<IMsgEach[]>([]);
	
	const tableRef = useRef(null);
	const bizCodeRef = useRef('');
	const bizDtlCodeRef = useRef('');
	const biz3DepthCodeRef = useRef('');

	const { data: msgEachListFetchData, fetch: msgEachListFetch } = useAPI<TUrl>(url.GET_MSG_EACH_LIST);

	const { fetch: deleteMsgFetch } = useAPI<TUrl>(url.DELETE_MSG_EACH_MESSAGE);
	


	//--------------------------------------------------------------
	// 부모노드에서 호출하는 함수처리 (ForwardRef 처리에 필요한 설정)
	//--------------------------------------------------------------
	// 부모 컴포넌트에서 사용할 수 있는 함수들을 내부에 표기
	useImperativeHandle(ref, () => (
		{
			excuteMsgEachDetailListRefresh
		})
	);



	const excuteMsgEachDetailListRefresh = async (req: IMsgEachDetailListHandleParam) => {
		
		bizCodeRef.current = req.bizCode;
		bizDtlCodeRef.current = req.bizDtlCode;
		biz3DepthCodeRef.current = req.biz3DepthCode;
		
		await callListFetchAPI();


	}


	const callListFetchAPI = async () => {
		let res = await msgEachListFetch(
			{ 
				bizCode: bizCodeRef.current,
				bizDtlCode: bizDtlCodeRef.current, 
				biz3DepthCode: biz3DepthCodeRef.current, 
				option: { method: 'get' } 
			});
		return res;
	};




	
	useEffect(() => {
		if (!msgEachListFetchData){
			return ;
		}

		const bodyData = msgEachListFetchData.data.bdy as IMsgEachListResponseBody;

		setList(bodyData.list);

	}, [msgEachListFetchData]);





	useEffect(()=>{
		
		const asyncExcute = async () => {
			if (!tableRef.current) {
				return;
			}
			if (!list || list.length === 0) {
				return;
			}
			await createDataTables(tableRef.current, list);

		} 
		asyncExcute();

	},[list]);



	const openAddMessageModal =  useCallback(async () => {		
		let infoProps = {};

		let res = await $ui.dialog(
			{
				title: '전문 개별부 추가',
				element: <AddMessageModal props={infoProps} />,
				dialogSize: 'md',
			});

		if (res === 'RELOAD') {
			await callListFetchAPI();
		}

	}, []);


	const showBodyFieldListInOffCanvas = useCallback((event: React.MouseEvent, rowData: IMsgEach) => {
		event.preventDefault();
		const sTitle = `[${rowData.msgId}:${rowData.msgName}] 필드 목록`;
		$ui.offcanvas({
			title: sTitle,
			element: <NavTabOffcanvas msgEachRowData={rowData} />,
			//background: '#f2f7f8', //offcanvas를 $ui 사용할 떈 못쓰는 props들이 있음
			//height: 'auto',
			height:'700px',
			bodyClassName: 'mt-0 pt-0',
		});
	}, []); 


	const deleteMsg = useCallback(
		async(event: React.MouseEvent, rowData: IMsgEach)=>{

			console.log('rowData :: ', rowData)
			const confirmMsg = `<b>[${rowData.msgId}]</b> 전문을 삭제 하시겠습니까?`;
			//----------------------------------------------------
			//1. 컨펌창 오픈헤서 취소 눌르면 바로 종료시킴.
			//----------------------------------------------------
			let confirm = await $ui.confirm(confirmMsg, { type: 'info', confirmButton: '확인', cancelButton: '취소', });
			if (!confirm) {
				return;
			}




			try {

				//----------------------------------------------------
				//2. 삭제처리 
				//----------------------------------------------------
				let fetchParam = Object.assign({}, {
					option: { method: 'delete' }
				},
					{
						msgId: rowData.msgId
					}
				);

				console.log('fetchParam :: ', fetchParam)
				await deleteMsgFetch(fetchParam);

				let sMsg = "<h4>삭제하였습니다.</h4>";
				await $ui.alert(sMsg, { title: '알림확인' });


				//----------------------------------------------------
				//3. 리스트 재조회
				//----------------------------------------------------
				callListFetchAPI();

			} catch (error) {
				let sMsg = `<h4>삭제하였습니다.${error}</h4>`;
				$ui.alert(sMsg, { title: '오류확인' });
			}

		}
	,[]);

	const createDataTables = (tableElement: HTMLTableElement, tableListData: IMsgEach[] ) =>{
		if (!tableElement){
			return false;
		}

		$(tableElement).dataTable(
			{
				data: tableListData,
				destroy: true,

				/* ---------------------------------------------------------------
				* ### 기본 기능 설정 ###
				* ---------------------------------------------------------------
				*/
				lengthChange: false, // 표시 건수(기본값 true)
				searching: true, // 검색(기본값 true),filter와 같은 듯?
				ordering: true, //정렬(기본값 true)
				info: true,// 정보 표시(기본값 true) [현재 1 - 3 / 3건]				
				paging: true,// 페이징(기본값 true)
				pageLength: 10, //한 페이지에 보여줄 row 개수, 처음 화면
				autoWidth: true,//자동으로 width 변경(기본값 true)

				responsive: true,

				order: [[0, "asc"]],



				/*
				* 헤더 콜백 (모든 그리기 이벤트 마다 호출됨)
				*/
				headerCallback: (thead, data, start, end, display)=>{

					$(thead).find('th').css('text-align','center');
				},


				columns: [
					{ title: '전문ID', data: 'msgId' },
					{ title: '전문명', data: 'msgName' },
					{ title: '설명', data: 'msgDesc' },
					{ title: '변경일', data: 'lastUpdtPnttm', },
					{ title: '변경자', data: 'lastUpdusrId', },
					{
						title: '상태', data: 'useAt', 
					},
					{
						title: '관리', data: 'msgId', 
					},
				],

				
				columnDefs: [
					{ 
						target: 0 , /* width: '15%', */
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
						target: 6, width: '15%' , 
						className: 'dt-body-center',
						createdCell: (td, _cellData, rowData, _row, _col) => {
							let a = $util.renderReactDOM(
								td as Element,
								<>

										<UI.Button
											color="primary"
											className="btn-sm mx-1"
											onClick={(e) => showBodyFieldListInOffCanvas(e, rowData)}
										>
											필드관리
										</UI.Button>
											<UI.Button
												color="danger"
												className="btn-sm"
												onClick={(e) => deleteMsg(e, rowData)}
											>
											삭제
										</UI.Button>
									
								</>,
							);
							$(td).css('text-align', 'center');
							//console.log(a)
							return a;
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
					style: 'single',
					items: 'cell',
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
		$ui.tooltip(data, { isOpen: isShow, target: id });
	}, []);






	return (
		<>
			<div className="card">
				<div className="card-header" style={{height:'44px'}}>
					
						<span style={{ fontWeight: 700 }}>전문개별부 기본정보 입력</span>
					
					
					
				</div>
				<div className="card-body" style={{ minHeight: '700px' }}>
					<div className="border p-2" style={{position: 'relative'}}>
						<table
							className="table table-striped table-bordered dt-head-center g-table-custom-sm display"
							style={{ width: '100%' }}
							ref={tableRef}
							
						>
							<colgroup>
								<col width="10%"></col>
								<col width="20%"></col>
								<col width="*"></col>
								<col width="10%"></col>
								<col width="10%"></col>
								<col width="10%"></col>
								<col width="15%"></col>
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
							onClick={openAddMessageModal}
							>
								<UI.RFIcon
									icon="PlusSquare"
									className="feather-sm fill-white me-2"
								/>
								<span >전문 개별부 추가</span>
							</UI.Button>
						</div>
					</div>

				</div>
			</div>
		</>
	)
});







export default MsgEachDetailList;