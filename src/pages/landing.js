import "./landing.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div className='landingPage'>
			<div className='redberyText'></div>
			<div className='landingSvg'></div>
			<div className='landingButtons'>
				<button onClick={() => navigate("/f")}>ჩანაწერის დამატება</button>
				<button onClick={() => navigate("/list")}>ჩანაწერების სია</button>
			</div>
		</div>
	);
};

export default LandingPage;
