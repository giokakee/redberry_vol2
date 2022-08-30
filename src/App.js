import "./App.css";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import UserInfo from "./pages/first";
import LaptopInfo from "./pages/second";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App({ num }) {
	const dispatch = useDispatch();
	let firstPageISValid = window.localStorage.getItem("firstPageIsValid");
	useEffect(() => {
		firstPageISValid ? dispatch({ type: '"VALID"' }) : dispatch({ type: "NOTVALID" });
	}, [firstPageISValid]);
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/f' element={<UserInfo />} />
				<Route path='/s' element={<LaptopInfo />} />
			</Routes>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		num: state.test,
	};
};

export default connect(mapStateToProps)(App);
