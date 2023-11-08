import UiAlert from '@/app/components/ui/ui-dialog/UIAlert';
import type { IAlertOption, IAlertStatusList } from '@/app/types/components';

export class Alert {
	private _aliveTimer = null;

	private notify(statusValue: any): Promise<IAlertStatusList> {
		const data: any = statusValue;

		return new Promise((resolve) => {
			if (data) {
				data.resolve = resolve;
			}
		}).then((result) => {
			return result as IAlertStatusList;
		});
	}

	public open(component: typeof UiAlert, params: IAlertOption): Promise<IAlertStatusList> {
		console.log('ui alert open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialog-key_${window.$ui.dialogStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.$ui.dialogStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});

		if ($ui.dialogStatus.dialogContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			// DialogContainer컴포넌트가 class방식으로 만들어져서 forceUpdate함수를 사용할 수 있다.
			$ui.dialogStatus.dialogContainerVm.forceUpdate();
		}

		// 자동해제 옵션이 있는경우
		if (params.autoDismiss) {
			this._aliveTimer = setTimeout(() => {
				this.innerClose(key);
			}, params.autoDismiss) as any;
		}

		return this.notify(window.$ui.dialogStatus.list[window.$ui.dialogStatus.list.length - 1]);
	}

	public innerClose(key: any) {
		if (!key) {
			return;
		}
		window.$ui.dialogStatus.list.some((item, index) => {
			console.log('===== $ui.alert()함수에 item추가', item);
			if (key && key === window.$ui.dialogStatus.list[index].key) {
				window.$ui.dialogStatus.list[index].resolve(window.$ui.dialogStatus.list[index]);
				window.$ui.dialogStatus.list.splice(index, 1);
				if (window.$ui.dialogStatus.dialogContainerVm) {
					window.$ui.dialogStatus.dialogContainerVm.forceUpdate();
				}
			}
		});

		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.dialogStatus.list[window.$ui.dialogStatus.list.length - 1]);
	}

	// 외부에서 그냥 close했을경우 배열의 맨 마지막 것을 close한다.
	public _close() {
		const len = window.$ui.dialogStatus.list.length;
		if (len > 0) {
			const index = len - 1;
			window.$ui.dialogStatus.list[index].resolve(window.$ui.dialogStatus.list[index]);
			window.$ui.dialogStatus.list.splice(index, 1);
			if (window.$ui.dialogStatus.dialogContainerVm) {
				window.$ui.dialogStatus.dialogContainerVm.forceUpdate();
			}
		}
		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.dialogStatus.list[window.$ui.dialogStatus.list.length - 1]);
	}
}

function alert(message: IAlertOption): Promise<IAlertStatusList> | Alert;
function alert(message: string): Promise<IAlertStatusList> | Alert;
function alert(message: any, option: IAlertOption = {}): Promise<IAlertStatusList> | Alert {
	console.log('call ui alert function!');
	const _inst = new Alert();

	if (!message) {
		return _inst;
	}

	if (typeof message === 'object') {
		if (message.close) {
			return _inst._close();
		} else {
			return _inst.open(UiAlert, {
				type: option.type,
				msg: message,
				title: option.title,
				autoDismiss: option.autoDismiss,
			});
		}
	} else {
		return _inst.open(UiAlert, {
			type: option.type,
			msg: message,
			title: option.title,
			autoDismiss: option.autoDismiss,
		});
	}
}

export default alert;
