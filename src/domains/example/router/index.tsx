import { TCustomRoute } from '@/app/types/router';
import StarterKit from '@/domains/example/pages/StarterKit';
import PageTest01 from '@/domains/example/pages/PageTest01';
import PageTest02 from '@/domains/example/pages/PageTest02';
import PageTest03 from '@/domains/example/pages/PageTest03';
import BootstrapTable from '@/domains/example/pages/table/BootstrapTable';
import DataTables from '@/domains/example/pages/table/DataTables';
import UiIconTest from '@/domains/example/pages/ui-components/UiIconTest';
import DataTablesDemo from '@/domains/example/pages/table/DataTablesDemo';

const routes: TCustomRoute[] = [
	{
		path: 'starter',
		element: <StarterKit />,
		name: 'starter page',
	},
	{
		path: 'bootstrap-table',
		element: <BootstrapTable />,
		name: 'Bootstrap Table',
	},
	{
		path: 'data-tables',
		element: <DataTables />,
		name: 'DataTables',
	},
	{
		path: 'table-demo',
		element: <DataTablesDemo />,
		name: 'DataTables Ajax(SWR) 예제',
	},
	{
		path: 'ui-icon',
		element: <UiIconTest />,
		name: 'UI.Icon 전역 컴포넌트',
	},
	{
		path: 'page-test01',
		element: <PageTest01 />,
		name: 'page test 01',
	},
	{
		path: 'page-test02',
		element: <PageTest02 />,
		name: 'page test 02',
	},
	{
		path: 'page-test03',
		element: <PageTest03 />,
		name: 'page test 03',
	},
];

export default routes;
