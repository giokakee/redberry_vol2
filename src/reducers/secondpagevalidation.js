const secondPageIsValid = (state = false, action) => {
	switch (action.type) {
		case "SVALID":
			return true;
		case "SNOTVALID":
			return false;
		default:
			return state;
	}
};

export default secondPageIsValid;
