import { FC, memo, useCallback } from 'react';
import { TUIIcon } from '@/app/types/components';
import { Link } from 'react-router-dom';
//import Icon from '@mdi/react';
//import { mdiCollage } from '@mdi/js';

interface IItem {
	text: string;
	icon: TUIIcon | string;
	path: string;
	children?: IItem[];
}

interface Props {
	data: IItem[];
	name?: string;
	depth?: number;
}

const MenuItem: FC<Props> = memo(({ data, depth = 1 }) => {
	const depthName = ['', 'first', 'second', 'third', 'fourth'];

	const onClickAnchor = useCallback((e: any) => {
		e.preventDefault();
	}, []);

	return (
		<ul
			aria-expanded="false"
			className={`collapse ${depthName[depth]}-level`}
		>
			{data.map((item, index) => {
				return (
					<li
						key={index}
						className="sidebar-item"
					>
						{item.path === '' ? (
							<a
								className={`sidebar-link waves-effect waves-dark ${item.children?.length ? 'has-arrow' : ''}`}
								aria-expanded="false"
								href="{()=>false}"
								onClick={onClickAnchor}
							>
								<i
									data-feather={item.icon}
									className="feather-icon"
								/>
								<span className="hide-menu">{item.text}</span>
							</a>
						) : (
							<Link
								className={`sidebar-link waves-effect waves-dark ${item.children?.length ? 'has-arrow' : ''}`}
								aria-expanded="false"
								to={item.path}
							>
								{/*<Icon
								path={mdiCollage}
								size={0.7}
								className="m-1"
							/>*/}
								{/*<UI.Icon icon={item.icon as TUIIcon} />*/}
								<i
									data-feather={item.icon}
									className="feather-icon"
								/>
								<span className="hide-menu">{item.text}</span>
							</Link>
						)}

						{item.children?.length && (
							<MenuItem
								data={item.children}
								depth={depth + 1}
							/>
						)}
					</li>
				);
			})}
		</ul>
	);
});
MenuItem.displayName = 'MenuItem';

export default MenuItem;
