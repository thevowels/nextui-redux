"use client"
import {useState} from "react";
import {useGetAllTodosQuery, Todo} from "@/lib/features/todo/todosApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {Button, Card, CardBody} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {Pagination, Checkbox} from "@nextui-org/react";

const options = [
    {key:2,label: 2},
    {key:3,label: 3},
    {key:5,label: 5},
    {key:10,label: 10},
    {key:15,label: 15}
]


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


export default function AllTodos() {
    const [numberOfQuotes, setNumberOfQuotes] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    // Using a query hook automatically fetches data and returns query values


    const {data, isError, isLoading, isSuccess} = useGetAllTodosQuery(null);

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
        return(
            <div>
                I'm from Todos API.

                {data.todos.map((todo:Todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}

            </div>
        )

    }
}