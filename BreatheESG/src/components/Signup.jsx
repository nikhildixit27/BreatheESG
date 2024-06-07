import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import signupSvg from '../assets/signUp.svg';
import signupLeft from '../assets/signupLeft.svg';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const { email, password } = values;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            message.success('Sign up successful!');
            navigate('/dataentry');
        } catch (error) {
            message.error('Failed to sign up: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#21453C]">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-4">
                <div className="w-full md:w-1/2 p-8">
                    
                    <h2 className="text-base font-medium text-white mb-2">WELCOME TO</h2>
                    {/* <h1 className="text-4xl font-bold text-white mb-4">BREATHE ESG</h1> */}
                    <img src={signupLeft} alt="" className=" fill-white mb-6" />
                    <p className="text-lg text-[#9F9F9F] mb-8">We help you track your organisations metrics as per the ESG Guidelines</p>
                    <a href="#" className="text-white">Sounds Interesting? <a href="/login"><span className="text-[#4FA556]">Get in touch!</span></a></a>
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-center">
                        <img src={signupSvg} alt="Logo" className="w-32 h-32" />
                    </div>

                    <div className="mx-6 max-w-96 bg-[#235E4A] p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-medium text-white mb-6">Sign Up</h1>
                        <Form
                            name="signup"
                            className="signup-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                labelCol={{ span: 24 }}
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >

                                <Input prefix={<UserOutlined />} placeholder="Enter your Email ID" className="rounded-md h-10" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                labelCol={{ span: 24 }}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                    className="rounded-md h-10"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                labelCol={{ span: 24 }}
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please confirm your Password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="rounded-md h-10"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full bg-green-700 hover:bg-green-600 border-none rounded-md h-10" loading={loading}>
                                    Continue
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
