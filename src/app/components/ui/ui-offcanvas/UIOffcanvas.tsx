import { FC, memo, useEffect, useState } from 'react';
import { IUIOffcanvasProps } from '@/app/types/components';
import Offcanvas from 'react-bootstrap/Offcanvas';

const UIOffcanvas: FC<IUIOffcanvasProps> = memo(({ title, show, closeButton, onHide, children, ...props }) => {
	const [isOpen, setIsOpen] = useState<boolean>(show);

	useEffect(() => {
		setIsOpen(show);
	}, [show]);

	return (
		<Offcanvas
			show={isOpen}
			onHide={onHide}
			placement="bottom"
			{...props}
		>
			<Offcanvas.Header closeButton={closeButton && closeButton}>
				{title && <Offcanvas.Title>{title}</Offcanvas.Title>}
			</Offcanvas.Header>
			<Offcanvas.Body>{children}</Offcanvas.Body>
		</Offcanvas>
	);
});
UIOffcanvas.displayName = 'UIOffcanvas';

export default UIOffcanvas;
