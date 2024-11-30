import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <div className="Home">
        <Navbar />
        <h2>Welcome to RecipeShare!</h2>
        <p>Creating and sharing recipes is not only a delightful way to express your culinary creativity but also a fantastic means of connecting with others over shared tastes and experiences. With this platform, you have the opportunity to curate your own collection of culinary masterpieces, whether they're cherished family recipes passed down through generations or innovative concoctions born from your own kitchen experiments.
          <br></br>
          <br></br>
          The ability to upvote and comment on recipes adds an interactive element, allowing users to engage with each other, share tips, offer variations, or simply express appreciation for a particularly delicious dish. It's like having a virtual recipe club where food enthusiasts can come together to celebrate their love for cooking and eating.
          <br></br>
          <br></br>

          Whether you're a seasoned chef or just starting out on your culinary journey, this platform provides a welcoming space to explore, create, and connect through the universal language of food. So, dive in, whip up something delicious, and share the joy of cooking with your friends and family!
        </p>
      </div>
    </>

  );
}

export default Home;