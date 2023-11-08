import { FC, memo, useRef, useEffect } from 'react';
import DataTable from 'datatables.net-bs5';
import { IUIDataTableProps } from '@/app/types/components';
//import { ColumnSettings } from 'UIDataTable/types';

const UIDataTable: FC<IUIDataTableProps> = memo(({ data, columns, columnDefs }) => {
	const tableRef = useRef(null);
	const tableInstance = useRef<any>(null);
	//const [column, setColumn] = useState<ColumnSettings[]>([]);

	useEffect(() => {
		if (data && tableInstance.current) {
			tableInstance.current.clear();
			tableInstance.current.rows.add(data);
			tableInstance.current.draw();
		}
	}, [data]);

	useEffect(() => {
		if (tableRef.current) {
			tableInstance.current = new DataTable(tableRef.current, {
				data: [],
				columns,
				columnDefs,
				//responsive: true,
				destroy: true,
				ordering: false,
				autoWidth: false,
			});
		}
	}, []);

	return (
		<table
			className="table table-striped table-bordered dt-head-center g-table-custom-sm"
			style={{ width: '100%' }}
			ref={tableRef}
		/>
	);
});
UIDataTable.displayName = 'UIDataTable';

export default UIDataTable;
