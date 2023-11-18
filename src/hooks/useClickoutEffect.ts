import { MutableRefObject, useEffect } from "react";

const useClickoutEffect = (
	ref: MutableRefObject<HTMLElement | null>,
	action: () => void,
	state: boolean,
) => {
	const handleClickOut = (e: Event) => {
		const target = e.target;
		if (!ref.current) return;
		if (ref.current.contains(target as any)) return;
		action();
	};

	useEffect(() => {
		if (!state) return;
		setTimeout(() => {
			window.addEventListener("click", handleClickOut);
		}, 40);
		return () => {
			window.removeEventListener("click", handleClickOut);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);
	return null;
};

export default useClickoutEffect;
