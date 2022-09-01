import { Link } from "react-router-dom";

const BackButton = () => {
	return (
		<div className='fBackButton'>
			<Link to={"/"}></Link>
		</div>
	);
};

export default BackButton;
