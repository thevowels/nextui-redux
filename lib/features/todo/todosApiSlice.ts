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

export const todosApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/todos" }),
    reducerPath: "todosApi",
    tagTypes: ["Todos"],
    endpoints: ( (build) => ({

        getTodos: build.query<TodosApiResponse, number> ({
            query: (limit=10) => `?limit=${limit}`,

            providesTags: (result, error, id) => [{type:"Todos", id}],
        }),
    })),
});

export const {useGetTodosQuery} = todosApiSlice;