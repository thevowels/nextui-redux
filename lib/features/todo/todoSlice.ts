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
        }),
        deleteTodo: create.reducer((state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id != action.payload);
        }),
        updateTodo: create.reducer((state, action: PayloadAction<Todo>)=>{
            state.items = state.items.map(item => item.id == action.payload.id ? action.payload : item);
        }),
        loadAllTodo: create.asyncThunk(
            async() =>{
                const json = await fetch("https://jsonplaceholder.typicode.com/todos")
                                            .then(response => response.json()) ;
                return json;
            },
            {
                fulfilled: (state, action) =>{
                    state.items= action.payload;
                }
            }
        )
    }),
    selectors: {
        selectTodos: (todos) => todos.items
    }
});

export const { addTodo,deleteTodo, updateTodo, loadAllTodo } = todoSlice.actions;
export const {selectTodos} = todoSlice.selectors;


