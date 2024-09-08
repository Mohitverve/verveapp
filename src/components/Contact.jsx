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
      <div className="contact-left">
        {/* Contact Heading */}
        <div className="contact-heading">
          <h1>Contact Us</h1>
          {/* Email and Phone Section */}
          <div className="contact-info">
            <p>Email: info@verve.com</p>
            <p>Phone: +91-1234567890</p>
          </div>
        </div>
      </div>
      <div className="contact-right">
        {/* Contact Form */}
        <Form
          name="contact"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="contact-form"
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
