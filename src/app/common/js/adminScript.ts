// @ts-nocheck
import type { IAdminScript } from '@/app/types/common';

export default class adminScript implements IAdminScript {
	private static instance: adminScript;

	public static getInstance(): adminScript {
		if (!this.instance) {
			this.instance = new adminScript();
		}
		return this.instance;
	}

	public getAppMode(): 'default' | 'horizontal' {
		//return 'default';
		return 'horizontal';
	}

	public appInit() {
		$(function () {
			'use strict';
			($('#main-wrapper') as any).AdminSettings({
				Theme: false, // this can be true or false ( true means dark and false means light ),
				Layout: 'vertical',
				LogoBg: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				NavbarBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				SidebarType: 'full', // You can change it full / mini-sidebar / iconbar / overlay
				SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				SidebarPosition: true, // it can be true / false ( true means Fixed and false means absolute )
				HeaderPosition: true, // it can be true / false ( true means Fixed and false means absolute )
				BoxedLayout: true, // it can be true / false ( true means Boxed and false means Fluid )
			});
		});
	}

	public appHorizontalInit() {
		$(function () {
			'use strict';
			$('#main-wrapper').AdminSettings({
				Theme: false, // this can be true or false ( true means dark and false means light ),
				Layout: 'horizontal',
				LogoBg: 'skin2', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				NavbarBg: 'skin3', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				SidebarType: 'full', // You can change it full / mini-sidebar / iconbar / overlay
				SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
				SidebarPosition: false, // it can be true / false ( true means Fixed and false means absolute )
				HeaderPosition: false, // it can be true / false ( true means Fixed and false means absolute )
				BoxedLayout: true, // it can be true / false ( true means Boxed and false means Fluid )
			});
		});
	}

	public appStyleSwitcherHorizontal() {
		$(function () {
			'use strict';
			//****************************
			/* Left header Theme Change function Start */
			//****************************
			function handlelogobg() {
				$('.theme-color .theme-item .theme-link').on('click', function () {
					var logobgskin = $(this).attr('data-logobg');
					$('.topbar .top-navbar .navbar-header').attr('data-logobg', logobgskin);
				});
			}
			handlelogobg();
			//****************************
			/* Top navbar Theme Change function Start */
			//****************************
			function handlenavbarbg() {
				if ($('#main-wrapper').attr('data-navbarbg') == 'skin6') {
					// do this
					$('.topbar .navbar').addClass('navbar-light');
					$('.topbar .navbar').removeClass('navbar-dark');
				} else {
					// do that
				}
				$('.theme-color .theme-item .theme-link').on('click', function () {
					var navbarbgskin = $(this).attr('data-navbarbg');
					$('#main-wrapper').attr('data-navbarbg', navbarbgskin);
					$('.topbar').attr('data-navbarbg', navbarbgskin);
					$('.topbar .navbar-collapse').attr('data-navbarbg', navbarbgskin);
					if ($('#main-wrapper').attr('data-navbarbg') == 'skin6') {
						// do this
						$('.topbar .navbar').addClass('navbar-light');
						$('.topbar .navbar').removeClass('navbar-dark');
					} else {
						// do that
						$('.topbar .navbar').removeClass('navbar-light');
						$('.topbar .navbar').addClass('navbar-dark');
					}
				});
			}

			handlenavbarbg();

			//****************************
			// ManageSidebar Type
			//****************************
			function handlesidebartype() {
				var setsidebartype = function () {
					var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
					if (width < 991) {
						$('#main-wrapper').attr('data-sidebartype', 'mini-sidebar');
						$('#main-wrapper').addClass('mini-sidebar');
					} else {
						$('#main-wrapper').attr('data-sidebartype', 'full');
						$('#main-wrapper').removeClass('mini-sidebar');
					}
				};
				$(window).ready(setsidebartype);
				$(window).on('resize', setsidebartype);
			}
			handlesidebartype();

			//****************************
			/* Manage sidebar bg color */
			//****************************
			function handlesidebarbg() {
				$('.theme-color .theme-item .theme-link').on('click', function () {
					var sidebarbgskin = $(this).attr('data-sidebarbg');
					$('.left-sidebar').attr('data-sidebarbg', sidebarbgskin);
				});
			}
			handlesidebarbg();
			//****************************
			/* sidebar position */
			//****************************
			function handlesidebarposition() {
				$('#sidebar-position').change(function () {
					if ($(this).is(':checked')) {
						$('#main-wrapper').attr('data-sidebar-position', 'fixed');
						$('.topbar .top-navbar .navbar-header').attr('data-navheader', 'fixed');
					} else {
						$('#main-wrapper').attr('data-sidebar-position', 'absolute');
						$('.topbar .top-navbar .navbar-header').attr('data-navheader', 'relative');
					}
				});
			}
			handlesidebarposition();
			//****************************
			/* Header position */
			//****************************
			function handleheaderposition() {
				$('#header-position').change(function () {
					if ($(this).is(':checked')) {
						$('#main-wrapper').attr('data-header-position', 'fixed');
					} else {
						$('#main-wrapper').attr('data-header-position', 'relative');
					}
				});
			}
			handleheaderposition();
			//****************************
			/* sidebar position */
			//****************************
			function handleboxedlayout() {
				$('#boxed-layout').change(function () {
					if ($(this).is(':checked')) {
						$('#main-wrapper').attr('data-boxed-layout', 'boxed');
					} else {
						$('#main-wrapper').attr('data-boxed-layout', 'full');
					}
				});
			}
			handleboxedlayout();
			//****************************
			/* Header position */
			//****************************
			function handlethemeview() {
				$('#theme-view').change(function () {
					if ($(this).is(':checked')) {
						$('body').attr('data-theme', 'dark');
					} else {
						$('body').attr('data-theme', 'light');
					}
				});
			}
			handlethemeview();
		});
	}

