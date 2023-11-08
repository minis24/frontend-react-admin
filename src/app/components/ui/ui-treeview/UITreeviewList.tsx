import { FC, memo, useCallback, useState } from 'react';
import { IUITreeviewListProps, TUITreeviewData } from '@/app/types/components';
import { MDBTreeviewList, MDBTreeviewItem } from 'mdbreact';

const UITreeviewList: FC<IUITreeviewListProps> = memo(({ data, collapseIcon, expandIcon, onClick }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const getIsOpen = (target: HTMLElement): boolean => {
		const classList = target?.classList.value;
		//setA(classList);
		return /opened/.test(classList);
	};

	const onClickTreeList = useCallback((e: Event) => {
		const target = (e.currentTarget as HTMLElement).firstChild as HTMLElement;
		const open = getIsOpen(target);
		//console.log('====onClickTreeList Target::', target.tagName);
		//console.log('====onClickTreeList::', open);
		setIsOpen(open);
	}, []);

	const onClickTreeItem = useCallback(
		(e: Event, item: any) => {
			e.stopPropagation();
			if (onClick) {
				onClick(item);
			}
		},
		[onClick],
	);

	const renderList = (data: TUITreeviewData, index: number) => {
		return (
			<MDBTreeviewList
				key={index}
				icon={isOpen ? (expandIcon ? expandIcon : 'envelope-open') : collapseIcon ? collapseIcon : 'envelope'}
				title={data.title}
				far
				opened={isOpen}
				onClick={(e: Event) => onClickTreeItem(e, data)}
				onTransitionEnd={onClickTreeList}
			>
				<UITreeviewList
					data={data.nodes as TUITreeviewData[]}
					collapseIcon={collapseIcon && collapseIcon}
					expandIcon={expandIcon && expandIcon}
					onClick={onClick}
				/>
				<div style={{ display: 'none' }}>&nbsp;</div>
			</MDBTreeviewList>
		);
	};

	const renderItem = (data: TUITreeviewData, index: number) => {
		return (
			<MDBTreeviewItem
				key={index}
				icon="file"
				title={data.title}
				far
				onClick={(e: Event) => onClickTreeItem(e, data)}
				//className="mx-2"
			/>
		);
	};

	return (
		<>
			{data.map((item, index) => {
				return item.nodes ? renderList(item, index) : renderItem(item, index);
			})}
		</>
	);
});
UITreeviewList.displayName = 'UITreeviewList';

export default UITreeviewList;
