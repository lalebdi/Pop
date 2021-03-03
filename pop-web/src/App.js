import { useEffect, useState } from 'react';
import './App.css';
import { Tweet } from './tweets'

function loadTweets(callback){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://127.0.0.1:8000/api/tweets/'
  const responseType = "json"

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
  callback(xhr.response, xhr.status)
  }
  xhr.onerror = function(e) {
    console.log(e)
    callback({"message": "The request encoutered an error"}, 400)
  }
  xhr.send()

  }

function App() {
  const [ tweets, setTweets ] = useState([])

  useEffect(() => {
    const myCallback = (response, status) =>{
      // console.log(response, status)
      if (status === 200){
        setTweets(response)
      }
    }
    loadTweets(myCallback)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((item, index)=>{
            return <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark'/>
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
