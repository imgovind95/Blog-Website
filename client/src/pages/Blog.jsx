import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import moment from 'moment';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import Footer from '../components/Footer';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateContent = async () => {
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }

    if (translatedText) {
      setIsTranslated(true);
      return;
    }

    setIsTranslating(true);
    try {
      // Strip HTML tags to get plain text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data.description;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';

      // Split into chunks of 500 chars (MyMemory API limit)
      const chunks = [];
      const words = plainText.split(' ');
      let current = '';
      for (const word of words) {
        if ((current + ' ' + word).length > 450) {
          chunks.push(current.trim());
          current = word;
        } else {
          current += ' ' + word;
        }
      }
      if (current.trim()) chunks.push(current.trim());

      // Translate each chunk
      const translated = [];
      for (const chunk of chunks) {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|hi`
        );
        const result = await res.json();
        translated.push(result.responseData.translatedText);
      }

      setTranslatedText(translated.join(' '));
      setIsTranslated(true);
    } catch (error) {
      toast.error('Translation failed. Please try again.');
    }
    setIsTranslating(false);
  };
  const [comments, setComments] = useState([]);
  const { url } = useAppContext();

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`${url}/api/blog/${id}`);
      if (response.data.success) {
        setData(response.data.blog);
      } else {
        toast.error('Blog not found');
      }
    } catch (error) {
      toast.error('Error fetching blog');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${url}/api/blog/comments/${id}`);
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const content = e.target.comment.value;

    try {
      const response = await axios.post(`${url}/api/blog/comment`, {
        blog: id,
        name,
        content,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        e.target.reset();
        fetchComments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          {data.authorName || "Admin"}
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        {/* Translate Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={translateContent}
            disabled={isTranslating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-medium text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base">🌐</span>
            {isTranslating
              ? 'Translating...'
              : isTranslated
              ? 'Show Original (English)'
              : 'Translate to Hindi (हिन्दी)'}
          </button>
        </div>

        {isTranslated ? (
          <div className="rich-text max-w-3xl mx-auto whitespace-pre-line text-gray-700 leading-relaxed">
            {translatedText}
          </div>
        ) : (
          <div
            className="rich-text max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        )}

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">
            Comments ({comments.length})
          </p>
          <div className="flex flex-col gap-4 mt-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="max-w-md ml-8">{item.content}</p>
                  <p className="ml-4 whitespace-nowrap">
                    {moment(item.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              name="comment"
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div className="text-center text-gray-500 py-20">Loading...</div>
  );
};

export default Blog;