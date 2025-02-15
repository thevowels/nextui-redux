import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {supabase} from "@/supabaseClient";

export interface Todo{
    "id"?:number | string,
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
            providesTags:(result, error)=>[
                {type:"supabaseTodos",id:"all"},
                ...result.map(({ id }:{id:any}) => ({ type: 'supabaseTodos', id } as const)),
            ]
        }),
        getSupabaseTodoById: build.query<Todo, string|undefined | string[]> ({
            queryFn: async(id  ):Promise<any> => {
                try{
                    const { data, error } = await supabase.from('todo').select().eq("id", id).single();
                    if(error){
                        throw error
                    }
                    return {data}
                } catch (error: any) {
                    return { error: { status: error.status, message: error.message } };
                }
            },
            providesTags: (result) => [{type:'supabaseTodos', id: result?.id}]
        }),
        addSupabaseTodo: build.mutation({
            queryFn: async (newTodo:any):Promise<any> => {
                try {
                    const { data, error } = await supabase.from('todo').insert(newTodo).select().single();
                    if (error) throw error;
                    console.log('adding supabaseTodo ', data);
                    return { data };
                } catch (error: any) {
                    return { error: { status: error.status, message: error.message } };
                }
            },
            async onQueryStarted(todo:Todo, {dispatch, queryFulfilled}) {
                console.log('onQueryStarted ', todo);
                const {data: savedTodo} = await queryFulfilled;
                const patchResult = dispatch(
                    supabasetodosApiSlice.util.updateQueryData('getAllSupabaseTodos', null,  (draft)=>{
                        draft.push(savedTodo);
                        return draft;
                    })
                )

            },
        }),
        deleteSupabaseTodo: build.mutation<Todo, string|number>({
            queryFn: async (id ) : Promise<any> => {
                try{
                    const {data, error } = await supabase.from('todo').delete().eq('id', id).select().single();
                    if(error) throw error;
                    return {data:data as Todo};
                }catch(error:any) {
                    return { error: { status: error.status, message: error.message } };
                }
            },
            async onQueryStarted(id:string|number, {dispatch, queryFulfilled}){
                console.log('delete onQueryStarted', id);
                const patchResult = dispatch(
                    supabasetodosApiSlice.util.updateQueryData('getAllSupabaseTodos', null, (draft) => {
                        console.log('Draft from delete ', draft);
                        draft = draft.filter((todoItem:any) => todoItem.id != id);
                        return draft;
                    }),
                )
                try{
                    const {data: deletedTodo } = await queryFulfilled;
                }catch{
                    patchResult.undo();
                }

            }
        }),
        updateSupabaseTodo: build.mutation<Todo, Todo>({
            queryFn: async (todo: Todo) : Promise<any> => {
                try{
                    const {data, error } = await supabase.from('todo').update(todo).eq('id', todo.id).select().single();
                    if(error) throw error;
                    return {data: data as Todo};
                }catch(error:any){
                    return { error: { status: error.status, message: error.message } };
                }
            },
            invalidatesTags: (result) =>  [{type:'supabaseTodos', id:result?.id}]
        })


    })),
});

export const { useGetAllSupabaseTodosQuery, useGetSupabaseTodoByIdQuery, useAddSupabaseTodoMutation, useDeleteSupabaseTodoMutation, useUpdateSupabaseTodoMutation } = supabasetodosApiSlice;