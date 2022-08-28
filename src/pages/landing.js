import "./landing.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
	return (
		<div className='landingPage'>
			<div className='redberyText'></div>
			<div className='landingSvg'></div>
			<div>
				<Link to='/f'>ჩანაწერის დამატება</Link>
				<Link to='/'>ჩანაწერების ნახვა</Link>
			</div>
		</div>
	);
};

export default LandingPage;
