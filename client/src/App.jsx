import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadExam from './pages/uploadExam';
import ExamList from './pages/ExamList';
import ExamDetail from './pages/ExamDetail';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <>
            <Navbar />
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/upload-exam' element={<UploadExam />} />
                <Route path='/exams' element={<ExamList />} />
                <Route path='/exam/:title' element={<ExamDetail />} />
            </Routes>
        </>
    );
};

export default App;
