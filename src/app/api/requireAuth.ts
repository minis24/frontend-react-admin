//import { storeToRefs } from 'pinia';
//import { useBoardListStore } from '@/domains/example/store';
import type { AxiosResponse } from 'axios';
import { setState } from '@/app/store';

// requireAuth함수가 호출되는 시점에는 useCommonStore가 초기화 되어있어야 한다.
export default (isLogin: boolean, err?: any | Error, response?: AxiosResponse) => {
	//const boardListStore = useBoardListStore();
	//const { needLogin } = storeToRefs(boardListStore);

	if (err) {
		// jwt인증관련 토큰 에러가 발생하면 처리할 내용 (Begin) ==================
		const errCode = err?.response?.status;
		if (errCode === 401 || errCode === 403 || errCode === 419) {
			// cookie에 있는 값 삭제
			$util.delItemLocalStorage('access_token');
			$util.delItemLocalStorage('refresh_token');
			console.log(`network error : ${err?.response?.status}: set needLogin = true`);
			// 로그인 화면으로 이동
			//window.spa.router.push('/example/log-in');
			$router.push('/example/log-in');
		}
		// jwt인증관련 토큰 에러가 발생하면 처리할 내용 (End) ====================
	}

	// 로그인 API일때 jwt 토큰 저장
	if (response?.config.url) {
		const str = response?.config.url as string;
		if (str.match(/\/api\/login/g)) {
			if (response?.data?.bdy) {
				const accessToken = response?.data?.bdy.access_token;
				const refreshToken = response?.data?.bdy.refresh_token;
				$util.setLocalStorage('access_token', accessToken);
				$util.setLocalStorage('refresh_token', refreshToken);
			}
		}
	}

	//needLogin.value = isLogin;
	setState('g-needLogin', isLogin);
};
