import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {supabase} from "@/supabaseClient";

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
        addTodo: build.mutation({
            queryFn: async (newTodo:any):Promise<any> => {
                try {
                    const { data, error } = await supabase.from('todo').insert(newTodo).select();
                    if (error) throw error;
                    console.log('inside mutation ', data[0]);
                    return { data: data[0] as Todo };
                } catch (error: any) {
                    return { error: { status: error.status, message: error.message } };
                }
            },
        }),

    })),
});

export const {useGetTodosQuery, useGetAllTodosQuery,  useGetTodoByIdQuery, useAddTodoMutation} = todosApiSlice;