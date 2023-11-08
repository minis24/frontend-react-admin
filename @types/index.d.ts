import { IUi, IUiJS } from '@/app/types/components';
import { IUtils, IRouter, IAdminScript } from '@/app/types/common';
//import Prism from "prismjs";
import $ from 'jquery';

export {};

declare global {
	interface Window {
		UI: IUi;
		$: $;
		jQuery: $;
		$adminScript: IAdminScript;
		$ui: IUiJS;
		$util: IUtils;
		$router: IRouter;
		//Prism: Prism | any;
	}

	const UI: typeof import('../src/app/components/ui/uiIndex')['default'];
	const $ui: IUiJS;
	const $util: IUtils;
	const $router: IRouter;

	const $adminScript: IAdminScript;
	const feather: typeof import('../src/assets/monster-admin/js/feather.min.js')['default'];
}
