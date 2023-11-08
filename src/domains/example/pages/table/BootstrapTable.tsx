const BootstrapTable = () => {
	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">Bootstrap Simple Table</h4>
					</div>
					<div className="card-body">
						<a
							href="https://bootstrap-table.com/"
							target="_blank"
							rel="noreferrer"
						>
							참조 URL:(https://bootstrap-table.com/)
						</a>
						<h6 className="card-subtitle mb-3">Simple table example</h6>
						<table data-toggle="table">
							<thead>
								<tr>
									<th>Item ID</th>
									<th>Item Name</th>
									<th>Item Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Item 1</td>
									<td>$1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Item 2</td>
									<td>$2</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">Export Table</h4>
					</div>
					<div className="card-body">
						<table
							id="exporttable"
							data-toolbar="#toolbar"
							data-search="true"
							data-show-refresh="true"
							data-show-toggle="true"
							data-show-fullscreen="true"
							data-show-columns="true"
							data-detail-view="true"
							data-show-export="true"
							data-detail-formatter="detailFormatter"
							data-minimum-count-columns="2"
							data-show-pagination-switch="true"
							data-pagination="true"
							data-id-field="id"
							data-page-list="[10, 25, 50, 100, ALL]"
							data-show-footer="true"
							data-side-pagination="server"
							data-url="https://examples.wenzhixin.net.cn/examples/bootstrap_table/data"
							data-response-handler="responseHandler"
						></table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BootstrapTable;
