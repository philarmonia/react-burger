import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./Constructor.module.css"
import BurgerIngridients from "../../components/BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import {getProfile} from "../../services/actions/User";
import React, {FC, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {IngridientDetailsPage} from "../IngridientDetails/IngridientDetails";
import { useSelector } from "../../services/hooks/hooks";

export const ConstructorPage: FC = () => {
    const {popup} = useSelector(store => store.popup)
    const {pathname} = useLocation()
    return (
        <>
            {
            (popup || pathname === "/") &&
            <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngridients/>
                <BurgerConstructor/>
            </DndProvider>
            </main>
            }
            <Routes>
                <Route path="/ingridients/:id" element={<IngridientDetailsPage/>} />
            </Routes>
        </>
    )
}