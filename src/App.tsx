import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { ConnectedRouter } from 'connected-react-router';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { history } from 'utils/history';
import './App.css';

function App() {
    const theme = createTheme()
    return (
        <ConnectedRouter history={history}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/admin/dashboard" />
                    </Route>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                    <PrivateRoute path='/admin'>
                        <AdminLayout />
                    </PrivateRoute>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </ThemeProvider>
        </ConnectedRouter>
    );
}

export default App;
