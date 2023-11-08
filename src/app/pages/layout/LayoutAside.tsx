import { FC, memo, useCallback, useState } from 'react';
import MenuGroup from '@/app/components/layout/MenuGroup';

//interface Props {
//	onClickMenu: (value: boolean) => void;
//}

const LayoutAside: FC = memo(() => {
	const appMode = $adminScript.getAppMode();
	const [homeData] = useState([{ text: 'Home', icon: 'home', path: '/' }]);
	const [menuData] = useState([
		{
			text: '코드관리',
			icon: 'code',
			path: '',
			children: [{ text: '코드관리', icon: 'grid', path: '/cod/cod-manager' }],
		},
		{
			text: '전문관리',
			icon: 'terminal',
			path: '',
			children: [
				{ text: '전문개별부 관리', icon: 'align-left', path: '/msg/each' },
				{ text: '전문공통부 관리', icon: 'align-left', path: '/msg/common' },
				{ text: '전문필드관리', icon: 'list', path: '/msg/field' },
			],
		},
		{
			text: '메뉴관리',
			icon: 'sidebar',
			path: '',
			children: [{ text: '메뉴목록(new)', icon: 'sidebar', path: '/mnu/list' }],
		},
	]);
	const [testMenuData] = useState([
		{
			text: 'Components',
			icon: 'sliders',
			path: '',
			children: [
				{
					text: 'Dialog Components',
					icon: 'folder',
					path: '',
					children: [
						{ text: 'UI.Alert($ui.alert)', icon: 'alert-circle', path: '/components/ui-alert' },
						{ text: 'UI.Confirm($ui.confirm)', icon: 'message-square', path: '/components/ui-confirm' },
						{ text: 'UI.Dialog($ui.dialog)', icon: 'message-square', path: '/components/ui-dialog' },
					],
				},
				{ text: 'UI.Icon', icon: 'play-circle', path: '/example/ui-icon' },
				{ text: 'UI.Button', icon: 'sliders', path: '/components/ui-button' },
				{ text: 'UI.Treeview', icon: 'share-2', path: '/components/ui-treeview' },
				{ text: 'UI.Offcanvas', icon: 'layout', path: '/components/ui-offcanvas' },
				{
					text: 'Form Components',
					icon: 'folder',
					path: '',
					children: [
						{ text: 'UI.InputField', icon: 'edit', path: '/components/ui-inputfield' },
						{ text: 'UI.Checkbox', icon: 'check-square', path: '/components/ui-checkbox' },
					],
				},
			],
		},
		{
			text: 'Example',
			icon: 'sliders',
			path: '',
			children: [
				{ text: 'starter page', icon: 'play-circle', path: '/example/starter' },
				{ text: 'Bootstrap Table', icon: 'play-circle', path: '/example/bootstrap-table' },
				{ text: 'DataTables', icon: 'play-circle', path: '/example/data-tables' },
				{ text: 'Table데모(Call API)', icon: 'layout', path: '/example/table-demo' },
				{ text: 'test page 01', icon: 'alert-circle', path: '/example/page-test01' },
				{ text: 'test page 02', icon: 'alert-circle', path: '/example/page-test02' },
				{ text: 'test page 03', icon: 'alert-circle', path: '/example/page-test03' },
			],
		},
	]);

	const renderFooter = useCallback(() => {
		return (
			<div className="sidebar-footer">
				<a
					href="#"
					className="link"
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Settings"
				>
					<i className="ti-settings"></i>
				</a>
				<a
					href="#"
					className="link"
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Email"
				>
					<i className="mdi mdi-gmail"></i>
				</a>
				<a
					href="#"
					className="link"
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Logout"
				>
					<i className="mdi mdi-power"></i>
				</a>
			</div>
		);
	}, []);

	return (
		<aside className="left-sidebar">
			<div className="scroll-sidebar">
				<nav className="sidebar-nav">
					<ul id="sidebarnav">
						<MenuGroup
							data={homeData}
							bottomLine={false}
						/>
						<MenuGroup
							name="FOR MANAGE MBPCEN"
							data={menuData}
							bottomLine={true}
						/>
						<MenuGroup
							name="컴포넌트 사용법"
							data={testMenuData}
							bottomLine={true}
						/>
					</ul>
				</nav>
			</div>
			{appMode === 'default' ? renderFooter() : null}
		</aside>
	);
});
LayoutAside.displayName = 'LayoutAside';

export default LayoutAside;
