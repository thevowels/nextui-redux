import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Todo{
    "id":number | string,
    "todo": string,
    "completed": boolean,
    "userId": number
}

interface TodosApiResponse{
    todos: Todo[],
    total: number,
    skip: number;
    limit: number;
}
type TodoParams = {
    limit:number,
    skip:number,
}

export const todosApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/todos" }),
    reducerPath: "todosApi",
    tagTypes: ["Todos"],
    endpoints: ( (build) => ({

        getTodos: build.query<TodosApiResponse, Partial<TodoParams> > ({
            query: ({limit=5, skip=0}:Partial<TodoParams>) => `?limit=${limit}&skip=${skip}`,

            providesTags: (result, error, arg, meta) => [{type:"Todos",id:JSON.stringify(arg)}],
        }),
        getAllTodos: build.query<TodosApiResponse, null | undefined>({
            query: ()=>'?limit=500',
            providesTags:(result, error)=>[{type:"Todos",id:"all"}]
        }),
        getTodoById: build.query<Todo, string|undefined| string[]>({
            query:(id="1")=>`${id}`,
            providesTags: (result, error, arg,meta) => [{type:"Todos",id:'single ' + arg}]
        }),
    })),
});

export const {useGetTodosQuery, useGetAllTodosQuery,  useGetTodoByIdQuery} = todosApiSlice;