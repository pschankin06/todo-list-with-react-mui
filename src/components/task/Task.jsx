import { useState} from "react";
import TaskInput from "../taskInput/TaskInput";
import TaskItem from "../taskItem/TaskItem";

export default function Task({
    task
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    let taskContent;

    function handleEditing() {
        setIsEditing(true);
    }

    function handleDone() {
        setIsEditing(false);
    }

    if (isEditing) {
        taskContent = <TaskInput
            task={task}
            onClick={handleDone}
        />;
    } else {
        taskContent = <TaskItem
            task={task}
            isHovered={isHovered}
            onEditClick={handleEditing}
            setIsHovered={setIsHovered}
        />;
    }
    return (
        taskContent
    );
}