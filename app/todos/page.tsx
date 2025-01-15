"use client"
import {
    selectTodos,
    addTodo,
    Todo
} from "@/lib/features/todo/todoSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function TodosPage(){
    const dispatch = useAppDispatch();
    const todos: Todo[] = useAppSelector(selectTodos);
    return(<div className={"gap-4 flex flex-col"}>
        Todos

        {todos.map(todo => (
            <Card key={todo.id}>
                <CardBody>
                    <p>{todo.title}</p>
                </CardBody>
            </Card>
        ))}
    </div>)
}