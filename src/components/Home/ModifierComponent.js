import React from "react";

const ModifierComponent = (props) => {
  const { name, prodId, modifierNames, forceUpdate,
    setModifierNames, onModifierChange, handleSubmit, getRandomInt } = props;
  const modifierFields = modifierNames.map((modifier, i) => (
    modifier.prodId === prodId &&
    <div class="form-group" key={i}>
      <div className="container">
        <div className="row mb-4 mx-auto">
          <div className="col-10  gx-2">
            <input type="text" required class="form-control mb-2"
              id="modifierInput"
              maxLength={30}
              value={modifier.value}
              onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e); }}
              name={modifier.id} aria-describedby="modifier"
              placeholder="Modifier name" onChange={(e) => onModifierChange(e, prodId)} />
          </div>
          <div className="col-1">
            <button className="fa fa-times"
              name={modifier['id']}
              style={{ border: '1px solid silver', borderRadius: "10px", width: "40px", height: "38px", cursor: "pointer" }} onClick={(e) => {
                e.preventDefault()
                let newMods = modifierNames;
                let a = []
                newMods.forEach(i => {
                  if (i['id'] !== e.target.name) {
                    a.push(i)
                  }
                })
                setModifierNames(a)
                forceUpdate()
              }}></button>
          </div>
        </div>
      </div>
    </div>
  ))

  // const getValue = (i, object) => Object.keys(object).filter((item) => item.startsWith(i))

  return <>
    <div className="p-3" style={{ border: "1px solid silver", borderRadius: '10px' }}>
      <div className="mt-2">
        <div><h5>{name}</h5><hr /></div>
        {modifierFields}
        <button class="btn btn-success btn-sm my-2" onClick={(e) => {
          e.preventDefault()
          setModifierNames([...modifierNames, {
            "id": `${getRandomInt(modifierNames.length, 1000) + getRandomInt(modifierNames.length, 1000)}`, value: '', prodId: prodId
          }])
        }}
        // disabled={getValue(id, modifierNames).length !== modifiers}
        >Modifier Name&nbsp;&nbsp;<i className="fa fa-plus"></i></button>

      </div>
    </div>
  </>;
};

export default ModifierComponent;
