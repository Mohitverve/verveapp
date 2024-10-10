import React, { useState, useCallback, useMemo } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { Form, Input, InputNumber, Button, message, Modal } from 'antd';
import { db } from '../components/firebase';

// Debounce function to optimize input changes
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const GameUploadForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    form.resetFields();
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const gameData = {
        ...values,
        uploadDate: new Date(),
      };
      // Optimized Firestore write operation
      await addDoc(collection(db, 'Games'), gameData);
      message.success('Game uploaded successfully!');
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding document:', error);
      message.error('Failed to upload game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Debounce the form submission to improve performance
  const debouncedSubmit = useMemo(() => debounce(onFinish, 300), [onFinish]);

  return (
    <div className='games'>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Upload Game
      </Button>

      <Modal
        title="Upload Game"
        open={isModalVisible} // Updated 'visible' to 'open'
        onCancel={handleCancel}
        footer={null}
        destroyOnClose // Ensures the form is unmounted after closing for better performance
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={debouncedSubmit} // Use debounced function
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Game Name"
            rules={[{ required: true, message: 'Please input the game name!' }]}
          >
            <Input placeholder="Enter game name" />
          </Form.Item>

          <Form.Item
            name="link"
            label="Game Link"
            rules={[
              { required: true, message: 'Please input the game link!' },
              { type: 'url', message: 'Please enter a valid URL!' },
            ]}
          >
            <Input placeholder="Enter game URL" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[
              { required: true, message: 'Please input the image URL!' },
              { type: 'url', message: 'Please enter a valid URL!' },
            ]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Game Description"
            rules={[{ required: true, message: 'Please input the game description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the game" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please input the rating!' }]}
          >
            <InputNumber
              min={0}
              max={5}
              step={0.1}
              style={{ width: '100%' }}
              placeholder="Rate the game (0-5)"
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                disabled={
                  !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                }
              >
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GameUploadForm;
