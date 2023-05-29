import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import MainRouter from './components/MainRouter';
import TodoList from './pages/TodoList';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute Component={Home} />} />
      <Route exact path='/:id' element={<PrivateRoute Component={TodoList} />} />
      <Route exact path="/register" element={<MainRouter Component={Register} />} />
      <Route exact path="/login" element={<MainRouter Component={Login} />} />
    </Routes>
  );
}

export default App;
