import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}






  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }
  return (
    <div className="root">
      <Head>
        <title>SocialPost AI | Crypto</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>SocialPost AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Tell us the topic, sentence, paragraph, article content, whatever for your social media post, AI will handle the rest for you (ex. object oriented programming in java, Elon Musks hairline, the NFT space).</h2>
          </div>
          <div className="prompt-container">
            <textarea 
                                                  placeholder="start typing here"
                                                  className="prompt-box"
                                                  value={userInput}
                                                  onChange={onUserChangedText}
                                          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="outer-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
          </div>
          <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Regenerate</p>}
    </div>
  </a>
</div>
        
        
        </div>
    
      </div>
      <div className="badge-container grow">
      
      </div>
    </div>
  );
};

export default Home;
