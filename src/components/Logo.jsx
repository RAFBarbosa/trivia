import logoImage from "../assets/logo.png";
import PropTypes from "prop-types";

const Logo = ({ size }) => {
	return (
		<div className="container-logo">
			<img
				src={logoImage}
				alt="Neon Trivia Logo"
				className="logo-image"
				style={{ width: size, height: "auto" }}
			/>
		</div>
	);
};

Logo.propTypes = {
	size: PropTypes.string.isRequired,
};

export default Logo;
