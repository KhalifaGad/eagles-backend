import * as styles from "./Logo.module.css";

function Logo({ inverted, height }) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 800"
      height={height}
      className={styles.logo}
    >
      <path
        style={{
          fill: "#1c355e",
          filter: `invert(${inverted ? "100%" : "0"})`,
        }}
        d="M920,200a20,20,0,0,1,20,21.14A400.08,400.08,0,0,1,540.42,600H45a5,5,0,0,1-4.22-7.68C64,555.63,183.18,400,536.42,400c0,0-.16-116.3-222.33-190.26a5,5,0,0,1,1.58-9.74Z"
      />
      <path
        style={{ fill: "#ff4438" }}
        className={styles.eye}
        d="M336.41,282.05c25,10.37,45.2,21,61.53,31.14A263.53,263.53,0,0,1,438.74,344q-15.11,1.27-29.86,3c-38.65,4.41-72.47-26-72.47-64.89Z"
      />
    </svg>
  );
}

export default Logo;
