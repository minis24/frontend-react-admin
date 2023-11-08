import { useRef, useEffect, FC, useCallback, useState } from 'react'; 
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/mnu/api/url';
import { IForm } from '@/app/types/components';





export interface IMenuTreeRegModalProps {
	props: IMnuInfo;
}

export interface IMnuInfo {
	//menuId: string;
	upperMenuId: string;
	upperMenuNm: string;
	upperMenuLevel: number;
	menuType: string ;
	menuTypeNm: string;


}



/**
 * 메뉴트리 등록 Modal Dialog 
 * @returns 
 */
const MenuTreeRegModal:FC<IMenuTreeRegModalProps> = ({props}) => {
	
	//메뉴아이디 자릿수
	const menuIdLength: number = 15;
	//업무코드 자릿수(MID , MNG  등) 
	const bizCodeLength: number = 3;
	//api 호출결과 성공 코드 
	const SUCCESS: string = 'SUCCESS';
	//api 호출결과 실패 코드 
	//const FAIL: string = 'FAIL';
	//alert 제목 (일반)
	const TITLE: string = '알림확인';
	//alert 제목 (오류)
	const TITLE_ERROR: string = '오류확인';


	
	const UIformRef = useRef<IForm>(null);
/* 	const switchRef = useRef<HTMLInputElement>(null);
	const [checkboxState, setCheckboxState] = useState(false); */


	//메뉴아이디 
	const [menuIdState,setMenuIdState] = useState('');
	//메뉴이름  
	const [menuNmState, setMenuNmState] = useState('');

	//메뉴아이디 검사 결과 [true : 사용가능, false: 사용불가]
	const [isCheckState, setCheckState] = useState(false);




	//초기 데이타 설정
	const menuInfoData = props;

	//메뉴타입 input 입력 값 :ex ([01] FW 메뉴타입 코드)
	const menuType 		 = menuInfoData.menuType;
	const menuTypeStr    = `[${menuInfoData.menuType}] ${menuInfoData.menuTypeNm}`;
	const upperMenuId    = menuInfoData.upperMenuId;
	const upperMenuNm    = menuInfoData.upperMenuNm;
	const upperMenuLevel = menuInfoData.upperMenuLevel;



	/**
	 * 메뉴아이디 검사(중복체크)
	 */
	const { fetch: menuIdChkFetch } = useAPI<TUrl>(url.GET_checkMenuId);
	/**
	 * 메뉴등록
	 */
	const { data: menuIdRegData, fetch: menuIdRegFetch } = useAPI<TUrl>(url.POST_menuIdReg);








	/* 첫 렌더링시애만 호출. */
	useEffect(() => {

/* 		switchRef.current?.checked
		setCheckboxState(true) */
	}, []); //end useEffect(() => {}.[]}




	/**
	 * 메뉴등록 Action
	 */
	const menuIdRegAction = async () => {
		console.log('----------------------------------------------------');
		console.log('메뉴등록 Action 호출 [menuIdRegAction]')
		console.log('----------------------------------------------------');

		try {

			await menuIdRegFetch(
				{
					menuId: menuIdState,
					menuNm: menuNmState,
					menuType,
					upperMenuId,
					option: { method: 'post' }
				});

			// 결과 alert 
			let sMsg = "<h4>등록되었습니다!</h4>";
			await $ui.alert(sMsg, { title: TITLE });

			// 등록 모달 다이얼로그 닫기 (줄맞추는 용도의 await)
			await $ui.dialog({ close: 'RELOAD' });

			
		} catch (error) {

			console.log('----------------------------------------------------');
			console.log('메뉴등록 Action 호출 오류 !!', error);
			console.log('----------------------------------------------------');
			let sMsg = `<h4>${error}!</h4>`;
			$ui.alert(sMsg, { title: TITLE });
		}
		

	}




	//================================================================================
	//이벤트 핸들러
	//================================================================================
	/**
	 * MenuType 셀렉트박스 OnChange
	 * @param event 
	 */
	// 등록 버튼 클릭
	const menuRegClickHandler = useCallback(() => {
		console.log('----------------------------------------------------');
		console.log('메뉴등록 버튼 클릭! [menuRegClickHandler]')
		console.log('UIformRef.current', UIformRef.current)
		
		console.log('----------------------------------------------------');


		//(1) 입력값 Validation
		if (UIformRef.current) {
			console.log('UIformRef.current.validate()', UIformRef.current.validate());
			
			if (!UIformRef.current.validate()) {

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
		

		//(2) 메뉴아이디 검사 여부 확인
		if (!isCheckState) {
			let sMsg = "<h4>메뉴아이디 중복 검사 필요!</h4>";
			$ui.alert(sMsg, { title: TITLE });

			return false;
		}

		//(3) 등록 Action
		menuIdRegAction();



	}, [menuIdRegAction]);

	/**
	 * 메뉴아이디 검사
	 */
	const checkMenuId = () => {
		//(1) 입력값 null 체크
		if(!menuIdState){
			let sMsg = "<h3>메뉴식별자를 입력하세요 !</h3>";
			$ui.alert(sMsg, { title: TITLE,});
			return false;
		}

		//(2) 길이 검사 (MIDMNGBBS00000) ==> 15자리
		if (menuIdState.length != menuIdLength) {
			let sMsg = "<h4>메뉴식별자 길이를 확인하세요.</h4>";
			$ui.alert(sMsg, { title: TITLE, });
			
			return false;
		}


		//(3) 상위메뉴아이디 서브스트링 해서 업무코드가 같은지 비교 
		//   --> 메뉴의 업무코드를 3자리수로 설정하였음. 
		const prefixIndex = bizCodeLength * upperMenuLevel;
		const prefix = upperMenuId.substring(0, prefixIndex);


		
		if (prefix != menuIdState.substring(0, prefixIndex)) {
			const sMsg = "<h4>메뉴식별자 업무코드를 확인하세요.</h4>";
			$ui.alert(sMsg, { title: TITLE, });

			return false;
		} 



		//(4) 중복체크 
		menuIdChkFetch({ menuId: menuIdState, option: { method: 'get' } })
			.then((res) => {
				const result = res.data.hdr.rsCd;

				if (!result || result !== SUCCESS){
					const sMsg = `<h4>${res.data.hdr.rsMsg}</h4>`;
					$ui.alert(sMsg, { title: TITLE_ERROR });

					return false;
				}

				const checkResult = res.data.bdy.data.isCheck;

				if (checkResult){
					const sMsg = `<h4>등록가능한 아이디 입니다.</h4>`;
					$ui.alert(sMsg, { title: TITLE });

					setCheckState(true);

				} else{
					const sMsg = `<h4>이미 등록된 아이디 입니다.</h4>`;
					$ui.alert(sMsg, { title: TITLE });

					setCheckState(false);
				}

			})
			.catch((error) => {
				const sMsg = error;
				$ui.alert(sMsg, { title: TITLE_ERROR });

				return false;
			});

	}




	/**
	 * 메뉴아이디 입력 인풋값 onChange 핸들러
	 * @param event 
	 */
	const handlerMenuIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMenuIdState(event.target.value);
	}

	/**
	 * 메뉴이름 입력 인풋값 onChange 핸들러
	 * @param event 
	 */
	const handlerMenuNmInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMenuNmState(event.target.value);
	}



	/**
	 * 취소 버튼 클릭 (닫기)
	 * @param event 
	 */
	const onCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		$ui.dialog({ close: 'CANCEL' });
	
	}, []);


	return (
		<>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-body border-bottom">
								<h4 className="card-title">* 메뉴트리에서 선택한 메뉴의 하위에 메뉴가 등록 됩니다.</h4>
							</div>
								<UI.Form ref={UIformRef}>
								<div className="card-body">
								{/* ---------------------------------------------- */}
								{/* 메뉴타입 */}
								{/* ---------------------------------------------- */}
									<div className="mb-2 row">
										<label
											htmlFor="menuType"
											className="col-sm-3 text-end control-label col-form-label"
										>메뉴타입</label>
										<div className="col-sm-9">
											<UI.InputField
												name="menuType"
												id="menuType"
												type="text"
												value={menuTypeStr}
												readonly
												disabled

											/>
										
										</div>
									</div>
								{/* ---------------------------------------------- */}
								{/* 상위 메뉴 아이디  */}
								{/* ---------------------------------------------- */}
									<div className="mb-2 row">
										<label
											htmlFor="upperMenuId"
											className="col-sm-3 text-end control-label col-form-label"
										>상위메뉴ID</label>
										<div className="col-sm-9">
											<UI.InputField
												name="upperMenuId"
												id="upperMenuId"
												type="text"
												value={upperMenuId}
												readonly
												disabled
											
											/>
										
										</div>
									</div>
								{/* ---------------------------------------------- */}
								{/* 상위 메뉴 이름  */}
								{/* ---------------------------------------------- */}
									<div className="mb-2 row">
										<label
											htmlFor="upperMenuNm"
											className="col-sm-3 text-end control-label col-form-label"
										>상위메뉴이름</label>
										<div className="col-sm-9">
											<UI.InputField
												name="upperMenuNm"
												id="upperMenuId"
												type="text"
												value={upperMenuNm}
												readonly
												disabled
											/>
										</div>
									</div>
								{/* ---------------------------------------------- */}
								{/* 신규 등록할 메뉴이름  */}
								{/* ---------------------------------------------- */}
									<div className="mb-2 row">
										<label
											htmlFor="com12"
											className="col-sm-3 text-end control-label col-form-label"
										>메뉴이름</label>
										<div className="col-sm-9">
											<UI.InputField
												name="menuNm"
												id="menuNm"
												value={menuNmState}
												onChange={handlerMenuNmInputChange}
												type="text"
												placeholder="메뉴 이름을 입력하세요."
												errorMessage="필수 입력 사항입니다."
												required
											/>
										</div>
									</div>
								{/* ---------------------------------------------- */}
								{/* 신규 등록할 메뉴아이디  */}
								{/* ---------------------------------------------- */}
									<div className="mb-2 row">
										<label
											htmlFor="email20"
											className="col-sm-3 text-end control-label col-form-label"
										>메뉴아이디</label>
										<div className="col-sm-9">
											<UI.InputField
												name="menuId"
												id="menuId"
												type="text"
												value={menuIdState}
												onChange={handlerMenuIdInputChange}
												placeholder="메뉴 아이디를 입력하세요."
												errorMessage="필수 입력 사항입니다."
												required
												inputFieldStyle={{
														display:'inline-block' ,
														width: '80%'		
												}}
											/>
											
											<UI.Button
												color="primary"
												className="btn-sm mx-1"
												onClick={checkMenuId}
											>
												검사
											</UI.Button>

										</div>
									</div>
								</div>



								<div className="p-3 border-top">
								<div style={{ width: '100%', textAlign: 'right' }}>
									<UI.Button
										color="info"
										className="m-2"
										onClick={menuRegClickHandler}
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
							{/* </form> */}
								</UI.Form>
						</div>
					</div>
				</div>




		</>
	);
};

export default MenuTreeRegModal;
