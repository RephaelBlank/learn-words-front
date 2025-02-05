import { Box, Typography } from '@mui/material';

const MainContent = ({ content }) => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 2,
      }}
    >
      {content || <Typography variant="h4"></Typography>}
    </Box>
  );
};

export default MainContent;