import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import classes from './Filters.module.css'


type Props = {}

const nameValidation = (input:string) => input.trim() !== ""
const numberValidation = (input:string) => parseInt(input) >= 0

const Filters = (props: Props) => {
  const {
    value:nameValue,
    valueChangeHandler:changeNameHandler,
    blurHandler:blurNameHandler,
    resetHandler:resetNameHandler,
    valueIsValid:nameIsValid
  } = useInput(nameValidation)
  const {
    value:priceFromValue,
    valueChangeHandler:changePriceFromHandler,
    blurHandler:blurPriceFromHandler,
    resetHandler:resetPriceFromHandler,
    valueIsValid:priceFromIsValid
  } = useInput(numberValidation)
  const {
    value:priceToValue,
    valueChangeHandler:changePriceToHandler,
    blurHandler:blurPriceToHandler,
    resetHandler:resetPriceToHandler,
    valueIsValid:priceToIsValid
  } = useInput(numberValidation)

  const [rangeValue,setRangeValue] = useState(0)

  return (
    <div className = {classes.filters}>
        <h2>Filters</h2>
        <div className={classes[`filters-list`]}>
          <div className={classes[`filters-filtergroup`]}>
            <label htmlFor='productNameFilter'>Filter</label>
            <input
              className={classes[`filters-input`]}
              type = "text" 
              id = "productNameFilter" 
              value = {nameValue}
              onChange = {changeNameHandler}
              onBlur = {blurNameHandler}
              name = "productNameFilter"
              placeholder='Type ...'
            />
          </div>
          <div className={classes[`filters-filtergroup`]}>
            <label htmlFor='productPriceFrom'>Price from</label>
            <input 
              className={classes[`filters-input`]}
              type = "number" 
              id = "productPriceFrom" 
              value = {priceFromValue}
              onChange = {changePriceFromHandler}
              onBlur = {blurPriceFromHandler}
              name = "productPriceFrom"
              placeholder='Type ...'
            />
          </div>
          <div className={classes[`filters-filtergroup`]}>
            <label htmlFor='productPriceTo'>Price to</label>
            <input
              className={classes[`filters-input`]} 
              type = "number" 
              id = "productPriceTo" 
              value = {priceToValue}
              onChange = {changePriceToHandler}
              onBlur = {blurPriceToHandler}
              name = "productPriceTo"
              placeholder='Type ...'
            />
          </div>
          
        </div>
    </div>
  )
}

export default Filters