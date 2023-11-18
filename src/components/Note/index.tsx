import dayjs from "dayjs";
import Button from "../Button";
import { ChangeEvent, ChangeEventHandler, EventHandler, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { deleteNote, setNote } from "../../redux/features/notes";
interface NoteProps {
	weatherId: string;
	noteId: string;
	note: string;
	color: string;
	date: string;
}
export default function Note({
	color,
	note,
	noteId,
	weatherId,
	date,
}: NoteProps) {
	const [editting, setEditting] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const toggleEditting = () => setEditting(true);
	const closeEditting = () => setEditting(false);
	const handleChange: EventHandler<ChangeEvent<HTMLTextAreaElement>> = (e) => {
		dispatch(
			setNote({
				note: e.target.value,
				noteId,
				weatherId,
			}),
		);
	};

	const handleDelete = () => {
		dispatch(
			deleteNote({
				noteId,
				weatherId,
			}),
		);
	};
	return (
		<div
			className="pt-[80%] m-1 rounded-2xl relative"
			style={{ background: color }}
		>
			<div className="absolute top-0 left-0 h-full w-full flex flex-col">
				{!editting && (
					<div className="flex-1 p-3 overflow-y-auto break-all">{note}</div>
				)}
				{editting && (
					<textarea
						className="flex-1 p-3 bg-transparent outline-none"
						onChange={handleChange}
						value={note}
					>
						{note}
					</textarea>
				)}
				<div className="flex items-center justify-between p-3">
					<div className="text-sm">{dayjs(date).format("MMM DD, YYYY")}</div>
					<div className="flex">
						<Button
							className="w-[38px] h-[38px] bg-[#db4537] rounded-full mr-2"
							onClick={handleDelete}
						>
							<span className="material-icons text-[16px]">delete</span>
						</Button>
						{!editting && (
							<Button
								className="w-[38px] h-[38px] bg-black rounded-full"
								onClick={toggleEditting}
							>
								<span className="material-icons text-[16px]">edit</span>
							</Button>
						)}
						{editting && (
							<Button
								className="w-[38px] h-[38px] bg-[#2ec02e] rounded-full"
								onClick={closeEditting}
							>
								<span className="material-icons text-[16px]">check</span>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
