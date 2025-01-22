"use client"
import {useParams} from "next/navigation";
import {useGetAllTodosQuery, useGetTodoByIdQuery, Todo} from "@/lib/features/todo/todosApiSlice";
import {Card, CardBody, Checkbox} from "@nextui-org/react";
export default function Page() {
    const { id } = useParams();

    const { todo } = useGetAllTodosQuery(undefined, {
        selectFromResult: ({data}) =>({
            todo: data?.todos.find((todo:Todo) => todo.id == id)
        })
    })
    if(todo) {
        return(
            <div className="text-center">
                Todo Detail Page
                <Card>
                    <CardBody className={"flex flex-row"}>
                        <Checkbox isSelected={todo.completed}/>
                        {todo.todo}
                    </CardBody>
                </Card>
            </div>
        )

    }
}