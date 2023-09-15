
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';

import Editor from './component/Editor';
import Register from './component/Register';
import Login from './component/Login';
import LandingPage from './component/LandingPage'; // Import the LandingPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Add the landing page */}
        <Route path="/docs/:id" element={<Editor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;


















// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';


// import Editor from './component/Editor';
// import Register from './component/Register'; // Import the Register component
// import Login from './component/Login'; // Import the Login component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} />
//         <Route path='/docs/:id' element={<Editor />} />
//         <Route path='/register' element={<Register />} /> {/* Add registration route */}
//         <Route path='/login' element={<Login />} /> {/* Add login route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// import './App.css';

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';

// import Editor from './component/Editor';

// import Register from './component/Register';
// import Login from './component/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} />
//         <Route path='/docs/:id' element={<Editor />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/login' element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// import './App.css';

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';

// import Editor from './component/Editor';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} />
//         <Route path='/docs/:id' element={<Editor />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

