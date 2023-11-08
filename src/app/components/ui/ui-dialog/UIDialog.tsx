import { memo, useCallback, useState, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';

const UIDialog = memo(({ msg, title, childKey, onHide, type }: any) => {
	console.log(msg, title, childKey, onHide, type);
	const [show, setShow] = useState(true);

	const handleClose = useCallback(() => {
		window.$ui.dialog().innerClose(childKey);
		setShow(false);
		if (onHide) {
			onHide(show);
		}
	}, [onHide, show]);

	//LSH - 오프캔버스 위에 모달 띄우는 케이스때문에 추가
	const setStyleAttribute = useMemo(() => {
		let styleObj = {
			zIndex: msg.zIndex ? msg.zIndex : '1055',
		};

		return {
			style: styleObj,
		};
	}, []);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			className={msg.dialogSize && `modal-${msg.dialogSize}`}
			//LSH - 오프캔버스 위에 모달 띄우는 케이스때문에 추가
			backdrop={msg.backdrop}
			keyboard={msg.keyboard}
			{...setStyleAttribute}
			backdropClassName={msg.zIndex ? 'g-dialog-component-backdrop' : ''}
			//LSH - Ends

			//className="modal-xl"
			//className="modal-lg"
			//className="modal-sm"
		>
			<Modal.Header closeButton>
				{msg.title ? <Modal.Title>{msg.title}</Modal.Title> : <Modal.Title>{title}</Modal.Title>}
			</Modal.Header>
			{msg.element ? (
				<Modal.Body>{msg.element}</Modal.Body>
			) : (
				<Modal.Body dangerouslySetInnerHTML={{ __html: msg }}></Modal.Body>
			)}
			{/*<Modal.Footer>
				<UI.Button
					variant="secondary"
					onClick={handleClose}
				>
					Close
				</UI.Button>
				<UI.Button
					variant="primary"
					onClick={handleClose}
				>
					Save Changes
				</UI.Button>
			</Modal.Footer>*/}
		</Modal>
	);
});
UIDialog.displayName = 'UIDialog';

export default UIDialog;
