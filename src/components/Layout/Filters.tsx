import useInput from "../../hooks/useInput";
import classes from "./Filters.module.css";
import { useDispatch } from "react-redux";

import { dataActions } from "../../store/index";

type Props = {};

const nameValidation = (input: string) => {
  return { valid: input.trim() !== "" };
};
const numberValidation = (input: string) => {
  return { valid: parseInt(input) >= 0 };
};

const Filters = (props: Props) => {
  const dispatch = useDispatch();

  const {
    value: nameValue,
    valueChangeHandler: changeNameHandler,
    blurHandler: blurNameHandler,
    resetHandler: resetNameHandler,
    valueIsValid: nameIsValid,
  } = useInput(nameValidation);
  const {
    value: priceFromValue,
    valueChangeHandler: changePriceFromHandler,
    blurHandler: blurPriceFromHandler,
    resetHandler: resetPriceFromHandler,
    valueIsValid: priceFromIsValid,
  } = useInput(numberValidation);
  const {
    value: priceToValue,
    valueChangeHandler: changePriceToHandler,
    blurHandler: blurPriceToHandler,
    resetHandler: resetPriceToHandler,
    valueIsValid: priceToIsValid,
  } = useInput(numberValidation);

  const handleFilterClick = () => {
    const filterState = {
      name: nameValue,
      priceFrom:
        typeof priceFromValue === "string" ? parseInt(priceFromValue) : 0,
      priceTo: typeof priceToValue === "string" ? parseInt(priceToValue) : 999,
    };
    dispatch(dataActions.setFilters(filterState));
  };
  const handleClearClick = () => {
    resetNameHandler();
    resetPriceFromHandler();
    resetPriceToHandler();
  };
  return (
    <div className={classes.filters}>
      <h2>Filters</h2>
      <div className={classes[`filters-list`]}>
        <div className={classes[`filters-filtergroup`]}>
          <label htmlFor="productNameFilter">Name</label>
          <input
            className={classes[`filters-input`]}
            type="text"
            id="productNameFilter"
            value={nameValue}
            onChange={changeNameHandler}
            onBlur={blurNameHandler}
            name="productNameFilter"
            placeholder="Type ..."
          />
        </div>
        <h3>Price</h3>
        <div className={classes[`filters-filtergroup`]}>
          <label htmlFor="productPriceFrom">From</label>
          <input
            className={classes[`filters-input`]}
            type="number"
            id="productPriceFrom"
            min={0}
            max={isNaN(parseInt(priceToValue)) ? 0 : parseInt(priceToValue)}
            onChange={changePriceFromHandler}
            onBlur={blurPriceFromHandler}
            name="productPriceFrom"
            placeholder="Type ..."
          />
        </div>
        <div className={classes[`filters-filtergroup`]}>
          <label htmlFor="productPriceTo">To</label>
          <input
            className={classes[`filters-input`]}
            type="number"
            id="productPriceTo"
            value={priceToValue}
            min={isNaN(parseInt(priceFromValue)) ? 0 : parseInt(priceFromValue)}
            max={999999}
            onChange={changePriceToHandler}
            onBlur={blurPriceToHandler}
            name="productPriceTo"
            placeholder="Type ..."
          />
        </div>
      </div>
      <div className={classes[`filters-control`]}>
        <button onClick={handleFilterClick} className={classes[`big-button`]}>
          Filter
        </button>
        <button
          onClick={handleClearClick}
          className={classes[`big-button`].concat(` ${classes['big-button__reversed-color']}`)}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
