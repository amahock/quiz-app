import React from '../../node_modules/@types/react';

const ProgressBar = ({number}) => {
	return (
		<div className='progress mb-4'>
			<div
				className='progress-bar progress-bar-striped progress-bar-animated btn-primary'
				role='progressbar'
				aria-valuenow={number}
				aria-valuemin='0'
				aria-valuemax='100'
				style={{ width: number + '%' }}></div>
		</div>
	);
};

export default ProgressBar;
