import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProgressBar = (start) => {
	const [progress, setProgress] = useState(0);

	if (start) {
		useEffect(() => {
			const interval = setInterval(() => {
				if (progress < 100) {
					setProgress((prevProgress) => prevProgress + 100);
				} else {
					clearInterval(interval);
				}
			}, 1);

			return () => clearInterval(interval);
		}, [progress]);
	}

	return (
		<div className="bar">
			<div
				className="bar-progress"
				style={{
					width: `${progress}%`,
				}}
			></div>
		</div>
	);
};

ProgressBar.propTypes = {
	start: PropTypes.string.isRequired,
};

export default ProgressBar;
