import Prism from 'prismjs';
import { useCallback, useEffect } from 'react';

const UIConfirmDemo = () => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	const onDefault = useCallback(() => {
		$ui.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?').then((result) => {
			console.log(result);
		});
	}, []);
	const onChangeBtnNm = useCallback(() => {
		$ui
			.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?', {
				confirmButton: '등록',
				cancelButton: '등록취소',
			})
			.then((result: boolean) => {
				console.log(result);
			});
	}, []);
	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">기본 Confirm 예제</h4>
					</div>
					<div className="card-body">
						<div className="card-title">Examples</div>
						<div className="card-text">버튼을 누르면 기본 confirm창이 뜨는 예제 입니다.</div>
						<UI.Button
							color="primary"
							onClick={onDefault}
						>
							Show Confirm
						</UI.Button>
						<hr />
						<div className="card-title">Javascript Code</div>
						<pre>
							<code className="language-javascript">
								{`$ui.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?')
.then((result) => {
	console.log(result);
});`}
							</code>
						</pre>
					</div>
				</div>
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">'확인', '취소' 버튼이름 수정</h4>
					</div>
					<div className="card-body">
						<div className="card-title">Examples</div>
						<div className="card-text">
							버튼을 누르면 confirm창이 뜹니다.
							<br />
							confirm창은 기본으로 '확인', '취소' 버튼을 가진다.
							<br />
							다음 두가지 옵션으로 버튼 텍스트를 다르게 설정할 수 있다.
							<br />
							<strong>confirmButton : </strong> '확인' 버튼의 텍스트를 변경.
							<br />
							<strong>cancelButton : </strong> '취소' 버튼의 텍스트를 변경.
						</div>
						<UI.Button
							color="primary"
							onClick={onChangeBtnNm}
						>
							Show Confirm
						</UI.Button>
						<hr />
						<div className="card-title">Javascript Code</div>
						<pre>
							<code className="language-javascript">
								{`$ui.confirm('confirm 예제 입니다.<br />확인 하시겠습니까?', {
	confirmButton: '등록',
	cancelButton: '등록취소',
}).then((result: boolean) => {
	console.log(result);
});`}
							</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UIConfirmDemo;
