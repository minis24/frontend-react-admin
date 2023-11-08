import UIDialog from '@/app/components/ui/ui-dialog/UIDialog';
import type { IDialogOption, IDialogStatusList } from '@/app/types/components';

export class DialogComponent {
	private _aliveTimer = null;

	private notify(statusValue: any): Promise<IDialogStatusList> {
		const data: any = statusValue;

		return new Promise((resolve) => {
			if (data) {
				data.resolve = resolve;
			}
		}).then((result) => {
			return result as IDialogStatusList;
		});
	}

	public open(component: typeof UIDialog, params: IDialogOption): Promise<IDialogStatusList> {
		console.log('ui dialog open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialogcomponent-key_${window.$ui.dialogComponentStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.$ui.dialogComponentStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});

		if ($ui.dialogComponentStatus.dialogContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			// DialogContainer컴포넌트가 class방식으로 만들어져서 forceUpdate함수를 사용할 수 있다.
			$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
		}

		// 자동해제 옵션이 있는경우
		//if (params.autoDismiss) {
		//	this._aliveTimer = setTimeout(() => {
		//		this.innerClose(key);
		//	}, params.autoDismiss) as any;
		//}

		return this.notify(window.$ui.dialogComponentStatus.list[window.$ui.dialogComponentStatus.list.length - 1]);
	}

	public innerClose(key: any) {
		if (!key) {
			return;
		}
		window.$ui.dialogComponentStatus.list.some((item, index) => {
			console.log('===== $ui.alert()함수에 item추가', item);
			if (key && key === window.$ui.dialogComponentStatus.list[index].key) {
				window.$ui.dialogComponentStatus.list[index].resolve(window.$ui.dialogComponentStatus.list[index]);
				window.$ui.dialogComponentStatus.list.splice(index, 1);
				if (window.$ui.dialogComponentStatus.dialogContainerVm) {
					window.$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
				}
			}
		});

		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.dialogComponentStatus.list[window.$ui.dialogComponentStatus.list.length - 1]);
	}

	// 외부에서 그냥 close했을경우 배열의 맨 마지막 것을 close한다.
	public _close(closeArg?: string) {
		const len = window.$ui.dialogComponentStatus.list.length;
		if (len > 0) {
			const index = len - 1;
			window.$ui.dialogComponentStatus.list[index].resolve(closeArg, window.$ui.dialogComponentStatus.list[index]);
			window.$ui.dialogComponentStatus.list.splice(index, 1);
			if (window.$ui.dialogComponentStatus.dialogContainerVm) {
				window.$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
			}
		}
		if (this._aliveTimer) {
			clearTimeout(this._aliveTimer);
		}
		return this.notify(window.$ui.dialogComponentStatus.list[window.$ui.dialogComponentStatus.list.length - 1]);
	}
}

function dialogComponent(message: IDialogOption): Promise<IDialogStatusList> | DialogComponent;
function dialogComponent(message: string): Promise<IDialogStatusList> | DialogComponent;
function dialogComponent(message: any, option: IDialogOption = {}): Promise<IDialogStatusList> | DialogComponent {
	console.log('call ui dialogComponent function!');
	const _inst = new DialogComponent();

	if (!message) {
		return _inst;
	}

	if (typeof message === 'object') {
		if (typeof message.close === 'string') {
			return _inst._close(message.close);
		} else if (message.close === true || message.close === false) {
			return _inst._close(message.close);
		} else {
			return _inst.open(UIDialog, {
				type: option.type,
				msg: message,
				title: option.title,
				element: option.element,
				onHide: message.onHide,
				//autoDismiss: option.autoDismiss,
			});
		}
	} else {
		return _inst.open(UIDialog, {
			type: option.type,
			msg: message,
			title: option.title,
			element: option.element,
			onHide: option.onHide,
			//autoDismiss: option.autoDismiss,
		});
	}
}

export default dialogComponent;
