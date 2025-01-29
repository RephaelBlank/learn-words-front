import { useState } from 'react';
import NewClass from './newClass';

function CreateClassManager({ onClassCreated }) {
    const [isCreatingClass, setIsCreatingClass] = useState(false); 
  
    const openClassCreator = () => {
      setIsCreatingClass(true); 
    };
  
    const closeClassCreator = () => {
      setIsCreatingClass(false); 
    };

    const classCreated = () => {
        onClassCreated(); 
    }
  
    return (
      <div>
        {!isCreatingClass ? (
          <>
            <button onClick={openClassCreator}>Create New Class</button>
          </>
        ) : (
          <NewClass onClose={closeClassCreator} onClassCreated={classCreated} />
        )}
      </div>
    );
  }
  
  export default CreateClassManager;