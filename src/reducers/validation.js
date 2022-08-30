const firstPageIsValid = (state = false, action) => {
	switch (action.type) {
		case "VALID":
			window.localStorage.setItem("firstPageIsValid", true);
			return true;
		case "NOTVALID":
			window.localStorage.removeItem("firstPageIsValid");
			return false;
		default:
			return state;
	}
};

export default firstPageIsValid;
