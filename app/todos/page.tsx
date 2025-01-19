import TodosApiPage from "@/app/todos/TodosApiPage";
import AllTodos from "@/app/components/todos/AllTodos";

export default function Page(){
    return(
        <div>
            <TodosApiPage/>
            <AllTodos/>
        </div>
    )
}