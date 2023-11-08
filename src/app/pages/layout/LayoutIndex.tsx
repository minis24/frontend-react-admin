import { useEffect } from 'react';
import loadable from '@loadable/component';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore, setState } from '@/app/store';

const LayoutHeader = loadable(() => import('@/app/pages/layout/LayoutHeader'));
const LayoutAside = loadable(() => import('@/app/pages/layout/LayoutAside'));
const PageBreadcrumb = loadable(() => import('@/app/pages/layout/PageBreadcrumb'));

const LayoutIndex = () => {
	const navigate = useNavigate();
	const location = useLocation();
	$router.setNaviInstance(navigate);
	//const [pathName, setPathName] = useState('');
	// 페이지명을 저장하기 위한 'g-pageName'전역 값 가져오기.
	//const [pageName] = useStore('g-pageName');
	const [needLogin] = useStore('g-needLogin');
	// 좌측 메뉴 클릭 이벤트
	//const onClickMenu = useCallback((value: boolean) => {
	//	//setExpend(value);
	//}, []);

	// 라우터 이동 후 호출되는 useEffect 훅 함수.
	useEffect(() => {
		// 각 페이지 라우터에 'name'값이 세팅 되어 있다면 그 값을 전역 'g-pageName'에 저장한다.
		if (location && location.state) {
			// 라우터 state에 값이 있을 때($router.push()로 이동된 경우)
			setState('g-pageName', location.state.pageName);
		} else {
			// 라우터 state에 값이 없으면 직접 route객체의 name값을 찾아 셋팅 한다.
			if (location && location.pathname) {
				setState('g-pageName', $router.findPageName(location.pathname));
			}
		}

		//setPathName(location.pathname);
		console.log('==============> needLogin::', needLogin);

		// 화면이동 시 좌측메뉴 선택 초기화 하기
		$adminScript.sidebarMenuInit();
	}, [location]);

	return (
		<>
			<div id="main-wrapper">
				<LayoutHeader />
				<LayoutAside />
				<div className="page-wrapper">
					<PageBreadcrumb />
					<div className="container-fluid">
						{/* Start Page Content ========= */}
						<Outlet />
						{/* End Page Content ============ */}
					</div>
					<footer className="footer">All rights reserved by ©2023. SECUCEN Co.,LTD.</footer>
				</div>
			</div>
		</>
	);
};

export default LayoutIndex;
