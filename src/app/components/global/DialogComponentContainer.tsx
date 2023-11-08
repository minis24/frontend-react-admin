import React from 'react';
import { IDialogStatus } from '@/app/types/components';

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성.
export default class DialogComponentContainer extends React.Component {
	uiChild = () => {
		if (window.$ui && window.$ui.dialogComponentStatus && !window.$ui.dialogComponentStatus.dialogContainerVm) {
			window.$ui.dialogComponentStatus.dialogContainerVm = this;
		}

		if (window.$ui && window.$ui.dialogComponentStatus) {
			return window.$ui.dialogComponentStatus.list.map((popup: IDialogStatus, index: number) => {
				const attrProps = popup.params ? popup.params : {};
				return <div key={index}>{React.createElement(popup.component, { childKey: popup.key, ...attrProps })}</div>;
			});
		} else {
			return <></>;
		}
	};

	//componentDidMount() {
	//	if (window.$ui && window.$ui.dialogComponentStatus) {
	//		window.$ui.dialogComponentStatus.dialogContainerVm = this;
	//		console.log('dialogContainerVm셋팅::', window.$ui.dialogComponentStatus.dialogContainerVm);
	//	}
	//}

	render() {
		return (
			<div
				className="g-dialog-component-container"
				style={{ zIndex: '9999999' }}
			>
				{this.uiChild()}
			</div>
		);
	}
}
