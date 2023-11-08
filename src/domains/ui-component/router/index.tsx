import { TCustomRoute } from '@/app/types/router';
import loadable from '@loadable/component';
const UIAlert = loadable(() => import('@/domains/ui-component/pages/UIAlert'));
const UIConfirm = loadable(() => import('@/domains/ui-component/pages/UIConfirm'));
const UIDialog = loadable(() => import('@/domains/ui-component/pages/UIDialog'));
const UIInputField = loadable(() => import('@/domains/ui-component/pages/UIInputField'));
const UIButton = loadable(() => import('@/domains/ui-component/pages/UIButton'));
const UITreeView = loadable(() => import('@/domains/ui-component/pages/UITreeView'));
const UIOffcanvas = loadable(() => import('@/domains/ui-component/pages/UIOffcanvas'));
const UICheckboxDemo = loadable(() => import('@/domains/ui-component/pages/UICheckboxDemo'));

const routes: TCustomRoute[] = [
	{
		path: 'ui-alert',
		element: <UIAlert />,
		name: 'UI.Alert($ui.alert) 컴포넌트',
	},
	{
		path: 'ui-confirm',
		element: <UIConfirm />,
		name: 'UI.Confirm($ui.confirm) 컴포넌트',
	},
	{
		path: 'ui-dialog',
		element: <UIDialog />,
		name: 'UI.Dialog($ui.dialog) 컴포넌트',
	},
	{
		path: 'ui-inputfield',
		element: <UIInputField />,
		name: 'UI.InputField 컴포넌트',
	},
	{
		path: 'ui-button',
		element: <UIButton />,
		name: 'UI.Button 컴포넌트',
	},
	{
		path: 'ui-treeview',
		element: <UITreeView />,
		name: 'UI.Treeview 컴포넌트',
	},
	{
		path: 'ui-offcanvas',
		element: <UIOffcanvas />,
		name: 'UI.Offcanvas 컴포넌트',
	},
	{
		path: 'ui-checkbox',
		element: <UICheckboxDemo />,
		name: 'UI.Checkbox 컴포넌트',
	},
];

export default routes;
