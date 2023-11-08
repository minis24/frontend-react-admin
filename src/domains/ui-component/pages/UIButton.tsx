import Prism from 'prismjs';
import { useEffect } from 'react';

const UIButton = () => {
	useEffect(() => {
		Prism.highlightAll();
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
						<strong>UI Button</strong>은 부트스트랩 버튼을 활용하여 만든 UI.Button 컴포넌트 이다.
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Button</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Example</div>
							<UI.Button>Click me!</UI.Button>
							<hr />
							<div className="card-title">JSX Code</div>
							<pre>
								<code className="language-html">{`<UI.Button>
Click me!
</UI.Button>`}</code>
							</pre>
							<hr />
							<div className="card-title">설정 가능한 Props</div>
							<table
								data-bs-toggle="table"
								data-height="250"
								data-mobile-responsive="true"
								className="table-striped"
								style={{ width: '100%' }}
							>
								<thead className="thead-light">
									<tr>
										<th scope="col">Prop명</th>
										<th scope="col">Type</th>
										<th scope="col">Default</th>
										<th scope="col">입력할 수 있는 값</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">children</th>
										<td>string | JSX</td>
										<td>-</td>
										<td>string 또는 컴포넌트</td>
									</tr>
									<tr>
										<th scope="row">color</th>
										<td>string</td>
										<td>"secondary"</td>
										<td>primary, secondary, success, info, warning, danger, light, dark</td>
									</tr>
									<tr>
										<th scope="row">outline</th>
										<td>boolean</td>
										<td>false</td>
										<td>true, false</td>
									</tr>
									<tr>
										<th scope="row">size</th>
										<td>sm | lg</td>
										<td>-</td>
										<td>sm, lg</td>
									</tr>
									<tr>
										<th scope="row">block</th>
										<td>boolean</td>
										<td>false</td>
										<td>true, false</td>
									</tr>
									<tr>
										<th scope="row">active</th>
										<td>boolean</td>
										<td>false</td>
										<td>true, false</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">color속성 세팅 예</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Example</div>
							<div className="button-group">
								<UI.Button color="primary">primary</UI.Button>
								<UI.Button color="secondary">secondary</UI.Button>
								<UI.Button color="success">success</UI.Button>
								<UI.Button color="info">info</UI.Button>
								<UI.Button color="warning">warning</UI.Button>
								<UI.Button color="danger">danger</UI.Button>
								<UI.Button color="light">light</UI.Button>
								<UI.Button color="dark">dark</UI.Button>
								<UI.Button color="link">link</UI.Button>
							</div>
							<hr />
							<div className="card-title">JSX Code</div>
							<pre>
								<code className="language-html">{`<div className="button-group">
	<UI.Button color="primary">primary</UI.Button>
	<UI.Button color="secondary">secondary</UI.Button>
	<UI.Button color="success">success</UI.Button>
	<UI.Button color="info">info</UI.Button>
	<UI.Button color="warning">warning</UI.Button>
	<UI.Button color="danger">danger</UI.Button>
	<UI.Button color="light">light</UI.Button>
	<UI.Button color="dark">dark</UI.Button>
	<UI.Button color="link">link</UI.Button>
</div>`}</code>
							</pre>
						</div>
					</div>
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">outline 속성 세팅 예</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Example</div>
							<div className="button-group">
								<UI.Button
									color="primary"
									outline
								>
									primary
								</UI.Button>
								<UI.Button
									color="secondary"
									outline
								>
									secondary
								</UI.Button>
								<UI.Button
									color="success"
									outline
								>
									success
								</UI.Button>
								<UI.Button
									color="info"
									outline
								>
									info
								</UI.Button>
								<UI.Button
									color="warning"
									outline
								>
									warning
								</UI.Button>
								<UI.Button
									color="danger"
									outline
								>
									danger
								</UI.Button>
								<UI.Button
									color="light"
									outline
								>
									light
								</UI.Button>
								<UI.Button
									color="dark"
									outline
								>
									dark
								</UI.Button>
								<UI.Button
									color="link"
									outline
								>
									link
								</UI.Button>
							</div>
							<hr />
							<div className="card-title">JSX Code</div>
							<pre>
								<code className="language-html">{`<div className="button-group">
	<UI.Button color="primary" outline>primary</UI.Button>
	<UI.Button color="secondary" outline>secondary</UI.Button>
	<UI.Button color="success" outline>success</UI.Button>
	<UI.Button color="info" outline>info</UI.Button>
	<UI.Button color="warning" outline>warning</UI.Button>
	<UI.Button color="danger" outline>danger</UI.Button>
	<UI.Button color="light" outline>light</UI.Button>
	<UI.Button color="dark" outline>dark</UI.Button>
	<UI.Button color="link" outline>link</UI.Button>
</div>`}</code>
							</pre>
						</div>
					</div>
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">children에 아이콘과 함께 입력</h4>
						</div>
						<div className="card-body">
							<div className="card-title">Example</div>
							<div className="button-group">
								<UI.Button
									color="primary"
									className="btn-rounded"
								>
									<UI.RFIcon
										icon="Heart"
										className="feather-sm fill-white me-2"
									/>
									Heart
								</UI.Button>
								<UI.Button color="secondary">
									<UI.RFIcon
										icon="Heart"
										className="feather-sm fill-white me-2"
									/>
									Heart
								</UI.Button>
								<UI.Button color="danger">
									<UI.RFIcon
										icon="Heart"
										className="feather-sm fill-white me-2"
									/>
									Heart
								</UI.Button>
							</div>
							<hr />
							<div className="card-title">JSX Code</div>
							<pre>
								<code className="language-html">{`<UI.Button
	color="primary"
	className="btn-rounded"
>
	<UI.RFIcon
		icon="Heart"
		className="feather-sm fill-white me-2"
	/>
	Heart
</UI.Button>
<UI.Button color="secondary">
	<UI.RFIcon
		icon="Heart"
		className="feather-sm fill-white me-2"
	/>
	Heart
</UI.Button>
<UI.Button color="danger">
	<UI.RFIcon
		icon="Heart"
		className="feather-sm fill-white me-2"
	/>
	Heart
</UI.Button>`}</code>
							</pre>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UIButton;
