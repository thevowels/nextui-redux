"use client"
import {useParams} from "next/navigation";
import {useGetTodoByIdQuery} from "@/lib/features/todo/todosApiSlice";
import {Card, CardBody, Checkbox} from "@nextui-org/react";

export default function Page() {
    const { id } = useParams();
    const {data, isError, isLoading, isSuccess, isFetching} =
        useGetTodoByIdQuery(id,{
            pollingInterval: 60000,
        });
    if(isError) {
        return(
            <div>
                Error...
            </div>
        )
    }
    if(isLoading) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    console.log(`Detail Page,${id}`);
    if(isSuccess) {
        console.log("Success", data);
        return(
            <div className="text-center">
                Todo Detail Page
                <Card>
                    <CardBody className={"flex flex-row"}>
                        <Checkbox isSelected={data.completed}/>
                        {data.todo}
                    </CardBody>
                </Card>
            </div>
        )

    }
}