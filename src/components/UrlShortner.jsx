import React, { useState } from 'react';
import axios from 'axios';

const URLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [ttl, setTtl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleLongUrlChange = (e) => {
    setLongUrl(e.target.value);
  };

  const handleTtlChange = (e) => {
    setTtl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('http://ec2-13-203-86-21.ap-south-1.compute.amazonaws.com:8080/shorten', {
        url: longUrl,
        ttl: parseInt(ttl, 10) || undefined,
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response.data.error || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="longUrl" className="block text-gray-700 font-bold mb-2">
              Long URL:
            </label>
            <input
              type="text"
              id="longUrl"
              value={longUrl}
              onChange={handleLongUrlChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="ttl" className="block text-gray-700 font-bold mb-2">
              Time-to-Live (seconds):
            </label>
            <input
              type="number"
              id="ttl"
              value={ttl}
              onChange={handleTtlChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Shorten URL
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {shortUrl && (
          <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {shortUrl}
            </a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortener;