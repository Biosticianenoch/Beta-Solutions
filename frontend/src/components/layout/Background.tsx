import React from "react";
import styles from "./Background.module.css";

interface BackgroundProps {
  children: React.ReactNode;
  image?: string;
  overlayOpacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  image = "/images/background.jpg",
  overlayOpacity = 0.85,
}) => {
  return (
    <div
      className={styles.background}
      style={{
        "--background-image": `url(${image})`,
        "--overlay-opacity": overlayOpacity,
      } as React.CSSProperties}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}; 