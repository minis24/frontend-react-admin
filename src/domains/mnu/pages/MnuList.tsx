import MnuTree from '@/domains/mnu/components/MnuTree'
import MnuInfo, { ISetMenuIdHandle } from '@/domains/mnu/components/MnuInfo'
import MnuServiceInfo from '@/domains/mnu/components/MenuServiceInfo'
import { useEffect, useRef, useState } from 'react';



const MnuList = () => {

	const setMenuInfoMenuIdRef = useRef<ISetMenuIdHandle>(null);
	//const setMenuServiceMenuIdRef = useRef<ISetMenuIdHandle>(null);
	const [menuIdState , setMenuIdState] = useState('');





	useEffect(() => {
		console.log('menuIdState:', menuIdState)
		
		//자식 컴포넌트의 함수 호출 
		setMenuInfoMenuIdRef.current?.setMenuId();
		//setMenuServiceMenuIdRef.current?.setMenuId();

	}, [menuIdState])





	return (
		<>
			<div
				className="
                border-bottom
                title-part-padding
                px-0
                mb-3
                align-items-center
            "
			>
				<div>
					<h4 className="mb-2">메뉴에서 메뉴를 선택하면 activate 됩니다.</h4>
				</div>
				<div>
					<h5>
						<UI.Icon
						icon="CaretRightFill"
						color="dark"
						size={10}
						className='ms-3'
						/>
						<span className='text-dark fw-light'>요청 URL의 등록 및 수정</span>
					</h5>
					<h5>
						<UI.Icon
							icon="CaretRightFill"
							color="dark"
							size={10}
							className='ms-3'
						/>
						<span className='text-dark fw-light'>메뉴의 서비스 정보 등록 및 수정 </span>
					</h5>
				</div>

			</div>



			<div className="row">
				{/* 메뉴목록 영역 */}
				<div className="col-3 pe-1" >
					<MnuTree mnuType="01" setStateAction={setMenuIdState} />
				</div>

				{/* 메뉴상세정보 영역 */}
				<div className="col-9 ps-1 pe-1" >
					<MnuInfo menuId={menuIdState} ref={setMenuInfoMenuIdRef} />
				</div>

				{/* 메뉴서비스정보 영역 */}
			{/* 	<div className="col-2 ps-1" >
					<MnuServiceInfo menuId={menuIdState} ref={setMenuServiceMenuIdRef} />
				</div> */}
			</div>
		</>
	);
};

export default MnuList;
