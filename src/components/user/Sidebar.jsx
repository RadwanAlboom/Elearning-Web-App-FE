import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

//All the svg files
import logo from '../../assets/admin/logo.svg';
import Home from '../../assets/admin/home-solid.svg';
import Team from '../../assets/admin/social.svg';
import Exams from '../../assets/admin/sceduled.svg';
import contactUs from '../../assets/admin/inbox.svg';
import Documents from '../../assets/admin/draft.svg';
import userProfile from '../../assets/admin/settings.svg';

import { loadProfile } from '../../store/profile';
import auth from '../../services/authService';

const Container = styled.div`
    position: fixed;
    z-index: 100;

    .active {
        border-right: 4px solid var(--white);

        img {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
                brightness(103%) contrast(103%);
        }
    }
`;

const Button = styled.button`
    background-color: var(--black);
    border: none;
    outline: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0.5rem 0 0 0.5rem;
    cursor: pointer;
    z-index: 100000;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    &::before,
    &::after {
        content: '';
        background-color: var(--white);
        height: 2px;
        width: 1rem;
        position: absolute;
        transition: all 0.3s ease;
    }

    &::before {
        top: ${(props) => (props.clicked ? '1.5' : '1rem')};
        transform: ${(props) =>
            props.clicked ? 'rotate(135deg)' : 'rotate(0)'};
    }

    &::after {
        top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
        transform: ${(props) =>
            props.clicked ? 'rotate(-135deg)' : 'rotate(0)'};
    }
`;

const SidebarContainer = styled.div`
    background-color: var(--black);
    width: 3.5rem;
    height: 80vh;
    margin-top: 1rem;
    border-radius: 0 30px 30px 0;
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    position: relative;
`;

const Logo = styled.div`
    width: 2rem;

    img {
        width: 100%;
        height: auto;
    }
`;

const SlickBar = styled.ul`
    color: var(--white);
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--black);

    padding: 2rem 0;

    position: absolute;
    top: 6rem;
    left: 0;

    width: ${(props) => (props.clicked ? '12rem' : '3.5rem')};
    transition: all 0.5s ease;
    border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
    text-decoration: none !important;
    color: var(--white) !important;
    width: 100%;
    padding: 1rem 0;
    cursor: pointer;

    display: flex;
    padding-left: 1rem;

    &:hover {
        border-right: 4px solid var(--white);

        img {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
                brightness(103%) contrast(103%);
        }
    }

    img {
        width: 1.2rem;
        height: 20px;
        filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
            brightness(78%) contrast(85%);
    }
`;

const Text = styled.span`
    width: ${(props) => (props.clicked ? '100%' : '0')};
    overflow: hidden;
    margin-left: ${(props) => (props.clicked ? '1.5rem' : '0')};
    transition: all 0.3s ease;
`;

const Profile = styled.div`
    width: ${(props) => (props.clicked ? '14rem' : '3rem')};
    height: 3rem;

    padding: 0.5rem 1rem;
    /* border: 2px solid var(--white); */
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${(props) => (props.clicked ? '9rem' : '0')};

    background-color: var(--black);
    color: var(--white);

    transition: all 0.3s ease;

    img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            border: 2px solid var(--grey);
            padding: 2px;
        }
    }
`;

const Details = styled.div`
    display: ${(props) => (props.clicked ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
`;

const Name = styled.div`
    padding: 0 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
        display: inline-block;
    }

    a {
        font-size: 0.8rem;
        text-decoration: none;
        color: var(--grey);

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Sidebar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const [profileClick, setprofileClick] = useState(false);
    const [user, setUser] = useState({});
    const profile = useSelector((state) => state.profile.list);

    const handleProfileClick = () => setprofileClick(!profileClick);

    useEffect(() => {
        setUser(auth.getCurrentUser());
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        if (auth.getCurrentUser()) {
            dispatch(loadProfile(auth.getCurrentUser().id));
        }
    }, [dispatch]);

    return (
        <Container>
            <Button clicked={click} onClick={() => handleClick()}></Button>
            <SidebarContainer className="side-bar-to-left">
                <Logo>
                    <img src={logo} alt="logo" />
                </Logo>
                <SlickBar clicked={click} className="side-bar-to-right">
                    <Item
                        onClick={() => setClick(false)}
                        exact
                        activeClassName="active"
                        to="/"
                    >
                        <img src={Home} alt="Home" />
                        <Text clicked={click}>Home</Text>
                    </Item>
                    {user && !user.isAdmin && !user.isModerator && (
                        <Item
                            onClick={() => setClick(false)}
                            activeClassName="active"
                            to="/user/profile"
                        >
                            <img src={userProfile} alt="Profile" />
                            <Text clicked={click}>Profile</Text>
                        </Item>
                    )}
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/courses"
                    >
                        <img src={Documents} alt="Documents" />
                        <Text clicked={click}>Courses</Text>
                    </Item>
                    {user && !user.isAdmin && !user.isModerator && (
                        <Item
                            onClick={() => setClick(false)}
                            activeClassName="active"
                            to="/user/exams"
                        >
                            <img src={Exams} alt="Exams" />
                            <Text clicked={click}>Exams</Text>
                        </Item>
                    )}
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/team"
                    >
                        <img src={Team} alt="Team" />
                        <Text clicked={click}>Team</Text>
                    </Item>
                    <Item
                        onClick={() => setClick(false)}
                        activeClassName="active"
                        to="/contactUs"
                    >
                        <img src={contactUs} alt="Contact Us" />
                        <Text clicked={click}>Contact</Text>
                    </Item>
                </SlickBar>

                <Profile clicked={profileClick}>
                    <Avatar
                        onClick={() => handleProfileClick()}
                        src={
                            profile.image
                                ? profile.image
                                : 'https://picsum.photos/200'
                        }
                        alt="Profile"
                    />
                    <Details clicked={profileClick}>
                        <Name>
                            <Link
                                to={
                                    user
                                        ? user.isAdmin
                                            ? '/admin/profile'
                                            : user.isModerator
                                            ? '/moderator/profile'
                                            : '/user/profile'
                                        : '#'
                                }
                                onClick={() => handleProfileClick()}
                            >
                                <div style={{ fontSize: '18px' }}>
                                    view profile
                                </div>
                            </Link>
                        </Name>
                    </Details>
                </Profile>
            </SidebarContainer>
        </Container>
    );
};

export default Sidebar;