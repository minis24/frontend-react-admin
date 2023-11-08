
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card, CardBody, Badge, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { useAPI } from "@/app/store";
import url, { TUrl } from '@/domains/mnu/api/url';
import { IMenuInfoFetchData } from "@/domains/mnu/api/GET_menuInfo";
// Datetime picker plugin file
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from 'styled-components';

import CustomInput from '@/domains/mnu/components/CustomInput'

export interface ISetMenuIdHandle{
	setMenuId: () => void;
}

interface IProps {
	menuId: string;
}



//alert 제목 (일반)
const TITLE: string = '알림확인';
//alert 제목 (오류)
const TITLE_ERROR: string = '오류확인';









//React.ForwardRefExoticComponent<IMnuInfoProps,React.>
//const MnuInfo: React.FC<IMnuInfoProps> = (props) => {
const MnuInfo = forwardRef<ISetMenuIdHandle,IProps>((props, ref) =>{
	console.log('----------------------------------------------------');
	console.log('MnuInfo 컴포넌트 렌더링 START');
	console.log('----------------------------------------------------');




	//console.log('props.menuId', props.menuId);

	const menuId = props.menuId;

	//--------------------------------------------------------------
	// 인풋의 상태 처리를 위한 토글 값 (disable ,readOnlt 설정에 사용)
	//--------------------------------------------------------------
	//요청URL readOnly,disabled 처리값 
	const [isRequestState, setIsRequestState] = useState(true);
	//메뉴상세설명 readOnly,disabled 처리값 
	const [isMenuDcState, setIsMenuDcState] = useState(true);
	//메뉴상태 readOnly,disabled 처리값 
	const [isStatusState, setIstatusState] = useState(true);

	//서비스시작일시 readOnly,disabled 처리값 
	const [isStartDateState, setIsStartDateState] = useState(true);
	//서비스종료일시 readOnly,disabled 처리값 
	const [isEndDateState, setIsEndDateState] = useState(true);


	//--------------------------------------------------------------
	//메뉴 기본정보 input값 (변경 불가)
	//--------------------------------------------------------------
	//메뉴아이디
	const [menuIdState, setMenuIdState] = useState('');  
	//메뉴명 
	const [menuNmState, setMenuNmState] = useState('');
	//메뉴타입명
	const [menuTypeNmState, setMenuTypeNmState] = useState('');
	//메뉴타입 
	const [menuTypeState, setMenuTypeState] = useState('');
	//상위메뉴아이디 
	const [upperMenuIdState, setUpperMenuIdState] = useState('');


	//요청URL 참조 값 
	const tobeRequestUrlRef = useRef('');
	const asisRequestUrlRef = useRef('');
	//const resourceNameInputRef = useRef<HTMLInputElement>(null);
	
	//--------------------------------------------------------------
	// 메뉴 기본정보 input값 (변경 가능)
	//--------------------------------------------------------------
	//메뉴상세설명
	const [menuDcState, setMenuDcState] = useState('');
	//요청URL의 resourceName 값 (requestUrl 의 마지막 부분 (스프링부트 메서드의 request매핑값))
	const [resourceNameState, setResourceNameState] = useState('');
	//요청URL 의 부모노드의 요청 URL 값 
	const [parentRequestUrlState, setParentRequestUrlState] = useState('');
	//메뉴의 상태코드 값 
	const [statusState, setStatusState] = useState('');



	//--------------------------------------------------------------
	// 부모노드에서 호출하는 함수처리 (ForwardRef 처리에 필요한 설정)
	//--------------------------------------------------------------
	// 부모 컴포넌트에서 사용할 수 있는 함수들을 내부에 표기
	useImperativeHandle(ref, () => (
		{
			setMenuId
		})
	);



	const setMenuId = () => {
		setMenuIdState(menuId);
	}



	//--------------------------------------------------------------
	// API 호출 
	//--------------------------------------------------------------
	//메뉴상세 정보 조회 
	const { fetch: menuInfoFetch } = useAPI<TUrl>(url.GET_menuInfo);
	const { fetch: updateFetch } = useAPI<TUrl>(url.PATCH_menuInfo);




	//메뉴 상세정보 조회 Fetch 결과 처리
	useEffect(()=>{ 
		const fetchData = async ()=> {

			//메뉴아이디가 있을때만 조회함.
			if(!menuIdState){
				return ;
			}

			//Input 초기화 : 
			tobeRequestUrlRef.current = '';
			setIsRequestState(true); //readonly,disabled 


			try {
				const menuInfoData: IMenuInfoFetchData = await menuInfoFetch({menuId:menuIdState, option: { method: 'get' } })
				
				//--------------------------------------------------------------
				// Fetch 결과 Object 설정 (menuInfo = menuInfoData.data.bdy.data)
				//--------------------------------------------------------------
				let menuInfo = menuInfoData.data.bdy.data;

				
				setMenuNmState(menuInfo.menuNm);//메뉴이름 설정		
				setMenuTypeState(menuInfo.menuType);//메뉴타입 설정
				setMenuTypeNmState(menuInfo.menuTypeNm);//메뉴타입이름 설정
				setMenuDcState(menuInfo.menuDc);//메뉴설명 설정
				setStatusState(menuInfo.status);//메뉴상태 설정 
				setUpperMenuIdState(menuInfo.upperMenuId.trim());//메뉴상태 설정 

				
				asisRequestUrlRef.current = menuInfo.requestUrl;//기존 요청 URL 설정
				//requestUrlRef.current = menuInfo.requestUrl;//변경할 요청 URL 설정
				let slashIndex = asisRequestUrlRef.current.lastIndexOf('/');
				let resourceName = asisRequestUrlRef.current.substring(slashIndex+1);


				setResourceNameState(resourceName)



			} catch (error) {
				console.log('----------------------------------------------------');
				console.log('메뉴상세정보 조회 Fetch 호출 오류 !!', error);
				console.log('----------------------------------------------------');
				let sMsg = `<h4>${error}!</h4>`;
				$ui.alert(sMsg, { title: TITLE });
			}
		}
		
		fetchData();


	}, [menuIdState]);
	









	//상위메뉴 아이디 변경시 처리 
	useEffect(() => {
		const fetchData = async () => {
			//상위메뉴아이디가 있을때만 조회함.
			if (!upperMenuIdState) {
				setParentRequestUrlState('/');
				return;
			}

			const fetchData: IMenuInfoFetchData = await menuInfoFetch({ menuId: upperMenuIdState, option: { method: 'get' } })
			let uppperMenuInfo = fetchData.data.bdy.data;

			setParentRequestUrlState(uppperMenuInfo.requestUrl + '/');
		}

		fetchData();

	}, [upperMenuIdState]);
	



	//상위메뉴 아이디 변경시 처리 
	useEffect(() => {
		const fetchData = async () => {
			//상위메뉴아이디가 있을때만 조회함.
			if (!parentRequestUrlState) {
				return;
			}

			//requestUrlRef.current = parentRequestUrlState + resourceNameState;
		}

		fetchData();

	}, [parentRequestUrlState]);



	//ResourceName 변경시 처리 
	useEffect(() => {
		const fetchData = async () => {
		

			//상위메뉴아이디가 있을때만 조회함.
			if (!resourceNameState) {
				return;
			}
		}

		fetchData();

	}, [resourceNameState]);





	
	useEffect(() => {
		//tobeRequestUrlRef.current ='';
	},[]);





	//================================================================================
	//이벤트 핸들러
	//================================================================================
	// 요청URL값 Input(type:text) OnChange 이벤트 핸들러
	const handlerResourceNameInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
		setResourceNameState(event.target.value);
		tobeRequestUrlRef.current = parentRequestUrlState + event.target.value;
	}


	// 메뉴상태값 Input(type:select) OnChange 이벤트 핸들러
	const handlerStatusInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		setStatusState(value);
	}

	//수정가능한 상태로 Input 변경 (readOnly,disabled)
	const handlerClickModeBtn = (btnIndex: number, event:React.MouseEvent) => {
		event.preventDefault();
		switch (btnIndex)  {
			case 1: setIsRequestState(!isRequestState);break;
			case 2: setIstatusState(!isStatusState);break ;
			case 3: setIsStartDateState(!isStartDateState);break;
			case 4: setIsEndDateState(!isEndDateState);break;
			default : break;
		}		
	}


	//업데이트 커밋 버튼 핸들러
	const handlerClickCommitBtn = (btnIndex: number, event: React.MouseEvent) => {
		event.preventDefault();

		if (checkUpdateAction(btnIndex)){
			updateAction(btnIndex);
		}
		
	}
	

	// Input 이 수정 모드인지 확인 
	const checkUpdateAction = (btnIndex: number): boolean=> {
		try{
			switch (btnIndex) {
				case 1:
					if (isRequestState) {
						let sMsg = `<h4>필드가 변경상태 아님!</h4>`;
						$ui.alert(sMsg, { title: TITLE });
						return false;
					};
					return true;
				case 2:
					if (isStatusState) {
						let sMsg = `<h4>필드가 변경상태 아님!</h4>`;
						$ui.alert(sMsg, { title: TITLE });
						return false
					};
					return true;
				case 3:
					if (isStartDateState) {
						let sMsg = `<h4>필드가 변경상태 아님!</h4>`;
						$ui.alert(sMsg, { title: TITLE });
						return false
					};
					return true;
				case 4:
					if (isEndDateState) {
						let sMsg = `<h4>필드가 변경상태 아님!</h4>`;
						$ui.alert(sMsg, { title: TITLE });
						return false
					};
					return true;
				default: 
					let sMsg = `<h4>설정을 확인하세요 (BTN_MODE)!</h4>`;
					$ui.alert(sMsg, { title: TITLE });
					return false
			}

		}catch(error){
			let sMsg = `<h4>${error}</h4>`;
			$ui.alert(sMsg, { title: TITLE });
			return false
	
		}
	
	};


	interface IFetchUpdateMenuInfo {
		menuId: string;
		requestUrl?: string;
		status?: string;
		startDate?: string;
		endDate?: string;
	}
	const patchOption = { option: { method: 'patch' } };





	//항목 업데이트 처리
	const updateAction = async (btnIndex: number) => {

	//--------------------------------------------------------------
	// 파라미터 설정 [요청URL 수정 , 메뉴상태 수정]
	//--------------------------------------------------------------
		let jsonData: IFetchUpdateMenuInfo = { menuId: menuIdState };

		switch (btnIndex) {
			case 1: jsonData.requestUrl = tobeRequestUrlRef.current;
				break;
			case 2: jsonData.status = statusState;
				break;
			case 3: jsonData.startDate = startDateState.toString();
				break;
			case 4: jsonData.endDate = endDateState.toString();
				break;
			default : 
				let sMsg = `<h4>업데이트할 항목을 바르게 설정하세요.</h4>`;
				await $ui.alert(sMsg, { title: TITLE });
				break;
		}


		
	//--------------------------------------------------------------
	// API 호출 실행.
	//--------------------------------------------------------------
		try{
			const updateRstData = await updateFetch(Object.assign(patchOption, jsonData));

			console.log('updateRstData', updateRstData);
			let sMsg = `<h4>변경 완료!</h4>`;
			await $ui.alert(sMsg, { title: TITLE });


		}catch(error){
			let sMsg = `<h4>${error}</h4>`;
			await $ui.alert(sMsg, { title: TITLE });

		} finally {
			switch (btnIndex) {
				case 1: setIsRequestState(true);
					break;
				case 2: setIstatusState(true);
					break;
				default: break;
			}


			asisRequestUrlRef.current = tobeRequestUrlRef.current;
			tobeRequestUrlRef.current = '';
			
			
		}
	};

	const handlerOnChangeStartDateState = (index: number, date: Date) => {
		console.log('date:', date)
		console.log('date:', date.toLocaleString())
		console.log('date:', date.toDateString())
		console.log('date:', date.toLocaleString())
		console.log('date:', date.toTimeString())
		console.log('date:', date.toUTCString())
		console.log('date:', date.toISOString())
		console.log('date:', date.getFullYear())
		setStartDateState(date);
		setStartDateState(new Date(date.getFullYear()+''));
	}


	const handlerOnChangeEndDateState = (index: number, date: Date) => {
		console.log('date:', date.toLocaleString())
		console.log('date:', date.toDateString())
		setEndDateState(date);
	}

