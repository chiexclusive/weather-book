import { useState } from "react";
import { copyToClipboard } from "../utils/helper";

export default function useCopyEffect(value: string) {
	const [text, setText] = useState<string>("Copy");

	const setCopy = async () => {
		await copyToClipboard(value);
		setText("Copied");
		setTimeout(() => {
			setText("Copy");
		}, 1500);
	};
	return [text, setCopy];
}
