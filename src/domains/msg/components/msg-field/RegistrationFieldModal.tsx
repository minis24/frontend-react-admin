import { FC, useCallback, useRef, useState } from 'react';
import { IForm, IInputField, ISelect } from '@/app/types/components';
import url, { TUrl } from '@/domains/msg/api/url';
import { useAPI } from '@/app/store';

const RegistrationFieldModal: FC = () => {
	const { data: regData, fetch: regFetch } = useAPI<TUrl>(url.POST_FIELD);

	const [fieldId, setFieldId] = useState('');
	const [fieldName, setFieldName] = useState('');
	const [fieldType, setFieldType] = useState('');
	const [fieldDesc, setFieldDesc] = useState('');
	const [fieldLength, setFieldLength] = useState('');
	const [useAt, setUseAt] = useState('N');

	const formRef = useRef<IForm>(null);
	const fieldIdInputRef = useRef<IInputField>(null);
	const fieldNameInputRef = useRef<IInputField>(null);
	const uiSelectRef = useRef<ISelect>(null);

	// 전문 필드 등록 API 호출
	const callRegistrationFieldAPI = () => {
		console.log(regData);
		regFetch({
			fieldId,
			fieldName,
			fieldDesc,
			fieldType,
			fieldLength,
			useAt,
		})
			.then(() => {
				$ui.dialog({ close: 'success' });
			})
			.catch((e: any) => {
				$ui.alert(`전문 필드 등록 실패하였습니다.<br />다시 입력 해 주세요.<br />Error: ${e.message}`);
			});
	};

	// 전문 필드 등록 버튼 클릭
	const onRegistration = useCallback(() => {
		if (formRef.current) {
			console.log(formRef.current.validate());
			if (formRef.current.validate()) {
				callRegistrationFieldAPI();
			}
		}
	}, [callRegistrationFieldAPI]);

	// 취소버튼 클릭
	const onCancel = useCallback(() => {
		$ui.dialog({ close: true });
	}, []);

	// 필드그룹타입 SelectBox 변경 이벤트(상위필드그룹설정시에만)
	const onChangeFieldType = useCallback((e: any) => {
		const val = e.currentTarget.value;
		setFieldType(val);
	}, []);

	return (
		<div className="card m-0">
			<div className="border-bottom title-part-padding">
				<h4 className="card-title">필드정보</h4>
			</div>
			<div className="card-body">
				<UI.Form ref={formRef}>
					<UI.InputField
						label="필드 ID"
						name="fieldId"
						placeholder="형식에 맞춰 입력하세요.(F + 5자리 숫자)"
						inlineLabel
						inputFieldStyle={{ marginBottom: '4px' }}
						value={fieldId}
						onChange={(e) => setFieldId(e.target.value)}
						required
						errorMessage="필드 ID를 입력하세요."
						ref={fieldIdInputRef}
						rules={[
							(value) => !!value || '필드 ID를 입력하세요',
							(value) => {
								return value.length === 6 || 'F + 5자리 숫자를 입력하세요';
							},
							(value) => {
								const regex = /^F[0-9]*$/;
								return regex.test(value) || 'F + 5자리 숫자를 입력하세요';
							},
						]}
					/>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					<UI.InputField
						label="필드명"
						name="fieldName"
						placeholder="영문 필드명을 입력하세요."
						inlineLabel
						inputFieldStyle={{ marginTop: '4px', marginBottom: '4px' }}
						value={fieldName}
						onChange={(e) => setFieldName(e.target.value)}
						required
						errorMessage="필드명을 입력하세요."
						ref={fieldNameInputRef}
						rules={[
							(value) => {
								// 영문, 숫자만 인식 정규식
								const regex = /^[a-zA-Z0-9$@$!%*#?&_\-\+]*$/;
								return regex.test(value) || '영문 필드명을 입력하세요';
							},
						]}
					/>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					<UI.InputField
						label="필드설명"
						name="fieldDesc"
						placeholder="필드 설명을 입력하세요."
						inlineLabel
						inputFieldStyle={{ marginTop: '4px', marginBottom: '4px' }}
						value={fieldDesc}
						onChange={(e) => setFieldDesc(e.target.value)}
						required
						errorMessage="필드 설명을 입력하세요."
					/>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					<UI.Select
						label="필드타입"
						inlineLabel
						selectStyle={{ marginTop: '4px', marginBottom: '4px' }}
						value={fieldType}
						onChange={onChangeFieldType}
						ref={uiSelectRef}
						required
						errorMessage="필드 타입을 선택하세요."
					>
						<option value="">필드 타입을 선택하세요</option>
						<option value="01">01:문자</option>
						<option value="02">02:숫자</option>
						<option value="03">03:리스트</option>
						<option value="04">04:리스트횟수</option>
					</UI.Select>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					<UI.InputField
						label="필드길이"
						type="number"
						name="fieldLength"
						placeholder="필드 길이를 입력하세요."
						inlineLabel
						inputFieldStyle={{ marginTop: '4px', marginBottom: '4px' }}
						value={fieldLength}
						onChange={(e) => setFieldLength(e.target.value)}
						required
						errorMessage="필드 길이를 입력하세요."
					/>
					<div style={{ background: 'rgba(120,130,140,.13)', height: '1px', width: '100%' }} />
					<div
						style={{ marginTop: '4px', marginBottom: '4px' }}
						className="app-ui-inputfeild novalidate row"
					>
						<label className="col-sm-2 col-form-label">사용여부</label>
						<div className="col-sm-10">
							<UI.Switch
								onlabel="사용"
								offlabel="미사용"
								onstyle="info"
								width={90}
								checked={useAt === 'Y' ? true : false}
								onChange={() => {
									setUseAt(useAt === 'Y' ? 'N' : 'Y');
								}}
							/>
						</div>
					</div>
					<div style={{ width: '100%', textAlign: 'right' }}>
						<UI.Button
							color="info"
							className="m-2"
							onClick={onRegistration}
						>
							<UI.RFIcon
								icon="Plus"
								className="fill-white feather-sm mb-1"
							/>
							<span style={{ display: 'inline-block', marginLeft: '4px' }}>등록</span>
						</UI.Button>
						<UI.Button onClick={onCancel}>
							<UI.RFIcon
								icon="X"
								className="fill-white feather-sm mb-1"
							/>
							<span style={{ display: 'inline-block', marginLeft: '4px' }}>취소</span>
						</UI.Button>
					</div>
				</UI.Form>
			</div>
		</div>
	);
};

export default RegistrationFieldModal;
