import React, { useState } from 'react';
import { Table } from 'antd';
import { ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';

import Dashboard from '../Shared/Dashboard';

const columns = [
    {
        title: 'ASSESSMENT TITLE',
        dataIndex: 'assessment',
        render: (text) => <a className="text-[#4FA556] hover:underline font-semibold ">{text}</a>,
    },
    {
        title: 'TYPE',
        dataIndex: 'type',
    },
    {
        title: 'NO. OF SUPPLIERS',
        dataIndex: 'suppliers',
    },
    {
        title: 'SCORE',
        dataIndex: 'score',
    },
    {
        title: 'RISK CLASSIFICATION',
        dataIndex: 'risk',
    },
    {
        title: 'STATUS',
        key: 'tags',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                {status.map((status) => {
                    let color = status.length === 7 ? 'bg-[#F04F6D]' : 'bg-[#2E9844]';
                    return (
                        <span className={`inline-block px-2 py-1 text-white opacity-60 rounded ${color}`} key={status}>
                            {status.toUpperCase()}
                        </span>
                    );
                })}
            </>
        ),
    },
    {
        title: 'RESULT',
        dataIndex: 'result',
        render: (text) => <a className="text-[#4FA556] hover:underline font-semibold">{text}</a>,
    },
    {
        title: 'ACTIONS',
        dataIndex: 'actions',
        render: () => (
            <div>
                <ShareAltOutlined className="mr-2" />
                <DeleteOutlined />
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        assessment: 'Assessment 1',
        type: 'BRSR',
        suppliers: 20,
        score: '-',
        risk: 'Medium',
        status: ['Pending'],
        result: '-',
    },
    {
        key: '2',
        assessment: 'Assessment 2',
        type: 'BRSR',
        suppliers: 25,
        score: 98,
        risk: 'Low',
        status: ['Complete'],
        result: 'View',
    },
    {
        key: '3',
        assessment: 'Assessment 3',
        type: 'BRSR',
        suppliers: 35,
        score: 22,
        risk: 'High',
        status: ['Complete'],
        result: 'View',
    },
    {
        key: '4',
        assessment: 'Assessment 3',
        type: 'Custom',
        suppliers: 49,
        score: 23,
        risk: 'Medium',
        status: ['Complete'],
        result: 'View',
    }
    
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

function DataEntry() {
    const [selectionType, setSelectionType] = useState('checkbox');

    return (
        <div className="p-4">
            <Dashboard />
            <div className="ml-52 w-[87%] px-4 py-5">
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    );
}

export default DataEntry;
