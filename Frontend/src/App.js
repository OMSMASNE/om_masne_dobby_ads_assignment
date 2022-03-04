import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Homepage from './components/Homepage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Main from './components/Main';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        {
                            check_auth() ? 
                            <Route path="/main" element={<Main />} />
                            :
                            <Route path="/login" element={<Login />} />
                        }
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

function check_auth()
{
    let auth_cookie = getCookie('auth');

    if(auth_cookie === "" || auth_cookie === "0")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export default App;
