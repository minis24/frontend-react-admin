import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/app/router';

import ui, { setUiJS } from '@/app/components/ui/uiIndex';
import Utils from '@/app/common/utils';
import XRouter from '@/app/common/x-router';
import DialogContainer from '@/app/components/global/DialogContainer';
import DialogComponentContainer from '@/app/components/global/DialogComponentContainer';
import TooltipComponentContainer from '@/app/components/global/TooltipComponentContainer';
import OffcanvasComponentContainer from '@/app/components/global/OffcanvasComponentContainer';

import $ from 'jquery';
import adminScript from '@/app/common/js/adminScript';

const App: FC = () => {
	window.UI = ui; // UI컴포넌트
	window.$ui = setUiJS(); // UI컴포넌트 js함수
	window.$util = Utils.getInstance();
	window.$router = XRouter.getInstance();

	// admin template관련 전역세팅값 --------------
	window.$ = $;
	window.jQuery = $;
	window.$adminScript = adminScript.getInstance();
	// admin template관련 전역세팅값 --------------

	return (
		<>
			{/* TODO: 추가 html 요소가 있으면 추가. */}
			<RouterProvider router={router} />
			<TooltipComponentContainer />
			<DialogComponentContainer />
			<OffcanvasComponentContainer />
			<DialogContainer />
		</>
	);
};
export default App;
