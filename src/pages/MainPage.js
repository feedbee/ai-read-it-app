import { cdnBaseUrl } from '../config';

const MainPage = () => (
  <div className="main-page">
    <div className="container">
        <h1>Welcome to <strong>AI, Read It!</strong></h1>
        <p>
          <strong>AI, Read It!</strong> is your personal AI-based text-to-speech assistant designed to convert your written text into high-quality spoken audio.
          Perfect for listening to articles, documents, or even your own writing out loud.
        </p>

        <div className="features-container">
          <div className="feature-box">
            <i className="fas fa-podcast feature-icon"></i>
            <p><strong>Natural-Sounding Voices:</strong> Enjoy a wide range of voices in multiple languages.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-user-friends feature-icon"></i>
            <p><strong>User-Friendly Interface:</strong> Our simple design lets you convert text to speech effortlessly.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-book-open feature-icon"></i>
            <p><strong>Versatile Use Cases:</strong> Ideal for audiobooks, e-learning, or enjoying articles audibly.</p>
          </div>
        </div>

        <h2>Demo <i class="bi bi-soundwave"></i></h2>
        <p>The following voice was recorded using AI, Read It!:</p>
        <div className="mb-4">
          <audio controls>
            <source src={`${cdnBaseUrl}/demo/ai-read-it-demo-1.mp3`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="alert alert-info d-flex flex-row">
          <i className="fas fa-fw fa-info-circle mr-3 mt-1 "></i>
          <div>
            To start using the AI, Read It! app, please log in. Currently, we only support <strong>Google login</strong>,
            offering you a quick and secure way to access all our features. Please, login using the
            button on top right.
          </div>
        </div>
        
        <p>Thank you for choosing AI, Read It! We're here to bring your text to life.</p>
    </div>
  </div>
);

export default MainPage;
