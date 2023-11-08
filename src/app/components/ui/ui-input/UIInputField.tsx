import {
	useState,
	useEffect,
	ChangeEvent,
	FocusEvent,
	HTMLInputTypeAttribute,
	useMemo,
	forwardRef,
	useImperativeHandle,
	useRef,
} from 'react';
import { IInputField } from '@/app/types/components';

type TValidationResult = string | boolean;
type TValidationRule = TValidationResult | ((value: any) => TValidationResult);

interface IInputFieldProps {
	value?: string | number | ReadonlyArray<string>;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	label?: string;
	theme?: 'default' | 'bootstrap';
	type?: HTMLInputTypeAttribute;
	id?: string;
	name?: string;
	style?: object;
	className?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	readonly?: boolean;
	errorMessage?: string;
	inlineLabel?: boolean;
	rules?: readonly TValidationRule[];
	inputFieldStyle?: object;
	children?: any;
	childrenType?: 'prepend' | 'append';
}

const UIInputField = forwardRef<IInputField, IInputFieldProps>(
	(
		{
			value = '',
			onChange,
			onBlur,
			id,
			type,
			name,
			theme = 'default',
			label,
			className = '',
			required,
			inlineLabel,
			errorMessage,
			rules,
			inputFieldStyle,
			children,
			childrenType = 'append',
			readonly,
			...props
		},
		ref: any,
	) => {
		const [inputValue, setInputValue] = useState('');
		const [resultErrorMsg, setResultErrorMsg] = useState(errorMessage ? errorMessage : '');
		const [isInvalid, setIsInvalid] = useState('');
		const startValid = useRef(false);
		const firstRendering = useRef(true);
		const inputRootRef = useRef<HTMLDivElement>(null);
		const inputRef = useRef<HTMLInputElement>(null);

		// InputField의 외부노출 메서드 ---------------------------------
		useImperativeHandle(ref, () => {
			return {
				validate: () => {
					console.log('call UI.InputField validate!!!');
					firstRendering.current = false;
					return prevalidation();
				},
				initValidate: () => {
					initValidationClassName();
					startValid.current = false;
					setIsInvalid('');
				},
				focus: () => {
					if (inputRef.current) {
						return inputRef.current.focus();
					}
				},
			};
		});

		// InputField의 이벤트 핸들러 -----------------------------------
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			firstRendering.current = false;
			setInputValue(e.target.value);
			onChange && onChange(e);
		};
		const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
			firstRendering.current = false;
			onBlur && onBlur(e);
			prevalidation();
		};

		// InputField의 내부 사용 함수 ----------------------------------
		// validation을 위한 Wrapper 엘리먼트에 'was-validated' class 세팅.
		const setValidationClassName = () => {
			if (required || !!rules) {
				if (inputRootRef.current) {
					inputRootRef.current.classList.add('was-validated');
					inputRootRef.current.classList.remove('novalidate');
				}
				startValid.current = true;
				return true;
			} else {
				return false;
			}
		};

		// 부모 div의 validation처리를 위한 class를 초기화.
		const initValidationClassName = () => {
			if (inputRootRef.current) {
				inputRootRef.current.classList.add('novalidate');
				inputRootRef.current.classList.remove('was-validated');
				return false;
			} else {
				return true;
			}
		};

		// validation하기 전 미리 체크사항 확인 후 validation 처리.
		const prevalidation = () => {
			let returnVal = null;
			if (!firstRendering.current) {
				//	firstRendering.current = false;
				//} else {
				if (!startValid.current) {
					if (setValidationClassName()) {
						returnVal = validation();
					}
				} else {
					returnVal = validation();
				}
			}
			return returnVal;
		};

		// Rules 아니면 required속석이 있으면 유효성 검증 시작.
		const validation = () => {
			if (required || !!rules) {
				if (inputValue === '') {
					setIsInvalid('is-invalid');
					return 'is-invalid';
				} else if (!!rules) {
					const valid = checkRules();
					setIsInvalid(valid);
					return valid;
				} else {
					setIsInvalid('is-valid');
					return 'is-valid';
				}
			} else {
				setIsInvalid('is-valid');
				return 'is-valid';
			}
		};

		// Rules값 검증 후 에러메시지 세팅.
		const checkRules = () => {
			let returnMsg = '';
			if (rules && Array.isArray(rules)) {
				for (let i = 0; i < rules.length; i++) {
					const type = typeof rules[i];
					if (type === 'string') {
						returnMsg = rules[i];
						break;
					} else if (type === 'boolean') {
						break;
					} else if (type === 'function') {
						const result = rules[i](inputValue);
						if (typeof result === 'string') {
							returnMsg = result;
							break;
						}
					}
				}
			}

			// returnMsg가 있을 때만 Rules에 걸렸다는 의미.
			if (returnMsg) {
				setResultErrorMsg(returnMsg);
				return 'is-invalid';
			} else {
				return 'is-valid';
			}
		};

		// input element를 감싸고 있는 div에 attribute 세팅.
		const inputWrapperAttribute = useMemo(() => {
			return {
				className: `${theme === 'default' ? 'app-ui-inputfeild' : ''} novalidate ${inlineLabel ? 'row' : ''}`,
				//${required ? 'was-validated' : 'novalidate'}
				//${inlineLabel ? 'row' : ''}`,
			};
		}, [theme, required, inlineLabel]);

		// clearable 버튼 적용
		//const clearableAttr = useMemo(() => {
		//	return { className: `bi bi-x-circle-fill clearable` };
		//}, []);

		// React Hook -----------------------------------------------------------
		// input의 값이 변경될 때 호출되는 hook.
		useEffect(() => {
			setInputValue(value as string);
		}, [value]);

		useEffect(() => {
			prevalidation();
		}, [inputValue]);

		// JSX 바인딩을 위한 함수 ----------------------------------------------------
		const setLabel = useMemo(() => {
			return (
				<label
					htmlFor={id && id}
					className={inlineLabel ? 'col-sm-2 col-form-label' : 'form-label'}
				>
					{label}
				</label>
			);
		}, [label, id, inlineLabel]);

		const setInput = useMemo(() => {
			if (children) {
				return (
					<>
						<div className="input-group">
							{childrenType === 'prepend' ? children : null}
							<input
								type={type ? type : 'text'}
								className={`form-control ${className && className} ${isInvalid}`}
								value={inputValue}
								onChange={onChangeHandler}
								onBlur={onBlurHandler}
								id={id && id}
								name={name && name}
								readOnly={readonly && readonly}
								required={required && required}
								{...props}
								ref={inputRef}
							/>
							{childrenType === 'append' ? children : null}
						</div>
						<div className={`invalid-feedback ${isInvalid}`}>{resultErrorMsg}</div>
					</>
				);
			} else {
				return (
					<>
						<input
							type={type ? type : 'text'}
							className={`form-control ${className && className} ${isInvalid}`}
							value={inputValue}
							onChange={onChangeHandler}
							onBlur={onBlurHandler}
							id={id && id}
							name={name && name}
							readOnly={readonly && readonly}
							required={required && required}
							{...props}
							ref={inputRef}
						/>
						<div className={`invalid-feedback ${isInvalid}`}>{resultErrorMsg}</div>
					</>
				);
			}
		}, [className, inputValue, onChangeHandler, onBlurHandler, id, required, props]);

		return (
			<div
				{...inputWrapperAttribute}
				ref={inputRootRef}
				style={inputFieldStyle && inputFieldStyle}
			>
				{label && setLabel}
				{inlineLabel ? <div className="col-sm-10">{setInput}</div> : <>{setInput}</>}
				{/*<i {...clearableAttr} />*/}
			</div>
		);
	},
);
UIInputField.displayName = 'UIInputField';

export default UIInputField;
