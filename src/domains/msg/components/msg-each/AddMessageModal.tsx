import { useEffect, FC, useRef, useCallback, useState, useMemo,} from 'react'; 
import { useAPI } from '@/app/store';
import { IForm } from '@/app/types/components';

import { Input, } from 'reactstrap';
//import msgUrl, { TUrl } from '@/domains/msg/api/url';
import cmmUrl, { TCmmUrl } from '@/domains/cmm/api/url';
import url, { TUrl } from '@/domains/msg/api/url';
import { ICode } from '@/domains/cmm/api/GET_CODE';
import loadable from '@loadable/component';

//요청공통부 설정 모달
const SetCommonMessageModal = loadable(() => import('@/domains/msg/components/msg-each/SetCommonMessageModal'));
//전문식별자 생성규칙 모달
const MessageIdRuleModal = loadable(() => import('@/domains/msg/components/cmm/MessageIdRuleModal'));



export interface IAddMessageModalProps {
	props: IMnuInfo;
}

export interface IMnuInfo {
	//menuId: string;
	//upperMenuId: string;
	//upperMenuNm: string;
	//upperMenuLevel: number;
	//menuType: string ;
	//menuTypeNm: string;
}

interface ISelectOption {
	text: string;
	value: string;
}


/**
 * 메뉴트리 등록 Modal Dialog 
 * @returns 
 */
