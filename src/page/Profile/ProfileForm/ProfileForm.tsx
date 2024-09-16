import React, { useState, useEffect, ChangeEvent, FormEvent, FC } from "react";
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getProfile, patchProfile } from "../../../services/actions/User";
import styles from "../Profile.module.css";
import { TUserState } from "../../../services/reducers/User";
import { useDispatch, useSelector } from "../../../services/hooks/hooks";

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const { name = "", email = "" } = user ?? {};

  const [state, setState] = useState({
    name: name,
    email: email,
    password: '',
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchProfile(state.name, state.email, state.password));
  };

  const handleClearForm = () => {
    setState({ ...state, name, email });
  };

  return (
    <div className={`${styles.forms} pt-30`}>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={state.name}
          name="name"
          extraClass="mb-6"
          placeholder="Имя"
          icon={"EditIcon" as const}
        />
        <EmailInput
          onChange={handleChange}
          value={state.email}
          name="email"
          extraClass="mb-6"
          placeholder={'Логин'}
        />
        <PasswordInput
          onChange={handleChange}
          value={state.password}
          name="password"
          extraClass="mb-6"
          placeholder={'Пароль'}
          icon={"EditIcon" as const}
        />
        {state.password !== '' || state.name !== name || state.email !== email ? (
          <div className={styles.buttons}>
            <Button htmlType="button" type="secondary" size="medium" onClick={handleClearForm}>Отмена</Button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ProfileForm;
