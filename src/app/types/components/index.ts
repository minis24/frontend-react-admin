// 공통 components관련 타입을 정의
//----------------------------------------

import type { ReactNode } from 'react';
import * as RBIcon from 'react-bootstrap-icons';
import * as RFIconComp from 'react-feather';
import * as MDIconComp from '@mdi/js';
//import { ButtonProps } from 'react-bootstrap/Button';
import { ButtonProps, FormProps, CollapseProps } from 'reactstrap/types';
import Icon from '@/app/components/ui/ui-icon/UIIcon';
import RFIcon from '@/app/components/ui/ui-icon/UIRFIcon';
import MDIcon from '@/app/components/ui/ui-icon/UIMDIcon';
//import Button from '@/app/components/ui/ui-button/UIButton';
import { OffcanvasProps } from 'react-bootstrap/Offcanvas';
import { Colors, ColorsOutline } from 'bootstrap-switch-button-react';
import { InputProps } from 'reactstrap';
import { ColumnSettings, ColumnDefsSettings } from 'UIDataTable/types';

export type TUIIcon = keyof typeof RBIcon;
export type TUIRFIcon = keyof typeof RFIconComp;
export type TUIMDIcon = keyof typeof MDIconComp;
export interface IUIIconProps extends RBIcon.IconProps {
	icon: TUIIcon | TUIRFIcon | TUIMDIcon;
}

export interface IMDIconProps {
	id?: string;
	path: string;
	ref?: any;
	title?: string | null;
	description?: string | null;
	size?: number | string | null;
	color?: string | null;
	horizontal?: boolean;
	vertical?: boolean;
	rotate?: number;
	spin?: boolean | number;
	style?: any;
	inStack?: boolean;
}

export interface IUIButtonProps extends ButtonProps {
	text?: string;
}

export interface IDialogStatus {
	component?: any;
	params?: any;
	key: number;
	list: any[];
	dialogContainerVm: any;
}

export interface IUiJS {
	dialogStatus: IDialogStatus;
	dialogComponentStatus: IDialogStatus;
	tooltipComponentStatus: ITooltipStatus;
	offcanvasComponentStatus: IOffcanvasStatus;
	alert: TAlert;
	confirm: TConfirm;
	dialog: TDialog;
	tooltip: TTooltip;
	offcanvas: TOffcanvas;
}

export interface IUi {
	Icon: typeof Icon;
	RFIcon: typeof RFIcon;
	MDIcon: typeof MDIcon;
	//Button: typeof Button;
}

// UI - Alert 컴포넌트 types ----------------------------------
export type TAlert = (
	message?: string | IAlertOption,
	option?: IAlertOption,
) => Promise<any> & { innerClose: (reactNode: any) => void };

export interface IAlertOption {
	type?: 'success' | 'info' | 'warning' | 'error';
	close?: boolean;
	msg?: string;
	title?: string;
	autoDismiss?: number;
}

export interface IAlertStatusList {
	component: ReactNode;
	componentInstance: null;
	key: string;
	params: IAlertOption;
	resolve: any;
}

// UI - Confirm 컴포넌트 types ----------------------------------
export type TConfirm = (
	message?: string,
	option?: IConfirmOption,
) => Promise<any> & { close: (reactNode: any, result: boolean) => void };

export interface IConfirmOption {
	type?: 'success' | 'info' | 'warning' | 'error';
	msg?: string;
	title?: string;
	confirmButton?: string;
	cancelButton?: string;
}

// UI - InputField 컴포넌트 types ----------------------------------
export interface IInputField extends HTMLInputElement {
	validate: () => void;
	initValidate: () => void;
}

// UI - Form 컴포넌트 types ----------------------------------------
export interface IForm extends HTMLFormElement {
	validate: () => boolean;
	initValidate: () => void;
}
export interface IUIFormProps extends FormProps {
	test?: string;
}

// UI - Dialog 컴포넌트 types ----------------------------------
export type TDialog = (
	message?: string | IDialogOption,
	option?: IDialogOption,
) => Promise<any> & { innerClose: (reactNode: any) => void };

export interface IDialogOption {
	type?: 'success' | 'info' | 'warning' | 'error';
	msg?: string;
	title?: string;
	confirmButton?: string;
	cancelButton?: string;
	close?: boolean | string;
	element?: React.ReactNode;
	dialogSize?: 'xl' | 'lg' | 'sm' | 'md';
	//LSH - 오프캔버스 위에 모달 띄우는 케이스때문에 추가
	backdrop?: 'static' | true | false;
	zIndex?: string;
	keyboard?: boolean;
	//LSH ---- END
	onHide?: (res: any) => void;
}

