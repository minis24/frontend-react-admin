import Prism from 'prismjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IForm, IInputField } from '@/app/types/components';

const UIInputField = () => {
	const [defaultValue, setDefaultValue] = useState('');
	const [secondValue, setSecondValue] = useState('');
	const formRef = useRef<IForm>(null);
	const testInputRef = useRef<IInputField>(null);

	const onClickHandler = useCallback(() => {
		if (formRef.current) {
			formRef.current.validate();
		}
	}, []);

	useEffect(() => {
		Prism.highlightAll();
		//testInputRef.current?.validate();
		setDefaultValue('aaajkjkjk');
	}, []);

	return (
		<div className="row">
			<div className="col-12">
				<section className="section">
					<p>
						<strong>UI InputField</strong>은 여러가지 편리한 옵션을 제공하는 <strong>JSX용</strong> 텍스트 입력 필트
						컴포넌트 입니다.
						<br />
					</p>
					<div className="row align-items-top">
						<div className="col-lg-12">
							{/* 기본 InputField 영역 */}
							<div className="card">
								<div className="card-header">기본 InputField</div>
								<div className="card-body">
									<div className="card-title">Examples</div>
									<div className="card-text">가장 기본 InputField 세팅 예제 입니다.</div>
									<UI.Form ref={formRef}>
										<UI.InputField
											value={defaultValue}
											onChange={(e) => setDefaultValue(e.target.value)}
											rules={[(value) => !!value || 'text 입력!!']}
											inputFieldStyle={{ marginBottom: '8px' }}
											required
											ref={testInputRef}
										/>
										<UI.InputField
											value={secondValue}
											onChange={(e) => setSecondValue(e.target.value)}
											rules={[(value) => !!value || 'text 입력!!']}
											errorMessage="값을 입력하세요!"
											inputFieldStyle={{ marginBottom: '8px' }}
										/>
										<UI.Button type="submit">Submit</UI.Button>
									</UI.Form>
									<UI.Button onClick={onClickHandler}>일반 버튼</UI.Button>
									<hr />
									<div className="card-title">JSX Code</div>
									<pre>
										<code className="language-javascript">&lt;UI.InputField /&gt;</code>
									</pre>
								</div>
								{/*<div className="card-footer">Footer</div>*/}
							</div>
							{/* ... 옵션 설정 InputField 영역 */}
							<div className="card">
								<svg
									className="tea lds-ripple"
									width="37"
									height="48"
									viewBox="0 0 37 48"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
										stroke="#009efb"
										strokeWidth="2"
									/>
									<path
										d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
										stroke="#009efb"
										strokeWidth="2"
									/>
									<path
										id="teabag"
										fill="#009efb"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"
									/>
									<path
										id="steamL"
										d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										stroke="#009efb"
									/>
									<path
										id="steamR"
										d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13"
										stroke="#009efb"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default UIInputField;
