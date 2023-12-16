import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { publicRoutes } from './routes';
import SpotifyProvider from '~/Provider/SpotifyProvider';
import PlaybackProvider from './Provider/PlaybackProvider';

function App() {
    return (
        <SpotifyProvider>
            <BrowserRouter>
                <PlaybackProvider>
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
                </PlaybackProvider>
            </BrowserRouter>
        </SpotifyProvider>
    );
}

export default App;
