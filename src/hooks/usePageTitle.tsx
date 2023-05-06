import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | ToBeActive`;
	}, [title]);
};

export default usePageTitle;
