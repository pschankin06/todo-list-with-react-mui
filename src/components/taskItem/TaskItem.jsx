import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { TasksDispatchContext } from '../../utils/tasksContext';

export default function TaskItem({
    task,
    onEditClick,
    isHovered,
    setIsHovered
}) {

    const dispatch = useContext(TasksDispatchContext);
    return (
        <>
            <ListItem
                disablePadding
                sx={{
                    ml: '-10px',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    mt: '10px',
                    mb: '10px',
                    width: '450px',
                }}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                secondaryAction={
                    isHovered &&
                    <InputAdornment
                        position="end"
                        sx={{ mr: '10px' }}>
                        {
                            !task.done && <IconButton
                                edge="end"
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={onEditClick}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        }
                        <IconButton
                            edge="end"
                            position='end'
                            aria-label="delete"
                            size="small"
                            color="warning"
                            onClick={() =>
                                dispatch({
                                    type: 'deleted',
                                    id: task.id,
                                })
                            }
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment >
                }
            >
                <ListItemButton >
                    <ListItemIcon>
                        <Checkbox
                            defaultChecked={task.done}
                            onChange={() =>
                                dispatch({
                                    type: 'changed',
                                    task: {
                                        ...task,
                                        done: !task.done,
                                        date: Date.now()
                                    }
                                })
                            }
                            sx={{
                                '& .MuiSvgIcon-root': {
                                    width: 20,
                                    htight: 20,
                                    mr: '5px'
                                }
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText primary={task.text} />
                </ListItemButton>
            </ListItem >
        </>
    );
}