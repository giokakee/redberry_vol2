import { useNavigate } from "react-router-dom";
import "./added.css";

const Added = () => {
	const navigate = useNavigate();

	return (
		<div className='addedPage'>
			<div className='addedBox'>
				<div className='addedDiv'>
					<div className='addedLogo'></div>
					<h1>ჩანაწერი დამატებულია!</h1>
				</div>
				<div className='addedDiv'>
					<button className='button1' onClick={() => navigate("/list")}>
						სიაში გადაყვანა
					</button>
					<button className='button2' onClick={() => navigate("/")}>
						მთავარი
					</button>
				</div>
			</div>
		</div>
	);
};

export default Added;
