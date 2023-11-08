function loadExternalJS() {
	// 필요한 파일들을 동적으로 생성.

	const scriptPerfectScrollbar = document.createElement('script');
	scriptPerfectScrollbar.src = '/src/assets/monster-admin/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js';
	scriptPerfectScrollbar.async = false;

	const scriptApp = document.createElement('script');
	scriptApp.src = '/src/assets/monster-admin/js/app.js';
	scriptApp.async = false;

	//const scriptAppInit = document.createElement('script');
	//scriptAppInit.src = '/src/assets/monster-admin/js/app.init.js';
	//scriptAppInit.async = false;

	const scriptFeather = document.createElement('script');
	scriptFeather.src = '/src/assets/monster-admin/js/feather.min.js';
	scriptFeather.async = false;

	const scriptBootstrapTable = document.createElement('script');
	scriptBootstrapTable.src = '/src/assets/monster-admin/libs/bootstrap-table/dist/bootstrap-table.min.js';
	scriptBootstrapTable.async = false;

	const scriptJqueryUi = document.createElement('script');
	scriptJqueryUi.src = '/src/assets/monster-admin/libs/jquery/jquery-ui.js';
	scriptJqueryUi.async = false;

	const scriptJqueryCookie = document.createElement('script');
	scriptJqueryCookie.src = '/src/assets/monster-admin/libs/jquery/jquery.cookie.js';
	scriptJqueryCookie.async = false;

	const scriptJqueryDynatree = document.createElement('script');
	scriptJqueryDynatree.src = '/src/assets/monster-admin/libs/jquery/jquery.dynatree.js';
	scriptJqueryDynatree.async = false;

	//데이터테이블 tree 추가 -LSH
	const scriptTreeGrid = document.createElement('script');
	scriptTreeGrid.src = '/src/assets/dfpcen-custom/dataTableCustom/js/dataTables.treeGrid.js';
	scriptTreeGrid.async = false;



	// 생성된 script 요소들을 body에 붙임
	//document.body.appendChild(scriptJquery);
	document.body.appendChild(scriptApp);
	//document.body.appendChild(scriptAppInit);
	document.body.appendChild(scriptPerfectScrollbar);
	document.body.appendChild(scriptFeather);
	document.body.appendChild(scriptBootstrapTable);
	document.body.appendChild(scriptJqueryCookie);
	document.body.appendChild(scriptJqueryUi);
	document.body.appendChild(scriptJqueryDynatree);

	//데이터테이블 tree 추가 -LSH
	document.body.appendChild(scriptTreeGrid);

}

export default loadExternalJS;
