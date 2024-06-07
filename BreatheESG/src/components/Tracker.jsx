import React from 'react';
import { Table, Tag } from 'antd';
import { ArrowDownOutlined, PercentageOutlined, FilterFilled, PieChartOutlined, SolutionOutlined, PlusSquareOutlined } from '@ant-design/icons';

import Dashboard from '../Shared/Dashboard';

const columns = [
    {
        title: <>MONTH <ArrowDownOutlined /></>,
        dataIndex: 'month',
    },
    {
        title: <>STATUS <ArrowDownOutlined /></>,
        key: 'tags',
        dataIndex: 'status',
        render: (_, { status }) => {
            let color;
            let statusText;
            switch (status[0]) {
                case 'PENDING APPROVAL (1/2)':
                    color = 'red';
                    statusText = 'PENDING APPROVAL (1/2)';
                    break;
                case 'APPROVED':
                    color = 'green';
                    statusText = 'APPROVED';
                    break;
                case 'INCOMPLETE':
                    color = 'orange';
                    statusText = 'INCOMPLETE';
                    break;
                default:
                    color = 'blue';
                    statusText = '';
            }
            return (
                <Tag color={color} key={statusText}>
                    {statusText.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: (
            <div className="flex items-center">
                COMPLETION
                <PercentageOutlined className="ml-2" />
                <ArrowDownOutlined className="ml-2" />
            </div>
        ),
        dataIndex: 'completion' ,
    },
    {
        title: <>BUSINESS UNIT <FilterFilled /></>,
        dataIndex: 'unit',
    },
];

const data = [
    {
        key: '1',
        month: 'Jan 2023',
        status: ['PENDING APPROVAL (1/2)'],
        completion: 20 + '%',
        unit: 'Business Unit 1',
    },
    {
        key: '2',
        month: 'Feb 2023',
        status: ['APPROVED'],
        completion: 30 + '%',
        unit: 'Business Unit 1',
    },
    {
        key: '3',
        month: 'March 2023',
        status: ['INCOMPLETE'],
        completion: 50 + '%',
        unit: 'Business Unit 1',
    },
];

function Tracker() {
    return (
        <div className="p-4">
            <Dashboard />
            <div className="ml-52 w-[87%] px-5 py-5">
                <div className="flex mb-8">
                    <div className=''>
                        <p className="flex items-center mr-12 text-[#101010]"> PENDING TRACKERS <PieChartOutlined className="ml-2 shadow-lg" /></p>
                        <h2 className="font-bold text-2xl">45/60</h2>
                    </div>
                    <div>
                        <p className="flex items-center text-[#101010]">PENDING REVIEWS <PlusSquareOutlined className="ml-2 shadow-lg" /> </p>
                        <h2 className="font-bold text-2xl">3</h2>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default Tracker;
