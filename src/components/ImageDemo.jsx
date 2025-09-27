import profileImg from '../assets/images/profile.png';
import './ImageDemo.css';

export default function ImageDemo() {
  return (
    <div>
      <h2>Image Demo</h2>
      <div>
        <h3>Imported Image</h3>
        <img src={profileImg} alt="Profile" />
      </div>
      <div>
        <h3>Public Folder Image</h3>
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div className="imported-bg">Imported Background</div>
      <div className="public-bg">Public Background</div>
    </div>
  );
}
