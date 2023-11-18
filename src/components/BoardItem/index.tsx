import React from "react";

interface BoardItemProps {
	name: string;
	value: string | number;
}

export default function BoardItem({ name, value }: BoardItemProps) {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="h-[100px] break-all bg-[#e7e7e7] rounded-xl w-full flex items-center justify-center text-center font-extrabold">
				{value}
			</div>
			<span className="text-[#868686] text-xs mt-3">{name}</span>
		</div>
	);
}
