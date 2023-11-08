import React from 'react';
import { ITooltipStatus } from '@/app/types/components';

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성.
export default class TooltipComponentContainer extends React.Component {
	uiChild = () => {
		if (window.$ui && window.$ui.tooltipComponentStatus && !window.$ui.tooltipComponentStatus.tooltipContainerVm) {
			window.$ui.tooltipComponentStatus.tooltipContainerVm = this;
		}

		if (window.$ui && window.$ui.tooltipComponentStatus) {
			return window.$ui.tooltipComponentStatus.list.map((popup: ITooltipStatus, index: number) => {
				const attrProps = popup.params ? popup.params : {};
				return <div key={index}>{React.createElement(popup.component, { childKey: popup.key, ...attrProps })}</div>;
			});
		} else {
			return <></>;
		}
	};

	//componentDidMount() {
	//	if (window.$ui && window.$ui.tooltipComponentStatus) {
	//		window.$ui.tooltipComponentStatus.tooltipContainerVm = this;
	//		console.log('tooltipContainerVm셋팅::', window.$ui.tooltipComponentStatus.tooltipContainerVm);
	//	}
	//}

	render() {
		return (
			<div
				className="g-tooltip-component-container"
				style={{ zIndex: '9999999' }}
			>
				{this.uiChild()}
			</div>
		);
	}
}
