import React from 'react';
import { IDialogStatus } from '@/app/types/components';

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성.
export default class DialogContainer extends React.Component {
	uiChild = () => {

		if (!window.$ui){
			console.log('=========================================')
			console.log('==> 오류 : $ui IS NULL (window.$ui) :: ', window.$ui)
			console.log('=========================================')
			return;
		}

		if (!window.$ui.dialogStatus) {
			console.log('=========================================')
			console.log('==> 오류 : dialogStatus  IS NULL (window.$ui.dialogStatus) :: ', window.$ui.dialogStatus)
			console.log('=========================================')
			
			return <></>;
		}





		console.log('1 :: DialogContainer :: [uiChild ()] :: dialogStatus ', window.$ui.dialogStatus)
		console.log('2 :: DialogContainer :: [uiChild ()] :: dialogContainerVm ', window.$ui.dialogStatus.dialogContainerVm)



		if (!window.$ui.dialogStatus.dialogContainerVm) {
			console.log('3 :: DialogContainer :: [uiChild ()] :: dialogContainerVm IS null :: ')
			window.$ui.dialogStatus.dialogContainerVm = this;
			
		}

		console.log('4 :: DialogContainer :: [uiChild ()] :: dialogContainerVm :: ', window.$ui.dialogStatus.dialogContainerVm)
		console.log('5 :: DialogContainer :: [uiChild ()] :: dialogStatus.list :: ', window.$ui.dialogStatus.list)


		//첫 로딩시...list.length가 0이므로...실행되지 않음.
		return window.$ui.dialogStatus.list.map((popup: IDialogStatus, index: number) => {
			console.log('6 :: DialogContainer :: [uiChild ()] :: index ::  ' ,index);
			console.log('7 :: DialogContainer :: [uiChild ()] :: popup ::  ', popup);
			const attrProps = popup.params ? popup.params : {};

			console.log('8 :: DialogContainer :: [uiChild ()] :: popup.key, ::  ', popup.key,);
			console.log('9 :: DialogContainer :: [uiChild ()] :: attrProps ::  ', attrProps);

			return <div key={index}>{React.createElement(popup.component, { childKey: popup.key, ...attrProps })}</div>;
		});





		/* else {
			console.log('6 :: DialogContainer :: [usChild ()] :: dialogStatus  ::  ', window.$ui.dialogStatus)
			return <></>;
		} */
	};




	//componentDidMount() {
	//	if (window.$ui && window.$ui.dialogStatus) {
	//		window.$ui.dialogStatus.dialogContainerVm = this;
	//		console.log('dialogContainerVm셋팅::', window.$ui.dialogStatus.dialogContainerVm);
	//	}
	//}

	render() {

		console.log('5 :: DialogContainer :: [render ()] :: dialogStatus.list ::  ', window.$ui.dialogStatus.list);
		console.log('6 :: DialogContainer :: [render ()] :: this.uiChild() :: ', this.uiChild())
		return (
			<div
				className="g-dialog-container"
				style={{ zIndex: '9999999' }}
			>
				{this.uiChild()}
			</div>
		);
	}
}
