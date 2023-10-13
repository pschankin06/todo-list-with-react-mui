import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import {  TasksDispatchContext } from '../../utils/tasksContext';

export default function TaskInput({
    task,
    onClick
}) {
    const [taskText, setTaskText] = useState(task.text);
    const dispatch = useContext(TasksDispatchContext);
    return (
        <Box
            onSubmit={(e) => {
                e.preventDefault();
                onClick();
                dispatch({
                    type: 'changed',
                    task: {
                        ...task,
                        text: taskText
                    }
                });
            }}
            component='form'
            noValidate
            autoComplete="off"
        >
            <TextField
                fullWidth
                multiline
                id='standard-basic'
                label='Имя задачи'
                variant='standard'
                placeholder='Эта задача в процессе редактирования'
                onChange={(e) => setTaskText(e.target.value)}
                value={taskText}
                sx={{
                    mt: '12px',
                    mb: '12px',
                }}
                InputProps={
                    {
                        endAdornment: (
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="edited"
                                    color='primary'
                                    type='button'
                                    onClick={(e) => {
                                        onClick();
                                        dispatch({
                                            type: 'changed',
                                            task: {
                                                ...task,
                                                text: taskText
                                            }
                                        });
                                    }}
                                    disabled={!taskText.trim()}
                                >
                                    <DoneIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }
            />
        </Box>
    );
}