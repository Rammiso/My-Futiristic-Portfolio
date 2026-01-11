import { RESUME_URL } from './constants.js';

export const downloadResume = async () => {
  try {
    // First try direct download
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'Musab_Resume.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    
    // Fallback: open in new tab
    try {
      window.open(RESUME_URL, '_blank');
      return true;
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
      return false;
    }
  }
};