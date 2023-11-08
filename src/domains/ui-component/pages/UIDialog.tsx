import Prism from 'prismjs';
import { useCallback, useEffect, useState } from 'react';
//import Modal from 'react-bootstrap/Modal';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const UIDialog = () => {
	const [show, setShow] = useState(false);

	//const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const toggle = () => setShow(!show);

	const onDialog = useCallback(() => {
		$ui.dialog('fdkjj');
	}, []);

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
						<strong>UI Dialog</strong>는 사용자 알림이나, JSX 콘텐츠를 자유롭게 작성하여 띄워주는 대화 상자 입니다.
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="border-bottom title-part-padding">
							<h4 className="card-title mb-0">UI.Dialog 테스트</h4>
						</div>
						<div className="card-body">
							<p className="card-text">
								<mark>
									<code>UI.Dialog</code>
								</mark>
								컴포넌트는{' '}
								<a
									href="https://react-bootstrap.netlify.app/docs/components/modal/"
									target="_blank"
								>
									https://react-bootstrap.netlify.app/docs/components/modal
								</a>{' '}
								<strong>react bootstrap</strong> 기반으로 만들어졌습니다.
							</p>
							<UI.Button
								variant="primary"
								className="btn btn-success"
								onClick={onDialog}
							>
								UI.Dialog테스트(미완성)
							</UI.Button>
							<br />
							<br />
							<UI.Button
								variant="primary"
								className="btn btn-success"
								onClick={handleShow}
							>
								reactstrap모달 컴포넌트
							</UI.Button>
							<Modal
								isOpen={show}
								toggle={toggle}
							>
								<ModalHeader toggle={toggle}>Modal title</ModalHeader>
								<ModalBody>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
									et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
									aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
									officia deserunt mollit anim id est laborum.
								</ModalBody>
								<ModalFooter>
									<UI.Button
										color="primary"
										onClick={toggle}
									>
										Do Something
									</UI.Button>
									<UI.Button
										color="secondary"
										onClick={toggle}
									>
										Cancel
									</UI.Button>
								</ModalFooter>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UIDialog;
