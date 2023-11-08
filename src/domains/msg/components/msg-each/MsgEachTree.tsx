import { useAPI } from "@/app/store";
import { useEffect, useRef } from "react";
import url, { TUrl } from '@/domains/msg/api/url';

export interface IProps {
	deliveryBizCode: React.Dispatch<React.SetStateAction<string>>;
	deliveryBizDtlCode: React.Dispatch<React.SetStateAction<string>>;
	deliveryBiz3DepthCode: React.Dispatch<React.SetStateAction<string>>;
}



/**
 * MenuTree Component
 * @param param0 
 * @returns 
 */
const MsgEachTree: React.FC<IProps> = (props) => {

	/* 	
		전문등록 시 업무구분코드를 설정 [조회:INQ, 이체:TRN ,대출:LON... ]
		공통코드에서 불러옴
		트리에 표시하는 항목은 공통코드테이블의 업무구분코드와 전문등록시 설정된 업무구분코드를 매핑하여
		등록된 항목이 있는 업무만 트리에 보여준다.
	 */




	const deliveryBizCode = props.deliveryBizCode;
	const deliveryBizDtlCode = props.deliveryBizDtlCode;
	const deliveryBiz3DepthCode = props.deliveryBiz3DepthCode;



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
	//const TITLE_ERROR: string = '오류확인';








	//const patchOption = { option: { method: 'patch' } };
	const getOption = { option: { method: 'get' } };





	// 메뉴트리 루트 엘리먼트
	const MsgEachTreeDivRef = useRef(null);

	//메뉴등록 다이얼로그에 전달할 데이터.
	const bizCodeRef = useRef('');
	const bizDtlCodeRef = useRef('');
	const biz3DepthCodeRef = useRef('');

	/**
	* 전문개별부 트리 목록 조회
	 */
	const { fetch: treeFetch } = useAPI<TUrl>(url.GET_MSG_EACH_TREE);
	const { fetch: lazyTreeFetch } = useAPI<TUrl>(url.GET_MSG_EACH_TREE_CHILDREN);







	useEffect(() => { 
		const fetchData = async () => {

			if (!MsgEachTreeDivRef.current) {
				console.log('----------------------------------------------------');
				console.log('[Tree] TreeDiv IS NULL --> return false;');
				console.log('----------------------------------------------------');
				return false;
			}

			try{
				let treeData = await treeFetch(getOption);
				await createTree(treeData.data.bdy.data);


				//----------------------------------------------------------------------------------
				// 메뉴트리의 루트노드의 첫번째 하위노드를 펼침 설정.
				//----------------------------------------------------------------------------------
				const rootNode: DynaTreeNode = $(MsgEachTreeDivRef.current).dynatree("getRoot").getChildren()[0];
				rootNode.activate();
				//rootNode.getChildren()[0].activate();



			}catch (error){
				console.log(error)
			}finally {

			}
			
		}

		fetchData();

	}, []);



	const createTree = (initTreeObject: DynaTreeDataModel[]) => {

		if (!MsgEachTreeDivRef.current) {
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

		$(MsgEachTreeDivRef.current).dynatree({
			debugLevel: 2,
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
			onLazyRead: async (selectedNode) => {
				if (!selectedNode.data.key){
					let sMsg = `<h4>조회정보 확인 필요.</h4>`;
					$ui.alert(sMsg, { title: TITLE });
					return;
				}
			
				let nodeLevel = selectedNode.getLevel();
				let bizCode = '';
				let bizDtlCode = '';
				//--------------------------------------------------------------
				// 파라미터 설정 [요청URL 수정 , 메뉴상태 수정]
				//--------------------------------------------------------------
				//서브 메뉴트리 데이터 조회 API 호출
				switch (nodeLevel) {
					case 2:
						bizCode = selectedNode.data.key;
						bizDtlCode = '';
					
						break;
					case 3:
						let parentNode = selectedNode.getParent();
						if (!parentNode.data.key) {
							return;
						}
						bizCode = parentNode.data.key;
						bizDtlCode = selectedNode.data.key;
						break;
					
				}
				let res = await lazyTreeFetch({
					bizCode,
					bizDtlCode,
					nodeLevel,
					option: { method: 'get' }
				});
				selectedNode.setLazyNodeStatus(DTNodeStatus.Ok);
				selectedNode.addChild(res.data.bdy.list);
				
			}, // end onLazyRead
			/**
			 * 메뉴트리를 클릭했으때 이벤트 핸들러.
			 * @param seletedNode 
			 */
			onActivate: (selectedNode) => {
				bizCodeRef.current = '';
				bizDtlCodeRef.current = ''
				biz3DepthCodeRef.current = '';
				
				let nodeLevel = selectedNode.getLevel() as number;
				let parentNode = selectedNode.getParent();
				let grandParentNode = selectedNode.getParent().getParent();

				if (nodeLevel === 1) {//root 노드 
					bizCodeRef.current = '';
					bizDtlCodeRef.current = '';
				} 
				//1 뎁스 노드 (ex : 대출[LON])
				else if (nodeLevel === 2) {
					bizCodeRef.current = selectedNode.data.key as string;
					bizDtlCodeRef.current = '';
				} 
				//2 뎁스 노드 (ex : PRC )
				else if (nodeLevel === 3){
					bizCodeRef.current = parentNode.data.key as string;
					bizDtlCodeRef.current = selectedNode.data.key as string;
				} 
				//3 뎁스 노드 (ex : TST --> 전문아이디 앞 3자리 문자)
				else if (nodeLevel === 4){
					bizCodeRef.current = grandParentNode.data.key as string;
					bizDtlCodeRef.current = parentNode.data.key as string;
					biz3DepthCodeRef.current = selectedNode.data.key as string;
				}


				//부모창에 전달
				deliveryBizCode(bizCodeRef.current);
				deliveryBizDtlCode(bizDtlCodeRef.current);
				deliveryBiz3DepthCode(biz3DepthCodeRef.current);
				

				
			},// end onActivate


			/**
			 * 다른 메뉴트리를 클릭했을때 이벤트 핸들러.
			 * 해당 노드를 선택해제 시켜준다.
			 * @param seletedNode 
			 */
			onDeactivate: (seletedNode) => {
				seletedNode.select(false);
			},



			/**
			 * when tree was (re)loaded.
			 * @param isReloading 
			 * @param isError 
			 */
			onPostInit(isReloading, isError) {
				console.log(`isReloading: ${isReloading}`);
				console.log(`isError: ${isError}`);

			},

			//드래그앤드랍 
			dnd: {
				revert: false,

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
	};




	return (
	
		<div className="card">
			{/* ==== 카드레이아웃 헤더 영역 ====*/}
			<div className="card-header mb-0 mt-0">
				<span className="me-3" style={{ fontWeight: 700 }}  >전문개별부 목록</span>
			</div>
			{/* ==== 카드레이아웃 바디 영역 ====*/}
			<div className="card-body" style={{ minHeight: '700px' }}>

				{/* dynatree Wrapper DIV*/}
				<div className="border">
					{/* dynatree 가 렌더링 되는 DIV*/}
					<div id="tree" ref={MsgEachTreeDivRef} />
				</div>
			</div>
		</div>
	)
}




export default MsgEachTree;