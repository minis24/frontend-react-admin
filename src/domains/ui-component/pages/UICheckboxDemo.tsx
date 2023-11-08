import { useCallback, useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.min.css';

const UICheckboxDemo = () => {
	const [colorCodeCollapse, setColorCodeCollapse] = useState(false);
	const [lightColorCodeCollapse, setLightColorCodeCollapse] = useState(false);
	const [outlineCodeCollapse, setOutlineCodeCollapse] = useState(false);

	// Color Props 코드보기 클릭
	const onClickColorCollapse = useCallback(() => {
		setColorCodeCollapse(!colorCodeCollapse);
	}, [colorCodeCollapse]);

	// Light Color Props 코드보기 클릭
	const onClickLightColorCollapse = useCallback(() => {
		setLightColorCodeCollapse(!lightColorCodeCollapse);
	}, [lightColorCodeCollapse]);

	// Outline Props 코드보기 클릭
	const onClickOutlineCollapse = useCallback(() => {
		setOutlineCodeCollapse(!outlineCodeCollapse);
	}, [outlineCodeCollapse]);

	useEffect(() => {
		Prism.highlightAll();
	}, []);
	return (
		<>
			<h4 className="card-title mb-3">Checkboxes</h4>
			<p>
				<i className="fas fa-check me-2 text-info" />
				<mark>
					<code>UI.Checkbox</code>
				</mark>
				컴포넌트는 부트스트랩 Checkboxes를 바탕으로 만들어진 컴포넌트 입니다.
			</p>
			<div className="row">
				<div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
					<div className="card w-100">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Checkbox 기본 체크박스</h4>
						</div>
						<div className="card-body">
							<UI.Checkbox
								label="기본 체크박스"
								id="flexCheckDefault"
							/>
							<UI.Checkbox
								label="Checked 체크박스"
								id="flexCheckChecked"
								checked
							/>
							<pre>
								<code className="language-html">{`<UI.Checkbox
	label="기본 체크박스"
	id="flexCheckDefault"
/>
<UI.Checkbox
	label="Checked 체크박스"
	id="flexCheckChecked"
	checked
/>`}</code>
							</pre>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
					<div className="card w-100">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Checkbox - Disabled 설정</h4>
						</div>
						<div className="card-body">
							<UI.Checkbox
								label="Disabled 체크박스"
								id="flexCheckDisabled"
								disabled
							/>
							<UI.Checkbox
								label="Disabled checked 체크박스"
								id="flexCheckCheckedDisabled"
								checked
								disabled
							/>
							<pre>
								<code className="language-html">{`<UI.Checkbox
	label="Disabled 체크박스"
	id="flexCheckDisabled"
	disabled
/>
<UI.Checkbox
	label="Disabled checked 체크박스"
	id="flexCheckCheckedDisabled"
	checked
	disabled
/>`}</code>
							</pre>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
					<div className="card w-100">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Checkbox - Color 설정 (color)</h4>
						</div>
						<div className="card-body">
							<div className="row py-2">
								<div className="col-md-4">
									<label>Success</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="success-check"
										inline
										color="success"
									/>
									<UI.Checkbox
										label="Checked"
										id="success2-check"
										checked
										inline
										color="success"
									/>
									<UI.Checkbox
										label="Disabled"
										id="success3-check"
										checked
										disabled
										inline
										color="success"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Danger</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="danger-check"
										inline
										color="danger"
									/>
									<UI.Checkbox
										label="Checked"
										id="danger2-check"
										checked
										inline
										color="danger"
									/>
									<UI.Checkbox
										label="Disabled"
										id="danger3-check"
										checked
										disabled
										inline
										color="danger"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Warning</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="warning-check"
										inline
										color="warning"
									/>
									<UI.Checkbox
										label="Checked"
										id="warning2-check"
										checked
										inline
										color="warning"
									/>
									<UI.Checkbox
										label="Disabled"
										id="warning3-check"
										checked
										disabled
										inline
										color="warning"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Primary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="primary-check"
										inline
										color="primary"
									/>
									<UI.Checkbox
										label="Checked"
										id="primary2-check"
										checked
										inline
										color="primary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="primary3-check"
										checked
										disabled
										inline
										color="primary"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Secondary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="secondary-check"
										inline
										color="secondary"
									/>
									<UI.Checkbox
										label="Checked"
										id="secondary2-check"
										checked
										inline
										color="secondary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="secondary3-check"
										checked
										disabled
										inline
										color="secondary"
									/>
								</div>
							</div>
							<div
								className="card-text"
								style={{ textAlign: 'right' }}
							>
								<UI.Button
									color="info"
									className="btn-rounded btn-sm"
									onClick={onClickColorCollapse}
								>
									코드 보기 {colorCodeCollapse ? '닫기' : '열기'}
									<UI.RFIcon
										icon="Code"
										className="feather-sm fill-white mt-0 ms-2"
									/>
								</UI.Button>
							</div>
							<UI.Collapse isOpen={colorCodeCollapse}>
								<pre>
									<code className="language-html">{`<div className="row py-2">
	<div className="col-md-4">
		<label>Success</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="success-check"
			inline
			color="success check-light-success"
		/>
		<UI.Checkbox
			label="Checked"
			id="success2-check"
			checked
			inline
			color="success"
		/>
		<UI.Checkbox
			label="Disabled"
			id="success3-check"
			checked
			disabled
			inline
			color="success"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Danger</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="danger-check"
			inline
			color="danger"
		/>
		<UI.Checkbox
			label="Checked"
			id="danger2-check"
			checked
			inline
			color="danger"
		/>
		<UI.Checkbox
			label="Disabled"
			id="danger3-check"
			checked
			disabled
			inline
			color="danger"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Warning</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="warning-check"
			inline
			color="warning"
		/>
		<UI.Checkbox
			label="Checked"
			id="warning2-check"
			checked
			inline
			color="warning"
		/>
		<UI.Checkbox
			label="Disabled"
			id="warning3-check"
			checked
			disabled
			inline
			color="warning"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Primary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="primary-check"
			inline
			color="primary"
		/>
		<UI.Checkbox
			label="Checked"
			id="primary2-check"
			checked
			inline
			color="primary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="primary3-check"
			checked
			disabled
			inline
			color="primary"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Secondary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="secondary-check"
			inline
			color="secondary"
		/>
		<UI.Checkbox
			label="Checked"
			id="secondary2-check"
			checked
			inline
			color="secondary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="secondary3-check"
			checked
			disabled
			inline
			color="secondary"
		/>
	</div>
</div>`}</code>
								</pre>
							</UI.Collapse>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
					<div className="card w-100">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Checkbox - Light Color 설정 (lightStyle)</h4>
						</div>
						<div className="card-body">
							<div className="row py-2">
								<div className="col-md-4">
									<label>Success</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="success-check-light"
										inline
										lightStyle
										color="success"
									/>
									<UI.Checkbox
										label="Checked"
										id="success2-check-light"
										checked
										inline
										lightStyle
										color="success"
									/>
									<UI.Checkbox
										label="Disabled"
										id="success3-check-light"
										checked
										disabled
										inline
										lightStyle
										color="success"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Danger</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="danger-check-light"
										inline
										lightStyle
										color="danger"
									/>
									<UI.Checkbox
										label="Checked"
										id="danger2-check-light"
										checked
										inline
										lightStyle
										color="danger"
									/>
									<UI.Checkbox
										label="Disabled"
										id="danger3-check-light"
										checked
										disabled
										inline
										lightStyle
										color="danger"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Warning</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="warning-check-light"
										inline
										lightStyle
										color="warning"
									/>
									<UI.Checkbox
										label="Checked"
										id="warning2-check-light"
										checked
										inline
										lightStyle
										color="warning"
									/>
									<UI.Checkbox
										label="Disabled"
										id="warning3-check-light"
										checked
										disabled
										inline
										lightStyle
										color="warning"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Primary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="primary-check-light"
										inline
										lightStyle
										color="primary"
									/>
									<UI.Checkbox
										label="Checked"
										id="primary2-check-light"
										checked
										inline
										lightStyle
										color="primary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="primary3-check-light"
										checked
										disabled
										inline
										lightStyle
										color="primary"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Secondary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="secondary-check-light"
										inline
										lightStyle
										color="secondary"
									/>
									<UI.Checkbox
										label="Checked"
										id="secondary2-check-light"
										checked
										inline
										lightStyle
										color="secondary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="secondary3-check-light"
										checked
										disabled
										inline
										lightStyle
										color="secondary"
									/>
								</div>
							</div>
							<div
								className="card-text"
								style={{ textAlign: 'right' }}
							>
								<UI.Button
									color="info"
									className="btn-rounded btn-sm"
									onClick={onClickLightColorCollapse}
								>
									코드 보기 {lightColorCodeCollapse ? '닫기' : '열기'}
									<UI.RFIcon
										icon="Code"
										className="feather-sm fill-white mt-0 ms-2"
									/>
								</UI.Button>
							</div>
							<UI.Collapse isOpen={lightColorCodeCollapse}>
								<pre>
									<code className="language-html">{`<div className="row py-2">
	<div className="col-md-4">
		<label>Success</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="success-check-light"
			inline
			lightStyle
			color="success"
		/>
		<UI.Checkbox
			label="Checked"
			id="success2-check-light"
			checked
			inline
			lightStyle
			color="success"
		/>
		<UI.Checkbox
			label="Disabled"
			id="success3-check-light"
			checked
			disabled
			inline
			lightStyle
			color="success"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Danger</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="danger-check-light"
			inline
			lightStyle
			color="danger"
		/>
		<UI.Checkbox
			label="Checked"
			id="danger2-check-light"
			checked
			inline
			lightStyle
			color="danger"
		/>
		<UI.Checkbox
			label="Disabled"
			id="danger3-check-light"
			checked
			disabled
			inline
			lightStyle
			color="danger"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Warning</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="warning-check-light"
			inline
			lightStyle
			color="warning"
		/>
		<UI.Checkbox
			label="Checked"
			id="warning2-check-light"
			checked
			inline
			lightStyle
			color="warning"
		/>
		<UI.Checkbox
			label="Disabled"
			id="warning3-check-light"
			checked
			disabled
			inline
			lightStyle
			color="warning"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Primary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="primary-check-light"
			inline
			lightStyle
			color="primary"
		/>
		<UI.Checkbox
			label="Checked"
			id="primary2-check-light"
			checked
			inline
			lightStyle
			color="primary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="primary3-check-light"
			checked
			disabled
			inline
			lightStyle
			color="primary"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Secondary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="secondary-check-light"
			inline
			lightStyle
			color="secondary"
		/>
		<UI.Checkbox
			label="Checked"
			id="secondary2-check-light"
			checked
			inline
			lightStyle
			color="secondary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="secondary3-check-light"
			checked
			disabled
			inline
			lightStyle
			color="secondary"
		/>
	</div>
</div>`}</code>
								</pre>
							</UI.Collapse>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 d-flex align-items-stretch">
					<div className="card w-100">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Checkbox - Outline Border Colors 설정 (outline)</h4>
						</div>
						<div className="card-body">
							<div className="row py-2">
								<div className="col-md-4">
									<label>Success</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="success-check-outline"
										inline
										outline
										color="success"
									/>
									<UI.Checkbox
										label="Checked"
										id="success2-check-outline"
										checked
										inline
										outline
										color="success"
									/>
									<UI.Checkbox
										label="Disabled"
										id="success3-check-outline"
										checked
										disabled
										inline
										outline
										color="success"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Danger</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="danger-check-outline"
										inline
										outline
										color="danger"
									/>
									<UI.Checkbox
										label="Checked"
										id="danger2-check-outline"
										checked
										inline
										outline
										color="danger"
									/>
									<UI.Checkbox
										label="Disabled"
										id="danger3-check-outline"
										checked
										disabled
										inline
										outline
										color="danger"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Warning</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="warning-check-outline"
										inline
										outline
										color="warning"
									/>
									<UI.Checkbox
										label="Checked"
										id="warning2-check-outline"
										checked
										inline
										outline
										color="warning"
									/>
									<UI.Checkbox
										label="Disabled"
										id="warning3-check-outline"
										checked
										disabled
										inline
										outline
										color="warning"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Primary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="primary-check-outline"
										inline
										outline
										color="primary"
									/>
									<UI.Checkbox
										label="Checked"
										id="primary2-check-outline"
										checked
										inline
										outline
										color="primary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="primary3-check-outline"
										checked
										disabled
										inline
										outline
										color="primary"
									/>
								</div>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<label>Secondary</label>
								</div>
								<div className="col-md-8">
									<UI.Checkbox
										label="Default"
										id="secondary-check-outline"
										inline
										outline
										color="secondary"
									/>
									<UI.Checkbox
										label="Checked"
										id="secondary2-check-outline"
										checked
										inline
										outline
										color="secondary"
									/>
									<UI.Checkbox
										label="Disabled"
										id="secondary3-check-outline"
										checked
										disabled
										inline
										outline
										color="secondary"
									/>
								</div>
							</div>
							<div
								className="card-text"
								style={{ textAlign: 'right' }}
							>
								<UI.Button
									color="info"
									className="btn-rounded btn-sm"
									onClick={onClickOutlineCollapse}
								>
									코드 보기 {outlineCodeCollapse ? '닫기' : '열기'}
									<UI.RFIcon
										icon="Code"
										className="feather-sm fill-white mt-0 ms-2"
									/>
								</UI.Button>
							</div>
							<UI.Collapse isOpen={outlineCodeCollapse}>
								<pre>
									<code className="language-html">{`<div className="row py-2">
	<div className="col-md-4">
		<label>Success</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="success-check-outline"
			inline
			outline
			color="success"
		/>
		<UI.Checkbox
			label="Checked"
			id="success2-check-outline"
			checked
			inline
			outline
			color="success"
		/>
		<UI.Checkbox
			label="Disabled"
			id="success3-check-outline"
			checked
			disabled
			inline
			outline
			color="success"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Danger</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="danger-check-outline"
			inline
			outline
			color="danger"
		/>
		<UI.Checkbox
			label="Checked"
			id="danger2-check-outline"
			checked
			inline
			outline
			color="danger"
		/>
		<UI.Checkbox
			label="Disabled"
			id="danger3-check-outline"
			checked
			disabled
			inline
			outline
			color="danger"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Warning</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="warning-check-outline"
			inline
			outline
			color="warning"
		/>
		<UI.Checkbox
			label="Checked"
			id="warning2-check-outline"
			checked
			inline
			outline
			color="warning"
		/>
		<UI.Checkbox
			label="Disabled"
			id="warning3-check-outline"
			checked
			disabled
			inline
			outline
			color="warning"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Primary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="primary-check-outline"
			inline
			outline
			color="primary"
		/>
		<UI.Checkbox
			label="Checked"
			id="primary2-check-outline"
			checked
			inline
			outline
			color="primary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="primary3-check-outline"
			checked
			disabled
			inline
			outline
			color="primary"
		/>
	</div>
</div>
<div className="row py-2">
	<div className="col-md-4">
		<label>Secondary</label>
	</div>
	<div className="col-md-8">
		<UI.Checkbox
			label="Default"
			id="secondary-check-outline"
			inline
			outline
			color="secondary"
		/>
		<UI.Checkbox
			label="Checked"
			id="secondary2-check-outline"
			checked
			inline
			outline
			color="secondary"
		/>
		<UI.Checkbox
			label="Disabled"
			id="secondary3-check-outline"
			checked
			disabled
			inline
			outline
			color="secondary"
		/>
	</div>
</div>`}</code>
								</pre>
							</UI.Collapse>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UICheckboxDemo;
