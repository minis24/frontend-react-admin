export type TUrl = (typeof url)[keyof typeof url];

const url = {
	GET_FIELD: '/adm/msg/field',
} as const;

export default url;
