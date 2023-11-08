import { useState, useRef, useCallback, useEffect } from 'react';
import { ModalFooter, FormGroup, Row, Label, Col, Input, CardBody, Card } from 'reactstrap';
import { ICodeStatusList, ICodeCtgyRegist } from '@/domains/cod/types/components';
import { IForm } from '@/app/types/components';
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/cod/api/url';
const ModalComp = () => {
	/* ---- API  ---- */
	const { fetch: infoFetch } = useAPI<TUrl>(url.GET_CODE_STATUS);
	const { fetch: regFetch } = useAPI<TUrl>(url.POST_CODE_CTGY);

	/* ---- 코드등록현황  ---- */
	const [codeRegStatus, setCodeRegStatus] = useState([]);

	/* ---- form ---- */
	const formRef = useRef<IForm>(null);
	const [useAt, setUseAt] = useState('Y');
	const [codeId, setCodeId] = useState('');
	const [codeIdDc, setCodeIdDc] = useState('');
	const [codeIdNm, setCodeIdNm] = useState('');

	// 등록버튼 클릭 이벤트
	const onReg = () => {
		//추가 :: 유효성 검사
		//if (formRef.current) {
		//	formRef.current.validate();
		//}

		// 등록 API 호출
		const regFetchOpt = { option: { method: 'post' } };
		const regData: ICodeCtgyRegist = {
			codeId: codeId,
			codeIdDc: codeIdDc,
			codeIdNm: codeIdNm,
			useAt: useAt,
			userId: '',
		};
		regFetch(Object.assign(regFetchOpt, regData)).then((res: any) => {
			if (res.status === 200) {
				$ui.alert('등록 완료 되었습니다.').then(() => {
					//부모창에 'reload'값 전달하여 화면 reload
					$ui.dialog({ close: 'reload' });
				});
			}
		});
	};

	// 취소버튼 클릭 이벤트
	const onCancel = useCallback(() => {
		$ui.dialog({ close: true });
	}, []);

	// 코드등록유형ID - selectBox onChange 이벤트
	const changeCodId = (event: any) => {
		if (event.target.value === '') {
			setCodeId('');
		} else {
			setCodeId(event.target.value);
		}
	};

	// 코드등록현황 조회 API 호출 - selectBox Option 목록
	const callCodeStatusApi = () => {
		infoFetch({ option: { method: 'get' } }).then((res: any) => {
			if (res.data.bdy.data) {
				setCodeRegStatus(res.data.bdy.data);
			}
		});
	};

	useEffect(() => {
		callCodeStatusApi();
	}, []);

	return (
		<>
			<div className="row">
				<div className="col-12">
					<Card
						color="secondary"
						className="border mb-0 "
						outline
					>
						<div className="border-bottom title-part-padding">
							<h4 className="card-title">공통코드유형 등록</h4>
						</div>
						<CardBody>
							<UI.Form ref={formRef}>
								<FormGroup row>
									<Label sm="2">코드유형ID</Label>
									<Col sm="10">
										<Row>
											<Col md="4">
												<Input
													type="select"
													name="Select Category"
													onChange={changeCodId}
												>
													<option value="">직접입력</option>
													{codeRegStatus.map((item: ICodeStatusList, index) => (
														<option
															key={index}
															value={item.codeCtgy + item.nextSeq}
														>
															{item.codeCtgy}
														</option>
													))}
												</Input>
											</Col>
											<Col md="8">
												<UI.InputField
													name="codeId"
													type="text"
													value={codeId}
													placeholder="코드유형 ID 입력"
													errorMessage="필수 입력 사항입니다."
													required
													onChange={(e) => {
														setCodeId(e.target.value);
													}}
												/>
											</Col>
										</Row>
									</Col>
								</FormGroup>
								<hr style={{ color: '#9E9E9E' }} />
								<FormGroup row>
									<Label
										sm="2"
										for="iptCodeCtgyName"
									>
										이름
									</Label>
									<Col sm="10">
										<UI.InputField
											name="codeIdNm"
											id="iptCodeCtgyName"
											type="text"
											value={codeIdNm}
											placeholder="코드유형명을 입력하세요."
											errorMessage="필수 입력 사항입니다."
											required
											onChange={(e) => {
												setCodeIdNm(e.target.value);
											}}
										/>
									</Col>
								</FormGroup>
								<hr style={{ color: '#9E9E9E' }} />
								<FormGroup row>
									<Label sm="2">설명</Label>
									<Col sm="10">
										<Input
											name="codeIdDc"
											type="textarea"
											value={codeIdDc}
											rows="5"
											placeholder="코드유형에 대한 간략한 설명을 입력하세요."
											onChange={(e) => {
												setCodeIdDc(e.target.value);
											}}
										/>
									</Col>
								</FormGroup>
								<hr style={{ color: '#9E9E9E' }} />
								<FormGroup row>
									<Label
										sm="2"
										for="iptUseAt"
									>
										사용여부
									</Label>
									<Col
										sm="10"
										style={{ display: 'flex', alignItems: 'center' }}
									>
										<FormGroup>
											<UI.Switch
												onlabel="사용"
												offlabel="미사용"
												onstyle="info"
												width={90}
												checked={useAt === 'Y' ? true : false}
												onChange={() => {
													setUseAt(useAt === 'Y' ? 'N' : 'Y');
												}}
											/>
										</FormGroup>
									</Col>
								</FormGroup>
							</UI.Form>
						</CardBody>
					</Card>
				</div>
			</div>
			<ModalFooter>
				<UI.Button
					color="success"
					onClick={onReg}
				>
					<UI.RFIcon
						icon="Check"
						className="fill-white feather-sm mb-1 me-1"
					/>
					등록
				</UI.Button>
				<UI.Button
					color="secondary"
					onClick={onCancel}
				>
					<UI.RFIcon
						icon="ArrowLeft"
						className="fill-white feather-sm mb-1 me-1"
					/>
					취소
				</UI.Button>
			</ModalFooter>
		</>
	);
};

export default ModalComp;
