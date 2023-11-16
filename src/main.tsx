//import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'mdbreact/dist/scss/free/_treeview.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/monster-admin/libs/bootstrap-table/dist/bootstrap-table.min.css';
//=====> (by jkkim - 20230829 : From Bootstrap Switch )
import '@/assets/monster-admin/libs/bootstrap-switch/dist/bootstrap3/css/bootstrap-switch.min.css';
// <<===== (by jkkim - 20230829 : From Bootstrap Switch )

import '@/assets/monster-admin/css/style.min.css';
import loadExternalJS from '@/app/common/js/loadExternalJS.ts';

//import jszip from 'jszip';
//import pdfmake from 'pdfmake';
//import DataTable from 'datatables.net-bs5';
import 'datatables.net-autofill-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-colreorder-bs5';
import 'datatables.net-fixedcolumns-bs5';
import 'datatables.net-fixedheader-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-rowreorder-bs5';
import 'datatables.net-scroller-bs5';
import 'datatables.net-searchbuilder-bs5';
import 'datatables.net-searchpanes-bs5';
import 'datatables.net-select-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-rowreorder-bs5/css/rowReorder.bootstrap5.min.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

import '@/assets/monster-admin/css/ui.dynatree.css';

import '@/assets/scss/App.scss';

ReactDOM.createRoot(document.getElementById('root')!)
        .render(
            <   App />
        );

loadExternalJS();
