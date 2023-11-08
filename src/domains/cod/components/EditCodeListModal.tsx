import DataTable from 'datatables.net-bs5';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/cod/api/url';
import { FC, useEffect, useRef, useImperativeHandle, useState } from 'react';
import { Card, CardBody, Badge, Input } from 'reactstrap';
import { ICodeCtgyRowData, ICodePatch, ICodeRegist } from '../types/components';
export interface IDetailModalProps {
	clickData: ICodeCtgyRowData;
	onCallback?: (funcName: string) => void;
	KeyRef?: any;
}

// CodeList - 부모화면에서 현재 모달쪽 함수 사용
const EditCodeListModal: FC<IDetailModalProps> = ({ clickData, onCallback, KeyRef }) => {
	const tableRef = useRef(null); // 테이블 html dom
	const dataTableRef = useRef<any>(null); //데이터테이블 Ref
	const addRowFocusRef = useRef<any>([null]); //데이터테이블 포커스대상 Ref(추가열 첫번째 Input)
	const [addBtnClickCount, setAddBtnClickCount] = useState(0);

	/* ---- API  ---- */
	const { fetch: codeRegFetch } = useAPI<TUrl>(url.POST_CODE); // 코드등록
	const { fetch: codeDelFetch } = useAPI<TUrl>(url.DEL_CODE); // 코드 삭제
	const { fetch: codeUpdateFetch } = useAPI<TUrl>(url.PATCH_CODE); // 코드 수정
	const { data: getCodeData, fetch: getFetch } = useAPI<TUrl>(url.GET_CODE_BY_CTGY); // 코드목록 조회

	//부모창에서 호출할 함수 목록
	useImperativeHandle(KeyRef, () => ({
		closeCheckFunc,
	}));

	// Offcanvas 종료 시 편집 중인지 상태 확인
	const closeCheckFunc = () => {
		let editCount = 0;
		dataTableRef.current.data().filter((el: any) => {
			// 'rowStatus' 키 존재하면 편집중인 row
			if (el.rowStatus) {
				editCount++;
			}
		});
		return editCount > 0 ? true : false;
	};

	// 공통코드추가 시 해당 ref로 포커스 변경
	useEffect(() => {
		if (addBtnClickCount > 0 && addRowFocusRef.current.length > 0) {
			if (tableRef.current) {
				addRowFocusRef.current['id_' + (addBtnClickCount - 1)].focus();
			}
		}
	}, [addBtnClickCount]);

	//공통코드추가 버튼 클릭 시 Row 추가
	const addRowFn = (e: any) => {
		e.preventDefault();
		if (tableRef.current && dataTableRef.current) {
			dataTableRef.current.row.add({ rowStatus: 'new', idx: addBtnClickCount, orderFlag: '999' }).draw(false);
			setAddBtnClickCount((current) => current + 1);
		}
	};

	// 화면 초기설정
	useEffect(() => {
		callGetApi(clickData.codeId); // 조회 API 호출

		//부모창에서 사용할 함수명 전달
		if (onCallback) {
			onCallback('closeCheckFunc');
		}
	}, []);

	//공통코드유형 목록 조회 API
	const callGetApi = (codeId: string) => {
		getFetch({ option: { method: 'get', params: { codeId: codeId } } }).then((res: any) => {
			//const codeList = res.data.bdy.data;
			const codeList = res.data.bdy.list;
			if (codeList) {
				if (tableRef.current) {
					dataTableRef.current = new DataTable(tableRef.current, {
						destroy: true,
						autoWidth: false,
						searching: false, //검색 기능
						ordering: true, //정렬 기능
						info: true, //정보 표시
						paging: false, //페이징 기능
						data: codeList,
						scrollY: '12rem',
						columns: [
							{
								data: 'code',
								title: '공통코드',
								createdCell: (td: any, cellData, rowData) => {
									if (rowData.rowStatus == 'new' || rowData.rowStatus == 'edit') {
										return $util.renderReactDOM(
											td as Element,
											<>
												<UI.InputField
													type="text"
													value={rowData.rowStatus == 'edit' ? cellData : ''}
													disabled={rowData.rowStatus == 'edit' ? true : false}
													onBlur={(e: any) => {
														dataTableRef.current.row(td.parentElement._DT_RowIndex).data().code = e.target.value;
													}}
													ref={(el) => {
														addRowFocusRef.current[
															'id_' + dataTableRef.current.row(td.parentElement._DT_RowIndex).data().idx
														] = el;
													}}
												></UI.InputField>
											</>,
										);
									} else {
										return getCodeData;
									}
								},
							},
							{
								data: 'codeNm',
								title: '코드 값',
								createdCell: (td: any, cellData, rowData) => {
									if (rowData.rowStatus == 'new' || rowData.rowStatus == 'edit') {
										return $util.renderReactDOM(
											td as Element,
											<>
												<UI.InputField
													type="text"
													value={rowData.rowStatus == 'edit' ? cellData : ''}
													onBlur={(e: any) => {
														dataTableRef.current.row(td.parentElement._DT_RowIndex).data().codeNm = e.target.value;
													}}
												></UI.InputField>
											</>,
										);
									} else {
										return getCodeData;
									}
								},
							},
							{
								data: 'codeDc',
								title: '설명',
								createdCell: (td: any, cellData, rowData) => {
									if (rowData.rowStatus == 'new' || rowData.rowStatus == 'edit') {
										return $util.renderReactDOM(
											td as Element,
											<>
												<UI.InputField
													type="text"
													value={rowData.rowStatus == 'edit' ? cellData : ''}
													onBlur={(e: any) => {
														dataTableRef.current.row(td.parentElement._DT_RowIndex).data().codeDc = e.target.value;
													}}
												></UI.InputField>
											</>,
										);
									} else {
										return getCodeData;
									}
								},
							},
							{
								data: 'useAt',
								title: '상태',
								orderable: false,
								createdCell: (td: any, cellData, rowData) => {
									if (rowData.rowStatus == 'new' || rowData.rowStatus == 'edit') {
										return $util.renderReactDOM(
											td as Element,
											<>
												<Input
													type="select"
													defaultValue={cellData == 'N' ? 'N' : cellData}
													onChange={(e: any) => {
														dataTableRef.current.row(td.parentElement._DT_RowIndex).data().useAt = e.target.value;
													}}
												>
													<option value="Y">사용</option>
													<option value="N">미사용</option>
												</Input>
											</>,
										);
									} else {
										if (cellData == 'Y') {
											td.textContent = '사용중';
										} else {
											td.textContent = '미사용';
										}
									}
								},
							},

							{
								title: '관리',
								data: 'code',
								orderable: false,
								createdCell: (td, _cellData, rowData) => {
									if (rowData.rowStatus == 'new') {
										return $util.renderReactDOM(
											td as Element,

											<>
												<UI.Button
													color="success"
													className="btn-sm mx-1"
													onClick={() => {
														regRowFn(td);
													}}
												>
													저장
												</UI.Button>
												<UI.Button
													color="secondary"
													className="btn-sm"
													onClick={() => {
														delRowFn('row', td);
													}}
												>
													제거
												</UI.Button>
											</>,
										);
									} else if (rowData.rowStatus == 'edit') {
										return $util.renderReactDOM(
											td as Element,

											<>
												<UI.Button
													color="success"
													className="btn-sm mx-1"
													onClick={() => {
														updateRowFn(td);
													}}
												>
													완료
												</UI.Button>
												<UI.Button
													color="secondary"
													className="btn-sm"
													onClick={() => {
														cancelRowFn(td);
													}}
												>
													취소
												</UI.Button>
											</>,
										);
									} else {
										return $util.renderReactDOM(
											td as Element,

											<>
												<UI.Button
													color="info"
													className="btn-sm mx-1"
													onClick={() => {
														editRowFn(td);
													}}
												>
													편집
												</UI.Button>
												<UI.Button
													color="danger"
													className="btn-sm"
													onClick={() => {
														delRowFn('data', td);
													}}
												>
													삭제
												</UI.Button>
											</>,
										);
									}
								},
							},
							{
								// 열 추가/편집 시 정렬 기준
								data: 'orderFlag',
								render: (data) => {
									if (data == undefined) {
										data = 0;
									}
									return data;
								},
							},
							{
								// 열 다중 추가 시 정렬 기준
								data: 'idx',
								render: (data) => {
									if (data == undefined) {
										data = 0;
									}
									return data;
								},
							},
						],
						order: [
							[5, 'desc'],
							[6, 'desc'],
							[0, 'asc'],
						],
						columnDefs: [
							{ targets: 0, width: '20%', className: 'dt-center' },
							{ targets: 1, width: '20%', className: 'dt-head-center dt-body-left' },
							{ targets: 2, width: '40%', className: 'dt-head-center dt-body-left' },
							{ targets: 3, width: '10%', className: 'dt-center' },
							{ targets: 4, width: '10%', className: 'dt-center' },
							{ targets: [5, 6], visible: false },
							{ targets: '_all', defaultContent: '-' },
						],

						language: {
							emptyTable: '데이터가 없습니다.',
							lengthMenu: '페이지당 _MENU_ 개씩 보기',
							info: '총 _TOTAL_건',
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

					// 추가된 테이블 Row 저장
					const regRowFn = (td: any) => {
						const rowIdx = td.parentElement._DT_RowIndex;
						const rowData = dataTableRef.current.row(rowIdx).data();
						$ui
							.confirm('등록하시겠습니까?', {
								type: 'info',
								confirmButton: '등록',
								cancelButton: '취소',
							})
							.then((result: boolean) => {
								if (result) {
									//추후 :: 여기 또는 등록 API 호출시 validation
									const regFetchOpt = { option: { method: 'post' } };
									const regRowData: ICodeRegist = {
										codeId: clickData.codeId,
										code: rowData.code,
										codeDc: rowData.codeDc,
										codeNm: rowData.codeNm,
										useAt: rowData.useAt == undefined ? 'Y' : rowData.useAt,
										userId: '',
									};

									// 등록 API 호출
									codeRegFetch(Object.assign(regFetchOpt, regRowData)).then((res: any) => {
										if (res.status === 200) {
											$ui.alert('등록 완료 되었습니다.').then(() => {
												delete rowData.rowStatus;
												delete rowData.idx;
												delete rowData.orderFlag;
												dataTableRef.current.row(rowIdx).remove().draw(false); // 등록 편집 열 삭제
												dataTableRef.current.row.add(rowData).draw(false); // 등록 편집 데이터로 열 추가
											});
										} else {
											$ui.alert('등록 처리 실패 <br/>' + res.statusText);
										}
									});
								}
							});
					};

					// 테이블 Row 삭제 & 등록 Row 제거
					const delRowFn = (flag: string, td: any) => {
						const rowIdx = td.parentElement._DT_RowIndex;
						const rowData = dataTableRef.current.row(rowIdx).data();

						if (flag == 'data') {
							// 공통코드 삭제
							$ui
								.confirm('삭제하시겠습니까?', {
									type: 'error',
									confirmButton: '삭제',
									cancelButton: '취소',
								})
								.then((result: boolean) => {
									if (result) {
										// 공통코드 삭제 API
										codeDelFetch({
											option: { method: 'delete', params: { codeId: clickData.codeId, code: rowData.code } },
										}).then((res: any) => {
											if (res.data.hdr.rsCd === 'SUCCESS') {
												$ui.alert('삭제 완료 되었습니다.').then(() => {
													dataTableRef.current.row(rowIdx).remove().draw(false);
												});
											}
										});
									}
								});
						} else if (flag == 'row') {
							//등록로우 제거
							dataTableRef.current.row(rowIdx).remove().draw(false);
						}
					};

					// 공통코드 편집 버튼 클릭 시
					const editRowFn = (td: any) => {
						const rowIdx = td.parentElement._DT_RowIndex;
						const rowData = dataTableRef.current.row(rowIdx).data();
						const copyRowData = Object.assign({}, rowData); // 기존 rowData 복사

						//편집 row 추가
						copyRowData.rowStatus = 'edit';
						copyRowData.originObject = td.parentElement; // 후처리 중 숨겨둔 기존 row에 접근하기 위해 설정
						dataTableRef.current.row.add(copyRowData).draw(false);

						//기존 row 숨김
						td.parentElement.classList.add('hide');
					};

					// 공통코드 편집 row 취소
					const cancelRowFn = (td: any) => {
						const rowIdx = td.parentElement._DT_RowIndex;
						const rowData = dataTableRef.current.row(rowIdx).data();
						$ui
							.confirm('편집을 취소하시겠습니까?</br> 취소 시 변경내역은 저장되지 않습니다.', {
								type: 'error',
								confirmButton: '확인',
								cancelButton: '취소',
							})
							.then((result: boolean) => {
								if (result) {
									// 편집 Row 제거 & 기존 Row show
									dataTableRef.current.row(rowIdx).remove().draw(false);
									rowData.originObject.classList.remove('hide');
								}
							});
					};

					// 공통코드 편집 row 업데이트
					const updateRowFn = (td: any) => {
						const rowIdx = td.parentElement._DT_RowIndex;
						const rowData = dataTableRef.current.row(rowIdx).data();
						$ui
							.confirm('변경한 정보로 저장 하시겠습니까?', {
								type: 'info',
								confirmButton: '확인',
								cancelButton: '취소',
							})
							.then((result: boolean) => {
								if (result) {
									const updateFetchOpt = {
										option: { method: 'patch', params: { codeId: clickData.codeId, code: rowData.code } },
									};
									const updateRowData: ICodePatch = {
										codeDc: rowData.codeDc,
										codeNm: rowData.codeNm,
										useAt: rowData.useAt,
										userId: '',
									};
									// 공통코드 업데이트 API
									codeUpdateFetch(Object.assign(updateFetchOpt, updateRowData)).then((res: any) => {
										$ui.alert('수정 완료 되었습니다.').then(() => {
											rowData.originObject.remove();
											dataTableRef.current.row(rowIdx).remove().draw(false);
											dataTableRef.current.row.add(res.data.bdy.data).draw(false);
										});
									});
								}
							});
					};
				}
			}
		});
	};

	return (
		<>
			<Card
				color="secondary"
				className="border mb-0 "
				outline
			>
				<CardBody>
					<table className="table table-bordered g-table-custom-sm">
						<colgroup>
							<col width="20%" />
							<col width="20%" />
							<col width="*" />
						</colgroup>
						<tbody>
							<tr>
								<th>
									<Badge
										color={clickData.useAt === 'Y' ? 'info' : 'danger'}
										className="me-3"
									>
										{clickData.useAt === 'Y' ? '사용중' : '미사용'}
									</Badge>
									{clickData.codeId}
								</th>
								<td>{clickData.codeIdNm}</td>
								<td>{clickData.codeIdDc}</td>
							</tr>
						</tbody>
					</table>
				</CardBody>
			</Card>
			<Card
				color="secondary "
				className="border border-top-0"
				outline
			>
				<CardBody>
					<div className="d-flex mb-1 align-items-center">
						<div>
							<h4 className="mb-0 text-primary">* 유형 하위 공통코드 목록</h4>
						</div>
						<div className="ms-auto flex-shrink-0">
							<UI.Button
								onClick={addRowFn}
								color="primary"
								id="addRowBtn"
							>
								<UI.RFIcon
									icon="Plus"
									className="fill-white feather-sm mb-1 me-1"
								/>
								공통코드추가
							</UI.Button>
						</div>
					</div>
					<table
						className="table table-hover table-bordered align-middle g-table-custom-scroll-sm"
						style={{ width: '100%' }}
						ref={tableRef}
					/>
				</CardBody>
			</Card>
		</>
	);
};

export default EditCodeListModal;
