import './scoped-scss/HomeIndex.scoped.scss';
//import { useEffect } from 'react';

const HomeIndex = () => {
	return (
		<div className="row">
			<div className="col-12">
				<div id="hero">
					<h1 className="tagline text-h3 font-weight-bold">
						<span className="accent">MBPCEN FRAMEWORK MANAGER</span>
					</h1>
					<span className="font-weight-bold">[개발: v2022.04.22.01]</span>
					<p className="mt-3">MBPCEN 프레임워크 관리 사이트.</p>
				</div>
			</div>
		</div>
	);
};

export default HomeIndex;
