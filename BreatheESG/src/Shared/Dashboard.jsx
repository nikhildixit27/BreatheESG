import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { Button, Dropdown, message, Space, Avatar } from 'antd';
import {
    DownOutlined, UserOutlined, SignalFilled, AppstoreOutlined, FileOutlined, DatabaseOutlined,
    CopyOutlined, RiseOutlined, CheckCircleOutlined, AimOutlined, LogoutOutlined,
    BuildOutlined, BellOutlined, GlobalOutlined, LeftCircleFilled, RightCircleFilled
} from '@ant-design/icons';

import logo from '../assets/DashboardLogo.png';

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
};

const items = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4th menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

function Dashboard() {
    const [isDashboardOpen, setIsDashboardOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDashboard = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };

    const isActiveLink = (path) => {
        return location.pathname === path ? 'text-[#4FA556]' : 'text-[#181818]';
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            message.success('Logged out successfully!');

            // Redirect to login page
            navigate('/login');
            
        } catch (error) {
            console.error('Error logging out:', error.message);
            message.error('Failed to log out: ' + error.message);
        }
    };

    return (
        <div className={`flex ${isDashboardOpen ? 'ml-52' : 'ml-10'}`}>
            <Button className="fixed top-5 left-5 z-50 text-white bg-black w-6 h-6" onClick={toggleDashboard}>
                {isDashboardOpen ? <LeftCircleFilled /> : <RightCircleFilled />}
            </Button>

            <div className={`fixed top-0 left-0 h-screen bg-[#181818] text-white p-8 transition-transform duration-300 ${isDashboardOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h4 className="flex items-center mb-16 mt-10">
                    <img src={logo} alt="LOGO" className="h-5 w-5 mr-2" /> BREATHE ESG
                </h4>
                <div className="space-y-6">
                    <p className="flex items-center mb-3"><SignalFilled className="mr-2" /> Dashboard</p>
                    <p className="flex items-center mb-3"><AppstoreOutlined className="mr-2" /> Entity Manager</p>
                    <p className="flex items-center mb-3"><DatabaseOutlined className="mr-2" /> Data Manager</p>
                    <p className="flex items-center mb-3"><FileOutlined className="mr-2" /> Reporting</p>
                    <p className="flex items-center mb-3"><CopyOutlined className="mr-2" /> Materiality</p>
                    <p className="flex items-center mb-3"><CheckCircleOutlined className="mr-2" /> Suppliers</p>
                    <p className="flex items-center mb-3"><RiseOutlined className="mr-2" /> Analytics</p>
                    <p className="flex items-center mb-3"><AimOutlined className="mr-2" /> Targets</p>
                    <div className="mt-5 text-[#ED6262]"><p className="flex items-center mt-5" onClick={handleLogout}><LogoutOutlined className="mr-2" /> Logout</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-5 transition-margin duration-300">
                <div className="flex justify-between mb-5">
                    <div className="flex items-center">
                        <img src={logo} alt="LOGO" className="h-5 w-5 mr-2" />
                        <div className='font-semibold'>View Name</div>
                        <Dropdown menu={menuProps}>
                            <Button className="ml-5">
                                <Space>
                                    <GlobalOutlined /> North India Region
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="flex items-center">
                        <BellOutlined className="mr-3 text-[#9F9F9F]" /> John Doe
                        <Avatar size="small" icon={<UserOutlined />} className="ml-3" />
                    </div>
                </div>

                <div className="flex justify-between mb-5 mt-14">
                    <div className="flex items-center">
                        <Link to="/dataentry" className={` no-underline hover:text-green-500 mr-6 font-semibold ${isActiveLink('/dataentry')}`}><BuildOutlined className="mr-2" /> DATA ENTRY</Link>
                        <Link to="/tracker" className={` no-underline hover:text-green-500 font-semibold ${isActiveLink('/tracker')}`}><AimOutlined className="mr-2" /> TRACKER</Link>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-5 text-[#333333] font-semibold">
                            For:
                            <Dropdown menu={menuProps}>
                                <Button className="ml-2">
                                    <Space className='text-[#333333] font-semibold'>
                                        FY 2023-2024
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        {location.pathname === '/dataentry' && (
                            <Dropdown menu={menuProps}>
                                <Button className="bg-[#2E9844] h-9 text-white">
                                    <Space className='font-semibold'>
                                        Submit for Approval
                                    </Space>
                                </Button>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
