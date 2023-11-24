import React from 'react';
import axios from 'axios';

const GoogleSignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.post('/');
      console.log('Google sign-up successful:', response.data);
    } catch (error) {
      console.error('Error during Google sign-up:', error.message);
    }
  };

  return (
    <div class="flex items-center justify-center h-full dark:bg-gray-800">
    <button class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Sign up with Google</span>
    </button>
</div>

  );
};

export default GoogleSignUp;
