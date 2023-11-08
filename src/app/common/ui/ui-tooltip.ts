import UITooltip from '@/app/components/ui/ui-tooltip/UITooltip';
import type { ITooltipOption, ITooltipStatusList } from '@/app/types/components';

export class TooltipComponent {
	private _aliveTimer = null;

	private notify(statusValue: any): Promise<ITooltipStatusList> {
		const data: any = statusValue;

		return new Promise((resolve) => {
			if (data) {
				data.resolve = resolve;
			}
		}).then((result) => {
			return result as ITooltipStatusList;
		});
	}

	public open(component: typeof UITooltip, params: ITooltipOption): Promise<ITooltipStatusList> {
		//console.log('ui tooltip open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-tooltipcomponent-key_${window.$ui.tooltipComponentStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.$ui.tooltipComponentStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});

		if ($ui.tooltipComponentStatus.tooltipContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			// DialogContainer컴포넌트가 class방식으로 만들어져서 forceUpdate함수를 사용할 수 있다.
			$ui.tooltipComponentStatus.tooltipContainerVm.forceUpdate();
		}

		// 자동해제 옵션이 있는경우
		//if (params.autoDismiss) {
		//	this._aliveTimer = setTimeout(() => {
		//		this.innerClose(key);
		//	}, params.autoDismiss) as any;
		//}

		return this.notify(window.$ui.tooltipComponentStatus.list[window.$ui.tooltipComponentStatus.list.length - 1]);
	}

	public innerClose(key: any) {
		if (!key) {
			return;
		}
		window.$ui.tooltipComponentStatus.list.some((item, index) => {
			//console.log('===== $ui.alert()함수에 item추가', item);
			if (key && key === window.$ui.tooltipComponentStatus.list[index].key) {
				window.$ui.tooltipComponentStatus.list[index].resolve(window.$ui.tooltipComponentStatus.list[index]);
				window.$ui.tooltipComponentStatus.list.splice(index, 1);
				if (window.$ui.tooltipComponentStatus.tooltipContainerVm) {
					window.$ui.tooltipComponentStatus.tooltipContainerVm.forceUpdate();
				}
			}
		});

		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.tooltipComponentStatus.list[window.$ui.tooltipComponentStatus.list.length - 1]);
	}

	// 외부에서 그냥 close했을경우 배열의 맨 마지막 것을 close한다.
	public _close(closeArg?: string) {
		const len = window.$ui.tooltipComponentStatus.list.length;
		if (len > 0) {
			const index = len - 1;
			window.$ui.tooltipComponentStatus.list[index].resolve(closeArg, window.$ui.tooltipComponentStatus.list[index]);
			window.$ui.tooltipComponentStatus.list.splice(index, 1);
			if (window.$ui.tooltipComponentStatus.tooltipContainerVm) {
				window.$ui.tooltipComponentStatus.tooltipContainerVm.forceUpdate();
			}
		}
		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.tooltipComponentStatus.list[window.$ui.tooltipComponentStatus.list.length - 1]);
	}
}

function tooltipComponent(message: ITooltipOption): Promise<ITooltipStatusList> | TooltipComponent;
function tooltipComponent(message: string): Promise<ITooltipStatusList> | TooltipComponent;
function tooltipComponent(
	message: any,
	option: ITooltipOption = { target: '' },
): Promise<ITooltipStatusList> | TooltipComponent {
	//console.log('call ui TooltipComponent function!');
	const _inst = new TooltipComponent();

	if (!message) {
		return _inst;
	}

	//if (typeof message === 'object') {
	//	if (typeof message.close === 'string') {
	//		return _inst._close(message.close);
	//	} else if (message.close === true || message.close === false) {
	//		return _inst._close(message.close);
	//	} else {
	//		return _inst.open(UIDialog, {
	//			type: option.type,
	//			msg: message,
	//			title: option.title,
	//			element: option.element,
	//			//autoDismiss: option.autoDismiss,
	//		});
	//	}
	//} else {

	if (option.isOpen) {
		return _inst.open(UITooltip, {
			isOpen: option.isOpen,
			msg: message,
			target: option.target,
		});
	} else {
		return _inst._close('false');
	}

	//}
}

export default tooltipComponent;
