import { useEffect, useCallback, memo, useState, useMemo, useRef } from 'react';

const UiConfirm = memo(({ msg, title, childKey, confirmButton = '확인', cancelButton = '취소' }: any) => {
	const [modalAnimate, setModalAnimate] = useState('modal-show');
	const result = useRef(false);

	const setHeader = useMemo(() => {
		if (title) {
			return (
				<div
					className="modal-header"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
			);
		} else {
			return <></>;
		}
	}, [title]);



	
	const onOk = useCallback(() => {
		result.current = true;
		setModalAnimate('modal-close');
	}, []);





	const onCancel = useCallback(() => {
		result.current = false;
		setModalAnimate('modal-close');
	}, []);





	const animationend = useCallback(
		(e: any) => {
			if (modalAnimate === 'modal-close') {
				(e.currentTarget as HTMLElement).style.opacity = '0';
				$ui.confirm().close(childKey, result.current);
			}
		},
		[childKey, modalAnimate],
	);

	useEffect(() => {
		//
	}, [modalAnimate]);

	return (
		<div>
			<div className="modal-mask g-dialog-mask">
				<div className="modal-wrapper g-dialog-centered">
					<div
						className={`modal-container shadow border-none radius-2 ` + modalAnimate}
						onAnimationEnd={animationend}
					>
						{setHeader}
						<div
							className="modal-body text-center"
							dangerouslySetInnerHTML={{ __html: msg }}
						/>
						<hr />
						<div className="modal-footer bg-white justify-content-between pt-3">
							<UI.Button
								variant="contained"
								onClick={onOk}
							>
								{confirmButton}
							</UI.Button>
							<UI.Button
								variant="contained"
								onClick={onCancel}
							>
								{cancelButton}
							</UI.Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
UiConfirm.displayName = 'UiConfirm';

export default UiConfirm;
