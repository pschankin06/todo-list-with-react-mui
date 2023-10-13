import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { createSvgIcon } from '@mui/material/utils';
import Box from '@mui/material/Box';
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from '../../utils/tasksContext';
import useLocalStorage from '../../utils/useLocalStorage';

let nextId = JSON.parse(localStorage.getItem('nextId')) || 0;
const PlusIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none">
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            fill="#42A5F5" />
    </svg>
);

export default function AddTask() {
    const dispatch = useContext(TasksDispatchContext);
    const tasks = useContext(TasksContext);
    const initialText = tasks.length > 0 ? '' : 'Самая первая задача';
    const [text, setText] = useState(initialText);

    useLocalStorage('nextId', nextId);

    return (
        <Box
            onSubmit={(e) => {
                e.preventDefault();
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: text,
                });
                setText('');
            }}
            component='form'
            sx={{
                p: '12px',
                pl: 0,
                width: '100%',
            }}
            noValidate
            autoComplete="off"
        >
            <h1 className='todoHeading'>TODO</h1>
            <TextField
                fullWidth
                multiline
                id='standard-basic'
                label='Имя новой задачи'
                variant='standard'
                placeholder='Текст задачи'
                onChange={(e) => setText(e.target.value)}
                value={text}
                sx={{
                    mb: '36px',
                }}
                InputProps={
                    {
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{ mr: '-10px' }}>
                                <IconButton
                                    aria-label="add"
                                    type='submit'
                                    disabled={!text.trim()}>
                                    <PlusIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }
            />
        </Box >
    );
}