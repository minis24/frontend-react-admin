import { forwardRef, useImperativeHandle, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { ISelect, IUISelectProps } from '@/app/types/components';
import { FormGroup, Input } from 'reactstrap';

//interface IFormValidateRefObj {
//	[key: string]: any;
//}

const UISelect = forwardRef<ISelect, IUISelectProps>(
	(
		{
			required,
			children,
			theme = 'default',
			label,
			id,
			name,
			className = '',
			inlineLabel,
			errorMessage,
			value,
			selectStyle,
			options,
			onChange,
			onBlur,
			...props
		},
		ref: any,
	) => {
		const firstRendering = useRef(true);
		const rootGroupRef = useRef<HTMLDivElement>(null);
		const [isInvalid, setIsInvalid] = useState('');
		const startValid = useRef(false);
		const [resultErrorMsg] = useState(errorMessage ? errorMessage : '');

		// InputField의 외부노출 메서드 ---------------------------------
		useImperativeHandle(ref, () => {
			return {
				validate: () => {
					firstRendering.current = false;
					preCheck();
					return validation();
				},
				initValidate: () => {
					startValid.current = false;
					setIsInvalid('');
				},
			};
		});

		const validation = () => {
			//LSH - 필수 아닌 경우 검사통과 추가
			if (required) {
				if (value === '') {
					setIsInvalid('is-invalid');
					return 'is-invalid';
				} else {
					setIsInvalid('is-valid');
					return 'is-valid';
				}
			} else {
				setIsInvalid('is-valid');
				return 'is-valid';
			}
		};

		// UI.Select의 내부 사용 함수 ----------------------------------
		// validation하기 전 미리 체크사항 확인
		const preCheck = () => {
			if (!firstRendering.current) {
				if (!startValid.current) {
					if (setValidationClassName()) {
						validation();
					}
				} else {
					validation();
				}
			}
		};
		// validation을 위한 Wrapper 엘리먼트에 'was-validated' class 세팅.
		const setValidationClassName = () => {
			if (required) {
				if (rootGroupRef.current) {
					const wrapper = rootGroupRef.current as HTMLDivElement;
					if (wrapper.classList.contains('novalidate')) {
						wrapper.classList.add('was-validated');
						wrapper.classList.remove('novalidate');
						startValid.current = true;
					}
				}
				return true;
			} else {
				return false;
			}
		};

		// select element를 감싸고 있는 div에 attribute 세팅.
		const selectWrapperAttribute = useMemo(() => {
			const themeUI = theme === 'default' ? 'app-ui-select' : '';
			const inlineLabelUI = inlineLabel ? 'row' : '';
			return {
				className: `${themeUI} ${inlineLabelUI} novalidate`,
			};
		}, [theme, required, inlineLabel, firstRendering]);

		// UI.Select의 이벤트 핸들러 -----------------------------------
		const onChangeHandler = (e: any) => {
			firstRendering.current = false;
			preCheck();
			onChange && onChange(e);
		};
		const onBlurHandler = (e: any) => {
			firstRendering.current = false;
			preCheck();
			onBlur && onBlur(e);
		};

		useEffect(() => {
			preCheck();
		}, [value]);

		const SetOptionChild = useCallback(() => {
			if (options) {
				return (
					<>
						{options.map((option: { value: string; text: string }, index) => {
							return (
								<option
									value={option.value}
									key={index}
								>
									{option.text}
								</option>
							);
						})}
					</>
				);
			} else {
				return <>{children}</>;
			}
		}, [options, children]);

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

		const setSelectJSX = useMemo(() => {
			return (
				<>
					<FormGroup className="app-ui-select-formgroup">
						<Input
							{...props}
							type="select"
							className={`${className && className} ${isInvalid}`}
							id={id && id}
							name={name && name}
							value={value && value}
							onChange={onChangeHandler}
							onBlur={onBlurHandler}
							required={required && required}
						>
							{<SetOptionChild />}
						</Input>
					</FormGroup>
					<div className={`invalid-feedback ${isInvalid}`}>{resultErrorMsg}</div>
				</>
			);
		}, [className, onChangeHandler, onBlurHandler, id, required, props]);

		return (
			<div
				{...selectWrapperAttribute}
				ref={rootGroupRef}
				style={selectStyle && selectStyle}
			>
				{label && setLabel}
				{inlineLabel ? <div className="col-sm-10">{setSelectJSX}</div> : <>{setSelectJSX}</>}
			</div>
		);
	},
);
UISelect.displayName = 'UISelect';

export default UISelect;
