import React from 'react';

import './Loader.css';

export const Loader = () => (
	<div className="loader-wrapper">
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
);
