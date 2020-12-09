import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { AppApi, GreetingRequest } from '@yktakaha4/sample-backend-client'
interface AppState {
  lastName: string
  firstName: string
  message: string
}

type AppAction = {type: 'UPDATE_LAST_NAME'; value: string} | {type: 'UPDATE_FIRST_NAME'; value: string} | {type: 'UPDATE_MESSAGE', value: string};

const api = new AppApi()

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'UPDATE_LAST_NAME':
      return {...state, lastName: action.value};
    case 'UPDATE_FIRST_NAME':
      return {...state, firstName: action.value};
    case 'UPDATE_MESSAGE':
      return {...state, message: action.value}
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    lastName: '',
    firstName: '',
    message: ''
  });

  const [greetingRequest, setGreetingRequest] = useState({
    lastName: '',
    firstName: ''
  } as GreetingRequest);

  useEffect(() => {
    if (greetingRequest.firstName !== '' && greetingRequest.lastName !== '') {
      api.greet(greetingRequest).then((axiosResponse) => {
        const {message} = axiosResponse.data;
        dispatch({ type: 'UPDATE_MESSAGE', value: message });
      }).catch((error) => {
        dispatch({ type: 'UPDATE_MESSAGE', value: `エラーが発生しました...(${error})` });
      })
    }
  }, [greetingRequest])

  return (
    <div className='App'>
      <input placeholder='苗字' onChange={(event) => dispatch({type: 'UPDATE_FIRST_NAME', value: event.target.value})} />
      <input placeholder='名前' onChange={(event) => dispatch({type: 'UPDATE_LAST_NAME', value: event.target.value})} />
      <button onClick={() => setGreetingRequest({ lastName: state.lastName, firstName: state.firstName })}>挨拶する</button>
      <div>メッセージ: {state.message}</div>
    </div>
  );
}

export default App;
