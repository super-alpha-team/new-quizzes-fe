import axios from 'axios';
import React, { useState } from 'react';
import Alert from './helpers/Alert';

const instructions = [
  {
    title: 'Target Link URL',
    link: 'http://192.168.1.4:5000/lti'
  },
  {
    title: 'Public JWK URL',
    link: 'http://192.168.1.4:5000/lti/keys'
  },
  {
    title: 'Login Initiation URL',
    link: 'http://192.168.1.4:5000/lti/login'
  },
  {
    title: 'Tool Redirect URL',
    link: 'http://192.168.1.4:5000/lti'
  },
];

function Credential({ name }) {
  const [message, setMessage] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  function copyToClipboard(e) {
    navigator.clipboard.writeText(e.target.value);
    setMessage('copied to your clipboard!');
    setTimeout(() => setMessage(null), 2000);
  }

  async function handleCreate(e) {
    if (clientId && accessToken) {
      const data = {
        url: `http://192.168.1.4`,
        name,
        clientId,
        authenticationEndpoint: `http://192.168.1.4/mod/lti/auth.php`,
        accesstokenEndpoint: `http://192.168.1.4/mod/lti/token.php`,
        authConfigKey: `http://192.168.1.4/mod/lti/certs.php`,
        accesstoken: accessToken,
      };

      const response = await axios.post(`http://localhost:5000/plat/register`, data);
    }
  }

  return (
    <div className='flex flex-col items-center justify-around gap-4 bg-white rounded-lg px-12 pt-8 pb-16'>
      {message && <Alert message={message} />}
      <div className="text-lg font-mono mb-4">Configuration of <b className='after:block after:w-full after:h-3 after:bg-[#91A8ED] after:-mt-3 after:bg-opacity-60'>{name}</b></div>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-gray-500 italic'>Please copy the <b>Target Link URL</b>, <b>Tool Redirect URL</b>, <b>Login Initiation URL</b> and <b>Public JWK URL</b> to be provisioned in your LMS platform.</p>
          {instructions.map(instruction => <div key={instruction.title}>
            <p className='font-semibold'>{instruction.title}</p>
            <div className='px-2 py-1 hover:cursor-text flex justify-between bg-gray-100 border-[1px] border-gray-300 rounded-sm'>
              <p className='align-middle'>{instruction.link}</p>
              <button value={instruction.link} className='text-[#6e89db] font-semibold mr-1' onClick={copyToClipboard}>Copy</button>
            </div>
          </div>)}
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-gray-500 italic'>Please copy the Moodle tool <b>Client ID</b>, and paste it into the LTI Advantage <b>Client ID</b> field.</p>
          <div>
            <p className='font-semibold'>Client ID</p>
            <input value={clientId} onChange={({target}) => setClientId(target.value)} className='border-gray-300 border-[0.05rem] focus:outline-none rounded-sm px-2 py-1 w-full' required type="text" />
          </div>
          <div>
            <p className='font-semibold'>Access Token</p>
            <input value={accessToken} onChange={({target}) => setAccessToken(target.value)} className='border-gray-300 border-[0.05rem] focus:outline-none rounded-sm px-2 py-1 w-full' required type="text" />
          </div>
          <button className='self-end text-blue-dark rounded-md hover:bg-blue-dark hover:text-white font-semibold text-sm px-8 py-2 border-[0.05rem] border-blue-dark'>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Credential;