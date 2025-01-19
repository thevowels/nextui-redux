"use client"
import {useState} from "react";
import {useGetTodosQuery, Todo} from "@/lib/features/todo/todosApiSlice";
import {useAppDispatch} from "@/lib/hooks";
import {Button, Card, CardBody} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";


const options = [
    {key:2,label: 2},
    {key:3,label: 3},
    {key:5,label: 5},
    {key:10,label: 10},
    {key:15,label: 15}
]


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
    const handleSelectionChange = (e:any) => {
        setNumberOfQuotes(Number(e.target.value));
        console.log(numberOfQuotes);
    };


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
        return(
            <div>
                I'm from Todos API.
                <Select
                    className="max-w-xs"
                    isRequired={true}
                    items={options}
                    label="Select Amount"
                    selectedKeys={[String(numberOfQuotes)]}
                    onChange={handleSelectionChange}
                >
                    {options.map((item) => (<SelectItem key={item.key}>{String(item.label)}</SelectItem>))}
                </Select>

                {data.todos.map((todo:Todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}

            </div>
        )

    }
}