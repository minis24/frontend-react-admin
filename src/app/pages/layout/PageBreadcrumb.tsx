import { memo, useEffect, useState } from 'react';
import { useStore } from '@/app/store';
import { Link, useLocation } from 'react-router-dom';

const PageBreadcrumb = memo(() => {
	const loc = useLocation();
	const [pathArr, setPathArr] = useState<string[]>([]);
	// 페이지명을 저장하기 위한 'g-pageName'전역 값 가져오기.
	const [pageName] = useStore('g-pageName');
	useEffect(() => {
		//console.log('====== useLocation::', loc);
		//console.log('====== useLocation split::', loc.pathname.split('/'));
		setPathArr(loc.pathname.split('/'));
	}, [loc]);

	return (
		<div className="page-breadcrumb">
			<div className="row">
				<div className="col-md-5 align-self-center">
					<h3 className="page-title">{pageName}</h3>
					<div className="d-flex align-items-center">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								{pathArr.map((item, index) => {
									if (index === 0 && item === '') {
										return (
											<li
												key={index}
												className="breadcrumb-item"
											>
												<Link to="/">Home</Link>
											</li>
										);
									} else {
										return (
											<li
												key={index}
												className={pathArr.length - 1 === index ? `breadcrumb-item active` : 'breadcrumb-item'}
											>
												{item}
											</li>
										);
									}
								})}
							</ol>
						</nav>
					</div>
				</div>
				<div
					className="
                col-md-7
                justify-content-end
                align-self-center
                d-none d-md-flex
              "
				></div>
			</div>
		</div>
	);
});
PageBreadcrumb.displayName = 'PageBreadcrumb';

export default PageBreadcrumb;
