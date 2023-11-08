import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.min.css';

const UiIconTest = () => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">UI.Icon 전역 컴포넌트 아이콘 표시 테스트</h4>
					</div>
					<div className="card-body">
						<p className="card-text">
							<mark>
								<code>UI.Icon</code>
							</mark>
							컴포넌트는{' '}
							<a
								href="https://icons.getbootstrap.com/"
								target="_blank"
							>
								https://icons.getbootstrap.com/
							</a>
							의 부트스트랩 아이콘을 사용하는 전역 컴포넌트 이다.
						</p>
						<UI.Icon
							icon="HouseFill"
							color="blue"
							size={55}
						/>
						<pre>
							<code className="language-javascript">{`<UI.Icon
	icon="HouseFill"
	color="blue"
	size={55}
/>`}</code>
						</pre>
					</div>
				</div>
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">UI.RFIcon 전역 컴포넌트 아이콘 표시 테스트</h4>
					</div>
					<div className="card-body">
						<p className="card-text">
							<mark>
								<code>UI.RFIcon</code>
							</mark>
							컴포넌트는{' '}
							<a
								href="https://feathericons.com/"
								target="_blank"
							>
								https://feathericons.com/
							</a>
							의 feather 아이콘을 사용하는 전역 컴포넌트 이다.
						</p>
						<UI.RFIcon
							icon="Slack"
							size={55}
						/>
						<pre>
							<code className="language-javascript">{`<UI.RFIcon
icon="Slack"
size={55}
/>`}</code>
						</pre>
					</div>
				</div>
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">UI.MDIcon 전역 컴포넌트 아이콘 표시 테스트</h4>
					</div>
					<div className="card-body">
						<p className="card-text">
							<mark>
								<code>UI.MDIcon</code>
							</mark>
							컴포넌트는{' '}
							<a
								href="https://pictogrammers.com/library/mdi/"
								target="_blank"
							>
								https://pictogrammers.com/library/mdi/
							</a>
							의 Material Design Icons 을 사용하는 전역 컴포넌트 이다.
						</p>
						<UI.MDIcon
							icon="mdiPower"
							size={3}
						/>
						<pre>
							<code className="language-javascript">{`<UI.MDIcon
icon="mdiPower"
size={3}
/>`}</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UiIconTest;
