import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkflowRequest } from "../../redux/actions/addItems";
import ModifierComponent from "./ModifierComponent";
import { useBeforeunload } from 'react-beforeunload';
import { CSVLink } from "react-csv";


const Home = () => {
  const dispatch = useDispatch()
  const { data: workflow, isLoading } = useSelector((state) => state.addItemsReducer)
  let { percentage } = workflow;
  const [products, setProducts] = useState(1);
  const [productNames, setProductNames] = useState({});
  const [modifierNames, setModifierNames] = useState({});
  let initialSeconds = 0
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(initialSeconds);

  let csvData = [];

  workflow.concatenations && workflow.concatenations.forEach(function (item) {
    if (!item.parent_term) {
      csvData.push([]);
      csvData.push([item.name]);
      csvData.push([]);
    } else {

      csvData.push([item.name]);
    }
  })

  csvData && csvData.unshift(["Key Words"])

  useBeforeunload((event) => {
    event.preventDefault();
  });

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  const onProductChange = (e) => {
    setProductNames({ ...productNames, [e.target.name]: e.target.value })
  }


  const onModifierChange = (e) => {
    setModifierNames({ ...modifierNames, [e.target.name]: e.target.value })
  }

  const productFields = [
    ...Array(products),
  ].map((product, i) => (
    <div className="form-group" key={i}>
      <input type="text" required className="form-control mb-2" id="productInput" name={i + 1}
        aria-describedby="product" placeholder="Enter product name" onChange={onProductChange}
        onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e); }} />
      {/* {products > 1 &&
        <i className="fa fa-times" onClick={(e) => {
          const newProds = Object.values(productNames).forEach(i => {
            if (i === e.target.value) {

            }
          })
          setProductNames(newProds)
          setProducts(products - 1)
        }}></i>
      } */}
    </div>
  ))


  const handleSubmit = (e) => {
    e.preventDefault()
    setMinutes((products + parseInt(Object.values(modifierNames).length)))
    const modData = {}
    Object.keys(modifierNames).forEach((mod) => {
      if (modData[mod[0]]) {
        modData[mod[0]].push(modifierNames[mod])
      } else {
        modData[mod[0]] = [modifierNames[mod]]
      }
    })
    const prodData = Object.values(productNames).map((prod, i) => {
      return {
        name: prod,
        id: i + 1, modifiers: modData[i + 1]
      }
    })
    dispatch(addWorkflowRequest(prodData))
  }

  return <>
    {isLoading &&
      <div style={{
        width: "100%", overflow: "hidden", position: "fixed", marginTop: "-24px",
        display: "block", background: "rgba(10, 10, 10, .9)", zIndex: "1000"
      }}>
        <div style={{ width: "60%", margin: "auto", maxWidth: "1000px", marginTop: "20%", height: "100vh" }}>
          {minutes === 0 && seconds === 0 ? <><h3 className="text-center text-white">Finishing up...<br />
            <span className="text-center text-white text-italic" style={{ fontSize: "12px" }}>
              <em> Generating report... </em></span>
          </h3>
          </> : <><h3 className="text-center text-white">Processing...<br />
            <span className="text-center text-white text-italic" style={{ fontSize: "12px" }}>
              <em> Approximately ( {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</em> mins ) remaining.</span>
          </h3>
          </>
          }
          <br /><br />
          <div className="progress" style={{ height: "100px" }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>{percentage}%</div>
          </div>
        </div>
      </div>
    }
    <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "100vh", margin: "auto", padding: "0" }}>
      <div className="m-4 w-100">
        <br />
        <h1>KEYWORD TOOL</h1>
        <br />
        <hr></hr><br /><br />
        <h4>Product</h4>
        <br />
        <form onSubmit={handleSubmit}>
          {productFields}
          <br />
          {products < 5 &&
            <button className="btn btn-success btn-sm"
              onClick={(e) => {
                e.preventDefault()
                setProducts(products + 1)
              }}
              disabled={Object.values(productNames).length !== products}
            >Add Product Name&nbsp;&nbsp;<i className="fa fa-plus"></i></button>
          }


          <br></br>
          <hr></hr>
          <br></br>
          <br></br>
          {Object.values(productNames).length > 0 &&
            <>
              <h4 className="mb-4">Modifiers (5 max)</h4>
              <br />
              <div className="">
                <div className="row">
                  {Object.values(productNames).map((name, i) => (
                    <div className="col-sm m-0" key={i}>
                      <ModifierComponent name={name} id={i + 1} onModifierChange={onModifierChange} modifierNames={modifierNames}
                        handleSubmit={handleSubmit} />
                    </div>
                  ))}
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </>
          }

          <button type="submit" className="btn btn-primary btn-lg pull-right" style={{ float: "right" }}
            disabled={isLoading}>{isLoading ? "Loading" : "Get Suggested Keywords"}</button>
          <br /><br />
        </form>
        {workflow.product_lines &&
          <div className="container">
            <br />
            <br />

            <hr />
            {/* <h1>RESULTS</h1>
            <br /><br />
            <b>Workflow ID: {workflow.id}</b>
            <br /><br />
            <div className="row">
              {workflow.product_lines && workflow.product_lines.map((prod) => (
                <div className="col-sm"><h2>{prod.name}</h2>
                  <br />
                  <div className="row" style={{ border: "1px solid silver", borderRadius: "5px", margin: ".1rem", padding: ".4rem .1rem" }}>
                    <label>Synonyms{prod.synonyms && <span> ({prod.synonyms.length})</span>}</label><hr />
                    {prod.synonyms ? prod.synonyms.map((mod) => (
                      <span className="col-sm" style={{
                        border: "1px solid silver", padding: ".1rem .25rem", wordWrap: "nowrap", textAlign: "center",
                        margin: "1rem", borderRadius: "5px"
                      }}>{mod}</span>
                    )) : <div>N/A</div>}
                  </div>
                  <br /><br />
                  <div className="row">
                    <label>Modifiers</label><hr />
                    {prod.modifiers.length > 0 ? prod.modifiers.map((mod) => (
                      <div className="col-sm">{mod.name}
                        {mod.synonyms && <span>({mod.synonyms.map((syn) => <span>{syn}, </span>)})</span>}</div>
                    )) : <div>N/A</div>}
                  </div>
                </div>
              ))} 
              
            </div>
              */}
            <br />
            <br />
            <br />
            {/* <hr />
            <br />
            <br />
            <br /> */}
            <h2>Keywords {workflow.concatenations && <span>({workflow.concatenations.length})</span>} </h2>

            <CSVLink data={csvData}
              filename={"keywords.csv"}
              target="_blank"
            >Download csv</CSVLink>
            <br />
            <div className="row">
              {workflow.concatenations && workflow.concatenations.map((concat) => (
                !concat.parent_term ?
                  <><br></br><br></br>
                    <hr></hr>
                    <p className="col-2" style={{
                      border: "solid 1px red", padding: ".25rem", wordWrap: "nowrap",
                      margin: "1rem", borderRadius: "5px", textAlign: "center"
                    }}>{concat.name}</p>
                    <br></br><hr></hr><br />
                  </>
                  :
                  <span className="col-2" style={{
                    border: "solid 1px silver", padding: ".25rem", wordWrap: "nowrap",
                    margin: "1rem", borderRadius: "5px", textAlign: "center"
                  }}>{concat.name}</span>
              ))}</div>
            {/* <hr />
            <br />
            Workflow ID: {workflow.id}
            <br />
            <hr /> */}
          </div>
        }
      </div>
    </div>
  </>;
};

export default Home;
