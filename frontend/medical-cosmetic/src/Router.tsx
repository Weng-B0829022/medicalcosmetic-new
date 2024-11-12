// components/ProtectedRoute.tsx

import { createBrowserRouter } from 'react-router-dom';
import { Home, Dashboard, Discover, History, Setting, Login, MyReserve, Contect } from './pages';
import { useAuthStore } from './stores/auth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
};

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,  // 公開頁面
    }, 
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute >
                <Dashboard isClinic={true}/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/discover',
        element: (
            <ProtectedRoute>
                <Discover />
            </ProtectedRoute>
        ),
    },
    {
        path: '/contect',
        element: <Contect />,  // 公開頁面
    },
    {
        path: '/history',
        element: (
            <ProtectedRoute>
                <History />
            </ProtectedRoute>
        ),
    },
    {
        path: '/setting',
        element: (
            <ProtectedRoute>
                <Setting />
            </ProtectedRoute>
        ),
    },
    {
        path: '/login',
        element: <Login />,  // 公開頁面
    },
    {
        path: '/my-reserve',
        element: (
            <ProtectedRoute>
                <MyReserve />
            </ProtectedRoute>
        ),
    },
    {
        path: '/unauthorized',
        element: (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">401</h1>
                <p className="text-xl">未授權訪問</p>
            </div>
        ),
    },
    {
        path: '*',
        element: (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">此頁面不存在</p>
            </div>
        ),
    },
]);

export default Router;