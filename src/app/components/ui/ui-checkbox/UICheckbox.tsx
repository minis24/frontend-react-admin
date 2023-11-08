import { FC, memo, useCallback, useMemo, ChangeEvent, useState, useEffect, useRef } from 'react';
import { IUICheckboxProps } from '@/app/types/components';

const UICheckbox: FC<IUICheckboxProps> = memo(
	({
		label,
		id,
		name,
		value,
		onChange,
		checked,
		className,
		style,
		inline,
		color = 'info',
		outline,
		disabled,
		lightStyle,
	}) => {
		const [bChecked, setBChecked] = useState(false);
		const checkboxRef = useRef<HTMLInputElement>(null);

		// outline props를 체트하여 아웃라인 스타일로 변경을 위한 함수
		const setOutline = useMemo(() => {
			if (outline) {
				return `check-outline outline-${color}`;
			} else {
				return '';
			}
		}, [outline, color]);

		// UI.Checkbox 의 이벤트 핸들러 ---------------------------------------------
		const onChangeHandler = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				setBChecked(!bChecked);
				if (e.currentTarget.checked) {
					(e.currentTarget as HTMLInputElement).setAttribute('checked', 'true');
				} else {
					(e.currentTarget as HTMLInputElement).removeAttribute('checked');
				}
				if (onChange) {
					onChange(e);
				}
			},
			[onChange, bChecked],
		);

		useEffect(() => {
			if (checked) {
				setBChecked(true);
				checkboxRef.current?.setAttribute('checked', 'true');
			} else {
				setBChecked(false);
			}
		}, []);

		// JSX 바인딩을 위한 함수 ----------------------------------------------------
		const setInput = useMemo(() => {
			if (label) {
				return (
					<div className={`form-check ${inline ? 'form-check-inline' : ''}`}>
						<input
							className={`form-check-input ${className ? className : ''} ${color} ${
								lightStyle ? `check-light-${color}` : ''
							} ${setOutline}`}
							type="checkbox"
							id={id && id}
							name={name && name}
							value={value && value}
							onChange={onChangeHandler}
							checked={bChecked}
							disabled={disabled && disabled}
							style={style && style}
							ref={checkboxRef}
						/>
						<label
							className="form-check-label"
							htmlFor={id && id}
						>
							{label}
						</label>
					</div>
				);
			} else {
				return (
					<input
						className={`form-check-input ${className ? className : ''} ${color} ${
							lightStyle ? `check-light-${color}` : ''
						} ${setOutline}`}
						type="checkbox"
						id={id && id}
						name={name && name}
						value={value && value}
						onChange={onChangeHandler}
						checked={bChecked}
						disabled={disabled && disabled}
						style={style && style}
						ref={checkboxRef}
					/>
				);
			}
		}, [label, checked, value, name, id, className, color, inline, onChangeHandler, disabled, lightStyle]);

		return setInput;
	},
);
UICheckbox.displayName = 'UICheckbox';

export default UICheckbox;
