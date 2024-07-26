// src/hooks/useDarkMode.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Redux/Reducer/theamSlice';

function useDarkMode() {
  const theme = useSelector((state) => state.themeReducer.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return [theme, toggle];
}

export default useDarkMode;
