import UIOffcanvas from '@/app/components/ui/ui-offcanvas/UIOffcanvasComponent';
import type { IOffcanvasOption, IOffcanvasStatusList } from '@/app/types/components';

export class OffcanvasComponent {
	private _aliveTimer = null;

	private notify(statusValue: any): Promise<IOffcanvasStatusList> {
		const data: any = statusValue;

		return new Promise((resolve) => {
			if (data) {
				data.resolve = resolve;
			}
		}).then((result) => {
			return result as IOffcanvasStatusList;
		});
	}

	public open(component: typeof UIOffcanvas, params: IOffcanvasOption): Promise<IOffcanvasStatusList> {
		console.log('ui offcanvas open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialogcomponent-key_${window.$ui.offcanvasComponentStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.$ui.offcanvasComponentStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});

		if ($ui.offcanvasComponentStatus.offcanvasContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			// DialogContainer컴포넌트가 class방식으로 만들어져서 forceUpdate함수를 사용할 수 있다.
			$ui.offcanvasComponentStatus.offcanvasContainerVm.forceUpdate();
		}

		// 자동해제 옵션이 있는경우
		//if (params.autoDismiss) {
		//	this._aliveTimer = setTimeout(() => {
		//		this.innerClose(key);
		//	}, params.autoDismiss) as any;
		//}

		return this.notify(window.$ui.offcanvasComponentStatus.list[window.$ui.offcanvasComponentStatus.list.length - 1]);
	}

	public innerClose(key: any) {
		if (!key) {
			return;
		}
		window.$ui.offcanvasComponentStatus.list.some((item, index) => {
			console.log('===== $ui.offcanvas()함수에 item추가', item);
			if (key && key === window.$ui.offcanvasComponentStatus.list[index].key) {
				window.$ui.offcanvasComponentStatus.list[index].resolve(window.$ui.offcanvasComponentStatus.list[index]);
				window.$ui.offcanvasComponentStatus.list.splice(index, 1);
				if (window.$ui.offcanvasComponentStatus.offcanvasContainerVm) {
					window.$ui.offcanvasComponentStatus.offcanvasContainerVm.forceUpdate();
				}
			}
		});

		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.offcanvasComponentStatus.list[window.$ui.offcanvasComponentStatus.list.length - 1]);
	}

	// 외부에서 그냥 close했을경우 배열의 맨 마지막 것을 close한다.
	public _close(closeArg?: string) {
		const len = window.$ui.offcanvasComponentStatus.list.length;
		if (len > 0) {
			const index = len - 1;
			window.$ui.offcanvasComponentStatus.list[index].resolve(
				closeArg,
				window.$ui.offcanvasComponentStatus.list[index],
			);
			window.$ui.offcanvasComponentStatus.list.splice(index, 1);
			if (window.$ui.offcanvasComponentStatus.offcanvasContainerVm) {
				window.$ui.offcanvasComponentStatus.offcanvasContainerVm.forceUpdate();
			}
		}
		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.offcanvasComponentStatus.list[window.$ui.offcanvasComponentStatus.list.length - 1]);
	}
}

function offcanvasComponent(message: IOffcanvasOption): Promise<IOffcanvasStatusList> | OffcanvasComponent;
function offcanvasComponent(message: string): Promise<IOffcanvasStatusList> | OffcanvasComponent;
function offcanvasComponent(
	message: any,
	option: IOffcanvasOption = {},
): Promise<IOffcanvasStatusList> | OffcanvasComponent {
	console.log('call ui offcanvas component function!');
	const _inst = new OffcanvasComponent();

	if (!message) {
		return _inst;
	}

	if (typeof message === 'object') {
		if (typeof message.close === 'string') {
			return _inst._close(message.close);
		} else if (message.close === true || message.close === false) {
			return _inst._close(message.close);
		} else {
			return _inst.open(UIOffcanvas, {
				type: message.type,
				msg: message,
				title: message.title,
				element: message.element,
				height: message.height,
				className: message.className,
				bodyClassName: message.bodyClassName,
				//autoDismiss: option.autoDismiss,
			});
		}
	} else {
		return _inst.open(UIOffcanvas, {
			type: option.type,
			msg: message,
			title: option.title,
			element: option.element,
			height: option.height,
			className: option.className,
			bodyClassName: option.bodyClassName,
			//autoDismiss: option.autoDismiss,
		});
	}
}

export default offcanvasComponent;
