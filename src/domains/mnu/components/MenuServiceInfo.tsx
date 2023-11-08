"use Strict"
//debugger

import { forwardRef, useEffect, useState } from "react";


// Datetime picker plugin file
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

//react-datetime
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


//react-timepicker
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export interface ISetMenuIdHandle{
	setMenuId: () => void;
}

interface IProps {
	menuId: string;
}


//alert 제목 (일반)
const TITLE: string = '알림확인';
//alert 제목 (오류)
const TITLE_ERROR: string = '오류확인';








//React.ForwardRefExoticComponent<IMnuInfoProps,React.>
//const MnuInfo: React.FC<IMnuInfoProps> = (props) => {
const MnuServiceInfo = forwardRef<ISetMenuIdHandle,IProps>((props, ref) =>{
	console.log('----------------------------------------------------');
	console.log('MnuInfo 컴포넌트 렌더링 START');
	console.log('----------------------------------------------------');
	console.log('props', props);
	console.log('ref',ref);

	const [useAtState,setUseAtState] = useState(false);
	const [exposeState, setExposeState] = useState(false);
	const [statusState, setStatusState] = useState(false);

	const [startDate, setStartDate] = useState(new Date());


	useEffect(()=> {
		console.log('useEffect(()=> {,[]}');
		console.log('useAtState:', useAtState)
	}, [useAtState]);

	//================================================================================
	//이벤트 핸들러
	//================================================================================
	const handlerOnChangeExposeSwitch = () => {
	/* 	console.log(event.target.value) */
		setExposeState(!exposeState);
	}
	const handlerOnChangeUseAtSwitch = () => {
		/* 	console.log(event.target.value) */
		setUseAtState(!useAtState);
	}

	const handlerOnChangeStartDateState = (index:number,date:Date)=>{
		console.log('date:',date)
		setStartDate(date);
	}


	const [value, onChange] = useState('10:00');

	return (

		<div className="card">
			<div className="card-header"><span style={{ fontWeight: 700 }}>메뉴 서비스정보</span> </div>
			<div className="card-body" style={{ minHeight: '700px' }}>

				<form className="form-horizontal">

					{/* ---------------------------------------------- */}
					{/* 서비스 시작 일시 */}
					{/* ---------------------------------------------- */}
					<div className="mb-3">
						<label>서비스 시작일시 </label>
						<DatePicker 
							showIcon
							showTimeSelect
							locale={ko}
							//showMonthDropdown
							timeFormat="p"
							selected={startDate} 
							timeIntervals={30}
							//dateFormat="Pp"
							dateFormat="yyyy-MM-dd HH:mm"
							onChange={(date:Date) => { handlerOnChangeStartDateState(1,date)}} 
							placeholderText="I have been cleared!"
						/>
							
						<DateTimePicker
							locale="kr"
							//locale={ko}
							//dateFormat={false}
							inputProps={{ placeholder: 'Time Picker Here' }}
						/>

						<TimePicker onChange={()=>onChange} value={value}/>
						<UI.InputField
							type="text"
							className="form-control"
							/* value={requestUrlState}
							onChange={handlerRequestUrlInputChange} */
						/>

						
					</div>
					{/* ---------------------------------------------- */}
					{/* 서비스 종료 일시 */}
					{/* ---------------------------------------------- */}
					<div className="mb-3">
						<label>서비스 종료일시 </label>
						<UI.InputField
							type="text"
							className="form-control"
						/* value={requestUrlState}
						onChange={handlerRequestUrlInputChange} */
						/>
					</div>

					{/* ---------------------------------------------- */}
					{/* 화면에 표시여부 */}
					{/* ---------------------------------------------- */}
					<div className="mb-3">
						<label>화면에 노출 여부 </label>
						<UI.Switch
							onlabel={'표시'}
							offlabel="미표시"
							onstyle="info"
							width={120}
							checked={ true}
							onChange={() => {
								//setUseAt(useAt === 'Y' ? 'N' : 'Y');
							}}
						></UI.Switch>

					</div>

					{/* ---------------------------------------------- */}
					{/* 서비스 사용여부 */}
					{/* ---------------------------------------------- */}
					<div className="mb-3">
						<label>서비스 사용 여부 </label>
						<UI.Switch
							onlabel={'사용'}
							offlabel={'미사용'}
							onstyle="info"
							width={120}
							checked={true}
							onChange={() => {
								//setUseAt(useAt === 'Y' ? 'N' : 'Y');
							}}
						></UI.Switch>
					</div>

				</form>
			</div>
		</div>

	)

});







export default MnuServiceInfo;