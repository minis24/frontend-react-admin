import { useCallback, forwardRef, useImperativeHandle, Children, useRef, cloneElement } from 'react';
import { IForm, IUIFormProps } from '@/app/types/components';

interface IFormValidateRefObj {
	[key: string]: any;
}

const UIForm = forwardRef<IForm, IUIFormProps>(({ children, ...props }, ref: any) => {
	const formValidateRefObj = useRef<IFormValidateRefObj>({});
	const validateObj = useRef<IFormValidateRefObj>({});

	// UI.Form의 외부노출 메서드 ---------------------------------
	useImperativeHandle(ref, () => {
		return {
			validate: () => {
				validateObj.current = {};
				return checkValidate();
			},
			initValidate: () => {
				//
			},
		};
	});

	const onsubmitHandler = useCallback((e: any) => {
		e.preventDefault();
		$ui.alert('submit!');
	}, []);

	const checkValidate = () => {
		checkFormValidate(children, '0');

		let returnVal = true;
		Object.keys(validateObj.current).map((key: string) => {
			if (validateObj.current[key] !== 'is-valid') {
				returnVal = false;
			}
		});

		return returnVal;
	};

	const checkFormValidate = (childrens: any, pn: string): any => {
		return Children.map(childrens, (child: any, index: number) => {
			if (child.type.displayName === 'UIInputField' || child.type.displayName === 'UISelect') {
				const key = pn + index;
				if (child.ref) {
					let currRef = null;
					if (!child.ref.current) {
						currRef = formValidateRefObj.current[key];
					} else {
						currRef = child.ref.current;
					}
					if (currRef) {
						const valid = currRef.validate();
						if (valid != null) {
							validateObj.current = Object.assign(validateObj.current, { [key]: valid });
						}
					}
				} else if (!child.ref) {
					if (formValidateRefObj.current[key]) {
						const valid = formValidateRefObj.current[key].validate();
						validateObj.current = Object.assign(validateObj.current, { [key]: valid });
					}
				}
			}

			if (child.props.children && typeof child.props.children !== 'string') {
				checkFormValidate(child.props.children, pn + index);
			}
		});
	};

	const setFormElement = (childrens: any, pn: string): any => {
		return Children.map(childrens, (child: any, index: number) => {
			let node = null;
			if (child.props.children && typeof child.props.children !== 'string') {
				node = cloneFormElement(child, child.props, setFormElement(child.props.children, pn + index), pn + index);
			} else {
				node = cloneFormElement(child, child.props, null, pn + index);
			}
			return node;
		});
	};

	const cloneFormElement = (elem: any, prop: any, c?: any, pn?: string): any => {
		let props = { ...prop };
		if (elem.type.displayName === 'UIInputField' || elem.type.displayName === 'UISelect') {
			if (elem.ref) {
				props = Object.assign(props);
			} else {
				props = Object.assign(props, {
					ref: (ref: any) => {
						const key = pn as string;
						formValidateRefObj.current = Object.assign(formValidateRefObj.current, { [key]: ref });
						return formValidateRefObj.current[key];
					},
				});
			}
		}
		if (c) {
			return cloneElement(elem, props, c);
		} else {
			return cloneElement(elem, props);
		}
	};

	const renderFormElement = useCallback((childrens: any): any => {
		formValidateRefObj.current = {};
		return setFormElement(childrens, '0');
	}, []);

	return (
		<>
			<form
				onSubmit={onsubmitHandler}
				{...props}
			>
				{renderFormElement(children)}
			</form>
		</>
	);
});
UIForm.displayName = 'UIForm';

export default UIForm;