	public sidebarMenuInit() {
		$('ul#sidebarnav ul').removeClass('in');
		$('ul#sidebarnav li').removeClass('selected');
		$('ul#sidebarnav a').removeClass('active');
		const url = window.location + '';
		const path = url.replace(window.location.protocol + '//' + window.location.host + '/', '');
		const element = $('ul#sidebarnav a').filter(function () {
			return (this as HTMLAnchorElement).href === url || (this as HTMLAnchorElement).href === path; // || url.href.indexOf(this.href) === 0;
		});
		element.parentsUntil('.sidebar-nav').each(function () {
			if ($(this).is('li') && $(this).children('a').length !== 0) {
				$(this).children('a').addClass('active');
				$(this).parent('ul#sidebarnav').length === 0 ? $(this).addClass('active') : $(this).addClass('selected');
			} else if (!$(this).is('ul') && $(this).children('a').length === 0) {
				$(this).addClass('selected');
			} else if ($(this).is('ul')) {
				$(this).addClass('in');
			}
		});
	}

	public sidebarMenu() {
		$(function () {
			'use strict';
			var url = window.location + '';
			var path = url.replace(window.location.protocol + '//' + window.location.host + '/', '');
			var element = $('ul#sidebarnav a').filter(function () {
				return (this as HTMLAnchorElement).href === url || (this as HTMLAnchorElement).href === path; // || url.href.indexOf(this.href) === 0;
			});
			element.parentsUntil('.sidebar-nav').each(function (index) {
				if ($(this).is('li') && $(this).children('a').length !== 0) {
					$(this).children('a').addClass('active');
					$(this).parent('ul#sidebarnav').length === 0 ? $(this).addClass('active') : $(this).addClass('selected');
				} else if (!$(this).is('ul') && $(this).children('a').length === 0) {
					$(this).addClass('selected');
				} else if ($(this).is('ul')) {
					$(this).addClass('in');
				}
			});

			element.addClass('active');
			$('#sidebarnav a').on('click', function (e) {
				if (!$(this).hasClass('active')) {
					// hide any open menus and remove all other classes
					$('ul', $(this).parents('ul:first')).removeClass('in');
					$('a', $(this).parents('ul:first')).removeClass('active');

					// open our new menu and add the open class
					$(this).next('ul').addClass('in');
					$(this).addClass('active');
				} else if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).parents('ul:first').removeClass('active');
					$(this).next('ul').removeClass('in');
				}
			});
			$('#sidebarnav >li >a.has-arrow').on('click', function (e) {
				e.preventDefault();
			});

			// Auto scroll to the active nav
			//if (window.innerWidth > 768 || window.Touch) {
			//	const offset = $('#sidebarnav .sidebar-item.selected').offset() as JQuery.Coordinates;
			//	$('.scroll-sidebar').animate(
			//		{
			//			scrollTop: offset.top - 250,
			//		},
			//		500,
			//	);
			//}
		});
	}

	public customJS() {
		$(function () {
			'use strict';

			$('.preloader').fadeOut();

			// Feather Icon Init Js
			feather.replace();

			// ==============================================================
			// Theme options
			// ==============================================================
			// ==============================================================
			// sidebar-hover
			// ==============================================================

			$('.left-sidebar').hover(
				function () {
					$('.navbar-header').addClass('expand-logo');
				},
				function () {
					$('.navbar-header').removeClass('expand-logo');
				},
			);
			// this is for close icon when navigation open in mobile view
			$('.nav-toggler').on('click', function () {
				$('#main-wrapper').toggleClass('show-sidebar');
				$('.nav-toggler i').toggleClass('ti-menu');
			});
			$('.nav-lock').on('click', function () {
				$('body').toggleClass('lock-nav');
				$('.nav-lock i').toggleClass('mdi-toggle-switch-off');
				$('body, .page-wrapper').trigger('resize');
			});
			$('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
				$('.app-search').toggle(200);
				$('.app-search input').focus();
			});

			// ==============================================================
			// Right sidebar options
			// ==============================================================
			$(function () {
				$('.service-panel-toggle').on('click', function () {
					$('.customizer').toggleClass('show-service-panel');
				});
				$('.page-wrapper').on('click', function () {
					$('.customizer').removeClass('show-service-panel');
				});
			});
			// ==============================================================
			// This is for the floating labels
			// ==============================================================
			$('.floating-labels .form-control')
				.on('focus blur', function (e) {
					$(this)
						.parents('.form-group')
						.toggleClass('focused', e.type === 'focus' || (this as HTMLInputElement).value.length > 0);
				})
				.trigger('blur');

			// ==============================================================
			//tooltip
			// ==============================================================
			//$(function () {
			//	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
			//	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			//		return new bootstrap.Tooltip(tooltipTriggerEl);
			//	});
			//});
			// ==============================================================
			//Popover
			// ==============================================================
			//$(function () {
			//	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
			//	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			//		return new bootstrap.Popover(popoverTriggerEl);
			//	});
			//});

			// ==============================================================
			// Perfact scrollbar
			// ==============================================================
			//if ($('.message-center, .customizer-body, .scrollable').length > 0) {
			//	$('.message-center, .customizer-body, .scrollable').perfectScrollbar({
			//		wheelPropagation: !0,
			//	});
			//}

			/*var ps = new PerfectScrollbar('.message-body');
				var ps = new PerfectScrollbar('.notifications');
				var ps = new PerfectScrollbar('.scroll-sidebar');
				var ps = new PerfectScrollbar('.customizer-body');*/

			// ==============================================================
			// Resize all elements
			// ==============================================================
			$('body, .page-wrapper').trigger('resize');
			$('.page-wrapper').delay(20).show();
			// ==============================================================
			// To do list
			// ==============================================================
			$('.list-task li label').click(function () {
				$(this).toggleClass('task-done');
			});
			// ==============================================================
			// Collapsable cards
			// ==============================================================
			$('a[data-action="collapse"]').on('click', function (e) {
				e.preventDefault();
				$(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
				$(this).closest('.card').children('.card-body').collapse('toggle');
			});
			// Toggle fullscreen
			$('a[data-action="expand"]').on('click', function (e) {
				e.preventDefault();
				$(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
				$(this).closest('.card').toggleClass('card-fullscreen');
			});
			// Close Card
			$('a[data-action="close"]').on('click', function () {
				$(this).closest('.card').removeClass().slideUp('fast');
			});
			// ==============================================================
			// LThis is for mega menu
			// ==============================================================
			$('.mega-dropdown').on('click', function (e) {
				e.stopPropagation();
			});

			// ==============================================================
			// This is for the innerleft sidebar
			// ==============================================================
			$('.show-left-part').on('click', function () {
				$('.left-part').toggleClass('show-panel');
				$('.show-left-part').toggleClass('ti-menu');
			});

			// For Custom File Input
			$('.custom-file-input').on('change', function () {
				//get the file name
				var fileName = $(this).val();
				//replace the "Choose a file" label
				$(this).next('.custom-file-label').html(fileName);
			});
		});
	}
}
