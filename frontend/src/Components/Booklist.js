import React from "react";

const Booklist = (props) => {
  const { book, setBook, books, setListUpdated } = props;

  const handleDelete = (id) => {
    const getBooks = async () => {
      const res = await fetch(`http://localhost:8411/api/${id}`, {
        method: "DELETE",
      });
      const data = await res.text();
      console.log(data);
    };
    getBooks();
    setListUpdated(true);
  };

  let { titulo, autor, edicion } = book;

  const handleUpdate = (id) => {
    edicion = parseInt(edicion, 10);

    //Validacion de datos:

    if (titulo === "" || autor === "" || edicion <= 0) {
      alert("Campos obligatorios");
      return;
    }

    const getBooks = async () => {
      const res = await fetch(`http://localhost:8411/api/${id}`, {
        method: "PUT",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.text();
      console.log(data);
    };
    getBooks();

    //Reiniciando state del libro
    setBook({
      titulo: "",
      autor: "",
      edicion: 0,
    });
    setListUpdated(true);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Edicion</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.titulo}</td>
                <td>{book.autor}</td>
                <td>{book.edicion}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(book.id);
                    }}
                    className="delete-btn"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleUpdate(book.id);
                    }}
                    className="edit-btn"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Booklist;
