import './App.css'
import './index.css'
import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router'
import Login from './Page/Login/Login'
import ErrorPage from './Page/Error/ErrorPage'
import Employee from './Page/Manager/Employee/Employee'
import EmployeeDetail from './Page/Manager/EmployeeDetail/EmployeeDetail'
import Profile from './Page/Manager/Profile/Profile'
import RiskEmployee from './Page/Manager/RiskEmployee/RiskEmployee'
import TimeSheet from './Page/Manager/TimeSheet/TimeSheet'
import ManageLeave from './Page/Manager/ManageLeave/ManageLeave'
import Report from './Page/Manager/Report/Report'
import EmployeeAdmin from './Page/Admin/Employee/Employee'
import RiskEmployeeSettings from './Page/Admin/EmployeeRiskSettings/EmployeeRiskSettings'
import TrackSettings from './Page/Admin/TrackSettings/TrackSettings'
import Holiday from './Page/Manager/Holiday/Holiday'
import ApplyLeave from './Page/Employee/ApplyLeave/ApplyLeave'

export const history = createBrowserHistory()

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                {/*Manager*/}
                <Route path="/Admin/Employee" exact component={EmployeeAdmin} />
                <Route path="/Admin/RiskEmployeeSettings" exact component={RiskEmployeeSettings} />
                <Route path="/Admin/TrackSettings" exact component={TrackSettings} />
                {/*Manager*/}
                <Route path="/Profile" exact component={Profile} />
                <Route path="/Employee" exact component={Employee} />
                <Route path="/Employee/Detail/:id" render={(props) => <EmployeeDetail {...props} />} />
                <Route path="/RiskEmployee" exact component={RiskEmployee} />
                <Route path="/TimeSheet" exact component={TimeSheet} />
                <Route path="/Report" exact component={Report} />
                <Route path="/ManageLeave" exact component={ManageLeave} />
                <Route path="/ManageHoliday" exact component={Holiday} />
                {/*Manager*/}
                <Route path="/ApplyLeave" exact component={ApplyLeave} />

                <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default App
