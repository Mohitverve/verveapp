import React from 'react';
import { Form, Input, Button } from 'antd';
import "../styles/contact.css";

const Contact = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="contact-container">
      <div className="dotted-background"></div>
      <div className="contact-content">
        <div className="contact-heading">
          <h1>Contact Us</h1>
          <div className="contact-info">
            <p>Email: support@verveuni.com</p>
            <p>Phone: +91-9315941574</p>
          </div>
        </div>
        <Form
          name="contact"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="contact-form"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Contact;