import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.Login}>
      <h1>
        <span className={styles.Orange}>E</span>gyptian
        <span className={styles.Orange}> E</span>agls
      </h1>
      <input type="text" placeholder="رقم الموبيل" />
      <input type="password" placeholder="كلمة المرور" />
      <button>تسجيل الدخول</button>
    </div>
  );
};

export default Login;
