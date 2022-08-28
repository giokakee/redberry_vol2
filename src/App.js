import "./App.css";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import UserInfo from "./pages/first";
import LaptopInfo from "./pages/second";
function App({ num }) {
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
