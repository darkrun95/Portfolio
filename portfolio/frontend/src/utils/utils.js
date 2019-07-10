import 'babel-polyfill';

const authenticate = async () => {
	const acs_token = localStorage.getItem('acs_token');

	if (acs_token !== null) {		
	    const response = await fetch('/api/check-authenticated/'+acs_token+'/',{
			method: 'GET',
			headers: {
	            'Content-Type': 'application/json'
	        },
		});
	    const result = await response.ok;
	    return result
	} else {
		return false
	}
}

export function check_authentication() {
	const val = authenticate()
	return val;
}