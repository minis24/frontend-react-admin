import { useCallback, useEffect, useRef, useState } from "react";
import { useAPI } from '@/app/store';
import url, { TUrl } from '@/domains/mnu/api/url';
import loadable from '@loadable/component';





const MenuTreeRegModal = loadable(() => import('@/domains/mnu/components/MenuTreeRegModal'));
export interface IMnuTreeProps {
	mnuType: string;
	setStateAction: React.Dispatch<React.SetStateAction<string>>;
}


interface IOption {
	text: string;
	value: string;
}
interface IMenuType {
	menuType: string;
	menuTypeNm: string;
}

interface DTNodeStatus {
	DTNodeStatus_Error: number;
	DTNodeStatus_Loading: number;
	DTNodeStatus_Ok: number;
}



/**
 * 상수
 */
const DTNodeStatus = {
	Error: -1,
	Loading: 1,
	Ok: 0,

};

//alert 제목 (일반)
const TITLE: string = '알림확인';
//alert 제목 (오류)
const TITLE_ERROR: string = '오류확인';




/**
 * MenuTree Component
 * @param param0 
 * @returns 
 */
const MnuTree: React.FC<IMnuTreeProps> = (props) => {

	const setParentStateAction = props.setStateAction;



	// 초기 메뉴타입 설정 값 (01:FW메뉴)
	const initialMenuType = useRef('01');

	// 메뉴트리 루트 엘리먼트
	const menuTreeDiv = useRef(null);

	//메뉴등록 다이얼로그에 전달할 데이터.
	const activedMenuIdRef    = useRef('');
	const activedMenuNmRef    = useRef('');
	const activedMenuLevelRef = useRef(1);
	const menuTypeNmRef       = useRef('');


	//태그 엘리먼트 REF 값 
	const menuTypeSelectRef = useRef<HTMLSelectElement>(null);


	const [selectboxOptionsState, setOptions] = useState<IOption[]>([]);
	const [menuTypeValueState, setMenuTypeValueState] = useState<string>(initialMenuType.current);


	/**
	 * 초기 메뉴트리 정보 조회
	 */
	const { data: menuTreeData, fetch: menuTreeFetch } = useAPI<TUrl>(url.GET_initTree);

	/**
	 * 서브 메뉴트리 정보 조회(lazyRead)
	 */
	const { fetch: subMenuTreeFetch } = useAPI<TUrl>(url.GET_subTree);

	/**
	 * 메뉴타입 셀렉트박스 정보 조회
	 */
	const { fetch: menuTypeFetch } = useAPI<TUrl>(url.GET_menuTypeSelect);


	/**
	 * 메뉴 삭제 
	 */
	const { fetch: menuInfoDeleteFetch } = useAPI<TUrl>(url.DELETE_menuInfo);


	/* 첫 렌더링시애만 호출. */
	useEffect(() => {
		const fetchData = async ()=>{

			try {
				const menuTypeData = await menuTypeFetch({ option: { method: 'get' } })
				const menuTypeList = menuTypeData.data.bdy.list;
				const options = await menuTypeList
					.map((item: IMenuType) => 
							({ text: item.menuTypeNm, value: item.menuType }));

				setOptions(options);

			} catch (error) {
				console.log('----------------------------------------------------');
				console.log('메뉴타입 셀렉트 박스 생성 Action 호출 오류 !!', error);
				console.log('----------------------------------------------------');
				let sMsg = `<h4>${error}!</h4>`;
				$ui.alert(sMsg, { title: TITLE });
			}
			

		}

		fetchData();
		
	}, []); //end useEffect(() => {}.[]}



	/**
	 * 첫 렌더링시 호출
	 * menuTypeValue 변경시 호출.
	 */
	useEffect(() => {

		//메뉴트리 데이터 조회 API 호출
		menuTreeFetch({ menuType: menuTypeValueState, option: { method: 'get' } });


	}, [menuTypeValueState]); //end useEffect(() => {}.[menuTypeValue]}


	/**
	 * 첫 렌더링시 호출
	 * selectboxOptionsState 변경시 호출
	 */
	useEffect(() => {
		let options: HTMLOptionsCollection;
		if (menuTypeSelectRef.current) {
			options = menuTypeSelectRef.current.options

			menuTypeNmRef.current = options[options.selectedIndex] && options[options.selectedIndex].text;
		}

	}, [selectboxOptionsState]);



	/**
	 * 첫 렌더링시 호출
	 * initialMenuTreeData 변경시 호출.
	 */
	useEffect(() => {

		if (!menuTreeDiv.current) {
			console.log('----------------------------------------------------');
			console.log('[MnuTree] menuTreeDiv IS NULL --> return false;');
			console.log('----------------------------------------------------');
			return;
		}




		// 메뉴트리생성 함수 호출 
		menuTreeData && createMenuTree(menuTreeData.data.bdy.data);


	}, [menuTreeData]);





	/**
	 * 메뉴정보 트리 생성 함수.
	 * @param initTreeObject 
	 */
	const createMenuTree = (initTreeObject: DynaTreeDataModel[]) => {

		if (!menuTreeDiv.current) {
			console.log('----------------------------------------------------');
			console.log('[MnuTree] menuTreeDiv IS NULL --> return false;');
			console.log('----------------------------------------------------');
			return false;
		}

		
		//----------------------------------------------------------------------------------
		// 메뉴트리 reload() - 새로운 데이타로 메뉴트리 생성했을때 기존 트리가 만들어져 있는경우
		// reload()하거나, destroy 한 후 생성 해야 rerendering 됨.
		// reload()는 두번 그려지므로 호출 구조가 바껴야 해서....destroy 로 실행함.
		//----------------------------------------------------------------------------------
		
		//$(menuTreeDiv.current).dynatree("destroy");

		//const tree = $(menuTreeDiv.current).dynatree("getTree");
		//tree && tree.reload();
	//debugger

		$(menuTreeDiv.current).dynatree({
			debugLevel: 2 ,
			title: "MenuTree",//트리 이름 
			//              selectMode : 1 , // 1:single, 2:multi, 3:multi-hier
			minExpandLevel: 2, //최소 확장 트리 레벨 (2로 설정하면 2레벨 까지 펼쳐진 상태)
			checkbox: false,
			autoFocus: true,

			
			//----------------------------------------------------------------------------------
			// 메뉴트리 항목 설정.
			//----------------------------------------------------------------------------------
			children: initTreeObject,
			ajaxDefaults: { // Used by initAjax option
				cache: false, // false: Append random '_' argument to the request url to prevent caching.
				dataType: "json" // Expect json format and pass json object to callbacks.
			}, 
			
			strings: {
				loading: "Loading…",
				loadError: "Load error!"
			},

			generateIds: false, // Generate id attributes like < span id="dynatree-id-KEY" >
			idPrefix: "dynatree-id-", // Used to generate node id's like < span id="dynatree-id-<key>" >.
			keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath().
			cookieId: "dynatree", // Choose a more unique name, to allow multiple trees.
			cookie: {
				expires: null // Days or Date; null: session cookie
			},

			/* 			onRender: (dtnode, nodeSpan) => {
							console.log('----------------------------------------------------');
							console.log('[MnuTree] onRender 실행')
							console.log('----------------------------------------------------');
						},
						onCreate: (dtnode, nodeSpan) => {
							console.log('----------------------------------------------------');
							console.log('[MnuTree] onCreate 실행')
							console.log('----------------------------------------------------');
						}, */


			/**
			 * 메뉴 트리의 자식 노드를 로드.
			 * @param node 
			 */
			onLazyRead: (node) => {

				//서브 메뉴트리 데이터 조회 API 호출
				subMenuTreeFetch({
					menuType: menuTypeValueState,
					menuId: node.data.key,
					option: { method: 'get' }
				})
					.then((res) => {
						node.setLazyNodeStatus(DTNodeStatus.Ok);
						node.addChild(res.data.bdy.list);
					})
					.catch((error) => {
						console.log(error)
					});


			}, // end onLazyRead


			/**
			 * 메뉴트리를 클릭했으때 이벤트 핸들러.
			 * @param seletedNode 
			 */
			onActivate: (seletedNode) => {
				console.log('----------------------------------------------------');
				console.log('onActivate 호출');
				console.log('seletedNode:', seletedNode)
				console.log('----------------------------------------------------');
				if (seletedNode.data.key && seletedNode.data.title){
					//선택한 메뉴아이디,메뉴이름 설정
					activedMenuIdRef.current = seletedNode.data.key;
					activedMenuNmRef.current = seletedNode.data.title;
				}

				//노드를 selected 상태로 설정
				seletedNode.select(true);

				//선택한 메뉴의 레벨 설정 
				activedMenuLevelRef.current = seletedNode.getLevel();

				//부모창에 전달
				setParentStateAction(activedMenuIdRef.current);
				

			},// end onActivate


			/**
			 * 다른 메뉴트리를 클릭했을때 이벤트 핸들러.
			 * 해당 노드를 선택해제 시켜준다.
			 * @param seletedNode 
			 */
			onDeactivate: (seletedNode) =>{
				seletedNode.select(false);
			},



			/**
			 * when tree was (re)loaded.
			 * @param isReloading 
			 * @param isError 
			 */
			onPostInit(isReloading, isError) {
				console.log(`isReloading: ${isReloading}`);
				console.log(`isError: ${isError }`);

			},

			//드래그앤드랍 
			dnd: {
				revert:false,

				onDragStart: function (node) {
					/** This function MUST be defined to enable dragging for the tree.
					 *  Return false to cancel dragging of node.
					 */
					
					return true;
				},

				onDragStop: function (node) {
					// This function is optional.
					//logMsg("tree.onDragStop(%o)", node);
					
				},
				autoExpandMS: 1000,
				preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
	

				onDragEnter: function (node, sourceNode) {
					
					/** sourceNode may be null for non-dynatree droppables.
					 *  Return false to disallow dropping on node. In this case
					 *  onDragOver and onDragLeave are not called.
					 *  Return 'over', 'before, or 'after' to force a hitMode.
					 *  Return ['before', 'after'] to restrict available hitModes.
					 *  Any other return value will calc the hitMode from the cursor position.
					 */
					//logMsg("tree.onDragEnter(%o, %o)", node, sourceNode);
					return true;
				},
				onDragOver: function (node, sourceNode, hitMode) {
					
					/** Return false to disallow dropping this node.
					 *
					 */
					//logMsg("tree.onDragOver(%o, %o, %o)", node, sourceNode, hitMode);
					// Prevent dropping a parent below it's own child
					if (node.isDescendantOf(sourceNode)) {
						return false;
					}
					// Prohibit creating childs in non-folders (only sorting allowed)
					if (!node.data.isFolder && hitMode === "over") {
						return "after";
					}
				},
			
				onDragLeave: function (node, sourceNode) {
					/** Always called if onDragEnter was called.
					 */
					
				},
				
				onDrop: function (targetNode, sourceNode, hitMode) {
					/** This function MUST be defined to enable dropping of items on
					 * the tree.
					 */
					
					sourceNode.move(targetNode, hitMode);
					// expand the drop target
					//				sourceNode.expand(true);
				},




			}
		


		}); //end createMenuTree




		//----------------------------------------------------------------------------------
		// 메뉴트리의 루트노드의 첫번째 하위노드를 펼침 설정.
		//----------------------------------------------------------------------------------
		const rootNode: DynaTreeNode = $(menuTreeDiv.current).dynatree("getRoot").getChildren()[0];

		rootNode.getChildren()
			.forEach((node)=>{
								node.reloadChildren();
								node.activate();
								node.expand(true);
							});
		//rootNode.getChildren()[0].reloadChildren();
		//debugger
		rootNode.getChildren()[0].activate();
		//rootNode.getChildren()[0].expand(true);
		
		//$(menuTreeDiv.current).dynatree("disable")

		
		
		
	};






	//================================================================================
	//이벤트 핸들러
	//================================================================================
	/**
	 * MenuType 셀렉트박스 OnChange
	 * @param event 
	 */
	const menuTypeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {

		setMenuTypeValueState(event.target.value);
		menuTypeNmRef.current = event.target.options[event.target.selectedIndex].innerText;

	};



	/**
	 * 메뉴 등록 버튼 클릭 이벤트 핸들러 
	 */
	const openAddMenuTreeModal = useCallback(async () => {

		if (!menuTreeDiv.current) {
			console.log('----------------------------------------------------');
			console.log('menuTreeDiv IS NULL --> return false;');
			console.log('----------------------------------------------------');
			return false;
		}
		//현재 선택되어 있는 노드 & 메뉴아이디 
		let selectedNode = $(menuTreeDiv.current).dynatree("getSelectedNodes")[0];
		let selectedMenuId = selectedNode.data.key;

		

		const propsMenuInfo = {
			upperMenuId: activedMenuIdRef.current,
			upperMenuNm: activedMenuNmRef.current,
			upperMenuLevel: activedMenuLevelRef.current,
			menuType: menuTypeValueState,
			menuTypeNm: menuTypeNmRef.current
		};


		let isReload = await $ui.dialog(
			{
				title: '메뉴 정보 등록',
				element: <MenuTreeRegModal props={propsMenuInfo} />,
				dialogSize: 'md',
			});


	
		if (isReload === 'RELOAD') {
			/* callGetApi(); //리스트 재호출 */
			//menuTreeFetch({ menuType: menuTypeValueState, option: { method: 'get' } });
			const tree = $(menuTreeDiv.current).dynatree("getTree");
			tree && await tree.reload();
			
			
			//Activate & Expand 대상 노드를 메뉴아이디로 가져옴.
			let node = tree.getNodeByKey(selectedMenuId);

			//등록처리 후 선택한 노드를 Activate & Expand 처리 
			await node.activate();
			await node.expand();

			
			
		}

	}, []);





	//메뉴 삭제 버튼 이벤트 핸들러.
	const deleteMenuInfo = useCallback(async ()=>{
		if (!menuTreeDiv.current) {
			console.log('----------------------------------------------------');
			console.log('[deleteMenuInfo] menuTreeDiv IS NULL --> return false;');
			console.log('----------------------------------------------------');
			return false;
		}
		
		//현재 선택되어 있는 노드
		let selectedNode = $(menuTreeDiv.current).dynatree("getSelectedNodes")[0];
		let parentNode = selectedNode.getParent()
		console.log('parentNode:', parentNode)



		//메뉴아이디
		let menuId = selectedNode.data.key;
		let menuNm = selectedNode.data.title;

		let msg = `${menuNm}[${menuId}]를 삭제하겠습니까? `
		await $ui
			.confirm(msg, {
				type: 'info',
				confirmButton: '삭제',
				cancelButton: '취소',
			}).then((rst)=> {
				console.log(rst)

				if(!rst){
					return false;
				}
			})

		let deleteFetch = await menuInfoDeleteFetch({ menuId, option: { method: 'delete' } });
		console.log(deleteFetch);

		let sMsg = `<h4>삭제되었습니다.!</h4>`;
		await $ui.alert(sMsg, { title: TITLE });

		//트리 재구성
		//menuTreeFetch({ menuType: menuTypeValueState, option: { method: 'get' } });
		//const tree = $(menuTreeDiv.current).dynatree("getTree");
		//tree && tree.reload();
		selectedNode.remove();
		console.log('parentNode', parentNode)
		parentNode.activate();

		
	},[]);






	return (
	
		<div className="card">
			<div className="card-header mb-0 mt-0">
				
				<span className="me-3" style={{ fontWeight: 700 }}  >메뉴목록</span>
				
				
			</div>
			<div className="card-body" style={{ minHeight: '700px' }}>
				<h5 className="card-title">* 메뉴타입</h5>

				{/* 메뉴타입 선택 셀렉트박스  */}
				<select
					className='form-select'
					name='menuType'
					id='menuTypeSelect'
					ref={ menuTypeSelectRef }
					onChange={menuTypeChangeHandler}
					
					//key={3}
					//defaultValue={menuTypeValueState}
					value={menuTypeValueState}
				>
					{selectboxOptionsState.map((item,index) => (		
						<option	value={item.value}
								key={index}
						>
							{item.text}
						</option>
						)
					)}
				</select>
				<p className="card-text">
					메뉴타입을 선택하면 해당 메뉴트리를 조회합니다.
				</p>
				{/* 메뉴 트리 설정 */}
				{/* dynatree Wrapper DIV*/}
				<div className="border">
					<div id="tree" ref={menuTreeDiv} />
				</div>

				<div className="mt-5 mb-3 me-3" 
					style={{
								position:'absolute',
								right:'0px',
								bottom:'0px',
							}}
							>
					<UI.Button
						className="btn-sm"
						color="success"
						onClick={openAddMenuTreeModal}
					>
						<UI.RFIcon
							icon="PlusSquare"
							className="feather-sm fill-white me-2"
						/>
						<span >등록</span>
					</UI.Button>

					<UI.Button
						className="btn-sm ms-1 mb-0 mt-0"
						color="danger"
						onClick={deleteMenuInfo}
					>
						<UI.RFIcon
							icon="MinusSquare"
							className="feather-sm fill-white me-2"
						/>
						<span>삭제</span>
					</UI.Button>
				</div>
			</div>
			
		</div>
		
	)
}




export default MnuTree;