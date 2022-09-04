import "./App.css";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import UserInfo from "./pages/first";
import LaptopInfo from "./pages/second";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListPage from "./pages/list";
import OneLaptop from "./pages/onelaptop";
import Added from "./pages/added";

function App({ num }) {
	const dispatch = useDispatch();
	let firstPageISValid = window.localStorage.getItem("firstPageIsValid");
	useEffect(() => {
		// window.localStorage.clear();
		firstPageISValid ? dispatch({ type: '"VALID"' }) : dispatch({ type: "NOTVALID" });
	}, [firstPageISValid, dispatch]);
	return (
		<div className='App'>
			<Routes>
				<Route path='/list/:id' element={<OneLaptop />}></Route>
				<Route path='/list' element={<ListPage />} />
				<Route path='/' element={<LandingPage />} />
				<Route path='/f' element={<UserInfo />} />
				<Route path='/s' element={<LaptopInfo />} />
				<Route path='/congrats' element={<Added />}></Route>
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
