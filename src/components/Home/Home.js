import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkflowRequest } from "../../redux/actions/addItems";
import ModifierComponent from "./ModifierComponent";
import { useBeforeunload } from 'react-beforeunload';
import { CSVLink } from "react-csv";



const Home = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch()
  const { data: workflow, isLoading } = useSelector((state) => state.addItemsReducer)
  let { percentage } = workflow;
  const [productNames, setProductNames] = useState([{ "id": `${getRandomInt(1, 2300)}`, value: '' }]);
  const [modifierNames, setModifierNames] = useState([]);
  let initialSeconds = 0
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(initialSeconds);

  let headers = [
    { label: "Name", key: "name" },
    { label: "Parent Keyword", key: "parent_term" },
    { label: "Language", key: "language" }
  ];
  console.log(workflow.concatenations)

  let csvData = workflow.concatenations && workflow.concatenations;

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

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const onProductChange = (e) => {
    const newProd = productNames.map(item => {
      if (item['id'] == e.target.name) {
        item['value'] = e.target.value
      }
      return item
    })
    setProductNames(newProd)
  }

  const onModifierChange = (e, prodId) => {
    const newMod = modifierNames.map(item => {
      if (item['id'] == e.target.name) {
        item['value'] = e.target.value
        item['prodId'] = prodId
      }
      return item
    })
    setModifierNames(newMod)
  }
  const productFields = productNames.map((product, i) => (
    <div className="form-group" key={i}>
      {/* <div className="container"> */}
      <div className="row mb-4 mx-auto">
        <div className={`${productNames.length > 1 ? "col-11 gx-2" : "col-12"}`}>
          <input type="text" required className="form-control mb-2" id="productInput" name={product['id']}
            value={product.value}
            maxLength={30}
            aria-describedby="product" placeholder="Enter product name" onChange={onProductChange}
            onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e); }} /></div>
        <div className="col-1" style={{}}>
          {productNames.length > 1 &&
            <button className="fa fa-times"
              style={{ border: '1px solid silver', borderRadius: "10px", width: "42px", height: "40px", cursor: "pointer" }}
              name={product['id']} onClick={(e) => {
                e.preventDefault()
                let newProds = productNames;
                let a = []

                let newMods = modifierNames;
                let b = []
                newProds.forEach(i => {
                  if (i['id'] !== e.target.name) {
                    a.push(i)
                  } else {
                    // Delete mods for matching prod
                    newMods.forEach(mod => {
                      if (mod.prodId !== i.id) {
                        b.push(mod)
                      }
                    })
                  }
                })
                setProductNames(a)
                setModifierNames(b)
                forceUpdate()
              }}></button>
          }
        </div>
      </div>
      {/* </div> */}


    </div>
  ))


  const handleSubmit = (e) => {
    e.preventDefault();
    let mins = modifierNames.length ? (productNames.length + modifierNames.length) / 2 : productNames.length > 1 ? productNames.length / 2 : null;
    mins ? setMinutes(Math.floor(mins)) : setSeconds(29)
    dispatch(addWorkflowRequest(productNames, modifierNames))
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
          </h3 >
          </>
          }
          <br /><br />
          <div className="progress" style={{ height: "100px" }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>{percentage}%</div>
          </div>
        </div >
      </div >
    }
    <div className="container" style={{ display: "grid", placeItems: "center", minHeight: "100vh", margin: "auto", padding: "0" }}>
      <div className="mx-4 w-100">
        <h1><br />KEYWORD TOOL</h1>
        <hr></hr><br />
        <h4>Product</h4>
        <br />
        <form onSubmit={handleSubmit}>
          {productFields}
          {productNames.length < 5 &&
            <button className="btn btn-success btn-sm mx-2"
              onClick={(e) => {
                e.preventDefault()
                setProductNames([...productNames, {
                  "id": `${getRandomInt(productNames.length, 1000) + getRandomInt(productNames.length, 1000)}`, value: ''
                }])
              }}
              disabled={productNames.map(x => { return x['value'] }).includes('')}
            >Add Product Name&nbsp;&nbsp;<i className="fa fa-plus"></i></button>
          }


          <br></br>
          <hr></hr>
          <br></br>
          <br></br>
          {productNames.length > 0 && Object.values(productNames)[0].value &&
            <>
              <h4 className="mb-4">Modifiers (5 max)</h4>
              <br />
              {/* <div className="container"> */}
              <div className="row no-gutters" >
                {productNames.map((item, i) => (
                  item.value !== "" &&
                  <div className="col-sm m-0 p-1" key={i}>
                    <ModifierComponent name={item.value} prodId={item.id}
                      setModifierNames={setModifierNames}
                      forceUpdate={forceUpdate}
                      getRandomInt={getRandomInt}
                      onModifierChange={onModifierChange} modifierNames={modifierNames}
                      handleSubmit={handleSubmit} />
                  </div>
                ))}
                {/* </div> */}
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
            {workflow.concatenations.length < 2 ? <p className="text-danger"><br />No Results Found</p> : <>
              <CSVLink data={csvData}
                headers={headers}
                filename={"keywords.csv"}
                target="_blank"
              >Download csv</CSVLink>
              <br />
              <div className="row">
                {workflow.concatenations && workflow.concatenations.map((concat, i) => (
                  !concat.parent_term &&
                  <div key={i}><br></br><br></br>
                    <hr></hr>
                    <p className="col-2" style={{
                      border: "solid 1px red", padding: ".25rem", wordWrap: "nowrap",
                      margin: "1rem", borderRadius: "5px", textAlign: "center"
                    }}>{concat.name}</p><hr></hr><br />
                  </div>
                ))}
                {workflow.concatenations && workflow.concatenations.map((concat, i) => (
                  concat.parent_term &&
                  <span className="col-2" key={i} style={{
                    border: "solid 1px silver", padding: ".25rem", wordWrap: "nowrap",
                    margin: "1rem", borderRadius: "5px", textAlign: "center"
                  }}>{concat.name}</span>
                ))}</div>
            </>
            }
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
