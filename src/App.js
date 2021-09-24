import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const AddWord = ({addWord}) => {
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
        <Button variant="primary" onClick={addClickHandler}>Add Word</Button>
      </td>
    </tr>
  );
};

function App() {
  const [words, setWords] = useState([
    { enInfinitive: "to walk", esInfinitive: "caminar" },
    { enInfinitive: "to fly", esInfinitive: "volar" },
  ]);

  const addWord = (word) => {
    setWords(words.concat(word))
  } 

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
              <td></td>
            </tr>
          ))}
          <AddWord addWord={addWord}/>
        </tbody>
      </table>
    </div>
  );
}

export default App;
