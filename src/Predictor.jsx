import React, { useState } from 'react';
import axios from 'axios';

function Predictor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
    } else {
      setUploadedImage(null);
    }
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      console.log(response.data['predicted food']);
      setPrediction(response.data['predicted food']);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Prediction App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Predict</button>
      </form>
      {uploadedImage && 
      <img src={uploadedImage} alt="Uploaded" 
        style={{
          maxWidth: '100%',   // Adjust the maximum width as needed
          maxHeight: '300px'  // Adjust the maximum height as needed
        }}
      />}
      <p>Predicted Food: {prediction}</p>
    </div>
  );
}

export default Predictor;
