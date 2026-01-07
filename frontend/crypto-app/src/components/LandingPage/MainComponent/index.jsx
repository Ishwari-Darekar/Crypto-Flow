import React from "react";
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/image2.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MainComponent() {

  // 🔗 Share handler
  const handleShare = async () => {
    const shareData = {
      title: "CryptoTracker",
      text: "Track real-time cryptocurrency prices with CryptoTracker 🚀",
      url: window.location.origin, // your site URL
    };

    // Mobile + supported browsers
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Desktop fallback
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex-info">
      <div className="left-component">

        <motion.h1
          className="track-crypto-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Track Crypto
        </motion.h1>

        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Real Time.
        </motion.h1>

        <motion.p
          className="info-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          Track real-time cryptocurrency prices with trusted accuracy.
          <br />
          View live data, charts, and trends in one clean dashboard—stay
          informed and never miss a market move.
        </motion.p>

        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {/* Dashboard */}
          <Link to="/dashboard">
            <Button text="Let's Go" />
          </Link>

          {/* Share */}
          <Button text="Share" outlined onClick={handleShare} />
        </motion.div>
      </div>

      <div className="phone-container">
        <motion.img
          src={iphone}
          className="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
        <img src={gradient} className="geadient" />
      </div>
    </div>
  );
}

export default MainComponent;
