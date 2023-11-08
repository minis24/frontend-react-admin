import { FC, memo } from 'react';
import * as RFIcon from 'react-feather';
import { IUIIconProps, TUIRFIcon } from '@/app/types/components';

const UIRFIcon: FC<IUIIconProps> = memo(({ icon, ...props }: IUIIconProps) => {
	const ico = icon as TUIRFIcon;
	const Icon = ico && RFIcon[ico];
	if (Icon) {
		return <Icon {...props} />;
	} else {
		const UndefinedIcon = ico && RFIcon['Slash'];
		return <UndefinedIcon />;
	}
});
UIRFIcon.displayName = 'UIRFIcon';

export default UIRFIcon;
