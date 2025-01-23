import {Todo} from "@/lib/features/todo/todosApiSlice";
import {Button, Card, CardBody, Checkbox} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";
import {useRouter} from "next/navigation";

export default function TodoItem({todo}:{todo:Todo}){
    const router = useRouter();

    return(
        <Card className={"w-[300px] lg:w-[330px]  "}>
            <CardBody className={"flex flex-row gap-4"}>
                <Checkbox defaultSelected={todo.completed}/>
                <p className={"text-blue-500  font-mono text-start"} onClick={()=> router.push(`/todos/${todo.id}`)}>{todo.todo}</p>
                <Button
                    isIconOnly
                    size={"sm"}
                    color={"danger"}
                    className={"ml-auto my-auto"}
                    // onPress={() => dispatch(deleteTodo(todo.id))}
                >
                    <MdDelete size={"24px"}/>
                </Button>

            </CardBody>
        </Card>
    )
}