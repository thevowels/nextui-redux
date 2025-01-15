import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface Todo {
    "userId"?: number;
    id: number;
    title: string;
    completed: boolean;
}
export interface TodoState{
    items: Todo[];
}

const initialState: TodoState = {
    items: [
        {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": true
        },
        {
            "userId": 1,
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": false
        },
        {
            "userId": 1,
            "id": 3,
            "title": "fugiat veniam minus",
            "completed": true
        },

    ],
}

export const todoSlice = createAppSlice({
    name: "todos",
    initialState,
    reducers: (create) =>({
        addTodo: create.reducer( (state, action: PayloadAction<Todo>) =>{
            state.items.push(action.payload);
        })
    }),
    selectors: {
        selectTodos: (todos) => todos.items
    }
});

export const { addTodo } = todoSlice.actions;
export const {selectTodos} = todoSlice.selectors;


