import { FC, useEffect, useRef, useCallback } from 'react';
import DataTable from 'datatables.net-bs5';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/msg/api/url';
import { IFieldObj, IFieldList } from '@/domains/msg/api/GET_FIELD';
import { Card, CardBody, Badge } from 'reactstrap';


export interface IProps {
	paramData: string;
}


/**
 *  전체 필드 목록 선택 팝업
 * - 하위필드그룹 오프캔버스에서 [필드추가] 시 화면 진입
 * - 선택 시 해당 필드 등록 처리
 */
const RegistrationField: FC<IProps> = ( props ) => {
	console.log('\r\n\r\n\r\n\r\n\r\n\r\n\r\n');
	console.log('-------------------------------------------------------');
	console.log('[RegistrationField] 컴포넌트 렌더링 START');
	console.log('fieldGroupId :: ', props.paramData); 
	console.log('props  :: ', props); 
	console.log('-------------------------------------------------------');
	const fieldGroupId = props.paramData
	console.log('fieldGroupId :: ', fieldGroupId);

	const tableRef = useRef(null);
	const dataTableRef = useRef<any>(null);
	const { fetch: regFetch } = useAPI<TUrl>(url.POST_MAPPING_FIELD);


	// 관리컬럼 [선택] 버튼 클릭 시
	const onSelectField = useCallback((rowData: IFieldList) => {
		if (!fieldGroupId){
			return;
		}


		regFetch({
			fieldId: rowData.fieldId,
			fieldGroupId,
		})
			.then(() => {
				$ui.dialog({ close: 'success' });
			})
			.catch((e: any) => {
				console.log(e.message);
				$ui.alert(`처리 중 오류가 발생했습니다.<br />잠시 후 다시 시도 해주세요.<br />Error: ${e.message}`);
			});
	}, []);

	// [취소] 버튼 클릭
	const onCancel = useCallback(() => {
		$ui.dialog({ close: true });
	}, []);

	// 전체 필드 목록 조회 API
	const setFieldDataTable = useCallback(() => {
		if (tableRef.current) {
			dataTableRef.current = new DataTable(tableRef.current, {
				//ajax 호출방식 사용해봄 (로딩중 표시사용)
				ajax: {
					url: url.GET_FIELD,
					type: 'GET',
					dataType: 'JSON',
					dataSrc: (data) => {
						const res = data.bdy as IFieldObj;
						const tableData = res.list as IFieldList[];
						return tableData;
					},
				},
				columns: [
					{
						title: '상태',
						data: 'useAt',
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
					{ title: '필드ID', data: 'fieldId' },
					{ title: '필드명', data: 'fieldName' },
					{ title: '설명', data: 'fieldDesc' },
					{
						title: '타입',
						data: 'fieldType',
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
					{ title: '길이', data: 'fieldLength' },
					{
						title: '관리',
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									<UI.Button
										color="primary"
										className="btn-sm mx-1"
										onClick={() => onSelectField(rowData)}
									>
										선택
									</UI.Button>
								</>,
							);
						},
					},
				],
				order: [[1, 'asc']],
				columnDefs: [
					{ width: '10%', targets: 0 },
					{ width: '10%', targets: 1 },
					{ width: '25%', targets: 2 },
					{ width: '25%', targets: 3 },
					{ width: '*', targets: 4 },
					{ width: '7%', targets: 5 },
					{ width: '7%', targets: 6, orderable: false },
					{ targets: '_all', defaultContent: '-', className: 'dt-head-center' },
					{ className: 'dt-body-left', targets: [1, 2, 3, 4] },
					{ className: 'dt-body-right', targets: [5] },
					{ className: 'dt-body-center', targets: [0, 6] },
				],
				destroy: true,
				searching: true,
				autoWidth: false,
				info: false, //정보 표시
				paging: false, //페이징 기능
				scrollY: '22rem',
				language: {
					search: '검색: ',
					emptyTable: '데이터가 없습니다.',
					zeroRecords: '일치하는 데이터가 없습니다.',
					loadingRecords: '로딩중...',
					processing: '잠시만 기다려 주세요...',
				},
			});
		}
	}, []);

	//화면 초기설정
	useEffect(() => {
		setFieldDataTable();
	}, []);
	return (
		<>
			<Card
				color="secondary "
				className="border mb-3"
				outline
			>
				<CardBody>
					<div className="d-flex mb-1 align-items-center">
						<div>
							<ul className="mb-0">
								<li>
									<b className="text-info">'03'</b> 리스트 타입 선택 시 다음 필드로 <b className="text-info">'04'</b>
									타입의 필드가 지정되어야 합니다.
								</li>
							</ul>
						</div>
					</div>
					<table
						className="table table-hover table-bordered align-middle g-table-custom-scroll-sm"
						style={{ width: '100%' }}
						ref={tableRef}
					/>
				</CardBody>
			</Card>
			<div style={{ width: '100%', textAlign: 'right' }}>
				<UI.Button onClick={onCancel}>
					<UI.RFIcon
						icon="X"
						className="fill-white feather-sm mb-1"
					/>
					<span style={{ display: 'inline-block', marginLeft: '4px' }}>취소</span>
				</UI.Button>
			</div>
		</>
	);
};

export default RegistrationField;
