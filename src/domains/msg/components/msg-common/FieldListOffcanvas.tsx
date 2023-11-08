import { FC, useEffect, useRef, useState } from 'react';

import {
	Row,
} from 'reactstrap';



import FieldListDataTables, { IFieldListDataTablestHandleRef } from '@/domains/msg/components/cmm/FieldListDataTables'
import FieldGroupInfo, { IFieldGroupInfoHandleRef } from '@/domains/msg/components/cmm/FieldGroupNameTable'


import { IFieldGroup } from '@/domains/msg/api/msg-each/MsgEachListType';


export interface IFieldListOffcanvasProps {
	props: IFieldGroup;
}









/**
 *  필드그룹(하위)에 포함되는 필드 목록 조회 및 관리 오프캔버스
 * - 필드그룹관리 화면 테이블에서 하위필드그룹 [관리>리스트] 버튼 클릭하여 진입
 * - 해당 필드그룹에 필드추가 및 삭제, 리스트필드의 대상필드 지정 등
 * @@ 테이블 깜빡거리는거 없애기 위해 데이터테이블 ajax 함수 사용하여 구현해봄(테스트)
 */
const FieldListOffcanvas: FC<IFieldListOffcanvasProps> = ({ props }) => {

	const fieldListDatatablesHandleRef = useRef<IFieldListDataTablestHandleRef>(null);
	const fieldGroupInfoHandleRef = useRef<IFieldGroupInfoHandleRef>(null);



	const [fieldGroupIdState, setFieldGroupIdState] = useState<string>();
	


	useEffect(()=>{
		setFieldGroupIdState(props.fieldGroupId);
	},[])


	useEffect(()=> {
		if (!fieldGroupIdState){
			return;
		}


		let param = {
			fieldGroupId: fieldGroupIdState,
			//activeTab: activeTab
		}

		fieldGroupInfoHandleRef.current && fieldGroupInfoHandleRef.current.fieldGroupRefresh(param);
		fieldListDatatablesHandleRef.current && fieldListDatatablesHandleRef.current?.filedListRefresh(param);


	},[fieldGroupIdState]);



	return (
		<>
			<Row className='ps-4 pe-4'>

				{/* -------------------------- */}
				{/* 필드그룹 정보 컴포넌트  */}
				{/* -------------------------- */}
				<FieldGroupInfo
					ref={fieldGroupInfoHandleRef} 
				/>
			</Row>


			{/* 필드 목록 */}
			<Row className='ps-4 pe-4'>


				{/* -------------------------- */}
				{/* 필드목록 Datatables 컴포넌트  */}
				{/* -------------------------- */}
				<FieldListDataTables
					ref={fieldListDatatablesHandleRef} />
			</Row>
		</>
	);
};

export default FieldListOffcanvas;
