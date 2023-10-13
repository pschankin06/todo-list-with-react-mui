import { Typography } from "@mui/material";
import List from '@mui/material/List';

export default function TaskList({
    status,
    tasks,
    children
}) {
    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '166%',
                    letterSpacing: '0.4px',
                    color: 'rgba(0, 0, 0, 0.60)',
                    textAlign: 'center'
                }}>
                {status} ({tasks.length})
            </Typography >
            <List>
                {children}
            </List>
        </>
    );
}