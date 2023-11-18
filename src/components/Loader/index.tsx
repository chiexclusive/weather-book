import styles from "./index.module.scss";

const Loader = ({
	color,
	size,
	loading,
}: {
	color: "white" | "black";
	size?: "large" | "medium" | "small";
	loading?: boolean;
}) => {
	if (typeof loading === "boolean" && !loading) return null;
	return (
		<div
			className={`${styles["lds-ring"]} ${
				color ? styles[color] : styles["white"]
			} ${styles[size as string]}`}
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;
