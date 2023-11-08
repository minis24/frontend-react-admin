import { TCustomRoute } from '@/app/types/router';
import loadable from '@loadable/component';
const CodeList = loadable(() => import('@/domains/cod/pages/CodeList'));

const routes: TCustomRoute[] = [
	{
		path: 'cod-manager',
		element: <CodeList />,
		name: '코드관리 페이지',
	},
];

export default routes;
