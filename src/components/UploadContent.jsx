import { useState } from 'react';
import axios from 'axios';

const UploadContent = () => {
  const [contentType, setContentType] = useState('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to upload content');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('type', contentType);

      if (contentType === 'image') {
        if (!file) {
          setError('Please select an image to upload');
          return;
        }
        formData.append('file', file);
      } else {
        formData.append('content', content);
      }

      await axios.post('http://localhost:5000/api/content/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setStatus('Content uploaded successfully!');
      setContent('');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading content');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid image file');
      setFile(null);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Content</h2>
      {status && <div className="success-message">{status}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contentType">Content Type</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="link">Link</option>
            <option value="image">Image</option>
          </select>
        </div>

        {contentType === 'image' ? (
          <div className="form-group">
            <label htmlFor="file">Select Image</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="content">
              {contentType === 'text' ? 'Enter Text' : 'Enter Link'}
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={contentType === 'text' ? 'Enter your text here...' : 'https://...'}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadContent; 