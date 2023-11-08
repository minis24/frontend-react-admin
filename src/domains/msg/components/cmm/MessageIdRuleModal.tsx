import { FC, useCallback, useRef } from "react";
import 'datatables.net-plugins/dataRender/ellipsis';



/**
 * 메뉴트리 등록 Modal Dialog 
 * @returns 
 */
const MessageIdRuleModal:FC = () => {
	
	const tableRef = useRef(null);



/**
 * 취소 버튼 클릭 (닫기)
 * @param event 
 */
	const onCancel = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		$ui.dialog({ close: 'CANCEL' });
	}, []);





	return (
		<div className="card m-0">
			<div className="border-bottom title-part-padding">
				<h5>
					<UI.Icon
						icon="CaretRightFill"
						color="orange"
						size={10}
						className='ms-0 me-1'
					/>
					<span className='text-dark fw-light'>전문은 WAS와 AP간에 데이터 송수신을 위한 내부 전문과 MCI, EAI, FEP 등 타 시스템과의 연동을 위한 외부 전문으로 구분하는 데, 전문식별자는 다음과 같은 규칙을 사용해서 생성한다. </span>
				</h5>
			</div>
			<div className="card-body">
				<div className="mb-1 row">
					<div className="col-sm-3">

					</div>
				</div>

				<h5>
					<UI.Icon
						icon="Icon1Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='ms-1 text-dark fw-light'>전문식별자 길이는 15자리로 한다. </span>
				</h5>
				<h5>
					<UI.Icon
						icon="Icon2Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='text-dark fw-light'>전문식별자 </span>
					<span>첫번째 3자리 </span>
					<span className='text-dark fw-light'>는 </span>
					<span>사이트 구분 코드</span>
					<span className='text-dark fw-light'>를 사용한다. </span>
				</h5>
				<h5>
					<UI.Icon
						icon="Icon3Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='text-dark fw-light'>전문식별자 </span>
					<span>다음 3자리 </span>
					<span className='text-dark fw-light'>는 </span>
					<span>업무구분1 코드</span>
					<span className='text-dark fw-light'>를 사용한다. </span>
					<span>(공통코드에서 정의)</span>
				</h5>
				<h5>
					<UI.Icon
						icon="Icon4Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='text-dark fw-light'>전문식별자 </span>
					<span>다음 3자리 </span>
					<span className='text-dark fw-light'>는 </span>
					<span>업무구분2 코드</span>
					<span className='text-dark fw-light'>를 사용한다. </span>
					<span>(업무파트에서 정의)</span>
				</h5>
				<h5>
					<UI.Icon
						icon="Icon4Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='text-dark fw-light'>전문식별자 </span>
					<span>다음 5자리 </span>
					<span className='text-dark fw-light'>는 </span>
					<span>임의로 숫자를 증가</span>
					<span className='text-dark fw-light'>시키면서 설정한다.</span>
				</h5>
				<h5>
					<UI.Icon
						icon="Icon5Circle"
						color="gray"
						size={15}
						className='ms-3'
					/>
					<span className='text-dark fw-light'>전문식별자 </span>
					<span>다음 1자리 </span>
					<span className='text-dark fw-light'>는 </span>
					<span>시스템 구분 코드</span>
					<span className='text-dark fw-light'>를 사용한다. </span>
				</h5>
				


				<div className="mt-4">
					<table
						className="table table-striped table-bordered dt-head-center g-table-custom-sm display"
						style={{ width: '100%' }}
						ref={tableRef}

					>
						<colgroup>
							<col width="12%"></col>
							<col width="12%"></col>
							<col width="12%"></col>
							<col width="12%"></col>
							<col width="12%"></col>
							<col width="15%"></col>
							<col width="*"></col>
						</colgroup>

						<thead>
							<tr style={{ fontSize: '13px' ,fontWeight:'bolder' }}>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign:'center' }}>사이트구분</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>업무구분1</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>업무구분2</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>일련번호</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>시스템구분</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>전문식별자</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>전문명</th>
							</tr>
							<tr style={{ fontSize: '13px', fontWeight: 'bolder' }}>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>3</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>3</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>3</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>5</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>1</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>15</th>
								<th style={{ fontSize: '13px', fontWeight: 'bolder', textAlign: 'center' }}>-</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>PIB</td>
								<td>INQ</td>
								<td>AAA</td>
								<td>00003</td>
								<td>M</td>
								<td>PIBINQAAA0003M</td>
								<td>전계좌조회</td>
							</tr>
							<tr>
								<td>PIB</td>
								<td>TRN</td>
								<td>BBB</td>
								<td>00004</td>
								<td>M</td>
								<td>PIBTRNBBB0004M</td>
								<td>즉시이체 예비거래</td>
							</tr>
							<tr>
								<td>CMN</td>
								<td>LGI</td>
								<td>CCC</td>
								<td>00001</td>
								<td>I</td>
								<td>CMNLGICCC0001I</td>
								<td>로그인(내부)</td>
							</tr>
							<tr>
								<td>CMN</td>
								<td>LGI</td>
								<td>CCC</td>
								<td>00001</td>
								<td>M</td>
								<td>CMNLGICCC0001M</td>
								<td>로그인(HOST)</td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>

	
			<div style={{ width: '100%', textAlign: 'right' }}>
				
				<UI.Button  onClick={onCancel} >
					<UI.RFIcon
						icon="X"
						className="fill-white feather-sm mb-1"
					/>
					<span style={{ display: 'inline-block', marginLeft: '4px' }}>취소</span>
				</UI.Button>
			</div>

		</div>
	);
};

export default MessageIdRuleModal;
