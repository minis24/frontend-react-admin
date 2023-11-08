import { FC, memo } from 'react';
import * as RBIcon from 'react-bootstrap-icons';
import { IUIIconProps, TUIIcon } from '@/app/types/components';

const UIIcon: FC<IUIIconProps> = memo(({ icon, ...props }: IUIIconProps) => {
	const ico = icon as TUIIcon;
	const Icon = ico && RBIcon[ico];
	if (Icon) {
		return <Icon {...props} />;
	} else {
		const UndefinedIcon = ico && RBIcon['SlashCircle'];
		return <UndefinedIcon />;
	}
});
UIIcon.displayName = 'UIIcon';

export default UIIcon;
