import React from 'react';

import { Box } from '@mui/material';

const MainContent = ({ children }) => {
    let items = React.Children.toArray(children)
    .flatMap(child => child.props?.children ?? child);
  
  if (!Array.isArray(items)) {
    items = [items];
  }
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 2,
        backgroundColor: 'grey.100',
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            border: '3px solid gray',
            borderRadius: '16px',
            padding: 2,
            minWidth: '200px',
            maxWidth: '500px', // מגביל את הגודל של כל פריט
          textAlign: 'center',
          flexGrow: 1, // מאפשר התרחבות גמישה אבל לא מעבר ל-maxWidth
          flexBasis: '250px', // מגדיר בסיס לכל פריט כדי לשמור על סדר
          overflow: 'hidden', // חותך טקסט שחורג
    whiteSpace: 'nowrap', // מונע ירידת שורה
    textOverflow: 'ellipsis', // מציג "..."
    wordBreak: 'break-word', // שובר מילים ארוכות מדי
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default MainContent;
