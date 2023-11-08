import { TCustomRoute } from '@/app/types/router';
import loadable from '@loadable/component';
const MsgEachList = loadable(() => import('@/domains/msg/pages/MsgEachList'));
const MsgCommonList = loadable(() => import('@/domains/msg/pages/MsgCommonList'));
const MsgField = loadable(() => import('@/domains/msg/pages/MsgField'));



const routes: TCustomRoute[] = [
	{
		path: 'each',
		element: <MsgEachList />,
		name: '전문개별부 관리',
	},
	{
		path: 'common',
		element: <MsgCommonList />,
		name: '전문공통부 관리',
	},
	{
		path: 'field',
		element: <MsgField />,
		name: '전문 필드 관리',
	},
];

export default routes;
