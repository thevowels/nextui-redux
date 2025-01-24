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
    const [todos, setTodos] = useState([    {
        id: 1,
        completed: true,
        todo:"Todo 1",
        userId:4
    },
    ]);
    async function getTodos() {
        const { data, error } = await supabase.from('todo').select();
        if(data){
            setTodos(data);
        }

    }
    useEffect( () => {
        getTodos();
    },[])
    const something = supabase
        .channel('room1')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'todo' }, payload => {
            console.log('Change received!', payload);
            setTodos([
                // @ts-ignore
                ...todos,
                // @ts-ignore
                payload.new
            ])
        })
        .subscribe()
    console.log('asdf', something);


    return(
        <div>
            {todos && todos.map((todo:Todo) => ( <TodoItem todo={todo} key={todo.id}/>))}
        </div>
    )
}