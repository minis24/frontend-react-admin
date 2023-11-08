import Prism from 'prismjs';
import { useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const UIAlert = () => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	const onDefault = useCallback(() => {
		$ui.alert('alert 예제 입니다.!');
	}, []);
	const onTitle = useCallback(() => {
		$ui.alert('title 예제 입니다.!', { title: '제목' });
	}, []);
	const onType = useCallback((type: string) => {
		switch (type) {
			case 'success':
				$ui.alert('Alert 예제 입니다.', { type: 'success' });
				break;
			case 'info':
				$ui.alert('Alert 예제 입니다.', { type: 'info' });
				break;
			case 'warning':
				$ui.alert('Alert 예제 입니다.', { type: 'warning' });
				break;
			case 'error':
				$ui.alert('Alert 예제 입니다.', { type: 'error' });
				break;
		}
	}, []);
	const onAutoDismiss = useCallback(() => {
		$ui.alert('3초 후 자동 닫음.', {
			autoDismiss: 3000,
		});
	}, []);

	return (
		<>
			<div
				className="
              d-flex
              border-bottom
              title-part-padding
              px-0
              mb-3
              align-items-center
            "
			>
				<div>
					<h4 className="mb-0">
						<p>
							<strong>UI Alert($ui.alert)</strong>은 짧고 중요한 메시지를 팝업 형태로 띄우는{' '}
							<strong>UI 전역 공통 Component</strong>
							입니다.
							<br />
							<strong>Javascript</strong> 코드 상에서 사용할 때는
							<code>$ui.alert('메시지')</code> 과 같이 <code>$ui 객체</code>를 사용하여 호출합니다.
						</p>
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					{/* 기본 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">기본 Alert</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<div className="card-text">버튼을 누르면 기본 Alert 창이 뜨는 예제 입니다.</div>
							<UI.Button
								color="primary"
								onClick={onDefault}
							>
								Show Alert
							</UI.Button>
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">$ui.alert('alert 예제 입니다.!');</code>
							</pre>
						</div>
						{/*<div className="card-footer">Footer</div>*/}
					</div>
					{/* Title 설정 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">Title 설정</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<div className="card-text">
								Alert 창의 <strong>제목(title)</strong>을 적용하는 예제 입니다.
							</div>
							<UI.Button
								color="primary"
								onClick={onTitle}
							>
								Show Title Alert
							</UI.Button>
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">
									{`$ui.alert(
	'title 예제 입니다.!',
	{
		title: '제목',
	}
);`}
								</code>
							</pre>
						</div>
					</div>
					{/* 유형별 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">유형별 Alert</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<Card.Subtitle>
								<strong>4가지 유형의 Alert 설정</strong>
							</Card.Subtitle>
							<div className="card-text">
								<strong>success</strong> :{' '}
								<span
									className="text-success"
									style={{ fontWeight: 'bold' }}
								>
									success
								</span>{' '}
								색상의 아이콘이 표시됩니다.
								<br />
								<strong>info</strong> :{' '}
								<span
									className="text-info"
									style={{ fontWeight: 'bold' }}
								>
									info
								</span>{' '}
								색상의 아이콘이 표시됩니다.
								<br />
								<strong>warning</strong> :{' '}
								<span
									className="text-warning"
									style={{ fontWeight: 'bold' }}
								>
									warning
								</span>{' '}
								색상의 아이콘이 표시됩니다.
								<br />
								<strong>error</strong> :{' '}
								<span
									className="text-danger"
									style={{ fontWeight: 'bold' }}
								>
									error
								</span>{' '}
								색상의 아이콘이 표시됩니다.
								<br />
							</div>
							<div className="button-group">
								<UI.Button
									color="success"
									onClick={() => onType('success')}
								>
									Success Alert
								</UI.Button>
								<UI.Button
									color="info"
									onClick={() => onType('info')}
								>
									Info Alert
								</UI.Button>
								<UI.Button
									color="warning"
									onClick={() => onType('warning')}
								>
									Warning Alert
								</UI.Button>
								<UI.Button
									color="danger"
									onClick={() => onType('error')}
								>
									Error Alert
								</UI.Button>
							</div>
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">
									{`// 'success' 타입
$ui.alert(
	'alert 예제 입니다.!',
	{ type: 'success', }
);`}
								</code>
							</pre>
						</div>
					</div>
					{/* Auto dismiss 옵션 설정 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">Auto dismiss 설정</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<div className="card-text">
								Alert 창을 띄우고 옵션으로 설정한 <strong>autoDismiss</strong> 옵션 값의 <strong>millisecond</strong>
								후에 자동으로 닫힘.
							</div>
							<UI.Button
								color="primary"
								onClick={onAutoDismiss}
							>
								Show Alert(옵션: autoDismiss)
							</UI.Button>
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">
									{`// 'autoDismiss'옵션 설정.
$ui.alert(
	'3초 후 자동 닫음.',
	{
		autoDismiss: 3000,
	}
);`}
								</code>
							</pre>
						</div>
					</div>
					{/* 아이콘 옵션 설정 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">
								아이콘 설정 : <span style={{ color: '#ff0000' }}>TODO</span>
							</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<div className="card-text">Alert 창에 아이콘을 표시 하기.</div>
							{/*<UI.Button onClick={onAutoDismiss}>Show Alert(옵션: autoDismiss)</UI.Button>*/}
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">
									{`// 'icon'옵션 설정.
$ui.alert(
	'아이콘 표시 예제',
	{
		icon: 'home',
	}
);`}
								</code>
							</pre>
						</div>
					</div>
					{/* 배경색 바꾸기 옵션 설정 Alert 영역 */}
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">
								배경색 바꾸기 : <span style={{ color: '#ff0000' }}>TODO</span>
							</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Examples</div>
							<div className="card-text">Alert 창의 배경색을 변경 합니다.</div>
							{/*<UI.Button onClick={onAutoDismiss}>Show Alert(옵션: autoDismiss)</UI.Button>*/}
							<hr />
							<div className="card-title">Javascript Code</div>
							<pre>
								<code className="language-javascript">
									{`// 'color'옵션 설정.
$ui.alert(
	'배경색 변경 예제',
	{
		color: '#ff0000',
	}
);`}
								</code>
							</pre>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UIAlert;
