import { Button, List, ListItem, ListItemText } from "@mui/material";

function ClassesList({ classes, onSelectClass }) {

  if (classes.length === 0){
    return <>No classes exist yet.</>
  }
  return (
    <List>
      {classes.map((cls) => (
        <ListItem key={cls.classID} divider>
          <Button 
            onClick={() => onSelectClass(cls)} 
            variant="contained" 
            color="primary"
            fullWidth
          >
            <ListItemText primary={cls.className} />
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
  
  export default ClassesList;