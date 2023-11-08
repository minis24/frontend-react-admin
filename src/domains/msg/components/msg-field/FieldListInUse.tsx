import DataTable from 'datatables.net-bs5';
import { Card, CardBody, Badge } from 'reactstrap';
import { FC, useEffect, useRef } from 'react';
import url, { TUrl } from '@/domains/msg/api/url';
import { useAPI } from '@/app/store';

export interface IFieldListInUseProps {
	fieldId: string;
}

const FieldListInUse: FC<IFieldListInUseProps> = ({ fieldId }) => {
	const { fetch: getFetch } = useAPI<TUrl>(url.GET_REALTED_INFO_BY_FILED);
	const tableRef = useRef(null); // 테이블 html dom
	const getListApi = (targetFieldId: string) => {
		getFetch({
			option: { method: 'get', params: { fieldId: targetFieldId }, isSetParams: true },
		})
			.then((res: any) => {
				const resultList = res.data.bdy.data ? res.data.bdy.data : [];
				setDataTable(resultList);
			})
			.catch((res) => {
				$ui.alert(`처리 중 오류가 발생했습니다.<br />Error: ${res.message}`);
			});
	};
	const setDataTable = (dataList: []) => {
		if (tableRef.current && dataList) {
			new DataTable(tableRef.current, {
				destroy: true,
				autoWidth: false,
				searching: false,
				info: true,
				lengthChange: false,
				paging: dataList.length > 0 ? true : false,
				pageLength: 10,
				data: dataList,
				order: [[1, 'desc']],
				columns: [
					{
						title: '그룹상태',
						orderable: false,
						createdCell: (td, _cellData, rowData, _row, _col) => {
							return $util.renderReactDOM(
								td as Element,
								<>
									<Badge color={rowData.fieldGroupUseAt === 'Y' ? 'info' : 'warning'}>
										{rowData.fieldGroupUseAt === 'Y' ? '사용중' : '미사용'}
									</Badge>
								</>,
							);
						},
					},
					{ title: '그룹ID', data: 'fieldGroupId' },
					{ title: '그룹명', data: 'fieldGroupName' },
					{ title: '상위그룹ID', data: 'parentId' },
					{ title: '전문ID', data: 'msgId' },
				],
				columnDefs: [
					{ width: '10%', targets: 0, className: 'dt-center' },
					{ width: '25%', targets: 1 },
					{ width: '25%', targets: 2 },
					{ width: '20%', targets: 3 },
					{ width: '20%', targets: 4 },
					{ width: '', targets: '_all', defaultContent: '-' },
					{ className: 'dt-head-center dt-body-left', targets: [1, 2, 3, 4] },
				],

				language: {
					emptyTable: '포함된 목록이 없습니다.',
					info: '총 _TOTAL_건',
					infoEmpty: '총 _TOTAL_건',
					loadingRecords: '로딩중...',
					processing: '잠시만 기다려 주세요...',
					paginate: {
						next: '다음',
						previous: '이전',
					},
				},
			});
		}
	};

	useEffect(() => {
		if (fieldId) {
			getListApi(fieldId);
		}
	}, []);

	return (
		<>
			<Card
				color="secondary "
				className="border mb-2"
				outline
			>
				<CardBody>
					<div>
						<h4 className="mb-0 text-dark">
							<span className="text-primary">[{fieldId}]</span> 필드가 포함된 필드그룹 목록
						</h4>
					</div>
					<hr />
					<table
						className="table table-hover table-bordered align-middle g-table-custom-sm g-table-custom-scroll-sm"
						style={{ width: '100%' }}
						ref={tableRef}
					/>
				</CardBody>
			</Card>
			<div style={{ width: '100%', textAlign: 'right' }}>
				<UI.Button
					color="secondary"
					onClick={() => {
						$ui.dialog({ close: true });
					}}
				>
					<UI.RFIcon
						icon="X"
						className="fill-white feather-sm mb-1"
					/>
					<span style={{ display: 'inline-block', marginLeft: '4px' }}>닫기</span>
				</UI.Button>
			</div>
		</>
	);
};

export default FieldListInUse;
