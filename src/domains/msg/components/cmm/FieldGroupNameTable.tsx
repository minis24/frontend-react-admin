import { useState, useEffect, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react';
import {
	Card, CardBody,
	Badge,
} from 'reactstrap';
import { useAPI } from "@/app/store";
import url, { TUrl } from '@/domains/msg/api/url';

import { 
	IFieldGroupResponse,
	IFieldGroupResponseData,
	IFieldGroupResponseBody,
	IFieldGroup 
} from '@/domains/msg/api/msg-each/MsgEachListType';



export interface IFieldGroupInfoHandleRef {
	fieldGroupRefresh: (param: IFieldGroupInfoHandleParam) => void;
}

export interface IFieldGroupInfoHandleParam {
	fieldGroupId : string;

}
export interface IFieldGroupNameTableProps {}







const FieldGroupInfo: ForwardRefRenderFunction<IFieldGroupInfoHandleRef, IFieldGroupNameTableProps> = (props, ref) => {

	const [fieldGroupIdState, setFieldGroupIdState] = useState('');
	const [fieldGroupNameState, setFieldGroupNameState] = useState('');
	const [fieldGroupInfoState, setFieldGroupInfoState] = useState<IFieldGroup>();

	const [useAtState ,setUseAtState] = useState('Y');
	

	//필드그룹아이디로 필드그룹정보 조회
	const { fetch: fieldGroupFetch } = useAPI<TUrl>(url.GET_MSG_EACH_FIELD_GROUP);





	

	//--------------------------------------------------------------
	// 부모노드에서 호출하는 함수처리 (ForwardRef 처리에 필요한 설정)
	//--------------------------------------------------------------
	// 부모 컴포넌트에서 사용할 수 있는 함수들을 내부에 표기
	useImperativeHandle(ref, () => (
		{
			fieldGroupRefresh
		})
	);

	const fieldGroupRefresh = async (req: IFieldGroupInfoHandleParam) => {
		setFieldGroupIdState(req.fieldGroupId);
	}




	useEffect(()=>{

			if (!fieldGroupIdState){
				return;
			}


			const asyncExcute = async () => {
				let res = await callFieldGroupFetchAPI(fieldGroupIdState) as IFieldGroupResponse;
				let resData = res.data as IFieldGroupResponseData;
				let resBody = resData.bdy as IFieldGroupResponseBody;
				let fieldGroupInfo = resBody.data as IFieldGroup;
				setFieldGroupInfoState(fieldGroupInfo);
	
			}			
			asyncExcute();


		},[fieldGroupIdState]
	);



	useEffect(() => {
		if (!fieldGroupInfoState){
			return;
		}

		setUseAtState(fieldGroupInfoState.useAt);
		setFieldGroupNameState(fieldGroupInfoState.fieldGroupName);

	}, [fieldGroupInfoState])


	useEffect(()=>{

	},[fieldGroupNameState]);


	const callFieldGroupFetchAPI = async (fieldGroupId:string) => {
		let fetchParam = Object.assign({}, {option: { method: 'get' }},{fieldGroupId});
		let res = await fieldGroupFetch(fetchParam);		

		return res;
	};




	return (
		<>
			<Card
				color="secondary"
				className="border mb-0 "
				outline
			>
				<CardBody>
					<table className="table table-bordered g-table-custom-sm mb-0">
						<colgroup>
							<col width="30%" />
							<col width="30%" />
							<col width="*" />
							<col width="10%" />
						</colgroup>
						<tbody>
							<tr>
								<td>
									<b>
										<Badge
											color={useAtState === 'Y' ? 'info' : 'warning'}
											className="me-3"
										>
											{useAtState === 'Y' ? '사용중' : '미사용'}
										</Badge>
										{fieldGroupInfoState && fieldGroupInfoState.fieldGroupId}
									</b>
								</td>
								<td>
									<b>{fieldGroupNameState}</b>
								</td>
								<td>
									<b>
										{/* 상위그룹: <span className="text-secondary">{fieldGroupInfoRef.current?.parentId}</span> */}
									</b>
								</td>
								<td className="text-center">
									<span className="text-primary">
										순서 <Badge color="primary"></Badge>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</CardBody>
			</Card>
		</>
	);


};



export default forwardRef<IFieldGroupInfoHandleRef, IFieldGroupNameTableProps>(FieldGroupInfo);
