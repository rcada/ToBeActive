import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `ToBeActive | ${title}`;
	}, [title]);
};

export default usePageTitle;
