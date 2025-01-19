import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Todo{
    "id":number,
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
            query: ({limit=5, skip=0}:TodoParams) => `?limit=${limit}&skip=${skip}`,

            providesTags: (result, error, id) => [{type:"Todos"}],
        }),
    })),
});

export const {useGetTodosQuery} = todosApiSlice;