import { FC, memo } from 'react';
import Icon from '@mdi/react';
import * as MDIcon from '@mdi/js';
import { IUIIconProps, TUIMDIcon, IMDIconProps } from '@/app/types/components';

const UIMDIcon: FC<IUIIconProps> = memo(({ icon, ...props }: IUIIconProps) => {
	const ico = icon as TUIMDIcon;
	const IconPath = ico && MDIcon[ico];
	const prop = props as IMDIconProps;
	if (IconPath) {
		return (
			<Icon
				{...prop}
				path={IconPath}
			/>
		);
	} else {
		const UndefinedIcon = ico && MDIcon['mdiSlashForwardBox'];
		return <UndefinedIcon />;
	}
});
UIMDIcon.displayName = 'UIMDIcon';

export default UIMDIcon;
