import { memo } from 'react';
import { Tooltip } from 'reactstrap';

const UITooltip = memo(({ msg, isOpen, target }: any) => {
	//const handleClose = useCallback(() => {
	//	window.$ui.dialog().innerClose(childKey);
	//	setShow(false);
	//}, []);

	return (
		<>
			<Tooltip
				placement="bottom"
				isOpen={isOpen}
				target={target}
			>
				{msg}
			</Tooltip>
		</>
	);
});
UITooltip.displayName = 'UITooltip';

export default UITooltip;
