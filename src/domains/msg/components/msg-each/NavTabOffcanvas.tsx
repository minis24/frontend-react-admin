import { FC, useEffect, useRef, useState } from 'react';

import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Row,
} from 'reactstrap';


import { IMsgEach } from '@/domains/msg/api/msg-each/MsgEachListType';
import FieldListDataTables,{ IFieldListDataTablestHandleRef } from '@/domains/msg/components/cmm/FieldListDataTables'
import FieldGroupInfo, { IFieldGroupInfoHandleRef } from '@/domains/msg/components/cmm/FieldGroupNameTable'


export interface INavTabOffcanvasProps {
	msgEachRowData: IMsgEach;
}





const NavTabOffcanvas: FC<INavTabOffcanvasProps> = (props) => {

	let msgEachRowData = props.msgEachRowData;
	let reqBodyGroup = msgEachRowData.reqBodyGroup;
	let resBodyGroup = msgEachRowData.resBodyGroup;


	const [activeTab, setActiveTab] = useState('REQ');
	const [fieldGroupIdState, setFieldGroupIdState] = useState('');


	const fieldListDatatablesHandleRef = useRef<IFieldListDataTablestHandleRef>(null);
	const filedGroupInfoHandleRef = useRef<IFieldGroupInfoHandleRef>(null);

	const toggle = (tab: string) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		};
	};


	useEffect(() => {
		if (!activeTab) {
			return;
		}

		let fieldGroupId = activeTab === "REQ" ? reqBodyGroup : resBodyGroup;
		setFieldGroupIdState(fieldGroupId);

	}, [activeTab]);




	useEffect(() => {
		if (!fieldGroupIdState) {return;}
		
		let param = {
			fieldGroupId: fieldGroupIdState,
			activeTab: activeTab
		}

		filedGroupInfoHandleRef.current && filedGroupInfoHandleRef.current.fieldGroupRefresh(param);
		fieldListDatatablesHandleRef.current && fieldListDatatablesHandleRef.current?.filedListRefresh(param);
	
	
	},[fieldGroupIdState]);






	return (
		<>

			<Nav tabs>
				<NavItem>
					<NavLink
						className={activeTab === 'REQ' ? 'active' : ''}
						onClick={() => {
							toggle('REQ');
						}}
					>
						요청부
					</NavLink>
				</NavItem>

				<NavItem>
					<NavLink
						className={activeTab === 'RES' ? 'active' : ''}
						onClick={() => {
							toggle('RES');
						}}
					>
						응답부
					</NavLink>
				</NavItem>
			</Nav>


			<TabContent className="p-4" activeTab={activeTab}>
				<Row>
					<FieldGroupInfo
						ref={filedGroupInfoHandleRef} 
					/>
				</Row>
				


				{/* ------------------------------------------- */}
				{/* 요청부 탭 */}
				{/* ------------------------------------------- */}
				<TabPane tabId="REQ"></TabPane>


				{/* ------------------------------------------- */}
				{/* 응답부 탭 */}
				{/* ------------------------------------------- */}
				<TabPane tabId="RES"></TabPane>




				{/* 필드 목록 */}
				<Row>
				

					{/* -------------------------- */}
					{/* 필드목록 Datatables 컴포넌트  */}
					{/* -------------------------- */}
					<FieldListDataTables
						//setGridTableState={setGridTableState}
						ref={fieldListDatatablesHandleRef} />
			
				</Row>
			</TabContent>





		</>
	);
};

export default NavTabOffcanvas;
