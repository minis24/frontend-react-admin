import { FC, memo, useCallback } from 'react';
import MenuItem from '@/app/components/layout/MenuItem';
import { TUIIcon } from '@/app/types/components';
import { Link } from 'react-router-dom';

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
	bottomLine?: boolean;
}

const MenuGroup: FC<Props> = memo(({ data, name, bottomLine }) => {
	const onClickAnchor = useCallback((e: any) => {
		e.preventDefault();
	}, []);

	return (
		<>
			{name && (
				<li className="nav-small-cap">
					<i className="mdi mdi-dots-horizontal"></i>
					<span className="hide-menu">{name}</span>
				</li>
			)}
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
								to={item.path === '' ? '' : item.path}
							>
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
								depth={1}
							/>
						)}
					</li>
				);
			})}
			{bottomLine && <li className="nav-devider" />}
		</>
	);
});
MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
