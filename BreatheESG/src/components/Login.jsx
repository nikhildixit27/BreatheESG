import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebaseConfig';
import signupSvg from '../assets/signUp.svg';
import signupLeft from '../assets/signupLeft.svg';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Handle user login
            message.success('Login successful!');
        } catch (error) {
            message.error('Failed to log in: ' + error.message);
        }
        setLoading(false);
    };

    const onFinish = async (values) => {
        setLoading(true);
        const { email, password } = values;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.success('Login successful!');
        } catch (error) {
            message.error('Failed to log in: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#21453C]">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl p-4 md:p-8">
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-base font-medium text-white mb-2">WELCOME TO</h2>
                    <img src={signupLeft} alt="Breathe ESG" className="fill-white mb-6" />
                    <p className="text-lg text-[#9F9F9F] mb-8">We help you track your organisations metrics as per the ESG Guidelines</p>
                    <a href="#" className="text-white">Sounds Interesting? <span className="text-[#4FA556]">Get in touch!</span></a>
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-center">
                        <img src={signupSvg} alt="Login Logo" className="w-32 h-32" />
                    </div>

                    <div className="mt-6 max-w-96 bg-[#235E4A] p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold text-white mb-2">Login</h1>

                        <p className="font-regular text-[#F3F3F3] mb-4">Enter your registered Email ID to continue</p>
                        <Form
                            name="login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                labelCol={{ span: 24 }}
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Your Email ID" className="rounded-md h-12" />
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
                                    className="rounded-md h-12"
                                />
                            </Form.Item>


                            <div className="flex justify-between mt-4">
                                <Button className=" flex w-full py-4 text-sm font-medium transition duration-300 text-white bg-transparent rounded-mdfocus:ring-4 h-10 " onClick={signInWithGoogle}>
                                    <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google Logo" />
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="mt-4 mb-2 text-center">
                                <a href="/signup" className="text-white">Having trouble logging in? <span className="text-[#4FA556] underline">Contact Us</span></a>
                            </div>
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

export default Login;
