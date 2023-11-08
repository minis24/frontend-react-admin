import { FC, memo } from 'react';
import { Collapse } from 'reactstrap';
import { IUICollapseProps } from '@/app/types/components';

const UICollapse: FC<IUICollapseProps> = memo(({ children, ...props }) => {
	return (
		<>
			<Collapse {...props}>{children}</Collapse>
		</>
	);
});
UICollapse.displayName = 'UICollapse';

export default UICollapse;
