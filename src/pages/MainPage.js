const MainPage = () => (
  <div className="main-page">
    <div class="container">
        <h1>Welcome to <strong>AI, Read It!</strong></h1>
        <p>
          <strong>AI, Read It!</strong> is your personal AI-based text-to-speech assistant designed to convert your written text into high-quality spoken audio.
          Perfect for listening to articles, documents, or even your own writing out loud.
        </p>

        <div class="features-container">
          <div class="feature-box">
            <i class="fas fa-podcast feature-icon"></i>
            <p><strong>Natural-Sounding Voices:</strong> Enjoy a wide range of voices in multiple languages.</p>
          </div>
          <div class="feature-box">
            <i class="fas fa-user-friends feature-icon"></i>
            <p><strong>User-Friendly Interface:</strong> Our simple design lets you convert text to speech effortlessly.</p>
          </div>
          <div class="feature-box">
            <i class="fas fa-book-open feature-icon"></i>
            <p><strong>Versatile Use Cases:</strong> Ideal for audiobooks, e-learning, or enjoying articles audibly.</p>
          </div>
        </div>
          
        <div class="alert alert-info d-flex flex-row">
          <i class="fas fa-fw fa-info-circle mr-3 mt-1 "></i>
          <div>
            To start using the AI, Read It! app, please log in. Currently, we only support Google login,
            offering you a quick and secure way to access all our features. Please, login using the
            button on top right.
          </div>
        </div>
        
        <p>Thank you for choosing AI, Read It! We're here to bring your text to life.</p>
    </div>
  </div>
);

export default MainPage;
