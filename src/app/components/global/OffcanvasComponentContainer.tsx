import React from 'react';
import { IOffcanvasStatus } from '@/app/types/components';

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성.
export default class OffcanvasComponentContainer extends React.Component {
	uiChild = () => {
		if (
			window.$ui &&
			window.$ui.offcanvasComponentStatus &&
			!window.$ui.offcanvasComponentStatus.offcanvasContainerVm
		) {
			window.$ui.offcanvasComponentStatus.offcanvasContainerVm = this;
		}

		if (window.$ui && window.$ui.offcanvasComponentStatus) {
			return window.$ui.offcanvasComponentStatus.list.map((popup: IOffcanvasStatus, index: number) => {
				const attrProps = popup.params ? popup.params : {};
				return <div key={index}>{React.createElement(popup.component, { childKey: popup.key, ...attrProps })}</div>;
			});
		} else {
			return <></>;
		}
	};

	//componentDidMount() {
	//	if (window.$ui && window.$ui.offcanvasComponentStatus) {
	//		window.$ui.offcanvasComponentStatus.offcanvasContainerVm = this;
	//		console.log('offcanvasContainerVm셋팅::', window.$ui.offcanvasComponentStatus.offcanvasContainerVm);
	//	}
	//}

	render() {
		return (
			<div
				className="g-offcanvas-component-container"
				style={{ zIndex: '9999999' }}
			>
				{this.uiChild()}
			</div>
		);
	}
}
