import { FC, memo } from 'react';
//import Button from 'react-bootstrap/Button';
import { Button } from 'reactstrap';
import { IUIButtonProps } from '@/app/types/components';

const UIButton: FC<IUIButtonProps> = memo(({ text, children, ...props }: IUIButtonProps) => {
	const txt = text as string;

	//if (txt) {
	//	return <Button {...props}>{txt}</Button>;
	//} else {
	//	return <Button {...props}>{children}</Button>;
	//}
	//if (txt) {
	//	return <button {...props}>{txt}</button>;
	//} else {
	//	return <button {...props}>{children}</button>;
	//}
	if (txt) {
		return <Button {...props}>{txt}</Button>;
	} else {
		return <Button {...props}>{children}</Button>;
	}
});
UIButton.displayName = 'UIButton';

export default UIButton;
