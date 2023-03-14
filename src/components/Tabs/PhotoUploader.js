import React, { useState } from 'react';
import { Button, Container, Image, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useFirebase } from '../../contexts/FirebaseContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function PhotoUploader() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { storage } = useFirebase();

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, (error) => {
        setError(error.message);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      });
    }
  };

  const handleCameraUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setShowModal(false);
    } else {
      setError('Invalid file type. Please select an image file.');
    }
  };

  const handleGalleryUpload = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      {error && <p>{error}</p>}
      <Image src={`https://firebasestorage.googleapis.com/v0/b/splashedbase.appspot.com/o/users%2F${currentUser.uid}%2Fprofile.jpg?alt=media`} fluid />
      <br></br><br></br>
      <Button onClick={handleGalleryUpload}>Upload from Gallery</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload from Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="image/*" capture="camera" onChange={handleCameraUpload} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <progress value={progress} max="100" />
      <br />
      <Button onClick={handleUpload}>Upload</Button>
    </Container>
  );
}
