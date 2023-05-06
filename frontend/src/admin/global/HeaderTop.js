import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
//import sidebar hook
import { useProSidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';


const HeaderTop = () => {

    const { collapseSidebar } = useProSidebar();
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "#fafafa" }}>
                <Toolbar>
                    <IconButton onClick={() => collapseSidebar()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, color: '#1976d2' }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderTop;