import { useRef, useEffect, useState, MouseEvent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ICodeCtgyRowData } from '@/domains/cod/types/components';
import DataTable from 'datatables.net-bs5';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/cod/api/url';
import loadable from '@loadable/component';

const RegCodeCtgyModal = loadable(() => import('@/domains/cod/components/RegCodeCtgyModal'));
const EditCodeListModal = loadable(() => import('@/domains/cod/components/EditCodeListModal'));
const CodeCtgyDetailModal = loadable(() => import('@/domains/cod/components/DetailModal'));

const CodeList = () => {
	useEffect(() => {
		callGetApi(); // 조회 API 호출 (화면 테이블 생성)
	}, []);

	/* ---- Offcanvas ---- */
	const [offcanvasShow, setOffcanvasShow] = useState(false); // 오프캔버스 on/off
	const [closeCheckFnName, setCloseCheckFnName] = useState(''); // 오프캔버스 닫을때 실행할 자식의 함수명
	const offcanvasHandleRef = useRef<any>();
	const options = { scroll: false }; // 오프캔버스 옵션

	// 오프캔버스 열기 함수
	const handleShow = () => setOffcanvasShow(true);

	// 오프캔버스 onCallback함수 - 자식에서 부모에게 data(함수명) 전달
	const offcanvasOnCallback = (funcName: string) => {
		console.log('RUNNING ...............  offcanvasOnCallback');
		setCloseCheckFnName(funcName);
	};

	// 오프캔버스 off 시 [onHide]
	const offcanvasHandleClose = () => {
		console.log('RUNNING ...............  offcanvasHandleClose');
		// 자식의 닫기전 확인함수 실행하여 결과받아 처리
		if (offcanvasHandleRef.current[closeCheckFnName]()) {
			$ui
				.confirm('편집 중인 항목이 존재합니다.' + '<br />저장하지 않고 나가시겠습니까?', {
					type: 'error',
					confirmButton: '확인',
					cancelButton: '취소',
				})
				.then((result: boolean) => {
					if (result) {
						setOffcanvasShow(false);
					}
				});
		} else {
			setOffcanvasShow(false); // 이상없음 오프캔버스 닫기
		}
	};

	/* ---- DataTable ---- */
	const tableRef = useRef(null); // 테이블 Ref(DOM)
	const isOpenCell = useRef(true); // 테이블 열 클릭 시 오프캔버스 toggle Flag  (관리컬럼의 버튼 클릭 시에는 오프캔버스 toggle 실행안함)
	const [clickData, setClickData] = useState<ICodeCtgyRowData | null>(null); // 클릭한 열 데이터

	/* ---- API  ---- */
	//API 연결
	const { fetch: getFetch } = useAPI<TUrl>(url.GET_ALL_CODE_CTGY);
	const { fetch: delFetch } = useAPI<TUrl>(url.DEL_CODE_CTGY);

	// 공통코드유형 목록 조회 API
	const callGetApi = () => {
		console.log('RUNNING ...............  callGetApi');
		getFetch({ option: { method: 'get' } }).then((res: any) => {
			if (res) {
				const codeList = res.data.bdy.list;
				// 조회결과로 DataTable 생성 (결과값이 없을경우 [] 빈배열로 들어온다)
				if (tableRef.current) {
					const dTable = new DataTable(tableRef.current, {
						destroy: true,
						autoWidth: false,
						searching: true,
						ordering: true,
						info: true,
						paging: true,
						pageLength: 20,
						lengthMenu: [20, 50, 100, 150, 200],
						data: codeList,
						//select: 'single', // 1개만 select
						select: {
							items: 'cell',
							style: 'single',
						},
						columns: [
							{ data: 'codeId', title: '유형 ID' },
							{ data: 'codeIdNm', title: '이름' },
							{ data: 'codeIdDc', title: '설명' },
							{
								data: 'useAt',
								title: '상태',
								orderable: false,
								render: (data, type) => {
									if (type == 'display') {
										if (data == 'Y') {
											data = '사용중';
										} else {
											data = '미사용';
										}
									}
									return data;
								},
							},
							{
								title: '관리',
								orderable: false,
								createdCell: (td, _cellData, rowData, row, _col) => {
									return $util.renderReactDOM(
										td as Element,
										<>
											<Dropdown>
												<Dropdown.Toggle
													split
													variant="info"
													size="sm"
													id="dropdown-split-basic"
												/>
												<Dropdown.Menu>
													<Dropdown.Header className="pt-0 pb-0 text-dark">
														<strong>{rowData.codeId}</strong>
													</Dropdown.Header>
													<Dropdown.Divider />
													<Dropdown.Item
														as="button"
														onClick={(e: MouseEvent<HTMLButtonElement>) => openDetailModal(e, rowData)}
														className="pt-1 pb-1 text-dark"
													>
														<UI.RFIcon
															icon="Edit"
															className="fill-white feather-sm mb-1 me-1"
														/>
														상세보기
													</Dropdown.Item>
													<Dropdown.Item
														as="button"
														id={'test' + row}
														onClick={deleteModal}
														className="pt-1 pb-1 text-danger"
														value={rowData.codeId}
													>
														<UI.RFIcon
															icon="Trash2"
															className="fill-white feather-sm mb-1 me-1"
														/>
														삭제
													</Dropdown.Item>
													{/*<Dropdown.Item
														as="button"
														onClick={handleShow}
														className="pt-1 pb-1 text-primary"
													>
														<UI.RFIcon
															icon="List"
															className="fill-white feather-sm mb-1 me-1"
														/>
														리스트
													</Dropdown.Item>*/}
												</Dropdown.Menu>
											</Dropdown>
										</>,
									);
								},
							},
						],
						columnDefs: [
							{ targets: 0, width: '10%', className: 'dt-center click-cell' },
							{ targets: 1, width: '25%', className: 'dt-head-center dt-body-left click-cell' },
							{ targets: 2, width: '45%', className: 'dt-head-center dt-body-left click-cell' },
							{ targets: 3, width: '10%', className: 'dt-center click-cell' },
							{ targets: 4, width: '10%', className: 'dt-center no-canvas' },
							{ targets: '_all', defaultContent: '-' },
						],

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

					// 데이터 테이블 - 셀렉트 이벤트
					dTable.off('select').on('select', (e: any, dt, type, indexes) => {
						e.preventDefault();
						// 1. 첫클릭시 'cell' 클릭으로 offCanvas 사용여부 확인 및 row select 처리
						if (type == 'cell') {
							isOpenCell.current = dt.cell({ selected: true }).node().classList.contains('no-canvas') ? false : true;
							dt.cell({ selected: true }).deselect();
							const rowIdx = indexes[0].row;
							dt.row(rowIdx).select();
						} else if (type === 'row' && isOpenCell.current) {
							// 2. row select, offcanvas 사용일 경우 데이터 전달 및 오픈
							const selectData = dt.row(indexes).data();
							if (selectData) {
								setClickData(selectData);
							}
							handleShow(); // Offcanvas 오픈
						}
					});
				}
			}
		});
	};

	// 공통코드유형 삭제 API
	const callDelApi = (codeId: string) => {
		console.log('RUNNING ...............  callDelApi');
		if (codeId) {
			delFetch({ option: { method: 'delete', params: { codeId: codeId } } }).then((res: any) => {
				if (res.data.hdr.rsCd === 'SUCCESS') {
					$ui.alert('삭제 완료 되었습니다.').then(() => {
						callGetApi(); // 삭제 후 데이터테이블 재생성
					});
				}
			});
		}
	};

	/* ---- Modal  ---- */
	// 공통코드유형 등록 모달 (등록버튼)
	const openRegModal = () => {
		console.log('RUNNING ...............  openRegModal');
		$ui
			.dialog({
				title: '코드유형 등록',
				element: <RegCodeCtgyModal />,
				dialogSize: 'lg',
				keyboard: false,
				backdrop: 'static',
			})
			.then((isReload) => {
				// 등록처리 시 Flag 받아 테이블 재생성
				if (isReload === 'reload') {
					callGetApi();
				}
			});
	};

	// 상세정보 모달 닫을 때 화면 리로드 여부 처리
	const detailHandleRef = useRef<any>();
	const detailModalOnHide = () => {
		console.log('RUNNING ...............  detailModalOnHide');
		// 상세정보 수정 후 화면 진입시 리로드
		if (detailHandleRef.current.updateCheckFunc()) {
			callGetApi();
		}
	};

	// 공통코드유형 상세정보 모달 (관리컬럼_상세보기)
	const openDetailModal = (e: MouseEvent<HTMLButtonElement>, rowData: ICodeCtgyRowData) => {
		console.log('RUNNING ...............  openDetailModal');
		e.preventDefault();
		$ui.dialog({
			title: '코드유형 상세',
			element: (
				<CodeCtgyDetailModal
					rowData={rowData}
					isUpdate={detailHandleRef}
				/>
			),
			dialogSize: 'lg',
			keyboard: false,
			backdrop: 'static',
			onHide: detailModalOnHide,
		});
	};

	// 공통코드유형 삭제 모달 (관리컬럼_삭제)
	const deleteModal = (e: MouseEvent<HTMLButtonElement>) => {
		console.log('RUNNING ...............  deleteModal');
		e.preventDefault();
		const targetValue = e.currentTarget.value;
		$ui
			.confirm(
				'해당 공통코드유형을 삭제하시겠습니까?' +
					'<br />코드유형 삭제 시 포함된 <strong>하위코드도 모두 삭제</strong>됩니다.' +
					'<br />(공통코드유형: <strong>' +
					targetValue +
					'</strong>)',
				{
					type: 'error',
					confirmButton: '삭제',
					cancelButton: '취소',
				},
			)
			.then((result: boolean) => {
				if (result) {
					//callDelApi(e.currentTarget.value); // 삭제 API 호출
					callDelApi(targetValue); // 삭제 API 호출
				}
			});
	};

	return (
		<>
			<div
				className="d-flex
              border-bottom
              title-part-padding
              px-0
              mb-3
              align-items-center"
			>
				<div>
					<h4 className="mb-0">공통코드유형 및 공통코드 관리 화면</h4>
				</div>
				<div className="ms-auto flex-shrink-0">
					<UI.Button
						onClick={openRegModal}
						color="primary"
					>
						<UI.RFIcon
							icon="Plus"
							className="fill-white feather-sm mb-1 me-1"
						/>
						등록
					</UI.Button>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">
								<UI.RFIcon
									icon="Code"
									className="fill-white feather-sm mb-1 me-1"
								/>
								공통코드유형 목록
							</h4>
						</div>
						<div className="card-body">
							<table
								className="table table-hover table-bordered align-middle g-table-custom-sm"
								style={{ width: '100%' }}
								ref={tableRef}
							/>
						</div>
					</div>
				</div>
			</div>
			<UI.Offcanvas
				show={offcanvasShow}
				onHide={offcanvasHandleClose}
				title="공통코드 목록"
				closeButton
				{...options}
				style={{ height: 'auto', background: '#f2f7f8' }}
			>
				<EditCodeListModal
					clickData={clickData as ICodeCtgyRowData}
					onCallback={offcanvasOnCallback}
					KeyRef={offcanvasHandleRef}
				/>
			</UI.Offcanvas>
		</>
	);
};

export default CodeList;
