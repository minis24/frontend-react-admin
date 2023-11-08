import { FC, memo } from 'react';
import { IUITreeviewProps } from '@/app/types/components';
import { MDBTreeview } from 'mdbreact';
import UITreeviewList from '@/app/components/ui/ui-treeview/UITreeviewList';

const UITreeview: FC<IUITreeviewProps> = memo(({ ...props }) => {
	return (
		<MDBTreeview
			theme="animated"
			className="ui-treeview-container"
		>
			<UITreeviewList {...props} />
		</MDBTreeview>
	);
});
UITreeview.displayName = 'UITreeview';

export default UITreeview;
