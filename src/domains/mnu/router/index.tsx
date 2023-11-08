import { TCustomRoute } from '@/app/types/router';
import loadable from '@loadable/component';



const MnuList = loadable(() => import('@/domains/mnu/pages/MnuList'));


const routes: TCustomRoute[] = [
	{
		path: 'list',
		element: <MnuList />,
		name: '메뉴 목록 관리',
	},

];

export default routes;
