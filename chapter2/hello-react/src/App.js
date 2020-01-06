import React from 'react';
import './App.css';

function App() {
  //const name = '뤼왝트';
  //return <div> { name === '리액트' && <h1>리액트입니다.</h1> } </div>   // && 은 앞에 꺼가 참이면 뒤에 꺼 출력

//  const name = undefined;
//  return <div> {name || '리액트'}</div> //  || 은 앞에꺼가 undefined 면 뒤에꺼를 보여줌

  const name = '리액트';
//  const style = {
//    backgroundColor: 'black',
//    color: 'aqua',
//    fontSize: '48px',
//    padding: 16
//  };
//  return <div style={style}>{name}</div>

//    return (
//      <div
//        style={{
//          backgroundColor: 'black',
//          color: 'aqua',
//          fontSize: '48px',
//         fontWeight: 'bold',
//          padding: 16
//        }}
//        >
//          {name}
//        </div>
//    )

//      return <div className="react">{name}</div>
    
    return (
      <>
        {/* 주석은 이렇게 작성합니다. */}
        <div 
          className="react" // 시작 태그를 여러 줄로 작성하게 된다면 여기에 주석을 작성할 수 있습니다.
        >
          {name}
        </div>
        // 하지만 이런 주석이나
        /* 이런 주석은 페이지에 그대로 나타나게 됩니다. */
        <input />
      </>
    )
}

export default App;
