import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import style from "./style.module.css";

const { container, quantityDiv, pumpQuantity, iconWrapper } =
  style;

  type hederCounterProps = {
    totalQuantity: number,
    svgIcon: React.ReactNode,
    to: string,
    title: string
  }

const HeaderCounter = ({totalQuantity, svgIcon, to, title}: hederCounterProps) => {

  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();

  const quantityStyle = `${quantityDiv} ${
    isAnimate ? pumpQuantity : ""
  }`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);


  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h5>{title}</h5>
    </div>
  );
};

export default HeaderCounter;