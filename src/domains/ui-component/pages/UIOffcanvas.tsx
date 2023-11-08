import Prism from 'prismjs';
import { useEffect, useState } from 'react';

const UIOffcanvasDemo = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">기본 UI Offcanvas 예제</h4>
					</div>
					<div className="card-body">
						<p className="card-text">
							<mark>
								<code>UI.Offcanvas</code>
							</mark>
							컴포넌트는 React-bootstrap의 Offcanvas를 참조하여 제작 되었습니다.
							<br />
							<a
								href="https://react-bootstrap.netlify.app/docs/components/offcanvas/"
								target="_blank"
							>
								https://react-bootstrap.netlify.app/docs/components/offcanvas/
							</a>
						</p>

						<div className="card-title">Examples</div>
						<div className="card-text">UI Offcanvas 예제 입니다.</div>
						<UI.Button onClick={handleShow}>Show Offcanvas</UI.Button>
						<UI.Offcanvas
							show={show}
							title="bottom 제목"
							closeButton
							onHide={handleClose}
						>
							내용 입력 <UI.Button onClick={() => $ui.alert('test')}>버튼</UI.Button>
						</UI.Offcanvas>
						<hr />
						<div className="card-title">JSX Code</div>
						<pre>
							<code className="language-html">{`<UI.Offcanvas
	show={show}
	title="bottom 제목"
	closeButton
>
	내용 입력 <UI.Button>버튼</UI.Button>
</UI.Offcanvas>`}</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UIOffcanvasDemo;
