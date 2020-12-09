import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { AppApi, EmptyNameErrorParameterEnum, EmptyNameErrorTypeEnum, GreetRequest, GreetResponse, VulgarNameErrorParameterEnum, VulgarNameErrorTypeEnum } from '@yktakaha4/sample-backend-client'
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
  } as GreetRequest);

  const dispatchResponse = (response: GreetResponse) => {
    if (response.message) {
      dispatch({ type: 'UPDATE_MESSAGE', value: response.message });
    } else {
      const messages: Array<string> = [];
      for (const error of response.errors) {
        if (error.type === EmptyNameErrorTypeEnum.EmptyNameError) {
          if (error.parameter === EmptyNameErrorParameterEnum.LastName) {
            messages.push('・名前は空にできません');
          } else if (error.parameter === EmptyNameErrorParameterEnum.FirstName) {
            messages.push('・苗字は空にできません');
          }
        } else if (error.type === VulgarNameErrorTypeEnum.VulgarNameError) {
          if (error.parameter === VulgarNameErrorParameterEnum.LastName) {
            messages.push(`・名前に ${error.vulgarWord} は設定できません`);
          } else if (error.parameter === VulgarNameErrorParameterEnum.FirstName) {
            messages.push(`・苗字に ${error.vulgarWord} は設定できません`);
          }
        }
      }

      dispatch({ type: 'UPDATE_MESSAGE', value: messages.join('') });
    }
  };

  useEffect(() => {
    api.greet(greetingRequest).then((axiosResponse) => {
      dispatchResponse(axiosResponse.data);
    }).catch((error) => {
      dispatch({ type: 'UPDATE_MESSAGE', value: String(error) });
    });
  }, [greetingRequest])

  return (
    <div className='App'>
      <input placeholder='Last Name' onChange={(event) => dispatch({type: 'UPDATE_LAST_NAME', value: event.target.value})} />
      <input placeholder='First Name' onChange={(event) => dispatch({type: 'UPDATE_FIRST_NAME', value: event.target.value})} />
      <button onClick={() => setGreetingRequest({ lastName: state.lastName, firstName: state.firstName })}>Greet</button>
      <div>Message: {state.message}</div>
    </div>
  );
}

export default App;
