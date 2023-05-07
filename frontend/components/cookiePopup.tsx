import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false)

  const handleAccept = () => {
    Cookies.set('showPopup', 'false', { expires: 365 , SameSite:'lax'});
    setShowPopup(false);
  };

  useEffect(() => {
    setShowPopup(!Cookies.get('showPopup'))
  }, [])
  

  return (
    <div className="fixed bottom-0 w-full items-center ">
      {showPopup && 
        <div className="flex flex-col mx-2 md:mx-auto max-w-screen-md bg-gray-100 rounded border-black border-2 p-4 shadow-lg">
            <p className="text-gray-800">
              We use cookies to improve your experience on our website. By continuing to browse, you agree to our use of cookies.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 mx-auto"
              onClick={handleAccept}
            >
              Accept
            </button>
        </div>
      }
    </div>
  );
}

export default CookiePopup;