import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const AddWord = ({ addWord }) => {
  const [englishWord, setEnglishWord] = useState("");
  const [spanishWord, setSpanishWord] = useState("");

  const addClickHandler = () => {
    const newWord = {
      enInfinitive: englishWord,
      esInfinitive: spanishWord,
    };

    addWord(newWord);
  };

  return (
    <tr>
      <td>
        <input
          value={englishWord}
          onChange={(event) => setEnglishWord(event.target.value)}
          placeholder="English"
        ></input>
      </td>
      <td>
        <input
          value={spanishWord}
          onChange={(event) => setSpanishWord(event.target.value)}
          placeholder="Spanish"
        ></input>
      </td>
      <td>
        <Button variant="primary" onClick={addClickHandler}>
          Add Word
        </Button>
      </td>
    </tr>
  );
};

const DeleteButton = ({id, deleteWord}) => (
  <Button variant="danger" onClick={() => deleteWord(id)}>Delete</Button>
)

function App() {
  const [words, setWords] = useState([]);

  useEffect( () =>
    axios.get("/api/words").then((response) => {
      setWords(response.data);
    }),
    []
  );

  const addWord = (word) => {
    axios.post("/api/words",word).then((response) => {
      setWords(words.concat(word))
    }
    )
  };

  const deleteWord = (id) => {
    axios.delete(`/api/words/${id}`).then((response) => {
      setWords(words.filter(w => w.id !== id))
    }
    )
  };

  return (
    <div className="text-center">
      <h2 className="text-center">Words to practise</h2>
      <table className="table mx-auto w-auto">
        <thead>
          <tr>
            <th>English</th>
            <th>Español</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {words.map((w, i) => (
            <tr key={i}>
              <td>{w.enInfinitive}</td>
              <td>{w.esInfinitive}</td>
              <td><DeleteButton id={w.id} deleteWord={deleteWord}/></td>
            </tr>
          ))}
          <AddWord addWord={addWord} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
