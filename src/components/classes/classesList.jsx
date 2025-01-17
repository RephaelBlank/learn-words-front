function ClassesList({ classes, onSelectClass }) {
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