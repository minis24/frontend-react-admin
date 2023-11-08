import UiConfirm from '@/app/components/ui/ui-dialog/UIConfirm';
import type { IConfirmOption } from '@/app/types/components';

export class Confirm {
	private notify(statusValue: any) {
		const data: any = statusValue;
		console.log('## notify :: data :: ' ,data);
		
		
		return new Promise((resolve,reject) => {
			console.log('## promise :: resolve :: ' ,resolve);
			
			if (data) {
				data.resolve = resolve;
				data.reject = reject;
			}

		}).then((result) => {
			console.log('## promise.then :: ', result)
			return result;
		}).catch((error)=>{
			console.log(error)
		});
	}






	public open(component: typeof UiConfirm, params: IConfirmOption) {
		console.log('\r\n\r\n =================================\r\n ui confirm open!! \r\n=======================================\r\n');
		
		console.log('0 :: [open] - component :: ',component)
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialog-key_${window.$ui.dialogStatus.key++}`;
		console.log('1 :: [ open ] - key :: ' , key);
		console.log('2 :: [ open ] - dialogStatus.list :: ' , window.$ui.dialogStatus.list);
		
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.$ui.dialogStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});

		console.log('3 :: [ open ] - dialogStatus.list :: ' , window.$ui.dialogStatus.list);
		


		if(!window.$ui.dialogStatus.dialogContainerVm){
			console.log('4 :: [ open ] - dialogContainerVm IS Null ');
			return false;
		}

		console.log('# :: [open] - dialogContainerVm :: ', window.$ui.dialogStatus.dialogContainerVm);

		
		// 팝업컨테이너가 새롭게 render하도록 한다.
		//forceUpdate()을 호출하면 곧바로 render()가 호출된다.
		window.$ui.dialogStatus.dialogContainerVm.forceUpdate();
		

		let currentIndex = window.$ui.dialogStatus.list.length - 1;
		console.log('5 :: [ open ] - currentIndex :: ' , currentIndex);

		let dialogComponent = window.$ui.dialogStatus.list[window.$ui.dialogStatus.list.length - 1]
		console.log('6 :: [ open ] - dialogComponent :: ' , dialogComponent);


		return this.notify(dialogComponent);
	}







	public close(key: any, result?: boolean) {
		console.log('\r\n\r\n =================================\r\n ui confirm close!! \r\n=======================================\r\n');
		console.log('1 :: [close] :: key :: ', key);
		if (!key) {

			console.log('[close] :: key IS NULL')
			return;
		}

		/*
		some()은 배열의 각 엘리먼트에 대해서 테스트 함수의 반환 값이 하나라도 true가 있는지 확인합니다.
		하나라도 true가 발생하면 true를 반환합니다.
		*/
		let idx :number = 9999;
		let iResult = window.$ui.dialogStatus.list.some((item, index) => {
			let closeComponentKey = key; //닫으려는 대상이 되는 component 의 key 값.
			let itemKey = window.$ui.dialogStatus.list[index].key // 목록에서 열거하고 있는 비교대상 component 의 키값 

			console.log('2 :: [close] :: closeComponentKey :: ', closeComponentKey );
			console.log('3 :: [close] :: itemKey           :: ', itemKey );
			console.log('4 :: [close] :: 키가 같나요?? :: ', closeComponentKey === itemKey)

			if (closeComponentKey === itemKey) {
				//window.$ui.dialogStatus.list[index].resolve(result);
				//window.$ui.dialogStatus.list.splice(index, 1);
				if (window.$ui.dialogStatus.dialogContainerVm) {
					window.$ui.dialogStatus.dialogContainerVm.forceUpdate();
				}
				idx  = index;
				return true;
			}else{
				console.log('5 :: [close] :: 키가 다름. 리턴.' )
			}
		});


		console.log('7 :: idx :: ' , idx );
		console.log('8 :: iResult :: ', iResult)
		console.log('9 :: dialogStatus.list :: ',window.$ui.dialogStatus.list);

		if(iResult){
			let dialogComponent = window.$ui.dialogStatus.list[idx]
			console.log('6 :: [close] :: dialogComponent :: ',dialogComponent )
			dialogComponent.resolve(result);
			window.$ui.dialogStatus.list.splice(idx, 1);
			return this.notify(dialogComponent);
		} else{
			console.log('10 :: [close] :: 비교결과 :: 일치하는 키 없음. ' );
		}
	}
}






export default (message: string, option: IConfirmOption = {}) => {
	console.log('call ui confirm function!');
	const _inst = new Confirm();

	if (!message) {
		return _inst;
	}

	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

	return _inst.open(UiConfirm, {
		msg: message,
		title: option.title,
		confirmButton: option.confirmButton,
		cancelButton: option.cancelButton,
	});
};
