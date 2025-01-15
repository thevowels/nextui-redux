"use client"
import {
    selectTodos,
    addTodo,
    deleteTodo,
    Todo
} from "@/lib/features/todo/todoSlice";
import { MdDelete } from "react-icons/md";

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";

export default function TodosPage(){
    const dispatch = useAppDispatch();
    const todos: Todo[] = useAppSelector(selectTodos);
    return(<div className={"gap-4 flex flex-col"}>
        Todos

        {todos.map(todo => (
            <Card key={todo.id} className={"w-[300px] lg:w-[330px]  "}>
                <CardBody className={"flex flex-row justify-between gap-4"}>
                    <p>{todo.title}</p>
                    <Button isIconOnly size={"sm"} color={"danger"} onPress={() => dispatch(deleteTodo(todo.id))}><MdDelete size={"24px"}/></Button>
                </CardBody>
            </Card>
        ))}
    </div>)
}