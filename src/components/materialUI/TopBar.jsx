import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = ({ content, height = 64 }) => {
  return (
    <AppBar position="static" sx={{ height, m: 0 }}>
      <Toolbar sx={{ minHeight: height, m: 0, p: 0 }}>
        {content || <Typography variant="h6"></Typography>}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;