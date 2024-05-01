import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App'

const theme = createTheme({
    typography: {
        fontFamily: [
            'IRANSans',
        ].join(','),
    },});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // remove strictMode because of runing useEffect twice
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);