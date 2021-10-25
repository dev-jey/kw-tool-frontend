import React, { useState } from "react";

const ModifierComponent = (props) => {
  const { name, id, modifierNames, onModifierChange, handleSubmit } = props;
  const [modifiers, setModifiers] = useState(0);


  const modifierFields = [
    ...Array(modifiers),
  ].map((modifier, i) => (
    <div class="form-group" key={i}>
      <input type="text" required class="form-control mb-2" id="modifierInput"
        onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e); }}
        name={id + "" + i} aria-describedby="modifier" placeholder="Enter modifier name" onChange={onModifierChange} />
    </div>
  ))

  const getValue = (i, object) => Object.keys(object).filter((item) => item.startsWith(i))

  return <>
    <div className="p-3" style={{ border: "1px solid silver", borderRadius: '10px' }}>
      <div className="">
        <div><h3>{name}</h3><hr /></div>
        {modifierFields}
        {modifiers < 5 &&
          <button class="btn btn-success btn-sm my-2" onClick={(e) => {
            e.preventDefault()
            setModifiers(modifiers + 1)
          }}
            disabled={getValue(id, modifierNames).length !== modifiers}
          >Modifier Name&nbsp;&nbsp;<i className="fa fa-plus"></i></button>
        }
      </div>
    </div>
  </>;
};

export default ModifierComponent;
