import React, { ForwardedRef, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Partial<HTMLAttributes<HTMLButtonElement>> {}
export default forwardRef(function Button(
	{ className, children, ...props }: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	return (
		<button
			ref={ref}
			{...props}
			className={twMerge(
				"bg-[#db4537] px-3 py-2 rounded-sm flex items-center justify-center text-sm text-[white]",
				className,
			)}
		>
			{children}
		</button>
	);
});
