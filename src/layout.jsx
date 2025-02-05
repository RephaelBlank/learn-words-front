import { Box } from '@mui/material';
import TopBar from './components/materialUI/TopBar';
import SideBar from './components/materialUI/SideBar';
import MainContent from './components/materialUI/MainContent';


const Layout = ({ topContent, leftContent, mainContent }) => {
  const topBarHeight = 64;
  const sideBarWidth = 240;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        m: 0,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar content={topContent} height={topBarHeight} />

    
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          m: 0,
          p: 0,
        }}
      >
        <SideBar content={leftContent} width={sideBarWidth} position="left" />

        <MainContent content={mainContent} />

      </Box>
    </Box>
  );
};

export default Layout;