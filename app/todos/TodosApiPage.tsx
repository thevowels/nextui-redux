"use client"
import {useState} from "react";
import {useGetTodosQuery, Todo} from "@/lib/features/todo/todosApiSlice";
import {Button, Card, CardBody, Skeleton} from "@nextui-org/react";
import {MdDelete} from "react-icons/md";
import {Pagination, Checkbox} from "@nextui-org/react";
import {useRouter} from "next/navigation";

const options = [
    {key:2,label: 2},
    {key:3,label: 3},
    {key:5,label: 5},
    {key:10,label: 10},
    {key:15,label: 15}
]


function TodoItem({todo}:{todo:Todo}){
    // const dispatch = useAppDispatch();
    const router = useRouter();

    return(
        <Card className={"w-[300px] lg:w-[330px]  "}>
            <CardBody className={"flex flex-row gap-4"}>
                    <Checkbox isSelected={todo.completed}/>
                    <p className={"text-blue-500  font-mono text-start"} onClick={()=> router.push(`/todos/${todo.id}`)}>{todo.todo}</p>
                    <Button
                        isIconOnly
                        size={"sm"}
                        color={"danger"}
                        className={"ml-auto my-auto"}
                    >
                        <MdDelete size={"24px"}/>
                    </Button>

            </CardBody>
        </Card>
    )
}


export default function TodosApiPage() {
    const [numberOfQuotes, setNumberOfQuotes] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const total = 254;

    // Using a query hook automatically fetches data and returns query values


    const {data, isError, isLoading, isSuccess, isFetching} =
        useGetTodosQuery({limit:numberOfQuotes,skip:(currentPage -1 ) * numberOfQuotes});

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
                {isFetching && (
                    <>
                        <Card className="w-[300px] lg:w-[330px] space-y-5 p-4" radius="lg">
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"/>
                                </Skeleton>
                            </div>
                        </Card>

                        <Card className="w-[300px] lg:w-[330px] space-y-5 p-4" radius="lg">
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"/>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"/>
                                </Skeleton>
                            </div>
                        </Card>

                    </>
                )}

                {!isFetching && data.todos.map((todo: Todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}

                <Pagination initialPage={1} total={Math.ceil(total / numberOfQuotes)} showControls
                            onChange={setCurrentPage}/>
            </div>
        )

    }
}