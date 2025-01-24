"use client"
import TodoItem from "@/app/components/todos/TodoItem";
import {supabase} from "@/supabaseClient";
import {useEffect, useState} from "react";
import {Todo} from "@/lib/features/todo/todosApiSlice";

const defaultTodos = [
    {
        id: 1,
        completed: true,
        todo:"Todo 1",
        userId:4
    },
    {
        id: 2,
        completed: true,
        todo:"Todo 2",
        userId:4
    },
    {
        id: 3,
        completed: true,
        todo:"Todo 3",
        userId:4
    },
]

export default function Page(){
    const emptyTodos: Todo[] = []
    const [todos, setTodos] = useState(emptyTodos);
    async function getTodos() {
        const { data, error } = await supabase.from('todo').select();
        if(data && data.length>=1){
            setTodos(data);
        }

    }
    useEffect( () => {
        getTodos();
    },[])
    supabase
        .channel('insertTodo')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'todo' }, payload => {
            console.log('Change received!', payload);
            setTodos([
                // @ts-ignore
                ...todos,
                // @ts-ignore
                payload.new
            ])
        })
        .subscribe()
    supabase
        .channel('deleteTodo')
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'todo' }, payload => {
            console.log('Todo deleted!', payload);
            setTodos(todos.filter(todo => todo.id != payload.old.id));
        })
        .subscribe()


    return(
        <div>
            {todos && todos.map((todo:Todo) => ( <TodoItem todo={todo} key={todo.id}/>))}
        </div>
    )
}