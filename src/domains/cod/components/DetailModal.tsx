import { FC, useState, useEffect, useImperativeHandle, MouseEvent } from 'react';
import { FormGroup, Row, Label, Col, Input, Card, CardBody } from 'reactstrap';
import { ICodeCtgyPatch, ICodeCtgyRowData } from '@/domains/cod/types/components';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/cod/api/url';

export interface IDetailModalProps {
	rowData: ICodeCtgyRowData | object;
	isUpdate?: any;
}

const CodeCtgyDetailModal: FC<IDetailModalProps> = ({ rowData, isUpdate }) => {
	/* API */
	const { fetch: patchFetch } = useAPI<TUrl>(url.PATCH_CODE_CTGY);
	const { fetch: getFetch } = useAPI<TUrl>(url.GET_CODE_CTGY);

	/* 상세정보 항목 */
	const [codeId, setCodeId] = useState('');
	const [codeIdDc, setCodeIdDc] = useState('');
	const [codeIdNm, setCodeIdNm] = useState('');
	const [frstRegistPnttm, setFrstRegistPnttm] = useState('');
	const [frstRegisterId, setFrstRegisterId] = useState('');
	const [lastUpdusrId, setLastUpdusrId] = useState('');
	const [lastUpdtPnttm, setLastUpdtPnttm] = useState('');
	const [useAt, setUseAt] = useState('');

	const [codeInfoData, setCodeInfoData] = useState({}); // 최종 상세정보
	const [editMode, setEditMode] = useState(false); // 편집화면 구분 Flag
	const [isUpdateFlag, setIsUpdateFlag] = useState(false); //상세정보 수정유무(부모화면전달)

	//부모쪽에서 사용하려는 함수목록
	useImperativeHandle(isUpdate, () => ({
		updateCheckFunc,
	}));

	// 상세정보 수정유무
	const updateCheckFunc = () => {
		return isUpdateFlag;
	};

	// 버튼 클릭 이벤트 (processCd - U:수정, C:취소, E:편집화면전환)
	const editCodeCtgyInfo = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const processCd = e.currentTarget.value;

		if (processCd === 'U') {
			//추가 :: 기존데이터 비교해서 변경점있는지 확인하면 좋겠음

			// 상세정보 수정(patch) Api 호출
			$ui
				.confirm('변경된 내용으로 저장하시겠습니까?', { type: 'info', confirmButton: '확인', cancelButton: '취소' })
				.then((result: boolean) => {
					if (result) {
						const updateFetchOpt = { option: { method: 'patch', params: { codeId: codeId } } };
						const updateData: ICodeCtgyPatch = {
							codeIdDc: codeIdDc,
							codeIdNm: codeIdNm,
							useAt: useAt,
						};
						patchFetch(Object.assign(updateFetchOpt, updateData)).then((res: any) => {
							if (res.status === 200) {
								$ui.alert('수정 완료 되었습니다.').then(() => {
									getDetailInfoApi(codeId);
									setEditMode((current) => !current);
									if (isUpdate) {
										setIsUpdateFlag(true);
									}
								});
							}
						});
					}
				});
		} else if (processCd === 'C') {
			// 취소 버튼 클릭 시 최종 조회 결과값으로 되돌림
			$ui
				.confirm('취소하시면 변경한 내용이 저장되지 않습니다.<br/>취소하시고 뒤로 돌아가겠습니까?', {
					type: 'info',
					confirmButton: '확인',
					cancelButton: '취소',
				})
				.then((result: boolean) => {
					if (result) {
						setPageData(codeInfoData);
						setEditMode((current) => !current);
					}
				});
		} else if (processCd === 'E') {
			// 편집모드 toggle
			setEditMode((current) => !current);
		}
	};

	// 공통코드유형 정보 조회 API
	const getDetailInfoApi = (targetCodeId: string) => {
		getFetch({
			option: { method: 'get', params: { codeId: targetCodeId ? targetCodeId : codeId }, isSetParams: true },
		}).then((res: any) => {
			if (res.data.bdy.data.length > 0) {
				setCodeInfoData(res.data.bdy.data[0]); //최종정보 업데이트
				setPageData(res.data.bdy.data[0]);
			} else {
				$ui.alert('정보조회에 실패했습니다. <br/>잠시 후 다시 시도해주세요.');
			}
		});
	};

	// 상세정보 항목 세팅
	const setPageData = (data: any) => {
		if (data) {
			const d = data as ICodeCtgyRowData;
			setCodeId(d.codeId);
			setCodeIdDc(d.codeIdDc);
			setCodeIdNm(d.codeIdNm);
			setFrstRegisterId(d.frstRegisterId);
			setFrstRegistPnttm(d.frstRegistPnttm);
			setLastUpdusrId(d.lastUpdusrId);
			setLastUpdtPnttm(d.lastUpdtPnttm);
			setUseAt(d.useAt);
		}
	};

	useEffect(() => {
		if (rowData) {
			setCodeInfoData(rowData);
			setPageData(rowData);
		}
	}, []);

	return (
		<>
			<div className="card border-top mb-0">
				<div className="card-body pt-3 mb-0">
					<div className="d-flex align-items-end flex-column mb-2">
						<div className="button-group">
							<UI.Button
								onClick={editCodeCtgyInfo}
								color="info"
								hidden={editMode === true}
								value="E"
							>
								<UI.RFIcon
									icon="Edit"
									className="fill-white feather-sm mb-1 me-1"
								/>
								편집
							</UI.Button>
							<UI.Button
								onClick={editCodeCtgyInfo}
								color="success"
								hidden={editMode === false}
								value="U"
							>
								<UI.RFIcon
									icon="Check"
									className="fill-white feather-sm mb-1 me-1"
								/>
								수정완료
							</UI.Button>
							<UI.Button
								onClick={editCodeCtgyInfo}
								color="secondary"
								hidden={editMode === false}
								value="C"
							>
								<UI.RFIcon
									icon="ArrowLeft"
									className="fill-white feather-sm mb-1 me-1"
								/>
								취소
							</UI.Button>
						</div>
					</div>
					<Card
						color="secondary"
						className="border mb-0 "
						outline
					>
						<CardBody>
							<Col md="12">
								<Row>
									<Col sm="12">
										<FormGroup row>
											<Label
												sm="3"
												className="text-dark fw-bold"
											>
												공통코드유형 ID
											</Label>
											<Col>
												<Input
													name="codeIdDc"
													type="text"
													value={codeId}
													readOnly={true}
													disabled={editMode === true}
												/>
											</Col>
										</FormGroup>
										<hr style={{ color: '#9E9E9E' }} />
										<FormGroup row>
											<Label
												sm="3"
												className="text-dark fw-bold"
											>
												공통코드유형명
											</Label>
											<Col>
												<Input
													name="codeIdNm"
													type="text"
													value={codeIdNm}
													placeholder="코드유형에 대한 간략한 설명을 입력하세요."
													readOnly={editMode === false}
													onChange={(e) => {
														setCodeIdNm(e.target.value);
													}}
												/>
											</Col>
										</FormGroup>
										<hr style={{ color: '#9E9E9E' }} />
										<FormGroup row>
											<Label
												sm="3"
												className="text-dark fw-bold"
											>
												상태
											</Label>
											<Col>
												<Input
													type="text"
													value={useAt === 'Y' ? '사용중' : '미사용'}
													readOnly={true}
													hidden={editMode === true}
												></Input>
												<Input
													type="select"
													value={useAt}
													hidden={editMode === false}
													onChange={(e) => {
														setUseAt(e.target.value);
													}}
												>
													<option value="Y">사용중</option>
													<option value="N">미사용</option>
												</Input>
											</Col>
										</FormGroup>
									</Col>
									<hr style={{ color: '#9E9E9E' }} />
									<Col sm="6">
										<FormGroup row>
											<Label className="text-dark fw-bold">최초등록자</Label>
											<Col>
												<Input
													type="text"
													value={frstRegisterId}
													readOnly={true}
													disabled={editMode === true}
												/>
											</Col>
										</FormGroup>
										<FormGroup row>
											<Label className="text-dark fw-bold">최종수정자</Label>
											<Col>
												<Input
													type="text"
													value={lastUpdusrId}
													readOnly={true}
													disabled={editMode === true}
												/>
											</Col>
										</FormGroup>
									</Col>
									<Col sm="6">
										<FormGroup row>
											<Label className="text-dark fw-bold">최초등록일자</Label>
											<Col>
												<Input
													type="text"
													value={frstRegistPnttm}
													readOnly={true}
													disabled={editMode === true}
												/>
											</Col>
										</FormGroup>
										<FormGroup row>
											<Label className="text-dark fw-bold">최종수정일자</Label>
											<Col>
												<Input
													type="text"
													value={lastUpdtPnttm}
													readOnly={true}
													disabled={editMode === true}
												/>
											</Col>
										</FormGroup>
									</Col>
									<Col sm="12">
										<hr style={{ color: '#9E9E9E' }} />
										<FormGroup row>
											<Label className="text-dark fw-bold">설명</Label>
											<Col>
												<Input
													name="codeIdDc"
													type="textarea"
													value={codeIdDc}
													rows="4"
													placeholder="코드유형에 대한 간략한 설명을 입력하세요."
													readOnly={editMode === false}
													onChange={(e) => {
														setCodeIdDc(e.target.value);
													}}
												/>
											</Col>
										</FormGroup>
									</Col>
								</Row>
							</Col>
						</CardBody>
					</Card>
				</div>
			</div>
		</>
	);
};
export default CodeCtgyDetailModal;