/**
 * DatePicker 설정
 */
	const [startDateState, setStartDateState] = useState(new Date());
	const [endDateState, setEndDateState] = useState(new Date());
	const CustomInput = forwardRef((props: any, ref) => {
		return <Input {...props} ref={ref} />;
	});
	const datePickerStyle = {
		width:'320px'
	}








	return (
		<>
		<div className="card">
			<div className="card-header">
				<span style={{ fontWeight: 700 }}>메뉴 기본정보</span> 
			</div>
			<div className="card-body" style={{ minHeight: '700px' }}>
				{/* ---------------------------------------------- */}
				{/* 메뉴트리에서 선택한 고정된 메뉴정보 표시  */}
				{/* 메뉴아이디, 메뉴이름, 메뉴타입  */}
				{/* ---------------------------------------------- */}	
				<Card
					color="secondary"
					className="border mb-0 "
					outline
				>
					<CardBody>
						<div className="mb-3">
							<UI.Icon
								icon="CheckCircleFill"
								color="orange"
								size={15}
							/>
							<label className='text-info ms-2 fw-bold'>메뉴 설명 </label>
						</div>
							
						<table className="table table-bordered g-table-custom-sm ">
							<colgroup>
								<col width="35%" />
								<col width="35%" />
								<col width="*" />
							</colgroup>
							<thead>
								<tr>
									<th className="text-center" style={{ backgroundColor: '#b0bfd2'}}><span className='fw-normal' style={{color:'white'}}>메뉴아이디</span></th>
									<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}><span className='fw-normal' style={{ color: 'white' }}>메뉴명</span></th>
									<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}><span className='fw-normal' style={{ color: 'white' }}>메뉴타입</span></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-center">
										<span className='text-dark fw-normal'>{menuIdState}</span>
										<Badge
											color={'info'}
											className="me-3 ms-1"
										>
											{'사용중'}
										</Badge>
									</td>
									<td className="text-center">
										<span className='text-dark fw-normal'>{menuNmState}</span>
									</td>
									<td className="text-center">
										<span className='text-dark fw-normal'>[{menuTypeState}]</span>
										<span className='text-dark fw-normal ms-2'>{menuTypeNmState}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</CardBody>
				</Card>
				<Card
					color="secondary"
					className="border mb-0 mt-1"
					outline
				> 
					<CardBody>
						
							{/* ---------------------------------------------- */}
							{/* 요청URL */}
							{/* ---------------------------------------------- */}
							<div className='mb-0' >
								<UI.Icon
									icon="CheckCircleFill"
									color="orange"
									size={15}
								/>
								<label className='text-info ms-2 fw-bold'>요청 URL </label>
								<InputGroup>
									<InputGroupText>
											{parentRequestUrlState}
									</InputGroupText>
									<Input type="text" 
										//ref={resourceNameInputRef}
										value={resourceNameState}
										onChange={handlerResourceNameInputChange}
										readOnly={isRequestState}
										disabled={isRequestState}
									/>
									<Button color="outline-secondary"
											onClick={(event) => { handlerClickModeBtn(1, event) }}
									>
										<UI.Icon
											icon="Pencil"
											color="dark"
											size={15}
											/>
									</Button>
										
									<Button color="outline-secondary"
											onClick={(event) => { handlerClickCommitBtn(1, event) }}
									>변경</Button>
								</InputGroup>
								
								<div style={{ textAlign: 'right' }}>
										AsIs : [
											<span className={'text-dark ms-3 me-3 fw-bold'} style={{}}>  {asisRequestUrlRef.current}</span> 
										] , 
										ToBe : [
										<span className={'text-dark ms-3 me-3 fw-bold'} style={{}}>  {tobeRequestUrlRef.current}</span>
										]
								</div>
							
							</div>
							{/* ---------------------------------------------- */}
							{/* 메뉴설명 */}
							{/* ---------------------------------------------- */}
							<div className="mb-3">
								<UI.Icon
									icon="CheckCircleFill"
									color="orange"
									size={15}
								/>
							<label className='text-info ms-2 fw-bold'>메뉴 설명 </label>
								<InputGroup>
									{/* <Editor
									wrapperClassName="demo-wrapper mb-0"
									editorClassName="demo-editor border mb-4 edi-height"
									onContentStateChange={setMenuDcState}
								/> */}
									<Input type="textarea" raw={4}
										value={JSON.stringify(menuDcState, null, 4)}
										readOnly={isMenuDcState}
										disabled={isMenuDcState}
									/>
								</InputGroup>
							</div>	
							{/* ---------------------------------------------- */}
							{/* 서비스 설정 */}
							{/* ---------------------------------------------- */}
							<div className="mb-3">
								<UI.Icon
									icon="CheckCircleFill"
									color="orange"
									size={15}
								/>
								<span className='text-info ms-2 fw-bold'>서비스 설정 </span>
								<table className="table table-bordered g-table-custom-sm ">
									<colgroup>
										<col width="35%" />
										<col width="35%" />
										<col width="*" />
									</colgroup>
									<thead>
										<tr>
											<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}>	
												<span className='ms-2 fw-bold' style={{ color: 'white' }}>화면에 노출 여부 </span>
											</th>
											<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}>
												<span className='ms-2 fw-bold' style={{ color: 'white' }}>서비스 사용 여부</span>
											</th>
											<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}>	
												<span className='ms-2 fw-bold' style={{ color: 'white' }}>상태</span>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{/* ---------------------------------------------- */}
											{/* 화면에 노출여부 */}
											{/* ---------------------------------------------- */}
											<td className="text-center">
												<UI.Switch
													onlabel={'표시'}
													offlabel="미표시"
													onstyle="info"
													width={120}
													checked={true}
													onChange={() => {
														//setUseAt(useAt === 'Y' ? 'N' : 'Y');
													}}
												></UI.Switch>
											</td>

											{/* ---------------------------------------------- */}
											{/* 서비스 사용여부 */}
											{/* ---------------------------------------------- */}
											<td className="text-center">
												<UI.Switch
													onlabel={'사용'}
													offlabel={'미사용'}
													onstyle="info"
													width={120}
													checked={true}
													onChange={() => {
														//setUseAt(useAt === 'Y' ? 'N' : 'Y');
													}}
												></UI.Switch>
											</td>
											<td className="text-center">
												<InputGroup>
													<Input type="select"
														className="custom-select"
														value={statusState}
														disabled={isStatusState}
														readOnly={isStatusState}
														onChange={handlerStatusInputChange}
													>
														<option value={'01'}>정상</option>
														<option value={'02'}>상태1</option>
														<option value={'03'}>상태2</option>
													</Input>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickModeBtn(2, event) }}
														style={{ zIndex: '1000' }}
													>
														<UI.Icon
															icon="Pencil"
															color="dark"
															size={15}
															style={{ zIndex: '100' }}
														/>
													</Button>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickCommitBtn(2, event) }}
													>변경</Button>
												</InputGroup>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="mb-3" >
								<UI.Icon
									icon="CheckCircleFill"
									color="orange"
									size={15}
								/>
								<span className='text-info ms-2 fw-bold'>서비스 시작/종료 </span>
								<table className="table table-bordered g-table-custom-sm ">
									<colgroup>
										<col width="50%" />
										<col width="50%" />
									</colgroup>
									<thead>
										<tr>
											<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}>
												<span className='ms-2 fw-bold' style={{ color: 'white' }}>서비스 시작일시 </span>
											</th>
											<th className="text-center" style={{ backgroundColor: '#b0bfd2' }}>
												<span className='ms-2 fw-bold' style={{ color: 'white' }}>서비스 종료일시 </span>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="text-center" >
												{/* ---------------------------------------------- */}
												{/* 서비스 시작 일시 */}
												{/* ---------------------------------------------- */}
												<InputGroup>
													<DatePicker
														customInput={<CustomInput style={datePickerStyle}/>}
														disabled={isStartDateState}
														readOnly={isStartDateState}
														locale={ko}
														dateFormat="yyyy-MM-dd HH:mm"
														closeOnScroll={true}
														//isClearable
														selected={startDateState}
														//showTimeSelect
														//timeIntervals={30}
														//timeFormat="p"
														//showMonthDropdown
														onChange={(date: Date) => { handlerOnChangeStartDateState(1, date) }}
														placeholderText="I have been cleared!"
													/>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickModeBtn(3, event) }}
													>
														<UI.Icon
															icon="Calendar"
															color="dark"
															size={15}
														/>
													</Button>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickCommitBtn(3, event) }}
													>변경</Button>
												</InputGroup>
												
											</td>
											<td className="text-center">
												{/* ---------------------------------------------- */}
												{/* 서비스 종료 일시 */}
												{/* ---------------------------------------------- */}
												<InputGroup>
													<DatePicker
														customInput={<CustomInput style={datePickerStyle} />}
														disabled={isEndDateState}
														readOnly={isEndDateState}
														locale={ko}
														dateFormat="yyyy-MM-dd HH:mm"
														closeOnScroll={true}
														//isClearable
														selected={endDateState}
														//showTimeSelect
														//timeIntervals={30}
														//timeFormat="p"
														//showMonthDropdown
														onChange={(date: Date) => { handlerOnChangeEndDateState(1, date) }}
														placeholderText="I have been cleared!"
													/>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickModeBtn(4, event) }}
													>
														<UI.Icon
															icon="Calendar"
															color="dark"
															size={15}
														/>
													</Button>
													<Button color="outline-secondary"
														onClick={(event) => { handlerClickCommitBtn(4,event) }}
													>변경</Button>
												</InputGroup>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</CardBody>
					</Card>
				</div>
			</div>



					









					

	



			</>
	)

});







export default MnuInfo;