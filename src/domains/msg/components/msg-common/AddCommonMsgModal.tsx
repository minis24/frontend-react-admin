import { useEffect, FC, useRef, useCallback, useState,} from 'react'; 
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/msg/api/url';
import { IForm } from '@/app/types/components';


import loadable from '@loadable/component';
const FieldGroupIdRuleModal = loadable(() => import('@/domains/msg/components/cmm/FieldGroupIdRuleModal'));



export interface IProps {
	props: IFieldGroup;
}

export interface IFieldGroup {
	//menuId: string;
	//upperMenuId: string;
	//upperMenuNm: string;
	//upperMenuLevel: number;
	//menuType: string ;
	//menuTypeNm: string;
}


/**
 * 필드그룹 등록 Modal Dialog 
 * @returns 
 */
const AddCommonMsgModal: FC<IProps> = ({props}) => {	
	//alert 제목 (일반)
	const TITLE: string = '알림확인';
	//alert 제목 (오류)
	const TITLE_ERROR: string = '오류확인';



	const formRef = useRef<IForm>(null);
	const fieldGroupIdRef = useRef('');
	const fieldGroupNameRef = useRef('');
	const groupTypeRef = useRef('REQ');
	const useAtRef = useRef('Y');



	const [fieldGroupIdState,setFieldGroupIdState] = useState('');
	const [fieldGroupNameState, setFieldGroupNameState] = useState('');
	const [groupTypeState, setGroupTypeState] = useState('REQ');
	const [useAtState, setUseAtState] = useState('Y');

	/**
	 * 메뉴등록
	 */
	const { fetch: regFetch } = useAPI<TUrl>(url.POST_MSG_COMMON_MESSAGE);

	/* 첫 렌더링시애만 호출. */
	useEffect(() => {
	
	}, []); 




	useEffect(() => { 
		console.log('fieldGroupIdState:: ', fieldGroupIdState) ;
		fieldGroupIdRef.current = fieldGroupIdState;

		},[fieldGroupIdState]);

	useEffect(() => { console.log('fieldGroupNameState:: ', fieldGroupNameState) 
		fieldGroupNameRef.current = fieldGroupNameState;
		
		}, [fieldGroupNameState]);


	useEffect(() => {
		console.log('groupTypeState:: ', groupTypeState)
		groupTypeRef.current = groupTypeState;

	}, [groupTypeState]);

	useEffect(() => {
		console.log('useAtState:: ', useAtState)
		useAtRef.current = useAtState;

	}, [useAtState]);




	const openFieldGroupIdRuleModel = useCallback(async () => {

		await $ui.dialog(
			{
				title: '전문공통부[필드그룹] 식별자 생성규칙',
				element: <FieldGroupIdRuleModal/>,
				dialogSize: 'lg',
			});

	}, []);



	/**
	 * 필드그룹 등록 처리 Action
	 */
	const fieldGroupRegAction = async () => {
		try {

			let fetchParam = Object.assign({}, { option: { method: 'post' } }, 
				{
					fieldGroupId: fieldGroupIdRef.current,
					fieldGroupName: fieldGroupNameRef.current,
					msgType: '01', //공통부 [01] , 개별부 [02]
					groupType: groupTypeRef.current,
					useAt: useAtRef.current,

				});

			await regFetch(fetchParam);


		} catch (error) {

			console.log('----------------------------------------------------');
			console.log('필드그룹등록 Action 호출 오류 !!', error);
			console.log('----------------------------------------------------');
			let sMsg = `<h4>${error}!</h4>`;
			$ui.alert(sMsg, { title: TITLE });
		}
	}






	/**
 * 필드그룹아이디 입력 인풋값 onChange 핸들러
 * @param event 
 */
	const handlerFieldGroupIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value)
		setFieldGroupIdState(event.target.value);
	}

	/**
	 * 필드그룹이름 입력 인풋값 onChange 핸들러
	 * @param event 
	 */
	const handlerFieldGroupNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value)
		setFieldGroupNameState(event.target.value);
	}




	/**
	 *  등록 버튼 클릭
	*/
	const fieldGroupRegClickHandler = useCallback(async () => {
		console.log('----------------------------------------------------');
		console.log('등록 버튼 클릭! [menuRegClickHandler]')
		console.log('formRef.current', formRef.current)
		console.log('----------------------------------------------------');


		//(1) 입력값 Validation
		if (formRef.current) {
			console.log('UIformRef.current.validate()', formRef.current.validate());

			if (!formRef.current.validate()) {

				/* 
				//주석처리(2023.08.24)
				//-------------------------------------
				let sMsg = "<h4>입력값 확인 필요!</h4>";
				$ui.alert(sMsg, { title: TITLE });
				return false; 
				//-------------------------------------
				*/
			}
		}



		//(3) 등록 Action
		await fieldGroupRegAction();


		// 결과 alert 
		let sMsg = "<h4>등록되었습니다!</h4>";
		await $ui.alert(sMsg, { title: TITLE });


		// 등록 모달 다이얼로그 닫기 
		$ui.dialog({ close: 'RELOAD' });

	}, []);



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
						필드그룹 식별자는 생성 규칙을 준수합니다. 
					</span>
					
					<UI.Button style={{position:'absolute' ,right:'20px' ,top:'20px'}}
						className="btn-sm ms-5"
						color="success"
						onClick={openFieldGroupIdRuleModel}
					>
						<UI.Icon
							className='me-1 mb-1'
							icon="QuestionOctagon"
							color="white"
							size={13}
						/>
						<span>필드그룹ID 생성규칙</span>
					</UI.Button>
				</h5>
				
				
			</div>
			<div className="card-body" style={{fontSize:'13px'}}>
				<UI.Form ref={formRef}>
					{/* ---------------------------------------------- */}
					{/* 전문공통부 필드그룹ID(FieldGroupId) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 row">	
						<div className="col-sm-3">
							<label
								htmlFor="fieldGroupId"
								className="text-end control-label col-form-label"
							> 필드그룹 ID </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>					
						<div className="col-sm-9">
							<UI.InputField
								name="fieldGroupId"
								//id="menuType"
								type="text"
								placeholder="식별자 생성규칙에 맞춰 입력하세요."
								inputFieldStyle={{ marginBottom: '2px'  }}
								value={fieldGroupIdState}
								onChange={handlerFieldGroupIdInputChange}
								required
								errorMessage="전문 식별자를 형식에 맞춰 입력하세요.(전문식별자 생성규칙 확인)"
								//readonly
								//disabled
								/* rules={[
									(value) => !!value || '전문 식별자를 형식에 맞춰 입력하세요.(MSG + 3자리 숫자)',
									(value) => {
										return value.length === 6 || 'MSG + 3자리 숫자를 입력하세요';
									},
									(value) => {
										const regex = /^MSG[0-9]*$/;
										return regex.test(value) || 'MSG + 3자리 숫자를 입력하세요';
									},
								]} */
							/>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />


					{/* ---------------------------------------------- */}
					{/* 필드그룹이름 (fieldGroupNm) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="fieldGroupNm"
								className="text-end control-label col-form-label"
							> 필드그룹이름 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-9">
							<UI.InputField
								name="fieldGroupNm"
								type="text"
								placeholder="전문명을 입력하세요."
								inputFieldStyle={{ marginTop: '2px', marginBottom: '2px' }}
								value={fieldGroupNameState}
								onChange={handlerFieldGroupNameInputChange}
								required
								errorMessage="전문명을 입력하세요."
							/>
						</div>
					</div>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
				

					{/* ---------------------------------------------- */}
					{/* 그룹 타입 (요청부/응답부) (groupType) */}
					{/* ---------------------------------------------- */}
					<div className="mb-1 mt-1 row">
						<div className="col-sm-3">
							<label
								htmlFor="menuType"
								className="text-end control-label col-form-label"
							> 필드그룹 타입 </label>
							<span className="ms-1" style={{ color: 'red' }}>*</span>
						</div>
						<div className="col-sm-9">
							<UI.Switch
								size='sm'
								onlabel="요청부"
								offlabel="응답부"
								onstyle="info"
								offstyle='success'
								width={70}
								checked={groupTypeState === 'REQ' ? true : false}
								onChange={() => {
									setGroupTypeState(groupTypeState === 'REQ' ? 'RES' : 'REQ');
								}} 
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
				</UI.Form>
			</div>


			<div className="p-0 border-top">
				<div style={{ width: '100%', textAlign: 'right' }}>
					<UI.Button
						color="info"
						className="m-2"
						onClick={fieldGroupRegClickHandler}
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

export default AddCommonMsgModal;
