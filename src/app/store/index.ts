// Store(상태관리) 커스텀 훅 ------------------------------------------------------

import useSWRImmutable from 'swr/immutable';
import makeRequestConfig from '@/app/store/request';
import ApiClient from '@/app/api';
import useSWR, { mutate as gMutate } from 'swr';
import useSWRMutation from 'swr/mutation';

export type ValueOf<T> = T[keyof T];

// REST API 호출을 위한 Fetcher함수-------------------------------------------------
const fetcher = async (url: string, param: object) => {
	let params: any;
	if (typeof param === 'object') {
		params = param as object;
	}
	let response;
	try {
		const reqConfig = params?.option ? makeRequestConfig(url, params, params.option) : makeRequestConfig(url, params);
		response = await ApiClient.request(reqConfig);
	} catch (err: any | Error) {
		// 공통 에러처리
		ApiClient.handleError(err, this);
		console.error('[Call API] ERROR: ', err);
		throw err;
	}
	return response as any;
};

// REST API를 호출하고 결과 Response를 전역 상태에 저장하기 위한 함수 ------------------
export const useAPI = <T = string>(key: T) => {
	//console.log('====> Call useAPI::', key);

	const { trigger } = useSWRMutation(
		key as string,
		async (url, { arg }: { arg: any }) => {
			//console.log('==trigger fetcher arg:::', arg);
			return fetcher(url, arg);
		},
		{ populateCache: true, revalidate: false },
	);

	const { data, mutate, error } = useSWRImmutable(key as string);

	const setData = (value: any) => {
		mutate(value);
	};

	const fetch = (arg: object) => {

		return trigger(arg);
	};

	if (!data && !error) {
		return { data, setData, error: { message: '[Call API] ERROR: API를 우선 fetch 해야 합니다.' }, fetch };
	} else {
		return { data, setData, error, fetch };
	}
};

// REST API결과 전역에 저장 되어있는 Response를 가져오는 함수 -------------------------
export const useAPIValue = (key: string) => {
	const { data, error } = useSWR(key);
	if (!data && !error) {
		return { data, error: { message: '[Call API] ERROR: API를 우선 호출 해야 합니다.' } };
	} else {
		return { data, error };
	}
};

// REST API호출 전역 상태값을 변경하기 위한 함수---------------------------------------
export const setState = (key: string, value: any): void => {
	gMutate(key, value, false);
};

export const useAPIState = (key: string) => {
	const { data, mutate, error } = useSWR(key);
	const setData = (value: any) => {
		mutate(value);
	};

	if (!data && !error) {
		return { data, setData, error: { message: '[Call API] ERROR: API를 우선 호출 해야 합니다.' } };
	} else {
		return { data, setData, error };
	}
};

// 임의로 정한 Key명으로 전역 상태에 저장 하거나 가져오는 함수 -------------------------
export const useStore = (key: string, value?: any) => {
	let error: any = { message: '' };

	const result = useSWRImmutable(key, { shouldRetryOnError: false });
	if (result.data === undefined) {
		result.mutate(value);
		if (value === undefined) {
			error.message = '[Global Store] ERROR: 전역 State가 없습니다.';
		}
	} else {
		error = undefined;
	}
	return [result.data, result.mutate, error];
};
