import "./header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
	const { pathname } = useLocation();
	return (
		<div className='fHeader'>
			<div className='header-element'>
				<p className={`${pathname === "/f" ? "underline" : ""}`}>თანამშრომლის ინფო</p>
				<p className={`${pathname === "/s" ? "underline" : ""}`}>ლეპტოპის მახასიათებლები</p>
			</div>
		</div>
	);
};

export default Header;
