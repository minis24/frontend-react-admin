import MsgCommonDetailList from '@/domains/msg/components/msg-common/MsgCommonDetailList'


const MsgCommonList :React.FC = ()=>{

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
                    <h4 className="mb-2"></h4>
                </div>
                <div>
                    <h5>
                        <UI.Icon
                            icon="CaretRightFill"
                            color="dark"
                            size={10}
                            className='ms-3'
                        />
                        <span className='text-dark fw-light ps-1'>전문 공통부 기본정보 등록 및 수정</span>
                    </h5>
                </div>

            </div>

            <div className="row">

                {/* Message 업무별 개별부전문 목록 영역 */}
                <div className="col-12 ps-1 pe-1" >
                    <MsgCommonDetailList />
                </div>

            </div>
        </>

    )
};



export default MsgCommonList;
