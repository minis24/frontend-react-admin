import { FC, useCallback, useEffect, useRef, useState } from "react";
import 'datatables.net-plugins/dataRender/ellipsis';
import dayjs from 'dayjs';

import { Badge } from 'reactstrap';
import { useAPI } from "@/app/store";
import url, { TUrl } from '@/domains/msg/api/url';




import {
	IMsgCommonListResponse,
	IMsgCommonListResponseData,
	IMsgCommonListResponseBody,
	IMsgCommon,
} from '@/domains/msg/api/msg-common/MsgCommonListType';


export interface IProps {
	groupType: string;  //요청부:REQ , 응답부:RES
	parentSetReqCommonMessageId: React.Dispatch<React.SetStateAction<string>>;
	parentSetResCommonMessageId: React.Dispatch<React.SetStateAction<string>>;
}




/**
 * 요청공통부 필드그룹아이디 선택 Modal Dialog 
 * @returns 
 */
const SetCommonReqMessageModal:FC<IProps> = (props) => {
	
	const groupType = props.groupType;
	const parentSetReqCommonMessageId = props.parentSetReqCommonMessageId;
	const parentSetResCommonMessageId = props.parentSetResCommonMessageId;






	
	const tableRef = useRef(null);
	const { data: msgCommonFetchData, fetch: msgCommonFetch } = useAPI<TUrl>(url.GET_MSG_COMMON_LIST);
	const [list, setList] = useState<IMsgCommon[]>([]);
	
	
	
	useEffect(() => {
		callListFetchAPI();
	}, []);

	useEffect(() => {
		if (!msgCommonFetchData) {
			return;
		}
		let res = msgCommonFetchData as IMsgCommonListResponse;
		let data = res.data as IMsgCommonListResponseData;
		let bdy = data.bdy as IMsgCommonListResponseBody;
		let list = bdy.list as IMsgCommon[];
		//const listData = msgCommonFetchData.data.bdy as IResponseMsgList;

		setList(list);
	}, [msgCommonFetchData]);




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
		let res = await msgCommonFetch(
			{	groupType,
				msgType:'01',
				option: { method: 'get' }
			});

		return res;
	};




	const createDataTables = (tableElement: HTMLTableElement, tableListData: IMsgCommon[]) => {
		if (!tableElement) {
			return new DataTable();
		}

		$(tableElement).dataTable(
			{
				data: tableListData,

				destroy: true,

				
				searching: false, // 검색(기본값 true),filter와 같은 듯?
				ordering: true, //정렬(기본값 true)
				info: false,// 정보 표시(기본값 true) [현재 1 - 3 / 3건]				
				paging: false,// 페이징(기본값 true)
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
				headerCallback: (thead, data, start, end, display) => {
					//$(thead).find('th').eq(0).html('Displaying ' + (end - start) + ' records' );
					$(thead).find('th').css('text-align', 'center');
				},
				columns: [
					
					{ title: '필드그룹이름', data: 'fieldGroupName' },
					{ title: '변경일시', data: 'lastUpdtPnttm', },
					{ title: '변경자', data: 'lastUpdusrId', },
					{ title: '상태', data: 'useAt', },
					{ title: '관리', defaultContent: '' },
				],


				columnDefs: [
					{ targets: '_all', defaultContent: '-', className: 'dt-center' },
					{ targets: [0], className: 'dt-body-left', createdCell },
					{
						targets: [1,2] ,/* width: '10%' , */
						className: 'dt-body-center',
						createdCell
					},

					{
						target: 3, /* width: '10%' , */
						className: 'dt-body-center',

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
						target: 4,
						className: 'dt-body-center',
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									<UI.Button
										color="danger"
										className="btn-sm"
										onClick={(event) => onClickSetCommon(rowData.fieldGroupId,event)}
									>
										선택
									</UI.Button>

								</>
							);


						},
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

		$ui.tooltip(data, { isOpen: isShow, target: id });
	}, []);


/**
 * 취소 버튼 클릭 (닫기)
 * @param event 
 */
	const onCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {


		if ('REQ' === groupType) {
			parentSetReqCommonMessageId('');
		} else {
			parentSetResCommonMessageId('');
		}

		$ui.dialog({ close: 'CANCEL' });
		
	}, []);


	const onClickSetCommon = async (fieldGroupId: string, ...rest:any) =>{
		
		if('REQ' === groupType){
			parentSetReqCommonMessageId(fieldGroupId);
		}else{
			parentSetResCommonMessageId(fieldGroupId);
		}

		await $ui.dialog({ close: 'SUCCESS' });
	}




	return (
		<div className="card m-0">
			<div className="border-bottom title-part-padding">
				<h5>
					<UI.Icon
						icon="CaretRightFill"
						color="orange"
						size={10}
						className='ms-0 me-1'
					/>
					<span className='text-dark fw-light'>전문은 WAS와 AP간에 데이터 송수신을 위한 내부 전문과 MCI, EAI, FEP 등 타 시스템과의 연동을 위한 외부 전문으로 구분하는 데, 전문식별자는 다음과 같은 규칙을 사용해서 생성한다. </span>
				</h5>
			</div>
			<div className="card-body">
				<div className="mb-1 row">
					<div className="col-12">
						<table
							className="table table-striped table-bordered dt-head-center g-table-custom-sm display"
							style={{ width: '100%' }}
							ref={tableRef}
						>
							<colgroup>
								
								<col width="*"></col>
								<col width="20%"></col>
								<col width="15%"></col>
								<col width="15%"></col>
								<col width="15%"></col>
							</colgroup>
						</table>
					</div>
				</div>
			</div>

	
			<div style={{ width: '100%', textAlign: 'right' }}>
				
				<UI.Button  onClick={onCancel} >
					<UI.RFIcon
						icon="X"
						className="fill-white feather-sm mb-1"
					/>
					<span style={{ display: 'inline-block', marginLeft: '4px' }}>취소</span>
				</UI.Button>
			</div>

		</div>
	);
};

export default SetCommonReqMessageModal;
