import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

export interface CommonRequestInterceptorsConfig extends InternalAxiosRequestConfig {
	// 이 요청이 static인지 api요청인지 여부.
	isStatic?: boolean;
	// 헤더값 변경이 필요한 경우 사용할 필드
	headers: CommonRequestHeader;
	// api중복거래 호출 가능여부 설정 - options 객체를 통해서만 받는다.
	allowDuplicate?: boolean;
	disableLoadingSpinner?: boolean;
	isSetParams?: boolean;
	// ajax중복체크 확인 시 사용한 hash data를 전달하기 위한 값
	unresolvedHash?: any;
}

// 현재 프로젝트에서 사용해야할 response타입.
export type APIResponseType<T> = Promise<AxiosResponse<IResponse<T>>>;
// 공통 response가 정해지지 않은 외부 api사용을 위한 경우 IResponse를 빼고 호출한다.
export type outerAPIResponseType<T> = Promise<AxiosResponse<T>>;

export type CommonRequestHeader = AxiosRequestHeaders & {
	//'Content-Type'?: aaa;
	//Accept?: any;
	//Transfer?: string;
	test?: string;
};

export interface CommonRequestConfig extends AxiosRequestConfig {
	// 이 요청이 static인지 api요청인지 여부.
	isStatic?: boolean;
	// 헤더값 변경이 필요한 경우 사용할 필드
	headers?: CommonRequestHeader;
	// api중복거래 호출 가능여부 설정 - options 객체를 통해서만 받는다.
	allowDuplicate?: boolean;
	disableLoadingSpinner?: boolean;
	isSetParams?: boolean;
	// ajax중복체크 확인 시 사용한 hash data를 전달하기 위한 값
	unresolvedHash?: any;
}

// --------------------------------------------------------------
// API 리스폰스 레이아웃 정의 (BGN)--------------------------------
// --------------------------------------------------------------
export interface IResponse<DataType> {
	hdr: IResponseHeader;
	bdy: DataType;
}

export interface IResponseHeader {
	rsCd: string;
	rsMsg: string;
	svrDt: string;
}
