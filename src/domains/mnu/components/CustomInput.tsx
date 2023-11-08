import { FC, ForwardedRef, forwardRef } from "react";

interface ICustomInputProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
    onClick: () => void;
}
const CustomInput: any = (props: ICustomInputProps, ref: ForwardedRef<HTMLInputElement>)=>{

    const className = props.className;
    const value = props.value;
    const onChange = props.onChange;
    const onClick = props.onClick;

    return (
        <input
            className={className}
            type="text"
            value={value}
            ref={ref}
            onChange={(e) => onChange(e.target.value)}
            onClick={onClick}
        />
    );
};

export default forwardRef<ForwardedRef<HTMLInputElement>>(CustomInput);