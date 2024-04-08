declare interface Iuser {
	_id: string;
	saved: any[];
	first_name: string;
	last_name: string;
	email: string;
	createdAt: string;
}

declare interface UserState {
	userDetails: Iuser | null;
	token: string | null;
}
