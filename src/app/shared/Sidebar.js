import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  // Dropdown 
} from 'react-bootstrap';
// import { Trans } from 'react-i18next';

import { compose } from "redux"
import { connect } from 'react-redux';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/prices', state: 'pricesOpen' },
      { path: '/agents', state: 'agentsOpen' },
      { path: '/create-agent', state: 'agentsOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/assets', state: 'assetsMenuOpen' },
      { path: '/add-assets', state: 'assetsMenuOpen' },
      { path: '/rates', state: 'ratesOpen' },
      { path: '/create-rate', state: 'ratesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/building.png')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    {/* <Trans> */}
                    {this.props.companyName}
                    {/* </Trans> */}
                  </h5>
                  <span>
                    {/* <Trans> */}
                    Verified
                    {/* </Trans> */}
                  </span>
                </div>
              </div>
              {/* <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              {/* <Trans> */}
              Navigation
              {/* </Trans> */}
            </span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span> 
              <span className="menu-title">
                {/* <Trans> */}
                Dashboard
                {/* </Trans> */}
              </span>
            </Link>
          </li>
          <li className={this.isPathActive('/requests') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/requests">
              <span className="menu-icon"><i className="mdi mdi-tag-multiple"></i></span>
              <span className="menu-title">
                {/* <Trans> */}
                Request
                {/* </Trans> */}
              </span>
            </Link>
          </li>
          <li className={this.isPathActive('/profile') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/profile">
              <span className="menu-icon"><i className="mdi mdi-face-profile"></i></span>
              <span className="menu-title">
                {/* <Trans> */}
                Profile
                {/* </Trans> */}
              </span>
            </Link>
          </li>

          <li className={this.isPathActive('/rates') || this.isPathActive('/add-rates') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.ratesOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('ratesOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-cash-multiple"></i>
              </span>
              <span className="menu-title">
                {/* <Trans> */}
                Delivery Rates 
                {/* </Trans>s */}
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.ratesOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className={this.isPathActive('/rates') ? 'nav-link active' : 'nav-link'} to="/rates">
                      {/* <Trans> */}
                      Manage Delivery Rates 
                      {/* </Trans> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={this.isPathActive('/create-rate') ? 'nav-link active' : 'nav-link'} to="/create-rate">
                      {/* <Trans> */}
                      Add New Delivery Rates 
                      {/* </Trans> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className={this.isPathActive('/agents') || this.isPathActive('/create-agent') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.agentsOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('agentsOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-cash-multiple"></i>
              </span>
              <span className="menu-title">
                {/* <Trans> */}
                Agents
                {/* </Trans>s */}
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.agentsOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className={this.isPathActive('/agents') ? 'nav-link active' : 'nav-link'} to="/agents">
                      {/* <Trans> */}
                      Manage Agents
                      {/* </Trans> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={this.isPathActive('/create-agent') ? 'nav-link active' : 'nav-link'} to="/create-agent">
                      {/* <Trans> */}
                      Add New Agent
                      {/* </Trans> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className={this.isPathActive('/assets') || this.isPathActive('/add-assets') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.assetsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('assetsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-bank"></i>
              </span>
              <span className="menu-title">
                {/* <Trans> */}
                Assets
                {/* </Trans>s */}
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.assetsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className={this.isPathActive('/assets') ? 'nav-link active' : 'nav-link'} to="/assets">
                      {/* <Trans> */}
                      Manage Assets
                      {/* </Trans> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={this.isPathActive('/add-assets') ? 'nav-link active' : 'nav-link'} to="/add-assets">
                      {/* <Trans> */}
                      Add New Assets
                      {/* </Trans> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className={this.isPathActive('/customer-reviews') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/customer-reviews">
              <span className="menu-icon"><i className="mdi mdi-star"></i></span>
              <span className="menu-title">
                {/* <Trans> */}
                Reviews
                {/* </Trans> */}
              </span>
            </Link>
          </li>

          <li className={this.isPathActive('/payments') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/payments">
              <span className="menu-icon"><i className="mdi mdi-coin"></i></span>
              <span className="menu-title">
                {/* <Trans> */}
                Payments
                {/* </Trans> */}
              </span>
            </Link>
          </li>

          <li className={this.isPathActive('/progress') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/progress">
              <span className="menu-icon"><i className="mdi mdi-album"></i></span>
              <span className="menu-title">
                {/* <Trans> */}
                Progress
                {/* </Trans> */}
              </span>
            </Link>
          </li>





          {/* <li className={this.isPathActive('/prices') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.pricesOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('pricesOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-cash-multiple"></i>
              </span>
              <span className="menu-title"><Trans>Prices</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.pricesOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/prices') ? 'nav-link active' : 'nav-link'} to="/prices"><Trans>Overview</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/prices/manage') ? 'nav-link active' : 'nav-link'} to="/prices/manage"><Trans>Manage Prices</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}
          {/* <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title"><Trans>Assets</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Agents</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title"><Trans>History</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Settlements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>Stats & Analytics</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/login') ? 'nav-link active' : 'nav-link'} to="/login"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/register') ? 'nav-link active' : 'nav-link'} to="/register"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/report') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/report">
              <span className="menu-icon"><i className=" mdi mdi-block-helper"></i></span>
              <span className="menu-title"><Trans>Report</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/help') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/help">
              <span className="menu-icon"><i className=" mdi mdi-help-circle"></i></span>
              <span className="menu-title"><Trans>Help & Support</Trans></span>
            </Link>
          </li> */}
          <li className="nav-item nav-category">
            <span className="nav-link">
              {/* <Trans> */}
              version 1.0
              {/* </Trans> */}
            </span>
          </li>
        </ul>
      </nav>
    );
  }

}

const mapStateToProps = (state) => ({
  companyName: state.authReducer.user.name,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Sidebar);