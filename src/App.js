import data from './data.json';
import './App.css';

function App() {

  const compareNumbers = (a, b) => {
    if (data[a].sortOrder < data[b].sortOrder)
      return 1;
    if (data[a].sortOrder > data[b].sortOrder)
      return -1;
  }

  const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(content, null, 2)], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const sortedRecievedArray = Object.keys(data).sort(compareNumbers)
  const arrayForExport = sortedRecievedArray.reduce((acc, cur) => {
    const newItem = {
      id: cur,
      name: data[cur].name,
      sortOrder: data[cur].sortOrder,
      color: data[cur].style.color
    }
    acc.push(newItem)
    return acc
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {sortedRecievedArray.map(elem => {
          return (<p key={data[elem].sortOrder} style={data[elem].style}>
            {`${elem}:${data[elem].name}`}</p>)
        })}
        <button onClick={
          () => download(arrayForExport, 'modified-data.json', 'text/plain')}>
          Donwload</button>
      </header>
    </div>
  );
}

export default App;
