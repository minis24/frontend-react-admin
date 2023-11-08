import { useEffect, useCallback, memo, useState, useMemo } from 'react';

const UIAlert = memo(({ msg, title, childKey, type }: any) => {
	const [modalAnimate, setModalAnimate] = useState('modal-show');

	const setHeader = useMemo(() => {
		if (title) {
			return (
				<div
					className="modal-header"
					style={{ margin: 0, padding: 0 }}
					dangerouslySetInnerHTML={{ __html: title }}
				/>
			);
		} else {
			return <></>;
		}
	}, [title]);

	const setIcon = useMemo(() => {
		if (type === 'success') {
			return (
				<UI.Icon
					icon="CheckCircle"
					color="success"
				/>
			);
		} else if (type === 'info') {
			return (
				<UI.Icon
					icon="Info"
					color="info"
				/>
			);
		} else if (type === 'warning') {
			return (
				<UI.Icon
					icon="ExclamationSquareFill"
					color="warning"
				/>
			);
		} else if (type === 'error') {
			return (
				<UI.Icon
					icon="ExclamationSquareFill"
					color="error"
				/>
			);
		}
	}, [type]);

	const onClose = useCallback(() => {
		setModalAnimate('modal-close');
	}, []);

	const animationend = useCallback(
		(e: any) => {
			if (modalAnimate === 'modal-close') {
				(e.currentTarget as HTMLElement).style.opacity = '0';
				window.$ui.alert().innerClose(childKey);
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
						{setIcon}
						{setHeader}
						<div
							className="modal-body text-center"
							dangerouslySetInnerHTML={{ __html: msg }}
						/>
						<hr />
						<div
							className="modal-footer bg-white justify-content-between"
							style={{ margin: '0 auto' }}
						>
							<UI.Button
								variant="light"
								onClick={onClose}
							>
								확인
							</UI.Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
UIAlert.displayName = 'UIAlert';

export default UIAlert;
