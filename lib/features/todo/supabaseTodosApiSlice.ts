import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
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


export const supabasetodosApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    reducerPath: "supabaseTodosApi",
    tagTypes: ["supabaseTodos"],
    endpoints: ( (build) => ({

        getAllSupabaseTodos: build.query<any, null | undefined>({
            queryFn: async ():Promise<any> => {
                try{
                    const { data, error } = await supabase.from('todo').select();
                    if(error){
                        throw error
                    }
                    return {data}
                } catch (error: any) {
                    return { error: { status: error.status, message: error.message } };
                }
            },
            providesTags:(result, error)=>[{type:"supabaseTodos",id:"all"}]
        }),
        getSupabaseTodoById: build.query<Todo, string|undefined> ({
            queryFn: async(id  ):Promise<any> => {
                try{
                    const { data, error } = await supabase.from('todo').select().eq("id", id);
                    if(error){
                        throw error
                    }
                    console.log('from supabaseApi ', data)
                    return {data}
                } catch (error: any) {
                    return { error: { status: error.status, message: error.message } };
                }
            }
        })

    })),
});

export const { useGetAllSupabaseTodosQuery } = supabasetodosApiSlice;