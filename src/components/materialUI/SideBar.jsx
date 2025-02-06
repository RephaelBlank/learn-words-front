import { Box, Typography } from '@mui/material';

const SideBar = ({ content, width = 240, position = 'left' }) => {

  const borderStyle =
    position === 'left'
      ? { borderRight: '1px solid #ddd' }
      : { borderLeft: '1px solid #ddd' };

  return (
    <Box
      sx={{
        width,
        minWidth: width, // להבטיח שהרוחב לא יהיה פחות מהערך הזה
        flexShrink: 0, // מונע כיווץ
        backgroundColor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0,
        ...borderStyle,
      }}
    >
      {content || <Typography>A</Typography>}
    </Box>
  );
};

export default SideBar;