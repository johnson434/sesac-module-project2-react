import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useState } from 'react';

const URL = "http://www.test.com/api";
// const URL = "http://0.0.0.0:9000";

function App() {
  const [apiStatusCode, setApiStatusCode] = useState();
  const [inputValue, setInputValue] = useState('');  // 구구단 입력 값을 관리할 상태
  const [multiplicationResult, setMultiplicationResult] = useState([]);  // 구구단 결과를 저장할 상태

  // 구구단 값을 입력하고 결과를 받아오는 함수
  const getRoot = async () => {
    if (!inputValue) {
      alert("구구단 숫자를 입력하세요.");
      return;
    }

    try {
      const response = await axios.get(`${URL}/calculator`, {
        params: { number: inputValue }  // 숫자를 입력으로 서버에 전달
      });

      setApiStatusCode(response.status);
      if (response.data.result == undefined) {
        return;
      }
      setMultiplicationResult(response.data.result);  // 결과 리스트를 저장
    } catch (error) {
      console.log("catch문");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ marginTop: "20px" }}>
          <h1>황인규</h1>
          <h3>구구단 계산기</h3>
          <input
            type="number"
            placeholder="숫자를 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
          />
          <button
            onClick={getRoot}
            style={{
              padding: '10px 20px',
              backgroundColor: '#61dafb',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'white'
            }}
          >
            계산하기
          </button>
        </div>

        {multiplicationResult.length > 0 && (
          <div style={{ marginTop: '20px', fontSize: '18px', color: '#61dafb' }}>
            <h4>구구단 결과:</h4>
            <ul>
              {multiplicationResult.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <span>Response Status Code: {apiStatusCode}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
