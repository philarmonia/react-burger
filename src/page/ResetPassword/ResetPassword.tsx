import React, { FC, useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/Recovery';
import styles from './ResetPassword.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

export const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {resetPasswordSuccess, forgotPasswordSuccess} = useSelector(store => store.recovery)
    if(!forgotPasswordSuccess) {
        navigate("/forgot-password")
    }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите новый пароль"
          extraClass="mb-6"
        />
        <Input
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите код из письма"
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
            {resetPasswordSuccess && <Navigate to="/profile"/>}
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pb-4">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};


