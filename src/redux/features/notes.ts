import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface NoteState {
	notes: {
		[arg: string]: {
			[arg: string]: { note: string; color: string; date: string };
		};
	};
}

const initialState: NoteState = {
	notes: {},
};

export const noteSlice = createSlice({
	name: "city",
	initialState,
	reducers: {
		setNote: (state, { payload }) => {
			const { note, weatherId, noteId } = payload || {};
			const copiedNotes = { ...state.notes };
			if (copiedNotes[weatherId] && copiedNotes[weatherId][noteId]) {
				copiedNotes[weatherId][noteId] = {
					note,
					color: copiedNotes[weatherId][noteId].color,
					date: new Date().toISOString(),
				};
			}

			if (!noteId || !copiedNotes[weatherId]) {
				const colors = ["#ffa67e", "#ffcf7c", "#05d9fe", "#be9efd", "#e7f19a"];
				const randomIndex = Math.floor(Math.random() * colors.length);
				const id = noteId || uuid();
				copiedNotes[weatherId] = {
					...(copiedNotes[weatherId] || {}),
					[id]: {
						note,
						color: colors[randomIndex],
						date: new Date().toISOString(),
					},
				};
			}
			state.notes = copiedNotes;
		},
		deleteNote: (state, { payload }) => {
			const { weatherId, noteId } = payload || {};
			const copiedNotes = { ...state.notes };

			delete copiedNotes[weatherId][noteId];
			state.notes = copiedNotes;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
