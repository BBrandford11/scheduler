import React from "react";

function Empty(prop) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={prop.onAdd}
      />
    </main>
  );
}

export default Empty;
