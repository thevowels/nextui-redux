"use client"
import {useParams} from "next/navigation";
import { Todo} from "@/lib/features/todo/todosApiSlice";
import {Button, Card, CardBody, Checkbox} from "@nextui-org/react";
import {useGetSupabaseTodoByIdQuery, useUpdateSupabaseTodoMutation} from "@/lib/features/todo/supabaseTodosApiSlice";
export default function Page() {
    const { id } = useParams();

    // const { todo } = useGetAllSupabaseTodosQuery(undefined, {
    //     selectFromResult: ({data}) =>({
    //         todo: data?.find((todo:Todo) => todo.id == id)
    //     })
    // })
    const { data:todo, error, isLoading} = useGetSupabaseTodoByIdQuery(id);
    const [updateTodoApi, updateTodoResult ] = useUpdateSupabaseTodoMutation();
    const editHandler = () =>{
        const newTodo = {
            ...todo,
            todo: 'Updated'
        }
        updateTodoApi(newTodo as Todo);

    }
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
                <Button color={"danger"}
                        variant={"ghost"}
                        onPress={editHandler}

                >Edit</Button>
            </div>
        )

    }
}