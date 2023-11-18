import React, { Fragment, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import dayjs from "dayjs";
import { startCase } from "lodash";
import { Button } from "../../../../components";
import { v4 as uuid } from "uuid";

export default function TableSection({
	subject,
	title,
}: {
	subject: string;
	title: string;
}) {
	const weather = useAppSelector((state) => state.weather.weather);
	const keys = Object.keys((weather as any)?.[subject]);
	const key = keys[keys.length - 1];
	const rowCount = (weather as any)?.[subject]?.[key]?.length || 0;
	const [lastIndex, setLastIndex] = useState<number>(3);

	const formatData = ({
		subject,
		field,
		index,
	}: {
		subject: string;
		field: string;
		index: number;
	}) => {
		if (!weather) return "";
		if (field === "time" && subject === "daily") {
			return dayjs(
				(weather as any)?.[subject as keyof typeof weather]?.[field]?.[index],
			).format("DD MMM");
		}

		if (field === "time")
			return dayjs(
				(weather as any)?.[subject as keyof typeof weather]?.[field]?.[index],
			).format("HH:ss");
		return `${(weather as any)?.[subject]?.[field]?.[index]}${
			(weather as any)?.[`${subject}_units`]?.[field]
		}`;
	};

	const viewMore = () => {
		const val = lastIndex === rowCount - 1 ? 3 : rowCount - 1;
		setLastIndex(val);
	};

	return (
		<div className="mt-12">
			<div className="flex items-center justify-between">
				<b className="mb-5 block">{title}</b>
				<div className="flex sm:items-center items-end sm:flex-row flex-col sm:mb-0 mb-5">
					{subject === "daily" ? (
						<div>{dayjs(weather?.current.time).format("YYYY")}</div>
					) : (
						<div>{dayjs(weather?.current.time).format("MMM DD, YYYY")}</div>
					)}
					<Button className="ml-3" onClick={viewMore}>
						{lastIndex === rowCount - 1 ? "View Less" : "View More"}
					</Button>
				</div>
			</div>
			<section className="w-full overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr>
							{Object.keys((weather as any)?.[subject])
								.slice(0, 8)
								.map((item) => (
									<Fragment key={item}>
										<th className="px-1"></th>
										<th className="text-left whitespace-nowrap">
											{startCase(item.replaceAll("_", " "))}
										</th>
										<th className="px-1"></th>
									</Fragment>
								))}
						</tr>
					</thead>
					<tbody>
						{(weather as any)?.[subject]?.[key]
							.slice(0, lastIndex)
							.map((_: any, dataIndex: number) => (
								<tr
									className="border-[#e0e0e0] border-y-[1px] h-[48px]"
									key={uuid()}
								>
									{Object.keys((weather as any)?.[subject])
										.slice(0, 8)
										.map((item, index) => (
											<Fragment key={item}>
												<td className="px-1"></td>
												<td className="whitespace-nowrap text-left text-sm ">
													{formatData({
														subject,
														field: item,
														index: dataIndex,
													})}
												</td>
												<td className="px-1"></td>
											</Fragment>
										))}
								</tr>
							))}
					</tbody>
				</table>
			</section>
		</div>
	);
}
