"use client"

import {useGetAllSupabaseTodosQuery} from "@/lib/features/todo/supabaseTodosApiSlice";
import TodoInput from "@/app/components/todos/TodoInput";
import {Card, Pagination, Skeleton} from "@nextui-org/react";
import {Todo} from "@/lib/features/todo/todosApiSlice";
import TodoItem from "@/app/components/todos/TodoItem";
export default function SupabaseTodos () {
    const {data, isError, isLoading, isSuccess, isFetching} = useGetAllSupabaseTodosQuery(null);
    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    if (isSuccess) {
        return(
            <div>
                I'm from Todos API.
                <TodoInput/>
                {isFetching && (
                    <>
                        <Card className="w-[300px] lg:w-[330px] space-y-5 p-4" radius="lg">
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"/>
                                </Skeleton>
                            </div>
                        </Card>

                        <Card className="w-[300px] lg:w-[330px] space-y-5 p-4" radius="lg">
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"/>
                                </Skeleton>
                            </div>
                        </Card>

                    </>
                )}

                {!isFetching && data.map((todo: Todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}

            </div>
        )

    }}