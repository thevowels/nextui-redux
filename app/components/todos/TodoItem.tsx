import {Todo} from "@/lib/features/todo/todosApiSlice";
import {Button, Card, CardBody, Checkbox} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";

function TodoItem({todo}:{todo:Todo}){

    return(
        <Card className={"w-[300px] lg:w-[330px]  "}>
            <CardBody className={"flex flex-row gap-4"}>
                <Checkbox defaultSelected={todo.completed}/>
                <p className={"text-blue-500  font-mono text-start"}>{todo.todo}</p>
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