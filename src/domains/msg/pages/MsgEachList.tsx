import MsgEachDetailList from '@/domains/msg/components/msg-each/MsgEachDetailList'
import MsgEachTree from '@/domains/msg/components/msg-each/MsgEachTree'
import React, { useEffect, useRef, useState } from 'react';

import { 
    IMsgEachDetailListHandleRef, 
    IMsgEachDetailListHandleParam 
} from '@/domains/msg/components/msg-each/MsgEachDetailList'


const MsgEachList :React.FC = ()=>{

    const msgEachDetailListHandleRef = useRef<IMsgEachDetailListHandleRef>(null);
    const [bizCodeState, setBizCodeState] = useState('');
    const [bizDtlCodeState, setBizDtlCodeState] = useState('');
    const [biz3DepthCodeState, setBiz3DepthCodeState] = useState('');

    

    useEffect(() => {
    
        let param = {
                        bizCode:bizCodeState ,
                        bizDtlCode: bizDtlCodeState,
                        biz3DepthCode: biz3DepthCodeState,
        } as IMsgEachDetailListHandleParam

        //자식 컴포넌트의 함수 호출 
        msgEachDetailListHandleRef.current?.excuteMsgEachDetailListRefresh(param);


    }, [bizCodeState, bizDtlCodeState, biz3DepthCodeState]);



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
                    <h4 className="mb-2">목록에서 업무를 선택하면 해당 업무의 전문개별부 목록이 조회 됩니다.</h4>
                </div>
                <div>
                    <h5>
                        <UI.Icon
                            icon="CaretRightFill"
                            color="dark"
                            size={10}
                            className='ms-3'
                        />
                        <span className='text-dark fw-light ps-1'>전문 개별부 기본정보 등록 및 수정</span>
                    </h5>
                </div>

            </div>



            <div className="row">
                {/* Messsage 업무별 트리 목록 영역 */}
                <div className="col-2 pe-1" >
                    <MsgEachTree 
                        deliveryBizCode={setBizCodeState} 
                        deliveryBizDtlCode={setBizDtlCodeState}
                        deliveryBiz3DepthCode={setBiz3DepthCodeState}/>
                </div>

                {/* Message 업무별 개별부전문 목록 영역 */}
                <div className="col-10 ps-1 pe-1" >
                    <MsgEachDetailList 
                        ref={msgEachDetailListHandleRef}/>
                </div>


            </div>
        </>

    )
};



export default MsgEachList;
