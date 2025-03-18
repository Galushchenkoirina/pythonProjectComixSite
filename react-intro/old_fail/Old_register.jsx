// import React, {useState} from 'react';
// import axios from 'axios';
//
// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//
//     const submit = async e => {
//         e.preventDefault();
//
//         const user = {
//             username: username,
//             password: password,
//         };
//         await fetch('http://localhost:8000/api/register/', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(
//                 {
//                     username,
//                     password,
//                 }
//             ),
//         });
import {useAuth} from "../src/components/AuthContext";

{/*//         window.location.href = "/login"*/}
//         return (
//             <>
//             <div>Register</div>
//                 <div className="Auth-form-container">
//                     <form className="Auth-form" onSubmit={submit}>
//                         <div className="Auth-form-content">
//                             <h3 className="Auth-form-title">Sign in</h3>
//                             <div className="form-group mt-3">
//                                 <label>Username</label>
//                                 <input className="form-control mt-1"
//                                        placeholder="Enter username"
//                                        name="username"
//                                        type="text" value={username}
//                                        required
//                                        onChange={e => setUsername(e.target.value)}/>
//                             </div>
//                             <div className="form-group mt-3">
//                                 <label>Password</label>
//                                 <input name="password"
//                                        type="password"
//                                        className="form-control mt-1"
//                                        placeholder="Enter password"
//                                        value={password}
//                                        required
//                                        onChange={e => setPassword(e.target.value)}/>
//                             </div>
//                             <div className="d-grid gap-2 mt-3">
//                                 <button type="submit"
//                                         className="btn btn-primary">Submit
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </>
//     )
//     }
// }
//
//
// export default Register;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import "./Register.css";
// import { SmartCaptcha } from '@yandex/smart-captcha';
// import { useAuth } from "./AuthContext"; // Импортируем контекст
//
//
// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [captchaToken, setCaptchaToken] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth(); // Используем метод login из контекста
//
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//
//     if (!captchaToken) {
//       setError("Пожалуйста, пройдите проверку капчи.");
//       return;
//     }
//
//     try {
//       const response = await axios.post("http://localhost:8000/api/register/", {
//         username,
//         email,
//         password,
//         captcha_token: captchaToken,
//       });
//
//       // Сохраняем токен в localStorage и обновляем состояние авторизации
//       login(response.data.token);
//
//       setSuccess("Регистрация прошла успешно!");
//       setTimeout(() => navigate("/"), 2000); // Перенаправляем на главную страницу через 2 секунды
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Ошибка регистрации. Попробуйте ещё раз."
//       );
//     }
//   };
//
//   return (
//     <div>
//       <a href="/" className="btn-home">Главная</a>
//       <div className="container mt-5">
//         <h2>Регистрация</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Имя пользователя
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Пароль
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <SmartCaptcha sitekey={process.env.REACT_APP_SMARTCAPTCHA_SITEKEY} onSuccess={(token) => setCaptchaToken(token)} />
//           <button type="submit" className="btn btn-primary" disabled={!captchaToken}>
//             Сохранить
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
//
// export default Register;
