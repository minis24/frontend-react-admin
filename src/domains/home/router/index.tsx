import { TCustomRoute } from '@/app/types/router';
import HomeIndex from '@/domains/home/pages/HomeIndex';

const routes: TCustomRoute[] = [
	{
		path: '/',
		element: <HomeIndex />,
		name: 'Home',
	},
];

export default routes;
