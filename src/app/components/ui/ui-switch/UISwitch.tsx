import { forwardRef, useImperativeHandle } from 'react';
import { ISwitch, IUISwitchProps } from '@/app/types/components';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

//interface IFormValidateRefObj {
//	[key: string]: any;
//}

const UISwitch = forwardRef<ISwitch, IUISwitchProps>(({ checked, onChange, ...props }, ref: any) => {
	// InputField의 외부노출 메서드 ---------------------------------
	useImperativeHandle(ref, () => {
		return {
			validate: () => {
				//
			},
			initValidate: () => {
				//
			},
		};
	});

	return (
		<BootstrapSwitchButton
			{...props}
			checked={checked && checked}
			onChange={onChange && onChange}
		/>
	);
});
UISwitch.displayName = 'UISwitch';

export default UISwitch;