const AddMessageModal:FC<IAddMessageModalProps> = ({props}) => {
	
	//alert 제목 (일반)
	const TITLE: string = '알림확인';
	//alert 제목 (오류)
	const TITLE_ERROR: string = '오류확인';

	const formRef = useRef<IForm>(null);

	const { fetch: codeListFetch } = useAPI<TCmmUrl>(cmmUrl.GET_CODE);
	const { fetch: regFetch } = useAPI<TUrl>(url.POST_MSG_EACH_MESSAGE);


	const [msgIdState,setMsgIdState] = useState('');
	const [msgNameState, setMsgNmState] = useState('');
	const [bizCodeState, setBizCodeState] = useState('COM');
	const [bizDtlCodeState, setBizDtlCodeState] = useState('INQ');
	const [reqHeaderGroupState, setReqHeaderGroup] = useState('');
	const [resHeaderGroupState, setResHeaderGroup] = useState('');
	const [useAtState, setUseAtState] = useState('Y');

	const msgIdRef = useRef('');
	const msgNameRef = useRef('');
	const bizCodeRef = useRef('');
	const bizDtlCodeRef = useRef('');
	const reqHeaderGroupRef = useRef('');
	const resHeaderGroupRef = useRef('');
	const useAtRef = useRef('Y');




	useEffect(() => { msgIdRef.current = msgIdState}, [msgIdState]);
	useEffect(() => { msgNameRef.current = msgNameState }, [msgNameState]);
	useEffect(() => { bizCodeRef.current = bizCodeState }, [bizCodeState]);
	useEffect(() => { bizDtlCodeRef.current = bizDtlCodeState }, [bizDtlCodeState]);
	useEffect(() => { reqHeaderGroupRef.current = reqHeaderGroupState }, [reqHeaderGroupState]);
	useEffect(() => { resHeaderGroupRef.current = resHeaderGroupState }, [resHeaderGroupState]);
	useEffect(() => { useAtRef.current = useAtState }, [useAtState]);


	
	const [bizCodeSelectboxOptionsState, setBizCodeSelectboxOptionsState] = useState<ISelectOption[]>([]);
	const [bizDtlCodeSelectboxOptionsState, setBizDtlCodeSelectboxOptionsState] = useState<ISelectOption[]>([]);




	const createBizSelectOptions = useCallback((jobCode:string): void =>{
		const fetchExecute = async () => {

			try{
				let res;
				let bizCodefetchOption = {
					option: { method: 'get', params: { codeId: jobCode }, isSetParams: true }
				}

				res = await codeListFetch(bizCodefetchOption);

				let bizCodeList = res.data.bdy.list;
				let bizCodeSelectBoxOptions = bizCodeList.map(
					(item: ICode) =>
						({ text: item.codeNm, value: item.code })
				);

				if (jobCode === 'COM102') {
					setBizCodeSelectboxOptionsState(bizCodeSelectBoxOptions);
				} else if (jobCode === 'COM103') {
					setBizDtlCodeSelectboxOptionsState(bizCodeSelectBoxOptions);
				}
			}catch(error){
				console.log('----------------------------------------------------');
				console.log('셀렉트 박스 생성 오류 !!', error);
				console.log('----------------------------------------------------');
				let sMsg = `<h4>${error}!</h4>`;
				await $ui.alert(sMsg, { title: TITLE_ERROR });

				$ui.dialog({close:'CANCEL'});
			} finally{
				//$ui.dialog({ close: 'CANCEL' });
			}
			
		
		}; fetchExecute();
	},[]);


	/* 첫 렌더링시애만 호출. */
	useEffect(() => {
		//업무구분코드(bizCode) 셀렉트박스 옵션 설정 
		createBizSelectOptions('COM102');
		//업무세부구분코드(bizDtlCode) 셀렉트박스 옵션 설정 
		createBizSelectOptions('COM103');

		
	}, []); 









	const OpenSetCommonMsgModel = useCallback(async (groupType:string,...rest:any) => {
		let res = await $ui.dialog(
			{
				title: '전문 공통부 [필드그룹] 선택',
				element: <SetCommonMessageModal 
							groupType={groupType}
							parentSetReqCommonMessageId={setReqHeaderGroup}
							parentSetResCommonMessageId={setResHeaderGroup}
						/>,
				dialogSize: 'lg',
			});


		console.log('res :: ', res);	

	}, []);



	const openMessageIdRuleModel = useCallback(async () => {

		let res = await $ui.dialog(
			{
				title: '전문 식별자 생성규칙',
				element: <MessageIdRuleModal/>,
				dialogSize: 'lg',
			});



		if (res === 'RELOAD') {

		}

	}, []);






	/**
	 *  등록 버튼 클릭
	*/
	const regBtnClickHandler = useCallback(async () => {
		//(1) 입력값 Validation
		if (formRef.current) {
			if (!formRef.current.validate()) {
				let sMsg = "<h4>입력값 확인 필요!</h4>";
				$ui.alert(sMsg, { title: TITLE });
				return false; 
				
			}
		}

		//(3) 등록 Action
		await regAction();

		// 등록 모달 다이얼로그 닫기
		$ui.dialog({ close: 'RELOAD' });
		
	}, []);



	/**
	 * 필드그룹 등록 처리 Action
	 */
	const regAction = async () => {
		try {

			await regFetch(
				{
					msgId: msgIdRef.current,
					msgName: msgNameRef.current,
					bizCode: bizCodeRef.current,
					bizDtlCode: bizDtlCodeRef.current,
					reqHeaderGroup: reqHeaderGroupRef.current,
					resHeaderGroup: resHeaderGroupRef.current,
					useAt: useAtRef.current,
					option: { method: 'post' }
				});

			// 결과 alert 
			let sMsg = "<h4>등록되었습니다!!!!</h4>";
			await $ui.alert(sMsg, { title: TITLE });
			

		} catch (error) {

			console.log('----------------------------------------------------');
			console.log('개별부 전문 등록 Action 호출 오류 !!', error);
			console.log('----------------------------------------------------');
			let sMsg = `<h4>${error}!</h4>`;
			$ui.alert(sMsg, { title: TITLE });
		}
	}



	/**
	 * 취소 버튼 클릭 (닫기)
	 * @param event 
	 */
	const onCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		$ui.dialog({ close: 'CANCEL' });
	}, []);

	

	return (
		<div className="card m-0">
			<div className="border-bottom title-part-padding" style={{position:'relative'}}>
				<h5 className='mb-0'>
					<UI.Icon
						icon="CaretRightFill"
						color="dark"
						size={10}
						className='ms-1'
					/>
					<span className='text-dark fw-light' style={{ fontStyle: 'italic',fontSize:'0.8rem' }}>
						별표(
							<span style={{color: 'red',fontStyle:'italic'}}>*</span>
							) 표시 항목은 필수로 입력 항목입니다.</span>
				</h5>
				<h5>
					<UI.Icon
						icon="CaretRightFill"
						color="dark"
						size={10}
						className='ms-1'
					/>
					<span className='text-dark fw-light me-4' style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
						전문식별자는 생성 규칙을 준수합니다. 
					</span>
					
					<UI.Button style={{position:'absolute' ,right:'20px' ,top:'20px'}}
						className="btn-sm ms-5"
						color="success"
						onClick={openMessageIdRuleModel}
					>
						<UI.Icon
							className='me-1 mb-1'
							icon="QuestionOctagon"
							color="white"
							size={13}
						/>
						<span>전문식별자 생성규칙</span>
					</UI.Button>
				</h5>
				
				
			</div>
			<div className="card-body" style={{fontSize:'13px'}}>
				<UI.Form ref={formRef}>
					{/* ---------------------------------------------- */}
					{/* 전문식별자(MessageId) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 row">	
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 전문 식별자 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>					
						<div className="col-sm-9">
							<UI.InputField
								name="msgId"
								//id="menuType"
								type="text"
								placeholder="전문식별자 생성규칙에 맞춰 입력하세요."
								inputFieldStyle={{ marginBottom: '2px'  }}
								value={msgIdState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setMsgIdState(event.target.value)}}
								required
								errorMessage="전문 식별자를 형식에 맞춰 입력하세요.(전문식별자 생성규칙 확인)"
								//readonly
								//disabled
								rules={[
									/* (value) => !!value || '전문 식별자를 형식에 맞춰 입력하세요.(MSG + 3자리 숫자)',
									(value) => {
										return value.length === 6 || 'MSG + 3자리 숫자를 입력하세요';
									},
									(value) => {
										const regex = /^MSG[0-9]*$/;
										return regex.test(value) || 'MSG + 3자리 숫자를 입력하세요';
									}, */
								]}
							/>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />


					{/* ---------------------------------------------- */}
					{/* 전문명 (msgNm) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 전문명 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-9">
							<UI.InputField
								name="msgNm"
								type="text"
								placeholder="전문명을 입력하세요."
								inputFieldStyle={{ marginTop: '2px', marginBottom: '2px' }}
								value={msgNameState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMsgNmState(event.target.value) }}
								required
								errorMessage="전문명을 입력하세요."
							/>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					
					{/* ---------------------------------------------- */}
					{/* 사용여부 (useAt) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 사용여부 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-9">
							<UI.Switch 
								size='sm'
								onlabel="사용"
								offlabel="미사용"
								onstyle="info"
								width={70}
								checked={useAtState === 'Y' ? true : false}
								onChange={() => {
									setUseAtState(useAtState === 'Y' ? 'N' : 'Y');
								}}
							/>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />

					{/* ---------------------------------------------- */}
					{/* 업무구분 (bizCode,bizDtlCode) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 업무구분 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-3">
							<Input type="select"
								className="custom-select"
								value={bizCodeState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
									console.log(event.target.value);
									setBizCodeState(event.target.value);
								}}
								
								>

								{bizCodeSelectboxOptionsState.map((item, index) => {
									return (
											<option value={item.value}
													key={index}
											>
												{item.text}
											</option>
										)
									}
								)}
					
							</Input>
							
						</div>

						<div className="col-sm-3">
							<label 
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 세부구분 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-3 ps-0 ms-0 me-0">

							<Input type="select"
								className="custom-select"

								value={bizDtlCodeState}
							//disabled={isStatusState}
							//readOnly={isStatusState}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									console.log(event.target.value);
									setBizDtlCodeState(event.target.value);
								}}
							>
								{bizDtlCodeSelectboxOptionsState.map((item, index) => {
									return (
											<option value={item.value}
												key={index}
											>
												{item.text}
											</option>
										)
									}
								)}
							</Input>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />

					{/* ---------------------------------------------- */}
					{/* 외부시스템  */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 타겟시스템 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-3">

							<Input type="select"
								className="custom-select"
							>
								<option value={'01'}>정상</option>
								<option value={'02'}>상태1</option>
								<option value={'03'}>상태2</option>
							</Input>
						</div>
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 세부구분 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-3 ps-0 ms-0 me-0">

							<Input type="select"
								className="custom-select"
							>
								<option value={'01'}>정상</option>
								<option value={'02'}>상태1</option>
								<option value={'03'}>상태2</option>
							</Input>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />

					{/* ---------------------------------------------- */}
					{/* 요청 공통부   */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 요청공통부 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-7">
				
							<UI.InputField
								name="msgNm"
								type="text"
								placeholder="전문명을 입력하세요."
								inputFieldStyle={{ marginTop: '2px', marginBottom: '2px' }}
								value={reqHeaderGroupState}
								//onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMsgNmState(event.target.value) }}
								required
								readonly
								errorMessage="전문명을 입력하세요."
							/>
						</div>
						<div className="col-sm-2 mt-1">		
							<UI.Button 
								className="btn-sm ms-0"
								color="success"
								onClick={(event)=>{	OpenSetCommonMsgModel('REQ',event)}}
							>
								<span>설정</span>
							</UI.Button>
							
						</div>
						
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />

					{/* ---------------------------------------------- */}
					{/* 응답 공통부   */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 응답공통부 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-7">

							<UI.InputField
								name="msgNm"
								type="text"
								placeholder="전문명을 입력하세요."
								inputFieldStyle={{ marginTop: '2px', marginBottom: '2px' }}
								value={resHeaderGroupState}
								//onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMsgNmState(event.target.value) }}
								required
								readonly
								errorMessage="전문명을 입력하세요."
							/>
						</div>
						<div className="col-sm-2 mt-1">
							<UI.Button
								className="btn-sm ms-0"
								color="success"
								onClick={(event) => { OpenSetCommonMsgModel('RES', event) }}
							>
								<span>설정</span>
							</UI.Button>
						</div>

					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />

					{/* ---------------------------------------------- */}
					{/* 전문 설명   */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row"></div>
				</UI.Form>
			</div>


			<div className="p-3 border-top">
				<div style={{ width: '100%', textAlign: 'right' }}>
					<UI.Button
						color="info"
						className="m-2"
						onClick={regBtnClickHandler}
					>
						<UI.RFIcon
							icon="Plus"
							className="fill-white feather-sm mb-1"
						/>
						<span style={{ display: 'inline-block', marginLeft: '4px' }}>등록</span>
					</UI.Button>
					<UI.Button onClick={onCancel}>
						<UI.RFIcon
							icon="X"
							className="fill-white feather-sm mb-1"
						/>
						<span style={{ display: 'inline-block', marginLeft: '4px' }}>취소</span>
					</UI.Button>
				</div>
			</div>
		</div>
	);
};

export default AddMessageModal;
