import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskaStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    function removeTask(id: string, todoListId: string) {

        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        // debugger
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }


    }


    function changeFilter(value: FilterValuesType, tlId: string) {
        console.log("tlId", tlId)

        let index = todoLists.find(tl => tl.id === tlId);
        if (index) {
            index.filter = value;
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to bye", filter: "active"}
    ])


    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }
    let [tasksObj, setTasks] = useState<TaskaStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "JS", isDone: true},

        ]
    })

    function addTodoList(title: string) {
        let newTododListId = v1()
        let newTodoList: TodoListType = {
            id: newTododListId,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasksObj, [newTododListId]: []
        })
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {

                todoLists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];


                    if (tl.filter === "active") {


                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);

                    } else if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                    />
                })
            }

        </div>
    );
}

export default App;
