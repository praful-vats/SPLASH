import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useFirebase } from '../../contexts/FirebaseContext';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function TextEditor() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();
  const { firestore } = useFirebase();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [firestore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === '') {
      return;
    }

    try {
      await addDoc(collection(firestore, 'messages'), {
        text,
        userId: currentUser.uid,
        createdAt: new Date(),
      });

      setText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message"
          />
        </Form.Group>
        <Button type="submit" disabled={text.trim() === ''}>
          Send
        </Button>
      </Form>
      <hr />
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.text}</p>
            <small>{message.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
