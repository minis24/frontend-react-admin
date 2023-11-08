import { RouteObject } from 'react-router-dom';

export type TCustomRoute = RouteObject & {
	name?: string;
};
