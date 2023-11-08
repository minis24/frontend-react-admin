/// <reference types="jquery" />

import DataTables, { Api } from 'datatables.net';

export default DataTables;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables' types integration
 */
declare module 'datatables.net' {
	interface Config {
		treeGrid?: boolean | ConfigTreeGrid;
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Options
 */

interface ConfigTreeGrid {
	left?: number;

	expandIcon?: string;

	collapseIcon?: string;
}
