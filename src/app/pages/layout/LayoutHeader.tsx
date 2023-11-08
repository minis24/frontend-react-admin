import { memo, useEffect } from 'react';

import logoImg from '@/assets/images/logo-icon.png';
import logoLightImg from '@/assets/images/logo-light-icon.png';
import logoTxt from '@/assets/images/logo-text.png';
import logoLightTxt from '@/assets/images/logo-light-text.png';
import user5 from '@/assets/images/users/5.jpg';

import { ArrowLeftCircle, Bell } from 'react-feather';

const LayoutHeader = memo(() => {
	const appMode = $adminScript.getAppMode();

	useEffect(() => {
		setTimeout(() => {
			if (appMode === 'default') {
				$adminScript.appInit();
			} else if (appMode === 'horizontal') {
				$adminScript.appHorizontalInit();
				$adminScript.appStyleSwitcherHorizontal();
			}
			$adminScript.sidebarMenu();
			$adminScript.customJS();
		}, 500);
	}, []);
	return (
		<header className="topbar">
			<nav
				className={`navbar top-navbar ${appMode === 'default' ? 'navbar-expand-md' : 'navbar-expand-lg'} navbar-dark`}
			>
				<div className="navbar-header">
					<UI.Button
						className={`nav-toggler waves-effect waves-light d-block ${
							appMode === 'default' ? 'd-md-none' : 'd-lg-none'
						}`}
						color="link"
						style={{ textDecoration: 'none' }}
					>
						<i className="ti-menu ti-close" />
					</UI.Button>
					{/* Logo ======================================================== */}
					<a
						className="navbar-brand"
						href="index.html"
					>
						{/* Logo icon ==== */}
						<b className="logo-icon">
							{/* Dark Logo icon */}
							<img
								src={logoImg}
								alt="homepage"
								className="dark-logo"
							/>
							{/* Light Logo icon */}
							<img
								src={logoLightImg}
								alt="homepage"
								className="light-logo"
							/>
						</b>
						{/*End Logo icon ==== */}
						{/* Logo text ==== */}
						<span className="logo-text">
							{/* dark Logo text */}
							<img
								src={logoTxt}
								alt="homepage"
								className="dark-logo"
							/>
							{/* Light Logo text */}
							<img
								src={logoLightTxt}
								className="light-logo"
								alt="homepage"
							/>
						</span>
					</a>
					{/* End Logo ====================================================== */}
					{/* Toggle which is visible on mobile only ======================== */}
					<a
						className={`topbartoggler d-block ${
							appMode === 'default' ? 'd-md-none' : 'd-lg-none'
						} waves-effect waves-light`}
						href="{()=>false}"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="ti-more" />
					</a>
				</div>
				{/* toggle and nav ================================================== */}
				<div
					className="navbar-collapse collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto">
						<li className={`nav-item d-none ${appMode === 'default' ? 'd-md-block' : 'd-lg-block'}`}>
							<UI.Button
								variant="link"
								className="nav-link sidebartoggler waves-effect waves-light"
								data-sidebartype="mini-sidebar"
							>
								<ArrowLeftCircle className="feather-sm" />
							</UI.Button>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle waves-effect waves-dark"
								href="{()=>false}"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<Bell className="feather-sm" />
								<div className="notify">
									<span className="heartbit"></span> <span className="point"></span>
								</div>
							</a>
						</li>
					</ul>
					{/* Right side toggle and nav items */}
					<ul className="navbar-nav">
						{/* Search */}
						<li className="nav-item search-box d-none d-md-flex align-items-center">
							<div className="nav-link">
								<form className="app-search">
									<input
										type="text"
										className="form-control rounded-pill border-0"
										placeholder="Search for..."
									/>
									<a className="srh-btn">
										<i
											data-feather="search"
											className="feather-sm fill-white mt-n1"
										></i>
									</a>
								</form>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle waves-effect waves-dark"
								href="#"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<img
									src={user5}
									alt="user"
									width="30"
									className="profile-pic rounded-circle"
								/>
							</a>
							<div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
								<div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
									<div className="">
										<img
											src={user5}
											alt="user"
											className="rounded-circle"
											width="60"
										/>
									</div>
									<div className="ms-2">
										<h4 className="mb-0 text-white">Marken Doe</h4>
										<p className="mb-0">deo@gmail.com</p>
									</div>
								</div>
								<a
									className="dropdown-item"
									href="#"
								>
									<i
										data-feather="user"
										className="feather-sm text-info me-1 ms-1"
									/>
									My Profile
								</a>
								<a
									className="dropdown-item"
									href="#"
								>
									<i
										data-feather="credit-card"
										className="feather-sm text-info me-1 ms-1"
									/>
									My Balance
								</a>
								<a
									className="dropdown-item"
									href="#"
								>
									<i
										data-feather="mail"
										className="feather-sm text-success me-1 ms-1"
									/>
									Inbox
								</a>
								<div className="dropdown-divider" />
								<a
									className="dropdown-item"
									href="#"
								>
									<i
										data-feather="settings"
										className="feather-sm text-warning me-1 ms-1"
									/>
									Account Setting
								</a>
								<div className="dropdown-divider" />
								<a
									className="dropdown-item"
									href="#"
								>
									<i
										data-feather="log-out"
										className="feather-sm text-danger me-1 ms-1"
									/>
									Logout
								</a>
								<div className="dropdown-divider" />
								<div className="pl-4 p-2">
									<a
										href="#"
										className="btn d-block w-100 btn-info rounded-pill"
									>
										View Profile
									</a>
								</div>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
								href=""
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i className="flag-icon flag-icon-us" />
							</a>
							<div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up">
								<a
									className="dropdown-item"
									href="#"
								>
									<i className="flag-icon flag-icon-in" /> India
								</a>
								<a
									className="dropdown-item"
									href="#"
								>
									<i className="flag-icon flag-icon-fr" /> French
								</a>
								<a
									className="dropdown-item"
									href="#"
								>
									<i className="flag-icon flag-icon-cn" /> China
								</a>
								<a
									className="dropdown-item"
									href="#"
								>
									<i className="flag-icon flag-icon-de" /> Dutch
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
});
LayoutHeader.displayName = 'LayoutHeader';
export default LayoutHeader;
