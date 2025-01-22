"use client"
import {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import { useAddTodoMutation, Todo} from "@/lib/features/todo/todosApiSlice";

export default function TodoInput() {
    const [todoText, setTodoText ] = useState("");
    const [addTodoApi, addTodoResult ] = useAddTodoMutation();

    function addTodoHandler() {
        let todo: Partial<Todo> = {
            todo:todoText,
            completed: false,
            userId:43
        }
        if(todoText!=""){
            console.log('Handling todo : ', todoText);
            addTodoApi(todo)
                .unwrap()
                .then(result => {
                    console.log('returned value ', result);
                })
            setTodoText("");
        }
    }
    return(
        <div className={"flex flex-row gap-8 flex-wrap w-[300px] lg:w-[330px] "}>
            <Input label="Todo"
                   type="text"
                   size={"sm"}
                   className={"max-w-52"}
                   value={todoText}
                   onValueChange={setTodoText}
            />
            <div className={"my-auto text-right content-end lg:w-auto w-full"}>
                <Button size={"sm"} className={"my-auto "}  onPress={addTodoHandler}>Add</Button>

            </div>
        </div>
    )
}