function ClassesList({ classes, onSelectClass }) {

  if (classes.length === 0){
    return <>No classes exist yet.</>
  }
    return (
      <ul>
        {classes.map((cls) => (
          <li key={cls.classID}>
            <button onClick={() => onSelectClass(cls)}>{cls.className}</button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default ClassesList;