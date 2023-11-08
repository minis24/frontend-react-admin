import { TAlert, TConfirm, TDialog, TTooltip, TOffcanvas } from '@/app/types/components';
import alert from '@/app/common/ui/ui-alert';
import confirm from '@/app/common/ui/ui-confirm';
import Icon from '@/app/components/ui/ui-icon/UIIcon';
import RFIcon from '@/app/components/ui/ui-icon/UIRFIcon';
import MDIcon from '@/app/components/ui/ui-icon/UIMDIcon';
import Button from '@/app/components/ui/ui-button/UIButton';
import InputField from '@/app/components/ui/ui-input/UIInputField';
import Form from '@/app/components/ui/ui-input/UIForm';
import dialogComponent from '@/app/common/ui/ui-dialog';
import Treeview from '@/app/components/ui/ui-treeview/UITreeview';
import Offcanvas from '@/app/components/ui/ui-offcanvas/UIOffcanvas';
import Switch from '@/app/components/ui/ui-switch/UISwitch';
import Select from '@/app/components/ui/ui-select/UISelect';
import DataTable from '@/app/components/ui/ui-datatable/UIDataTable';
import tooltipComponent from '@/app/common/ui/ui-tooltip';
import offcanvasComponent from '@/app/common/ui/ui-offcanvas';
import Checkbox from '@/app/components/ui/ui-checkbox/UICheckbox';
import Collapse from '@/app/components/ui/ui-collapse/UICollapse';

export function setUiJS() {
	const dialog = {
		dialogStatus: {
			key: 0, // 팝업 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 팝업 컴포넌트들을 저장하는 리스트
			dialogContainerVm: null, // 팝업이 열릴 컨테이너 div의 인스턴스
		},
		dialogComponentStatus: {
			key: 0, // 팝업 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 팝업 컴포넌트들을 저장하는 리스트
			dialogContainerVm: null, // 팝업이 열릴 컨테이너 div의 인스턴스
		},
		tooltipComponentStatus: {
			key: 0, // Tooltip 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 Tooltip 컴포넌트들을 저장하는 리스트
			tooltipContainerVm: null, // Tooltip이 열릴 컨테이너 div의 인스턴스
		},
		offcanvasComponentStatus: {
			key: 0, // offcanvas 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 offcanvas 컴포넌트들을 저장하는 리스트
			offcanvasContainerVm: null, // offcanvas가 열릴 컨테이너 div의 인스턴스
		},
		alert: alert as TAlert,

		/*
		// UI - Confirm 컴포넌트 types ----------------------------------
			export type TConfirm = (
				message?: string,
				option?: IConfirmOption,
			) => Promise<any> & { close: (reactNode: any, result: boolean) => void };
		*/
		confirm: confirm as TConfirm,
		dialog: dialogComponent as unknown as TDialog,
		tooltip: tooltipComponent as unknown as TTooltip,
		offcanvas: offcanvasComponent as unknown as TOffcanvas,
	};
	return dialog;
}

export default {
	Icon,
	RFIcon,
	MDIcon,
	Button,
	InputField,
	Form,
	Treeview,
	Offcanvas,
	Switch,
	Select,
	DataTable,
	Checkbox,
	Collapse,
};
