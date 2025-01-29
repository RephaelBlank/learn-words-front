import { useState } from 'react';
import NewClass from './newClass';

function CreateClassManager() {
    const [isCreatingClass, setIsCreatingClass] = useState(false); 
  
    const openClassCreator = () => {
      setIsCreatingClass(true); 
    };
  
    const closeClassCreator = () => {
      setIsCreatingClass(false); 
    };
  
    return (
      <div>
        {!isCreatingClass ? (
          <>
            <button onClick={openClassCreator}>Create New Class</button>
          </>
        ) : (
          <NewClass onClose={closeClassCreator} />
        )}
      </div>
    );
  }
  
  export default CreateClassManager;