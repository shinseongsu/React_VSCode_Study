import React, { useState } from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&apiKey=8a147b4fa88f4db79ede8d012d14be92'
      );
      setData(response.data);
    } catch(e) {
      console.log(e);
    }
  };
  return (
    <div>
      <NewsList />
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true} />}
    </div>
  );
};

export default App;
