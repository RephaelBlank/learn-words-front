import { Box, Button, Typography } from '@mui/material';

const SideBar = ({header, menuItems =[], width = 240, position = 'left' }) => {

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
        flexDirection: 'column',   // סידור אנכי של הפריטים
        alignItems: 'center',  // מיקום הפריטים בתחילת השורה (צמוד לשמאל)
        justifyContent: 'flex-start', // התחלת התוכן מלמעלה
        m: 0,
        p: 2,
        ...borderStyle,
      }}
    >
        {header && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {header}
        </Typography>
      )}
      {Array.isArray(menuItems) && menuItems.map((item, index) => (
        <Button
          key={index}
          fullWidth
          variant="contained" color='primary'
          onClick={item.onClick}
          sx={{ justifyContent: 'center', mb: 3 }} // מונע מרכזת הטקסט ומניח רווח בין הכפתורים
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default SideBar;