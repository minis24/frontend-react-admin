import Prism from 'prismjs';
import { useCallback, useEffect } from 'react';
import { TUITreeviewData } from '@/app/types/components';

const UITreeViewDemo = () => {
	const treedata = [
		{
			title: 'Parent 1',
			action: '#parent1',
			opened: true,
			icon: 'folder',
			nodes: [
				{
					title: 'Child 1',
					action: '#child1',
					nodes: [
						{
							title: 'Grandchild 1',
							action: '#grandchild1',
						},
						{
							title: 'Grandchild 2',
							action: '#grandchild2',
						},
					],
				},
				{
					title: 'Child 2',
					action: '#child2',
				},
			],
		},
		{
			title: 'Parent 2',
			action: '#parent2',
		},
		{
			title: 'Parent 3',
			action: '#parent3',
		},
		{
			title: 'Parent 4',
			action: '#parent4',
		},
		{
			title: 'Parent 5',
			action: '#parent5',
		},
	];

	const onClickTreeview = useCallback((item: TUITreeviewData) => {
		console.log('onClickTreeview: ', item);
	}, []);

	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="border-bottom title-part-padding">
						<h4 className="card-title mb-0">기본 UI Treeview 예제</h4>
					</div>
					<div className="card-body">
						<p className="card-text">
							<mark>
								<code>UI.Treeview</code>
							</mark>
							컴포넌트에서 사용하는 <strong>icon</strong>은{' '}
							<a
								href="https://mdbootstrap.com/docs/b4/jquery/content/icons-list/"
								target="_blank"
							>
								https://mdbootstrap.com/docs/b4/jquery/content/icons-list/
							</a>
							의 <strong>Awesome Free Icons</strong>를 사용합니다. 원하는 아이콘의 이름을 검색하여 사용합니다.
						</p>
						<p className="card-text">API: https://mdbootstrap.com/docs/b4/react/plugins/treeview/#docsTabsAPI</p>

						<div className="card-title">Examples</div>
						<div className="card-text">UI Treeview 예제 입니다.</div>
						<UI.Treeview
							data={treedata}
							expandIcon="folder-open"
							collapseIcon="folder"
							onClick={onClickTreeview}
						/>
						<hr />
						<div className="card-title">JSX Code</div>
						<pre>
							<code className="language-html">{`<UI.Treeview data={treedata} />`}</code>
						</pre>
						<div className="card-title">Tree JSON Data</div>
						<pre>
							<code className="language-javascript">
								{`const treedata = [
	{
		title: 'Parent 1',
		action: '#parent1',
		opened: true,
		icon: 'folder',
		nodes: [
			{
				title: 'Child 1',
				action: '#child1',
				nodes: [
					{
						title: 'Grandchild 1',
						action: '#grandchild1',
					},
					{
						title: 'Grandchild 2',
						action: '#grandchild2',
					},
				],
			},
			{
				title: 'Child 2',
				action: '#child2',
			},
		],
	},
	{
		title: 'Parent 2',
		action: '#parent2',
	},
	{
		title: 'Parent 3',
		action: '#parent3',
	},
	{
		title: 'Parent 4',
		action: '#parent4',
	},
	{
		title: 'Parent 5',
		action: '#parent5',
	},
];`}
							</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UITreeViewDemo;
