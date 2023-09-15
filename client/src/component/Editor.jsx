import { useEffect, useState } from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { Box, Button } from '@mui/material';
import styled from '@emotion/styled';

import { io } from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const { id } = useParams();

const Component = styled.div`
    background: #F5F5F5;
`

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


const Editor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions } });
        quillServer.disable();
        quillServer.setText('Loading the document...');
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        // Disconnect the socket when the route changes
        return () => {
            socket && socket.disconnect();
        };
    }, [socket, location]);

    useEffect(() => {
        const socketServer = io('http://localhost:9000');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return;

            socket.emit('send-changes', delta);
        }

        quill && quill.on('text-change', handleChange);

        return () => {
            quill && quill.off('text-change', handleChange);
        }
    }, [quill, socket])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            quill.updateContents(delta);
        }

        socket && socket.on('receive-changes', handleChange);

        return () => {
            socket && socket.off('receive-changes', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        socket && socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        })

        socket && socket.emit('get-document', id);
    }, [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill]);

    useEffect(() => {
        // Create a new socket connection
        const socket = io('http://localhost:9000');
        const disconnectSocket = (socket) => {
            if (socket) {
                socket.disconnect();
            }
        };
        // Your existing code for handling socket events...

        // Return a cleanup function that disconnects the socket when the component unmounts
        return () => {
            disconnectSocket(socket);
        };
    }, []); // Empty dependency array to run this effect only once


    return (
        <Component>
            <Button onClick={handleLogout}> Logout </Button>
            <Box className='container' id='container'></Box>
        </Component>
    )
}

export default Editor;