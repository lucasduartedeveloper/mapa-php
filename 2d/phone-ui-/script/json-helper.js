const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}; // ** Find circular property **

function bodyToJSON(body) {
    var string = JSON.stringify(body, getCircularReplacer());
    return string;
}

function setValue(obj, objUpdated) {
   Object.assign(obj, objUpdated);
}

// Test
//bodyToJSON(bodywork);