"use client"
import {
    selectTodos,
    addTodo,
    deleteTodo,
    Todo, loadAllTodo
} from "@/lib/features/todo/todoSlice";
import { MdDelete } from "react-icons/md";

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input} from "@nextui-org/react";
import {useState, useEffect} from "react";

function TodoInput() {
    const dispatch = useAppDispatch();
    const [todoText, setTodoText ] = useState("");
    const todos: Todo[] = useAppSelector(selectTodos);

    function addTodoHandler() {
        let todo: Todo = {
            userId:1,
            id: todos[todos.length-1].id + 1,
            title: todoText,
            completed: false
        }
        if(todoText!=""){
            dispatch(addTodo(todo));
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

function TodoItem({todo}:{todo:Todo}){
    const dispatch = useAppDispatch();
    return(
          <Card className={"w-[300px] lg:w-[330px]  "}>
              <CardBody className={"flex flex-row justify-between gap-4"}>
                  <p className={"text-blue-500  font-mono"}>{todo.title}</p>
                  <Button
                      isIconOnly
                      size={"sm"}
                      color={"danger"}
                      onPress={() => dispatch(deleteTodo(todo.id))}>
                      <MdDelete size={"24px"}/>
                  </Button>
              </CardBody>
          </Card>
  )
}

export default function TodosPage(){
    const todos: Todo[] = useAppSelector(selectTodos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAllTodo());
    },[])


    return(
        <div className={"gap-4 flex flex-col text-center"}>
            <TodoInput/>
        {todos.map(todo => (<TodoItem key={todo.id} todo={todo}/>))}
    </div>)
}