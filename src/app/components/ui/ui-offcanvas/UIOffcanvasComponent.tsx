import { FC, memo, useCallback, useMemo, useState } from 'react';
import { IUIOffcanvasProps } from '@/app/types/components';
import Offcanvas from 'react-bootstrap/Offcanvas';

const UIOffcanvas: FC<IUIOffcanvasProps> = memo(
	({ title, msg, height, className, bodyClassName, closeButton = true, onHide, childKey, children, ...props }) => {
		const [isOpen, setIsOpen] = useState<boolean>(true);

		const handleClose = useCallback((e: any) => {
			window.$ui.offcanvas().innerClose(childKey);
			setIsOpen(false);
			if (onHide) {
				onHide(e);
			}
		}, []);

		const setStyleAttribute = useMemo(() => {
			let styleObj = {
				zIndex: '1065',
			};

			if (height) {
				styleObj = Object.assign(styleObj, { height });
			}

			return {
				style: styleObj,
			};
		}, []);

		return (
			<Offcanvas
				show={isOpen}
				onHide={handleClose}
				placement="bottom"
				{...setStyleAttribute}
				className={className && className}
				backdropClassName="g-offcanvas-component-backdrop"
				{...props}
			>
				<Offcanvas.Header closeButton={closeButton && closeButton}>
					{title && <Offcanvas.Title>{title}</Offcanvas.Title>}
				</Offcanvas.Header>
				{msg.element ? (
					<Offcanvas.Body className={bodyClassName && bodyClassName}>{msg.element}</Offcanvas.Body>
				) : (
					<Offcanvas.Body
						className={bodyClassName && bodyClassName}
						dangerouslySetInnerHTML={{ __html: msg }}
					></Offcanvas.Body>
				)}
			</Offcanvas>
		);
	},
);
UIOffcanvas.displayName = 'UIOffcanvas';

export default UIOffcanvas;
