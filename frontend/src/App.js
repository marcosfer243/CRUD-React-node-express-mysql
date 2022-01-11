import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Booklist from "./Components/Booklist";
import Form from "./Components/Form";

function App() {
  const url = "http://localhost:8411/api";

  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    edicion: 0,
  });

  const [books, setBooks] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    /*const getBooks = () => {
      fetch(url)
      .then(res => res.json())
      .then(res => setBooks(res))
    }*/
    const getBooks = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    };
    getBooks();
    setListUpdated(false);
  }, [listUpdated]);

  return (
    <Fragment>
      <Navbar brand="Library App" />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{ textAlign: "center" }}>Book List</h2>
            <Booklist
              book={book}
              setBook={setBook}
              books={books}
              setListUpdated={setListUpdated}
            />
          </div>
          <div className="col-5">
            <h2 style={{ textAlign: "center" }}>Book Form</h2>
            <Form book={book} setBook={setBook} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