export interface IDialogStatusList {
	component: ReactNode;
	componentInstance: null;
	key: string;
	params: IAlertOption;
	resolve: any;
}

// UI - Treeview 컴포넌트 types ----------------------------------
export interface IUITreeviewProps {
	data: TUITreeviewData[];
	expandIcon?: string;
	collapseIcon?: string;
	onClick?: (item: TUITreeviewData) => void;
}

export interface IUITreeviewListProps {
	data: TUITreeviewData[];
	expandIcon?: string;
	collapseIcon?: string;
	onClick?: (item: TUITreeviewData) => void;
}

export type TUITreeviewData = {
	title?: string;
	action?: Function | string;
	icon?: string;
	nodes?: TUITreeviewData[];
};

// UI - Switch 컴포넌트 types ----------------------------------------
interface BootstrapSwitchButtonProps {
	/**
	 * Function to call when the SwitchButton is changed
	 */
	onChange?: (checked: boolean) => void;
	checked?: boolean;
	disabled?: boolean;
	onlabel?: string;
	offlabel?: string;
	onstyle?: Colors | ColorsOutline;
	offstyle?: Colors | ColorsOutline;
	size?: 'xs' | 'sm' | 'lg';
	style?: string;
	width?: number;
	height?: number;
}
export interface ISwitch extends HTMLElement {
	validate: () => void;
	initValidate: () => void;
}
export interface IUISwitchProps extends BootstrapSwitchButtonProps {
	test?: string;
}

// UI - Select 컴포넌트 types ----------------------------------------
export interface ISelect extends HTMLElement {
	validate: () => void;
	initValidate: () => void;
}
export interface IUISelectProps extends InputProps {
	required?: boolean;
	theme?: 'default' | 'bootstrap';
	inlineLabel?: boolean;
	label?: string;
	id?: string;
	name?: string;
	selectStyle?: object;
	className?: string;
	errorMessage?: string;
	options?: { value: string; text: string }[];
	onChange?: (e: any) => void;
	onBlur?: (e: any) => void;
}

// UI - DataTable 컴포넌트 types ----------------------------------------
export interface IUIDataTable {}
export interface IUIDataTableProps {
	data: any[];
	columns: ColumnSettings[];
	columnDefs: ColumnDefsSettings[];
}

// UI - Tooltip 컴포넌트 types ------------------------------------------
export type TTooltip = (
	message?: string | ITooltipOption,
	option?: ITooltipOption,
) => Promise<any> & { innerClose: (reactNode: any) => void };

export interface ITooltipOption {
	isOpen?: boolean;
	msg?: string;
	target: string;
}

export interface ITooltipStatus {
	component?: any;
	params?: any;
	key: number;
	list: any[];
	tooltipContainerVm: any;
}

export interface ITooltipStatusList {
	component: ReactNode;
	componentInstance: null;
	key: string;
	params: IAlertOption;
	resolve: any;
}

// UI - Offcanvas 컴포넌트 types ------------------------------------
export type TOffcanvas = (
	message?: string | IOffcanvasOption,
	option?: IOffcanvasOption,
) => Promise<any> & { innerClose: (reactNode: any) => void };

export interface IUIOffcanvasProps extends OffcanvasProps {
	title?: string;
	closeButton?: boolean;
}

export interface IOffcanvasOption {
	type?: 'success' | 'info' | 'warning' | 'error';
	msg?: string;
	title?: string;
	close?: boolean | string;
	closeButton?: boolean;
	element?: React.ReactNode;
	dialogSize?: 'xl' | 'lg' | 'sm';
	height?: string;
	className?: string;
	bodyClassName?: string;
}

export interface IOffcanvasStatus {
	component?: any;
	params?: any;
	key: number;
	list: any[];
	offcanvasContainerVm: any;
}

export interface IOffcanvasStatusList {
	component: ReactNode;
	componentInstance: null;
	key: string;
	params: IAlertOption;
	resolve: any;
}

// UI - Checkbox 컴포넌트 types -------------------------------------
export interface IUICheckboxProps {
	label?: string;
	id?: string;
	color?: string;
	name?: string;
	value?: string | number;
	onChange?: (e: any) => void;
	checked?: boolean;
	className?: string;
	inline?: boolean;
	outline?: boolean;
	disabled?: boolean;
	lightStyle?: boolean;
	style?: any;
}

// UI - Collapse 컴포넌트 types ----------------------------------
export interface IUICollapseProps extends CollapseProps {
	test?: any;
}
