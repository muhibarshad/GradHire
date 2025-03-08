import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import styles from './Modal.module.css';
import { Typography } from '@mui/material';

const Modal = (props) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        navigate('/dashboard');
    };

    return (
        <div>

            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                // onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className={styles.modalHeader}>
                    {"Test Status"}
                </DialogTitle>
                <DialogContent>

                    <Typography variant='h6' mt="10px" align='center'>Your test has <b> submitted</b></Typography>
                    <Typography variant='body2' align='center'>Result is given below:</Typography>

                    <table className={styles.tableStyle}>
                        <tbody>
                            <tr>
                                <th>
                                    Total Questions
                                </th>
                                <td>
                                    {props.result.totatQuestion}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Questions Attempted
                                </th>
                                <td>
                                    {props.result.answered}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Correct
                                </th>
                                <td>
                                    {props.result.correct}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Incorrect
                                </th>
                                <td>
                                    {props.result.incorrect}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Percentage
                                </th>
                                <td>
                                    {props.result.percentage}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" autoFocus onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modal;