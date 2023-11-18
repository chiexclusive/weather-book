import { Button, Note } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setNote } from "../../../../redux/features/notes";

export default function NoteSection() {
	const notes = useAppSelector((state) => state.note.notes);
	const location = useAppSelector((state) => state.city.location)!;
	const dispatch = useAppDispatch();

	const addNote = () => {
		dispatch(
			setNote({
				note: "",
				weatherId: location.id,
			}),
		);
	};
	return (
		<div className="mt-12">
			<b className="mb-5 block">Notes</b>
			<section className="w-full">
				<Button
					className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
					onClick={addNote}
				>
					<i className="material-icons">add</i>
				</Button>
			</section>
			<section className="grid lg:grid-cols-3 sm:grid-cols-2 gap-[20px]">
				{notes?.[location?.id] &&
					Object.keys(notes[location.id]).map((key) => (
						<Note
							weatherId={location.id.toString()}
							noteId={key}
							note={notes[location.id][key].note}
							color={notes[location.id][key].color}
							date={notes[location.id][key].date}
							key={key}
						/>
					))}
			</section>
		</div>
	);
}
