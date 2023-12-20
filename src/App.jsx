import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { publicRoutes } from './routes';
import SpotifyProvider from '~/Provider/SpotifyProvider';

function App() {
    return (
        <SpotifyProvider>
            <BrowserRouter>
                    <MainLayout>
                        <Routes>
                            {publicRoutes.map((item, index) => {
                                const Component = item.element;
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={<Component />}
                                    />
                                );
                            })}
                        </Routes>
                    </MainLayout>
            </BrowserRouter>
        </SpotifyProvider>
    );
}

export default App;
