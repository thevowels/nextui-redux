"use client"
import {useState} from "react";
import {useGetTodosQuery, Todo} from "@/lib/features/todo/todosApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {Button, Card, CardBody} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";


function TodoItem({todo}:{todo:Todo}){
    // const dispatch = useAppDispatch();
    return(
        <Card className={"w-[300px] lg:w-[330px]  "}>
            <CardBody className={"flex flex-row justify-between gap-4"}>
                <p className={"text-blue-500  font-mono"}>{todo.todo}</p>
                <Button
                    isIconOnly
                    size={"sm"}
                    color={"danger"}
                    // onPress={() => dispatch(deleteTodo(todo.id))}
                >
                    <MdDelete size={"24px"}/>
                </Button>
            </CardBody>
        </Card>
    )
}


export default function TodosApiPage(){
    const [numberOfQuotes, setNumberOfQuotes] = useState(10);
    // Using a query hook automatically fetches data and returns query values


    const { data, isError, isLoading, isSuccess } =
        useGetTodosQuery(numberOfQuotes);
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
        console.log(data);
        return(
            <div className="">
                I'm from Todos API.

                {data.todos.map((todo:Todo) => (
                    <TodoItem todo={todo}/>
                ))}

            </div>
        )

    }
}