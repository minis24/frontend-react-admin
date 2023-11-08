import { RouteObject } from 'react-router-dom';
import HomeRouter from '@/domains/home/router';
// HomeRouter처럼 업무가 새로 생성되면 각 업무의 router를 만들어 import 한다.
import ExampleRouter from '@/domains/example/router';
import UIComponentRouter from '@/domains/ui-component/router';
import MsgManagerRouter from '@/domains/msg/router';
import CodManagerRouter from '@/domains/cod/router';
import MnuManagerRouter from '@/domains/mnu/router';


import LayoutIndex from '@/app/pages/layout/LayoutIndex';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <LayoutIndex />,
		children: HomeRouter,
	},
	// 새롭게 생성된 업무의 라우터를 여기에 계속 추가한다.
	{
		path: '/example',
		element: <LayoutIndex />,
		children: ExampleRouter,
	},
	{
		path: '/components',
		element: <LayoutIndex />,
		children: UIComponentRouter,
	},
	{
		path: '/msg',
		element: <LayoutIndex />,
		children: MsgManagerRouter,
	},
	{
		path: '/cod',
		element: <LayoutIndex />,
		children: CodManagerRouter,
	},
	{
		path: '/mnu',
		element: <LayoutIndex />,
		children: MnuManagerRouter,
	},
];

export default routes;
