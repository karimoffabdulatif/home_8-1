import { useState } from "react"
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
const TodoModal = (props) => {
const {todos, setTodos, task} = props
const [form, SetForm] = useState({})
const single_task = todos.filter((item)=>item.status == task.status)
const handleChange = (e)=>{
    const {name, value} = e.target
    SetForm({...form, [name]: value})
}
const handleSubmit = (e) => {
    e.preventDefault();
    if(task.status) {
        const newTodos = [...todos];
        newTodos.forEach((item)=> {
            if(item.status === task.status) {
                item.elements.splice(task.index, 1);
            }
        });
        let targetList = newTodos.find((item) => item.status === form.status);
        console.log(targetList, "target");
        targetList.elements.push({ title: form.task });
        setTodos(newTodos);
        props.toggle();
    } else{
        todos.forEach((item) => {
            if (item.status === form.status) {
                item.elements.push({ title: form.task });
            }
        });
        setTodos([...todos])
    }
    props.toggle();
};
  return (
    <Modal isOpen={props.open} toggle={props.toggle}>
        <ModalHeader>
            <h1 className="text-center">Add task</h1>
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit} id="submit">
                <input type="text" placeholder="Task" name="task" defaultValue={single_task[0]?.elements[task.index]?.title} className="form-control my-2" onChange={handleChange}/>
                <select defaultValue={task.status} onChange={handleChange} className="form-control my-2" name="status">
                    <option value="open">open</option>
                    <option value="pending">pending</option>
                    <option value="inproge">inproge</option>
                    <option value="complete">complete</option>
                </select>
            </form>
        </ModalBody>
        <ModalFooter>
            <button onClick={handleSubmit} className="btn btn-success">add</button>
        </ModalFooter>

    </Modal>
  )
}

export default TodoModal