"use client"
import {Todo, useGetAllTodosQuery, useGetTodosQuery} from "@/lib/features/todo/todosApiSlice";
import TodoItem from "@/app/components/todos/TodoItem";

export default function CompletedTodos(){

    const {todos} =
        useGetAllTodosQuery(null,
            {
                selectFromResult: ({data}) => ({
                    todos: data?.todos.filter((todo:Todo)=> todo.completed == true)
                })
            })

    return(
        <div>
            {todos?.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
        </div>
    )
}